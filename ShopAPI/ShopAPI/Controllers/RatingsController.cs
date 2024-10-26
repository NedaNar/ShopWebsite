using Microsoft.AspNetCore.Mvc;
using ShopAPI.Models;

[ApiController]
[Route("api/[controller]")]
public class RatingController : ControllerBase
{
    private readonly IRatingService _ratingService;

    public RatingController(IRatingService ratingService)
    {
        _ratingService = ratingService;
    }

    [HttpPost]
    [ProducesResponseType(typeof(Rating), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateRating([FromBody] Rating rating)
    {
        var createdRating = await _ratingService.CreateRatingAsync(rating);
        return CreatedAtAction(nameof(GetRatingById), new { id = createdRating.Id }, createdRating);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(Rating), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetRatingById(int id)
    {
        var rating = await _ratingService.GetRatingByIdAsync(id);
        if (rating == null) return NotFound();
        return Ok(rating);
    }

    [HttpGet("item/{itemId}")]
    [ProducesResponseType(typeof(List<Rating>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetRatingsByItemId(int itemId)
    {
        var ratings = await _ratingService.GetRatingsByItemIdAsync(itemId);
        if (ratings == null || !ratings.Any()) return NotFound();
        return Ok(ratings);
    }

    [HttpGet("item/{itemId}/user/{userId}")]
    [ProducesResponseType(typeof(Rating), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetRatingByUserAndItem(int userId, int itemId)
    {
        var rating = await _ratingService.GetRatingByUserAndItemAsync(userId, itemId);
        if (rating == null) return NotFound();
        return Ok(rating);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteRating(int id)
    {
        var deleted = await _ratingService.DeleteRatingAsync(id);
        if (!deleted) return NotFound();
        return NoContent();
    }
}
