using System.ComponentModel.DataAnnotations;

namespace ShopAPI.DataTransferObjects
{
    public class CreateOrderDTO
    {
        [Required(ErrorMessage = "Total price is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "Total price must be a positive value.")]
        public double TotalPrice { get; set; }

        [Required(ErrorMessage = "Address is required.")]
        [StringLength(255, ErrorMessage = "Address cannot be longer than 255 characters.")]
        public string Address { get; set; }

        [Required(ErrorMessage = "Phone number is required.")]
        [StringLength(30, ErrorMessage = "Phone number cannot be longer than 30 characters.")]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Order date is required.")]
        public string OrderDate { get; set; }

        [Required(ErrorMessage = "Status is required.")]
        [RegularExpression(@"^(Received|Preparing|Shipped|Completed)$", ErrorMessage = "Status must be one of the following: Received, Preparing, Shipped, Completed.")]
        public string Status { get; set; }

        [Required(ErrorMessage = "User ID is required.")]
        public int UserId { get; set; }

        public ICollection<CreateOrderItemDTO> OrderItems { get; set; } = new List<CreateOrderItemDTO>();
    }
}
