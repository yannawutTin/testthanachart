using System;
using System.Collections.Generic;

namespace Infrastructure;

public partial class Product
{
    public int Id { get; set; }

    public string ProductName { get; set; } = null!;

    public double PricePerPiece { get; set; }

    public string? ProductCode { get; set; }
}
