namespace ShopAPI.DataTransferObjects
{
    public class GetOrderItemDTO
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int? ItemId { get; set; }
        public string? Name { get; set; }
        public string? Img { get; set; }
        public double? Price { get; set; }
    }
}
