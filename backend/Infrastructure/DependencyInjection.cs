using Domain.interfaces.repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

public static class DependencyInjection
{

  public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
  {
    services.AddDbContext<Contexts.StockContext>(options =>
    {
      options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"));
    });

    services.AddScoped(typeof(IgenericRepository<>), typeof(repository.GenericRepository<>));
    return services;
  }


}
