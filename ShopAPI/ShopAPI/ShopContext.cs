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
        .HasOne(oi => oi.Item)
        .WithMany()  // Assuming Item does not have a navigation back to OrderItem
        .HasForeignKey(oi => oi.ItemId);

        /*modelBuilder.Entity<Order>(entity =>
        {
            entity.HasOne(o => o.User) // Relationship with User
                    .WithMany() // Assuming a user can have many orders
                    .HasForeignKey(o => o.UserId)
                    .OnDelete(DeleteBehavior.Cascade); // Optional: Define delete behavior

            entity.HasMany(o => o.OrderItems) // One Order has many OrderItems
                    .WithOne(oi => oi.Order) // Each OrderItem belongs to one Order
                    .HasForeignKey(oi => oi.OrderId); // Define foreign key property
        });

        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.HasOne(oi => oi.Item) // Relationship with Item
                  .WithMany() // Assuming Item can be in many OrderItems
                  .HasForeignKey(oi => oi.ItemId)
                  .OnDelete(DeleteBehavior.Restrict); // Optional: Define delete behavior

            entity.HasOne(oi => oi.Order) // Relationship with Order
                  .WithMany(o => o.OrderItems)
                  .HasForeignKey(oi => oi.OrderId);
        });*/
    }
}