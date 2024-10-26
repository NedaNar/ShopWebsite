using System.ComponentModel.DataAnnotations;

public class UpdateOrderStatusDto
{
    [Required]
    [RegularExpression("^(Preparing|Shipped|Delivered|Cancelled)$")]
    public string Status { get; set; }
}