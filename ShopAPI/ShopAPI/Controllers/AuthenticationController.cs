using Microsoft.AspNetCore.Mvc;
using ShopAPI.Models.Auth;

namespace ShopAPI.Controllers
{
    [ApiController]
    [Route("backend/auth")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthenticationController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("signup")]
        [ProducesResponseType(typeof(LogInResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> SignUpAsync([FromBody] SignUpModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid sign-up details.");
            }

            var result = await _authService.SignUp(model);

            if (result is ConflictObjectResult conflictResult)
            {
                return Conflict(conflictResult.Value);
            }

            return Ok(result);
        }

        [HttpGet("login")]
        [ProducesResponseType(typeof(LogInResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> LogInAsync([FromQuery] LoginModel model)
        {
            if (ModelState.IsValid is false)
            {
                return BadRequest("Invalid login credentials.");
            }

            var token = await _authService.Login(model);
            if (token is null)
            {
                return BadRequest("Invalid login credentials.");
            }

            return Ok(token);
        }

        [HttpGet("logout")]
        public async Task LogOut()
        {
            await _authService.Logout();
        }
    }
}
