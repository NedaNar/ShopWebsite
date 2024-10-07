using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

[Table("order")]
public class Order
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [Column("total_price")]
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
    [Column("fk_userid")]
    public int UserId { get; set; }

    [JsonIgnore]
    [ForeignKey("UserId")]
    public User? User { get; set; }

    public ICollection<OrderItem> OrderItems { get; set; }
}
