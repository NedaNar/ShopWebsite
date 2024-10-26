using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly ShopContext _context;

    public UserController(ShopContext context)
    {
        _context = context;
    }
}
