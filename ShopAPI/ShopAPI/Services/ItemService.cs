using Microsoft.EntityFrameworkCore;
using ShopAPI.Models;

public class ItemService : IItemService
{
    private readonly ShopContext _context;

    public ItemService(ShopContext context)
    {
        _context = context;
    }

    public async Task<Item> CreateItemAsync(Item item)
    {
        _context.Items.Add(item);
        await _context.SaveChangesAsync();
        return item;
    }

    public async Task<Item> GetItemByIdAsync(int id)
    {
        return await _context.Items.FindAsync(id);
    }

    public async Task<List<Item>> GetAllItemsAsync()
    {
        return await _context.Items.ToListAsync();
    }

    public async Task<Item> UpdateItemAsync(int id, UpdateItemDto itemDto)
    {
        var existingItem = await _context.Items.FindAsync(id);
        if (existingItem == null) return null;

        existingItem.Name = itemDto.Name;
        existingItem.Price = itemDto.Price;
        existingItem.ItemCount = itemDto.ItemCount;
        existingItem.Img = itemDto.Img;
        existingItem.Descr = itemDto.Descr;
        existingItem.Category = itemDto.Category;

        await _context.SaveChangesAsync();
        return existingItem;
    }

    public async Task<bool> DeleteItemAsync(int id)
    {
        var item = await _context.Items.FindAsync(id);
        if (item == null) return false;

        _context.Items.Remove(item);
        await _context.SaveChangesAsync();
        return true;
    }
}
