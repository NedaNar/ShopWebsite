using Microsoft.EntityFrameworkCore;
using ShopAPI.Models;

public class RatingService : IRatingService
{
    private readonly ShopContext _context;

    public RatingService(ShopContext context)
    {
        _context = context;
    }

    public async Task<Rating> CreateRatingAsync(Rating rating)
    {
        _context.Ratings.Add(rating);
        await _context.SaveChangesAsync();
        return rating;
    }

    public async Task<Rating> GetRatingByIdAsync(int id)
    {
        return await _context.Ratings.FindAsync(id);
    }

    public async Task<List<Rating>> GetRatingsByItemIdAsync(int itemId)
    {
        return await _context.Ratings.Where(r => r.ItemId == itemId).ToListAsync();
    }

    public async Task<Rating> GetRatingByUserAndItemAsync(int userId, int itemId)
    {
        return await _context.Ratings.FirstOrDefaultAsync(r => r.UserId == userId && r.ItemId == itemId);
    }

    public async Task<bool> DeleteRatingAsync(int id)
    {
        var rating = await _context.Ratings.FindAsync(id);
        if (rating == null) return false;

        _context.Ratings.Remove(rating);
        await _context.SaveChangesAsync();
        return true;
    }
}
