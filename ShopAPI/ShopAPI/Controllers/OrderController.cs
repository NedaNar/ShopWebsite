using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly ShopContext _context;

    public OrderController(ShopContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] Order order)
    {
        foreach (var item in order.OrderItems)
        {
            item.OrderId = order.Id;
        }

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetOrderById), new { id = order.Id }, order);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrderById(int id)
    {
        var order = await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Item)
            .FirstOrDefaultAsync(o => o.Id == id);
        if (order == null) return NotFound();
        return Ok(order);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllOrders()
    {
        var orders = await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Item)
            .ToListAsync();
        return Ok(orders);
    }

    [HttpGet("user/{userId}")]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByUserId(int userId)
    {
        var orders = await _context.Orders
            .Where(o => o.UserId == userId)
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Item)
            .ToListAsync();

        if (orders == null)
        {
            return NotFound();
        }

        return Ok(orders);
    }

    public async Task<IActionResult> UpdateOrder(int id, [FromBody] UpdateOrderStatusDto orderDto)
    {
        var existingOrder = await _context.Orders.FindAsync(id);
        if (existingOrder == null)
            return NotFound();

        existingOrder.Status = orderDto.Status;

        await _context.SaveChangesAsync();

        return Ok(existingOrder);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrder(int id)
    {
        var order = await _context.Orders
            .Include(o => o.OrderItems)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null) return NotFound();

        _context.OrderItems.RemoveRange(order.OrderItems);

        _context.Orders.Remove(order);

        await _context.SaveChangesAsync();
        return NoContent();
    }
}
