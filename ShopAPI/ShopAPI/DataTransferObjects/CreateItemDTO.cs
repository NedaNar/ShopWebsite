using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopAPI.DataTransferObjects
{
    public class CreateItemDTO
    {
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
    }
}
