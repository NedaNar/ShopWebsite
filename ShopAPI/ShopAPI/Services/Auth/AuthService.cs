using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopAPI.Models.Auth;
using ShopAPI.Services.Auth;

public sealed class AuthService : IAuthService
{
    private readonly ShopContext _context;

    public AuthService(ShopContext context)
    {
        _context = context;
    }

    public async Task<User> GetUserByIdAsync(int id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<IActionResult> SignUp(SignUpModel model)
    {
        var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
        if (existingUser != null)
        {
            return new ConflictObjectResult(new { Message = "A user with this email already exists." });
        }

        var newUser = new User
        {
            Name = model.Name,
            Email = model.Email,
            Password = model.Password,
            Role = model.Role
        };

        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();

        var role = newUser.Role == 1 ? "user" : "admin";
        var token = GenerateToken(
            new KeyValuePair<string, string>("userId", newUser.Id.ToString()),
            new KeyValuePair<string, string>("role", role)
        );

        var response = new LogInResponse
        {
            UserId = newUser.Id,
            Role = role,
            Jwt = token
        };

        return new OkObjectResult(response);
    }

    public async Task<IActionResult> Login(LoginModel model)
	{
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.UserName);

        if (user == null || user.Password != model.Password)
        {
            return null;
        }

        var role = user.Role == 1 ? "admin" : "user";
        var token = GenerateToken(
            new KeyValuePair<string, string>("userId", user.Id.ToString()),
            new KeyValuePair<string, string>("role", role)
        );

        var result = new LogInResponse()
		{
			UserId = user.Id,
            Role = role,
            Jwt = token
		};
            
		return new OkObjectResult(result);
	}

	private string GenerateToken(params KeyValuePair<string, string>[] claims)
	{
        var tokenClaims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, claims.First(c => c.Key == "userId").Value)
        };

        var additionalClaims = claims
			.Select(customClaim => new Claim(customClaim.Key, customClaim.Value));
		tokenClaims.AddRange(additionalClaims);

		var token = JwtUtil.CreateToken(tokenClaims, Config.JwtSecret, TimeSpan.FromHours(8));
		var tokenString = JwtUtil.SerializeToken(token);

		return tokenString;
	}

	public Task Logout() => Task.CompletedTask;
}