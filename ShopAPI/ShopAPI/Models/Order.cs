using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

[Table("order")]
public class Order
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required(ErrorMessage = "Total price is required.")]
    [Column("total_price")]
    [Range(0, double.MaxValue, ErrorMessage = "Total price must be a positive value.")]
    public double TotalPrice { get; set; }

    [Required(ErrorMessage = "Address is required.")]
    [StringLength(255, ErrorMessage = "Address cannot be longer than 255 characters.")]
    public string Address { get; set; }

    [Required(ErrorMessage = "Phone number is required.")]
    [StringLength(30, ErrorMessage = "Phone number cannot be longer than 30 characters.")]
    public string PhoneNumber { get; set; }

    [Required(ErrorMessage = "Order date is required.")]
    public string OrderDate { get; set; }

    [Required(ErrorMessage = "Status is required.")]
    [RegularExpression(@"^(Received|Preparing|Shipped|Completed)$", ErrorMessage = "Status must be one of the following: Received, Preparing, Shipped, Completed.")]
    public string Status { get; set; }

    [Required(ErrorMessage = "User ID is required.")]
    [Column("fk_userid")]
    public int UserId { get; set; }

    [JsonIgnore]
    [ForeignKey("UserId")]
    public User? User { get; set; }

    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
