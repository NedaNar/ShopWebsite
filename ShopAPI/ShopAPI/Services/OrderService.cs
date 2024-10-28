using Microsoft.EntityFrameworkCore;

public class OrderService : IOrderService
{
    private readonly ShopContext _context;

    public OrderService(ShopContext context)
    {
        _context = context;
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
        var existingOrder = await _context.Orders.FindAsync(id);
        if (existingOrder == null) return null;

        existingOrder.Status = orderDto.Status;
        await _context.SaveChangesAsync();
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
}
