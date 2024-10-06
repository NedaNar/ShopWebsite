using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("order")]
public class Order
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public double TotalPrice { get; set; }

    [Required]
    [StringLength(255)]
    public string Address { get; set; }

    [Required]
    [StringLength(255)]
    public string PhoneNumber { get; set; }

    [Required]
    [StringLength(255)]
    public string OrderDate { get; set; }

    [Required]
    [StringLength(9)]
    [Column(TypeName = "char(9)")]
    public string Status { get; set; }

    [Required]
    public int UserId { get; set; }

    [ForeignKey("UserId")]
    public User User { get; set; }

    public ICollection<OrderItem> OrderItems { get; set; }
}
