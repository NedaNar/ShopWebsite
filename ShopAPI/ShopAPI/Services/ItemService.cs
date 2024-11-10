using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ShopAPI.Models;

public class ItemService : IItemService
{
    private readonly ShopContext _context;
    private readonly IMapper _mapper;

    public ItemService(ShopContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
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

        _mapper.Map(itemDto, existingItem);

        await _context.SaveChangesAsync();
        return existingItem;
    }

    public async Task<bool> DeleteItemAsync(int id)
    {
        var item = await _context.Items.Include(i => i.Ratings)
        .FirstOrDefaultAsync(i => i.Id == id);

        if (item == null) return false;

        _context.Ratings.RemoveRange(item.Ratings);
        _context.Items.Remove(item);
        await _context.SaveChangesAsync();

        return true;
    }
}
