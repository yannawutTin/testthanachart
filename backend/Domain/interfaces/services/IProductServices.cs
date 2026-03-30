using System;
using Domain.DTO;

namespace Domain.interfaces.services;

public interface IProductServices
{

  public Task<List<GetAllProductDto>> GetAllProduct();

}
