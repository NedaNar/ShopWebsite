using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ShopAPI.DataTransferObjects;
using ShopAPI.Models;

[ApiController]
[Route("api/[controller]")]
public class RatingController : ControllerBase
{
    private readonly IRatingService _ratingService;
    private readonly IMapper _mapper;

    public RatingController(IRatingService ratingService, IMapper mapper)
    {
        _ratingService = ratingService;
        _mapper = mapper;
    }

    [HttpPost]
    [ProducesResponseType(typeof(Rating), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateRating([FromBody] CreateRatingDTO ratingDto)
    {
        var rating = _mapper.Map<Rating>(ratingDto);

        var createdRating = await _ratingService.CreateRatingAsync(rating);
        return CreatedAtAction(nameof(GetRatingById), new { id = createdRating.Id }, createdRating);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(GetRatingDTO), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetRatingById(int id)
    {
        var rating = await _ratingService.GetRatingByIdAsync(id);
        if (rating == null) return NotFound();

        var ratingDto = _mapper.Map<GetRatingDTO>(rating);
        return Ok(ratingDto);
    }

    [HttpGet("item/{itemId}")]
    [ProducesResponseType(typeof(List<GetRatingDTO>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetRatingsByItemId(int itemId)
    {
        var ratings = await _ratingService.GetRatingsByItemIdAsync(itemId);
        if (ratings == null) return Ok(null);

        var ratingsDto = _mapper.Map<List<GetRatingDTO>>(ratings);
        return Ok(ratingsDto);
    }

    [HttpGet("item/{itemId}/user/{userId}")]
    [ProducesResponseType(typeof(Rating), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetRatingByUserAndItem(int userId, int itemId)
    {
        var rating = await _ratingService.GetRatingByUserAndItemAsync(userId, itemId);
        if (rating == null) return Ok(null);

        var ratingDto = _mapper.Map<GetRatingDTO>(rating);
        return Ok(ratingDto);
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
