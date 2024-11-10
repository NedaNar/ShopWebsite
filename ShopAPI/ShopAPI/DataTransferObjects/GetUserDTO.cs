using System.ComponentModel.DataAnnotations;

namespace ShopAPI.DataTransferObjects
{
    public class GetUserDTO
    {
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
