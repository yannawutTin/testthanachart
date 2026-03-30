using Domain.DTO;
using Domain.interfaces.services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace stockapi.controller
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class stockController : ControllerBase
    {
        private readonly IStockServices _stockServices;

        public stockController(IStockServices stockServices)
        {
            _stockServices = stockServices;
        }
        [HttpGet("all")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _stockServices.GetStock();

            var response = new
            {
                Data = products,
                Message = "Products retrieved successfully",
                Success = true
            };

            return Ok(response);
        }
        [HttpPost("add-to-cart")]
        public async Task<IActionResult> AddToCart([FromBody] AddToCartRequest request)
        {
            bool result = await _stockServices.AddToCart(request.ProductId, request.Quantity);
            var response = new
            {
                Message = result ? "Product added to cart successfully" : "Not enough stock available",
                Success = result
            };
            if (!result)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
        [HttpPost("checkout")]

        public async Task<IActionResult> CheckOut([FromBody] List<CheckOutRequest> request)
        {

            List<CheckOutInusfficientStockResponse> checkoutResult = await _stockServices.CheckOut(request);
            if (checkoutResult != null)
            {
                return BadRequest(new
                {
                    data = checkoutResult,
                    Success = false
                });
            }
            return Ok(new
            {
                Message = "Checkout successful",
                Success = true
            });
        }

    }

}
