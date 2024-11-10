using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("order")]
public class Order
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [Column("total_price")]
    [Range(0, double.MaxValue)]
    public double TotalPrice { get; set; }

    [Required]
    [StringLength(255)]
    public string Address { get; set; }

    [Required]
    [StringLength(30)]
    public string PhoneNumber { get; set; }

    [Required]
    public string OrderDate { get; set; }

    [Required]
    [RegularExpression(@"^(Received|Preparing|Shipped|Completed)$")]
    public string Status { get; set; }

    [Required]
    [Column("fk_userid")]
    public int UserId { get; set; }

    [ForeignKey("UserId")]
    public User? User { get; set; }

    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
