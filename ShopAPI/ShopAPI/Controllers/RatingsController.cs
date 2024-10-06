using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopAPI.Models;

[ApiController]
[Route("api/[controller]")]
public class RatingController : ControllerBase
{
    private readonly ShopContext _context;

    public RatingController(ShopContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CreateRating([FromBody] Rating rating)
    {
        _context.Ratings.Add(rating);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetRatingById), new { id = rating.Id }, rating);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetRatingById(int id)
    {
        var rating = await _context.Ratings.FindAsync(id);
        if (rating == null) return NotFound();
        return Ok(rating);
    }

    // WORKS
    [HttpGet("item/{itemId}")]
    public async Task<IActionResult> GetRatingsByItemId(int itemId)
    {
        var ratings = await _context.Ratings
                                    .Where(r => r.ItemId == itemId)
                                    .ToListAsync();

        if (ratings == null) return NotFound();

        return Ok(ratings);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllRatings()
    {
        var ratings = await _context.Ratings.ToListAsync();
        return Ok(ratings);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRating(int id, [FromBody] Rating rating)
    {
        var existingRating = await _context.Ratings.FindAsync(id);
        if (existingRating == null) return NotFound();

        //existingRating.Value = rating.Value;
        //existingRating.UserId = rating.UserId;
        //existingRating.ItemId = rating.ItemId;

        await _context.SaveChangesAsync();
        return Ok(existingRating);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRating(int id)
    {
        var rating = await _context.Ratings.FindAsync(id);
        if (rating == null) return NotFound();

        _context.Ratings.Remove(rating);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
