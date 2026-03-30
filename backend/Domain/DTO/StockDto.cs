using System;

namespace Domain.DTO;

public class GetAllStockDto
{
  public int Id { get; set; }
  public string ProductName { get; set; } = string.Empty;
  public string ProductCode { get; set; } = string.Empty;
  public double PricePerPiece { get; set; }
  public int quantityInStock { get; set; }

}

public class CheckOutRequest
{
  public int ProductId { get; set; }
  public int Quantity { get; set; }
}


public class CheckOutInusfficientStockResponse
{
  public int ProductId { get; set; }
  public string ProductName { get; set; } = string.Empty;
  public int AvailableQty { get; set; }
}

public class AddToCartRequest
{
  public int ProductId { get; set; }
  public int Quantity { get; set; }
}