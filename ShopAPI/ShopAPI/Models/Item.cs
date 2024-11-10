using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopAPI.Models
{
    [Table("item")]
    public class Item
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        [StringLength(255)]
        public string Img { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public double Price { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int ItemCount { get; set; }

        [StringLength(1000)]
        public string Descr { get; set; }

        [Required]
        [Column(TypeName = "char(7)")]
        public string Category { get; set; }

        [Required]
        [RegularExpression(@"^(Sticker|Tshirt|Jumper|Print)$")]
        public static readonly string[] ValidCategories = ["Sticker", "Tshirt", "Jumper", "Print"];

        public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

        public virtual ICollection<Rating> Ratings { get; set; } = new List<Rating>();

    }
}
