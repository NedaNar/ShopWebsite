using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ShopAPI.DataTransferObjects;
using ShopAPI.SMTP;
using System.Text;

public class OrderService : IOrderService
{
    private readonly ShopContext _context;
    private readonly EmailService _emailService;
    private readonly IMapper _mapper;

    public OrderService(ShopContext context, EmailService emailService, IMapper mapper)
    {
        _context = context;
        _emailService = emailService;
        _mapper = mapper;
    }

    public async Task<Order> CreateOrderAsync(Order order)
    {
        _context.Orders.Add(order);

        foreach (var orderItem in order.OrderItems)
        {
            var item = await _context.Items.FindAsync(orderItem.ItemId);

            if (item != null && item.ItemCount >= orderItem.Quantity)
            {
                item.ItemCount -= orderItem.Quantity;
            }
            else
            {
                throw new InvalidOperationException("Not enough stock available for item ID " + orderItem.ItemId);
            }
        }

        await _context.SaveChangesAsync();

        await sendEmail(order, $"Hello, your order with ID {order.Id} has been received.", "Order Received");

        return order;
    }

    public async Task<Order> GetOrderByIdAsync(int id)
    {
        return await _context.Orders.Include(o => o.OrderItems).ThenInclude(oi => oi.Item).FirstOrDefaultAsync(o => o.Id == id);
    }

    public async Task<List<Order>> GetAllOrdersAsync()
    {
        return await _context.Orders.Include(o => o.OrderItems).ThenInclude(oi => oi.Item).ToListAsync();
    }

    public async Task<List<Order>> GetOrdersByUserIdAsync(int userId)
    {
        return await _context.Orders.Where(o => o.UserId == userId)
                                     .Include(o => o.OrderItems).ThenInclude(oi => oi.Item)
                                     .ToListAsync();
    }

    public async Task<Order> UpdateOrderStatusAsync(int id, UpdateOrderStatusDto orderDto)
    {
        var existingOrder = await _context.Orders.Include(o => o.OrderItems).FirstOrDefaultAsync(o => o.Id == id);
        if (existingOrder == null) return null;

        existingOrder.Status = orderDto.Status;
        await _context.SaveChangesAsync();

        await sendEmail(existingOrder, $"Hello, your order with ID {existingOrder.Id} has been updated to '{existingOrder.Status}'.", "Order Status Update");

        return existingOrder;
    }

    public async Task<bool> DeleteOrderAsync(int id)
    {
        var order = await _context.Orders.Include(o => o.OrderItems).FirstOrDefaultAsync(o => o.Id == id);
        if (order == null) return false;

        _context.OrderItems.RemoveRange(order.OrderItems);
        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();
        return true;
    }

    private async Task sendEmail(Order order, string message, string subject)
    {
        var email = await _context.Users
            .Where(u => u.Id == order.UserId)
            .Select(u => u.Email)
            .FirstOrDefaultAsync();
        
        if (email != null && !string.IsNullOrEmpty(email))
        {
            var orderDto = _mapper.Map<EmailOrderDTO>(order);
            var body = await formatMessage(orderDto, message);
            await _emailService.SendEmailAsync(email, subject, body);
        }
    }

    private async Task<string> formatMessage(EmailOrderDTO order, string message)
    {
        var body = new StringBuilder();

        body.AppendLine(message);
        body.AppendLine("\nOrder details:");

        foreach (var orderItem in order.OrderItems)
        {
            var item = await _context.Items.FindAsync(orderItem.ItemId);
            if (item != null)
            {
                body.AppendLine($"- {item.Name}: {orderItem.Quantity} x ${item.Price} = {orderItem.Quantity * item.Price:C}");
            }
        }

        body.AppendLine($"\nTotal Price: ${Math.Round(order.TotalPrice, 2)}");
        body.AppendLine($"Shipping Address: {order.Address}");
        body.AppendLine($"Phone Number: {order.PhoneNumber}");
        body.AppendLine("\nThank you for your order!");

        return body.ToString();
    }

}
