using Application.productServices;
using Application.StockServices;
using Domain.interfaces.services;
using Microsoft.Extensions.DependencyInjection;

namespace Application;

public static class DependencyInjection
{

  public static IServiceCollection AddApplication(this IServiceCollection services)
  {
    services.AddScoped<IStockServices, StockService>();
    services.AddScoped<IProductServices, productService>();
    return services;
  }

}
