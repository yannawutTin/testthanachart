using System;
using Domain.DTO;
using Infrastructure;

namespace Domain.interfaces.services;

public interface IStockServices
{
  public Task<List<GetAllStockDto>> GetStock();
  public Task<bool> AddToCart(int productId, int quantity);

  public Task<List<CheckOutInusfficientStockResponse>> CheckOut(List<CheckOutRequest> request);

}
