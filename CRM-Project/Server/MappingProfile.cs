using AutoMapper;
using Server.Model;
using Server.ViewModel;

public class MappingProfile : Profile
{
	public MappingProfile()
	{
		CreateMap<CustomerViewModel, Customer>().ReverseMap();
		CreateMap<OrderViewModel, Order>().ReverseMap();
		CreateMap<OrderItemViewModel, OrderItem>().ReverseMap();
		CreateMap<ProductViewModel, Product>().ReverseMap();
	}
}