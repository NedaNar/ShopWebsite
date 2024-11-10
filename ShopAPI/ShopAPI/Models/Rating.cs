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

        [Required]
        [StringLength(255)]
        public string Comment { get; set; }

        [Required]
        [Column("rating")]
        [Range(1, 5)]
        public int ItemRating { get; set; }

        [Required]
        [Column("fk_userid")]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }

        [Required]
        [Column("fk_itemid")]
        public int? ItemId { get; set; }

        [ForeignKey("ItemId")]
        public Item? Item { get; set; }
    }

}
