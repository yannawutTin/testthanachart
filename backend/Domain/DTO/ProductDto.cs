using System;

namespace Domain.DTO;

public class GetAllProductDto
{
  public int Id { get; set; }
  public string ProductName { get; set; } = string.Empty;
  public double PricePerPiece { get; set; }
  public string ProductCode { get; set; } = string.Empty;

}
