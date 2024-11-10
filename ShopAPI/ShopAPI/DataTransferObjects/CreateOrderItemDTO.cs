using System.ComponentModel.DataAnnotations;

namespace ShopAPI.DataTransferObjects
{
    public class CreateOrderItemDTO
    {
        [Required(ErrorMessage = "Quantity is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1.")]
        public int Quantity { get; set; }

        public int ItemId { get; set; }
    }
}
