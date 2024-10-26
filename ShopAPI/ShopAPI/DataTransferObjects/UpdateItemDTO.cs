using System.ComponentModel.DataAnnotations;

 public class UpdateItemDto
{
    [Required]
    [StringLength(255, ErrorMessage = "Name cannot be longer than 255 characters.")]
    public string Name { get; set; }

    [StringLength(255, ErrorMessage = "Image URL cannot be longer than 255 characters.")]
    public string Img { get; set; }

    [Required(ErrorMessage = "Price is required.")]
    [Range(0.01, double.MaxValue, ErrorMessage = "Price must be a positive value.")]
    public double Price { get; set; }

    [Required(ErrorMessage = "Item count is required.")]
    [Range(0, int.MaxValue, ErrorMessage = "Item count cannot be negative.")]
    public int ItemCount { get; set; }

    [StringLength(1000, ErrorMessage = "Description cannot be longer than 1000 characters.")]
    public string Descr { get; set; }

    [Required(ErrorMessage = "Category is required.")]
    [RegularExpression(@"^(Sticker|Tshirt|Jumper|Print)$", ErrorMessage = "Category must be one of the following: Sticker, Tshirt, Jumper, Print.")]
    public string Category { get; set; }
}
