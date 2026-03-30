using System;
using System.Collections.Generic;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;

namespace Infrastructure.Contexts;

public partial class StockContext : DbContext
{
    public StockContext()
    {
    }

    public StockContext(DbContextOptions<StockContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Stock> Stocks { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var configuration = new ConfigurationBuilder()
           .AddJsonFile(System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "appsettings.json"), optional: true, reloadOnChange: true)
           .AddEnvironmentVariables()
           .Build();
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        optionsBuilder.UseNpgsql(connectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("products_pkey");

            entity.ToTable("products");

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("ID");
            entity.Property(e => e.PricePerPiece).HasColumnName("price_per_piece");
            entity.Property(e => e.ProductCode).HasColumnName("productCode");
            entity.Property(e => e.ProductName).HasColumnName("productName");
        });

        modelBuilder.Entity<Stock>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("stock_pkey");

            entity.ToTable("stock");

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("ID");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Qty)
                .HasDefaultValue(0)
                .HasColumnName("qty");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
