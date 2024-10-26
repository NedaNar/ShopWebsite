using Microsoft.AspNetCore.Mvc;
using ShopAPI.Models;

[ApiController]
[Route("api/[controller]")]
public class ItemController : ControllerBase
{
    private readonly IItemService _itemService;

    public ItemController(IItemService itemService)
    {
        _itemService = itemService;
    }

    [HttpPost]
    [ProducesResponseType(typeof(Item), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateItem([FromBody] Item item)
    {
        var createdItem = await _itemService.CreateItemAsync(item);
        return CreatedAtAction(nameof(GetItemById), new { id = createdItem.Id }, createdItem);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(Item), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetItemById(int id)
    {
        var item = await _itemService.GetItemByIdAsync(id);
        if (item == null) return NotFound();
        return Ok(item);
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<Item>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetAllItems()
    {
        var items = await _itemService.GetAllItemsAsync();
        return Ok(items);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(Item), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateItem(int id, [FromBody] UpdateItemDto item)
    {
        var updatedItem = await _itemService.UpdateItemAsync(id, item);
        if (updatedItem == null) return NotFound();
        return Ok(updatedItem);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteItem(int id)
    {
        var deleted = await _itemService.DeleteItemAsync(id);
        if (!deleted) return NotFound();
        return NoContent();
    }
}
