using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using ShopAPI.Models;

public class RatingService : IRatingService
{
    private readonly ShopContext _context;
    private readonly IHubContext<NotificationHub> _hubContext;

    public RatingService(ShopContext context, IHubContext<NotificationHub> hubContext)
    {
        _context = context;
        _hubContext = hubContext;
    }

    public async Task<Rating> CreateRatingAsync(Rating rating)
    {
        var itemName = await _context.Items
            .Where(i => i.Id == rating.ItemId)
            .Select(i => i.Name)
            .FirstOrDefaultAsync();

        if (itemName == null)
        {
            throw new ArgumentException("Item not found.");
        }

        _context.Ratings.Add(rating);
        await _context.SaveChangesAsync();

        await _hubContext.Clients.All.SendAsync("ReceiveNotification", $"Review for '{itemName}' received ({rating.ItemRating} stars).");

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
