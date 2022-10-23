
using Server.Service;

namespace Server
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddDIService(this IServiceCollection services)
        {
            services.AddScoped<ICustomerService, CustomerService>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IOrderService, OrderService>();
            return services;
        }
    }
}
