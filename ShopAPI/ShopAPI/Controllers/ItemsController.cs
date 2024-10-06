using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopAPI.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]
public class ItemController : ControllerBase
{
    private readonly ShopContext _context;

    public ItemController(ShopContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CreateItem([FromBody] Item item)
    {
        _context.Items.Add(item);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetItemById), new { id = item.Id }, item);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetItemById(int id)
    {
        var item = await _context.Items.FindAsync(id);
        if (item == null) return NotFound();
        return Ok(item);
    }


    // WORKS
    [HttpGet]
    public async Task<IActionResult> GetAllItems()
    {
        var items = await _context.Items.ToListAsync();
        return Ok(items);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateItem(int id, [FromBody] Item item)
    {
        var existingItem = await _context.Items.FindAsync(id);
        if (existingItem == null) return NotFound();

        existingItem.Name = item.Name;
        existingItem.Price = item.Price;
        existingItem.ItemCount = item.ItemCount;
        existingItem.Img = item.Img;
        existingItem.Descr = item.Descr;
        existingItem.Category = item.Category;

        await _context.SaveChangesAsync();
        return Ok(existingItem);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteItem(int id)
    {
        var item = await _context.Items.FindAsync(id);
        if (item == null) return NotFound();

        _context.Items.Remove(item);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
