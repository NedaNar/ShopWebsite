public interface IOrderService
{
    Task<Order> CreateOrderAsync(Order order);
    Task<Order> GetOrderByIdAsync(int id);
    Task<List<Order>> GetAllOrdersAsync();
    Task<List<Order>> GetOrdersByUserIdAsync(int userId);
    Task<Order> UpdateOrderStatusAsync(int id, UpdateOrderStatusDto orderDto);
    Task<bool> DeleteOrderAsync(int id);
}
