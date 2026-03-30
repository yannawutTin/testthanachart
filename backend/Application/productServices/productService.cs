using System;
using Domain.DTO;
using Domain.interfaces.repository;
using Domain.interfaces.services;
using Infrastructure;

namespace Application.productServices;

public class productService : IProductServices
{
  private readonly IgenericRepository<Product> _productRepository;

  public productService(IgenericRepository<Product> productRepository)
  {
    _productRepository = productRepository;
  }
  public Task<List<GetAllProductDto>> GetAllProduct()
  {
    List<Product> products = _productRepository.GetAllAsync().Result;
    List<GetAllProductDto> productDtos = products.Select(p => new GetAllProductDto
    {
      Id = p.Id,
      ProductName = p.ProductName,
      PricePerPiece = p.PricePerPiece,
      ProductCode = p.ProductCode != null ? p.ProductCode : string.Empty
    }).ToList();

    return Task.FromResult(productDtos);
  }

}
