using Domain.interfaces.services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace stockapi.controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductServices _productServices;

        public ProductController(IProductServices productServices)
        {
            _productServices = productServices;
        }
        [HttpGet("products")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productServices.GetAllProduct();

            var response = new
            {
                Data = products,
                Message = "Products retrieved successfully",
                Success = true
            };

            return Ok(response);
        }
    }
}
