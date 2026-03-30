using System;
using Domain.DTO;
using Domain.interfaces.repository;
using Domain.interfaces.services;
using Infrastructure;

namespace Application.StockServices;

public class StockService : IStockServices
{
  private IgenericRepository<Product> _productRepository;
  private IgenericRepository<Stock> _stockRepository;

  public StockService(IgenericRepository<Product> productRepository, IgenericRepository<Stock> stockRepository)
  {
    _productRepository = productRepository;
    _stockRepository = stockRepository;
  }

  public async Task<List<GetAllStockDto>> GetStock()
  {
    List<Product> products = await _productRepository.GetAllAsync();
    List<Stock> stocks = await _stockRepository.GetAllAsync();

    List<GetAllStockDto> productDtos = (from p in products
                                        join s in stocks on p.Id equals s.ProductId into ps
                                        from s in ps.DefaultIfEmpty()
                                        select new GetAllStockDto
                                        {
                                          Id = p.Id,
                                          ProductName = p.ProductName,
                                          PricePerPiece = p.PricePerPiece,
                                          quantityInStock = s != null ? s.Qty : 0,
                                          ProductCode = p.ProductCode != null ? p.ProductCode : string.Empty
                                        }).ToList();

    return productDtos;
  }

  public Task<bool> AddToCart(int productId, int quantity)
  {

    //check qty in stock
    Stock? stock = _stockRepository.GetAllAsync().Result.FirstOrDefault(s => s.ProductId == productId);
    if (stock == null || stock.Qty < quantity)
    {
      return Task.FromResult(false);
    }
    return Task.FromResult(true);
  }

  public async Task<List<CheckOutInusfficientStockResponse>> CheckOut(List<CheckOutRequest> request)
  {
    foreach (var item in request)
    {
      List<CheckOutInusfficientStockResponse> insufficientStock = new List<CheckOutInusfficientStockResponse>();
      bool isOk = true;
      var stocks = await _stockRepository.GetAllAsync();
      Stock? stock = stocks.FirstOrDefault(s => s.ProductId == item.ProductId);

      if (stock == null || stock.Qty < item.Quantity)
      {
        var product = await _productRepository.GetByIdAsync(item.ProductId);
        insufficientStock.Add(new CheckOutInusfficientStockResponse
        {
          ProductId = item.ProductId,
          ProductName = product != null ? product.ProductName : string.Empty,
          AvailableQty = stock != null ? stock.Qty : 0
        });
        isOk = false;
      }
      if (!isOk)
      {
        return insufficientStock;
      }

      stock.Qty -= item.Quantity;
      await _stockRepository.UpdateAsync(stock);
    }

    return null;
  }


}
