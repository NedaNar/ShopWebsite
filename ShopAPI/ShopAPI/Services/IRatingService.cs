using ShopAPI.Models;

public interface IRatingService
{
    Task<Rating> CreateRatingAsync(Rating rating);
    Task<Rating> GetRatingByIdAsync(int id);
    Task<List<Rating>> GetRatingsByItemIdAsync(int itemId);
    Task<Rating> GetRatingByUserAndItemAsync(int userId, int itemId);
    Task<bool> DeleteRatingAsync(int id);
}
