using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ShopAPI.DataTransferObjects;
using ShopAPI.Models;

[ApiController]
[Route("api/[controller]")]
public class ItemController : ControllerBase
{
    private readonly IItemService _itemService;
    private readonly IMapper _mapper;

    public ItemController(IItemService itemService, IMapper mapper)
    {
        _itemService = itemService;
        _mapper = mapper;
    }

    [HttpPost]
    [ProducesResponseType(typeof(Item), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateItem([FromBody] CreateItemDTO createItemDto)
    {
        createItemDto.Name = createItemDto.Name.ToUpper();
        var item = _mapper.Map<Item>(createItemDto);

        var createdItem = await _itemService.CreateItemAsync(item);
        return CreatedAtAction(nameof(GetItemById), new { id = createdItem.Id }, createdItem);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(GetItemDTO), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetItemById(int id)
    {
        var item = await _itemService.GetItemByIdAsync(id);
        if (item == null) return NotFound();

        var itemDto = _mapper.Map<GetItemDTO>(item);
        return Ok(itemDto);
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<GetItemDTO>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetAllItems()
    {
        var items = await _itemService.GetAllItemsAsync();

        var itemDtos = _mapper.Map<List<GetItemDTO>>(items);
        return Ok(itemDtos);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(GetItemDTO), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateItem(int id, [FromBody] UpdateItemDto item)
    {
        var updatedItem = await _itemService.UpdateItemAsync(id, item);
        if (updatedItem == null) return NotFound();

        var itemDto = _mapper.Map<GetItemDTO>(updatedItem);
        return Ok(itemDto);
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
