using Microsoft.EntityFrameworkCore;
using ShopAPI.Models;

public class ShopContext : DbContext
{
    public ShopContext(DbContextOptions<ShopContext> options) : base(options)
    {
    }

    public DbSet<Item> Items { get; set; }
}