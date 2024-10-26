using Microsoft.EntityFrameworkCore;
using ShopAPI.Models;

public class ShopContext(DbContextOptions<ShopContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Item> Items { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<Rating> Ratings { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<OrderItem>()
        .HasOne(oi => oi.Order) 
        .WithMany(o => o.OrderItems)
        .HasForeignKey(oi => oi.OrderId)
        .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<OrderItem>()
        .HasOne(o => o.Item)
        .WithMany(i => i.OrderItems)
        .HasForeignKey(o => o.ItemId)
        .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Item>()
        .HasMany(i => i.Ratings)
        .WithOne(r => r.Item)
        .HasForeignKey(r => r.ItemId)
        .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Order>()
        .HasMany(o => o.OrderItems)
        .WithOne(oi => oi.Order)
        .HasForeignKey(oi => oi.OrderId)
        .OnDelete(DeleteBehavior.Cascade);
    }
}