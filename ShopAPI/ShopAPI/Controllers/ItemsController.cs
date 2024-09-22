using Microsoft.AspNetCore.Mvc;
using ShopAPI.Models;

namespace ShopAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly ILogger<ItemsController> _logger;
        private readonly ShopContext _context;

        public ItemsController(ILogger<ItemsController> logger, ShopContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet(Name = "GetItems")]
        public ActionResult<IEnumerable<Item>> Get()
        {
            return _context.Items.ToList();
        }
    }
}
