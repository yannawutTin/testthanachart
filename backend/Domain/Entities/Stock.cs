using System;
using System.Collections.Generic;

namespace Infrastructure;

public partial class Stock
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public int Qty { get; set; }
}
