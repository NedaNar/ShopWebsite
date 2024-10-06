using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopAPI.Models
{
    [Table("rating")]
    public class Rating
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [StringLength(255)]
        public string Comment { get; set; }

        [Required]
        [Column("rating")]  // Maps to "rating" column in the database
        public int ItemRating { get; set; }  // Property should match the SQL column name

        [Required]
        [Column("fk_userid")]  // Explicitly map this to the correct column
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }  // Navigation property for the related User

        [Required]
        [Column("fk_itemid")]  // Explicitly map this to the correct column
        public int ItemId { get; set; }

        [ForeignKey("ItemId")]
        public Item Item { get; set; }  // Navigation property for the related Item
    }

}
