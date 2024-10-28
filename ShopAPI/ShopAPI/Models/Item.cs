using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ShopAPI.Models
{
    [Table("item")]
    public class Item
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        [StringLength(255, ErrorMessage = "Name cannot be longer than 255 characters.")]
        public string Name { get; set; }

        [StringLength(255, ErrorMessage = "Image URL cannot be longer than 255 characters.")]
        public string Img { get; set; }

        [Required(ErrorMessage = "Price is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "Price must be a positive value.")]
        public double Price { get; set; }

        [Required(ErrorMessage = "Item count is required.")]
        [Range(0, int.MaxValue, ErrorMessage = "Item count cannot be negative.")]
        public int ItemCount { get; set; }

        [StringLength(1000, ErrorMessage = "Description cannot be longer than 1000 characters.")]
        public string Descr { get; set; }

        [Required]
        [Column(TypeName = "char(7)")]
        public string Category { get; set; }

        [Required(ErrorMessage = "Category is required.")]
        [RegularExpression(@"^(Sticker|Tshirt|Jumper|Print)$", ErrorMessage = "Category must be one of the following: Sticker, Tshirt, Jumper, Print.")]
        public static readonly string[] ValidCategories = ["Sticker", "Tshirt", "Jumper", "Print"];

        [JsonIgnore]
        public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

        [JsonIgnore]
        public virtual ICollection<Rating> Ratings { get; set; } = new List<Rating>();

    }
}
