using System.ComponentModel.DataAnnotations;

namespace ShopAPI.DataTransferObjects
{
    public class CreateRatingDTO
    {
        [Required(ErrorMessage = "Comment is required.")]
        [StringLength(255, ErrorMessage = "Comment cannot exceed 255 characters.")]
        public string Comment { get; set; }

        [Required(ErrorMessage = "Rating is required.")]
        [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5.")]
        public int ItemRating { get; set; }

        [Required(ErrorMessage = "User ID is required.")]
        public int UserId { get; set; }

        [Required(ErrorMessage = "Item ID is required.")]
        public int ItemId { get; set; }
    }
}
