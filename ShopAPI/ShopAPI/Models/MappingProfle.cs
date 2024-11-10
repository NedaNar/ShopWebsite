using AutoMapper;
using ShopAPI.Models;
using ShopAPI.DataTransferObjects;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Item, GetItemDTO>();
        CreateMap<UpdateItemDto, Item>();
        CreateMap<CreateItemDTO, Item>();

        CreateMap<Order, GetOrderDTO>()
            .ForMember(dest => dest.OrderItems, opt => opt.MapFrom(src => src.OrderItems));
        CreateMap<OrderItem, GetOrderItemDTO>()
            .ForMember(dest => dest.ItemId, opt => opt.MapFrom(src => src.ItemId))
            .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Quantity))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Item.Name))
            .ForMember(dest => dest.Img, opt => opt.MapFrom(src => src.Item.Img))
            .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Item.Price));

        CreateMap<CreateOrderDTO, Order>()
            .ForMember(dest => dest.OrderItems, opt => opt.MapFrom(src => src.OrderItems));
        CreateMap<CreateOrderItemDTO, OrderItem>()
            .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Quantity))
            .ForMember(dest => dest.ItemId, opt => opt.MapFrom(src => src.ItemId));

        CreateMap<Order, EmailOrderDTO>()
           .ForMember(dest => dest.OrderItems, opt => opt.MapFrom(src => src.OrderItems));

        CreateMap<UpdateOrderStatusDto, Order>();

        CreateMap<Rating, GetRatingDTO>();
        CreateMap<CreateRatingDTO, Rating>();

        CreateMap<User, GetUserDTO>();
    }
}
