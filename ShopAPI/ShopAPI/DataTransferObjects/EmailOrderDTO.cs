namespace ShopAPI.DataTransferObjects
{
    public class EmailOrderDTO
    {
            public int Id { get; set; }
            public double TotalPrice { get; set; }
            public string Address { get; set; }
            public string PhoneNumber { get; set; }
            public string OrderDate { get; set; }
            public string Status { get; set; }
            public ICollection<GetOrderItemDTO> OrderItems { get; set; } = new List<GetOrderItemDTO>();
    }
}
