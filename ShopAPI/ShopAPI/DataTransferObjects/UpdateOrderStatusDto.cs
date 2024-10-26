using System.ComponentModel.DataAnnotations;

public class UpdateOrderStatusDto
{
    [Required]
    [RegularExpression(@"^(Received|Preparing|Shipped|Completed)$", ErrorMessage = "Status must be one of the following: Received, Preparing, Shipped, Completed.")]
    public string Status { get; set; }
}