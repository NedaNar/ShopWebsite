using ShopAPI.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

[Table("order_item")]
public class OrderItem
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required(ErrorMessage = "Quantity is required.")]
    [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1.")]
    public int Quantity { get; set; }

    [JsonIgnore]
    [Column("fk_orderid")]
    public int OrderId { get; set; }

    [JsonIgnore]
    [ForeignKey("OrderId")]
    public Order? Order { get; set; }

    [Column("fk_itemid")]
    public int? ItemId { get; set; }

    [ForeignKey("ItemId")]
    public Item? Item { get; set; }
}

