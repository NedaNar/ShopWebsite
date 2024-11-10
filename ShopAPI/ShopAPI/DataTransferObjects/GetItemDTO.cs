namespace ShopAPI.DataTransferObjects
{
    public class GetItemDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Img { get; set; }
        public double Price { get; set; }
        public int ItemCount { get; set; }
        public string Descr { get; set; }
        public string Category { get; set; }
    }
}
