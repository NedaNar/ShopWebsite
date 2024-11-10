using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ShopAPI.DataTransferObjects;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;
    private readonly IMapper _mapper;

    public OrderController(IOrderService orderService, IMapper mapper)
    {
        _orderService = orderService;
        _mapper = mapper;
    }

    [HttpPost]
    [ProducesResponseType(typeof(Order), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDTO createOrderDto)
    {
        var order = _mapper.Map<Order>(createOrderDto);

        var createdOrder = await _orderService.CreateOrderAsync(order);

        var orderDto = _mapper.Map<GetOrderDTO>(createdOrder);
        return CreatedAtAction(nameof(GetOrderById), new { id = orderDto.Id }, orderDto);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(Order), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetOrderById(int id)
    {
        var order = await _orderService.GetOrderByIdAsync(id);
        if (order == null) return NotFound();

        var orderDto = _mapper.Map<GetOrderDTO>(order);
        return Ok(orderDto);
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<Order>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetAllOrders()
    {
        var orders = await _orderService.GetAllOrdersAsync();
        var ordersDto = _mapper.Map<List<GetOrderDTO>>(orders);
        return Ok(ordersDto);
    }

    [HttpGet("user/{userId}")]
    [ProducesResponseType(typeof(List<Order>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetOrdersByUserId(int userId)
    {
        var orders = await _orderService.GetOrdersByUserIdAsync(userId);
        if (orders == null || !orders.Any()) return NotFound();

        var ordersDto = _mapper.Map<List<GetOrderDTO>>(orders);
        return Ok(ordersDto);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(Order), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateOrder(int id, [FromBody] UpdateOrderStatusDto orderDto)
    {
        var updatedOrder = await _orderService.UpdateOrderStatusAsync(id, orderDto);
        if (updatedOrder == null) return NotFound();

        var updatedOrderDto = _mapper.Map<GetOrderDTO>(updatedOrder);
        return Ok(updatedOrderDto);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteOrder(int id)
    {
        var deleted = await _orderService.DeleteOrderAsync(id);
        if (!deleted) return NotFound();
        return NoContent();
    }
}
