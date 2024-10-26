using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ShopAPI.Models
{
    [Table("rating")]
    public class Rating
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "Comment is required.")]
        [StringLength(255, ErrorMessage = "Comment cannot exceed 255 characters.")]
        public string Comment { get; set; }

        [Required(ErrorMessage = "Rating is required.")]
        [Column("rating")]
        [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5.")]
        public int ItemRating { get; set; }

        [Required(ErrorMessage = "User ID is required.")]
        [Column("fk_userid")]
        public int UserId { get; set; }

        [JsonIgnore]
        [ForeignKey("UserId")]
        public User? User { get; set; }

        [Required(ErrorMessage = "Item ID is required.")]
        [Column("fk_itemid")]
        public int ItemId { get; set; }

        [JsonIgnore]
        [ForeignKey("ItemId")]
        public Item? Item { get; set; }
    }

}
