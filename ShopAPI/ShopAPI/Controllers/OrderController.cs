﻿using Microsoft.AspNetCore.Mvc;
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

    // WORKS
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

    // WORKS
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

    // WORKS
    [HttpGet]
    public async Task<IActionResult> GetAllOrders()
    {
        var orders = await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Item)
            .ToListAsync();
        return Ok(orders);
    }

    // WORKS
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
        https://localhost:7265/api/Order/user/1

            return NotFound();
        }

        return Ok(orders);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateOrder(int id, [FromBody] Order order)
    {
        var existingOrder = await _context.Orders.FindAsync(id);
        if (existingOrder == null) return NotFound();

        existingOrder.TotalPrice = order.TotalPrice;
        existingOrder.Address = order.Address;
        existingOrder.PhoneNumber = order.PhoneNumber;
        existingOrder.OrderDate = order.OrderDate;
        existingOrder.Status = order.Status;

        await _context.SaveChangesAsync();
        return Ok(existingOrder);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrder(int id)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order == null) return NotFound();

        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
