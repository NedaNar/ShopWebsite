using ShopAPI.Models;

public interface IItemService
{
    Task<Item> CreateItemAsync(Item item);
    Task<Item> GetItemByIdAsync(int id);
    Task<List<Item>> GetAllItemsAsync();
    Task<Item> UpdateItemAsync(int id, UpdateItemDto item);
    Task<bool> DeleteItemAsync(int id);
}
