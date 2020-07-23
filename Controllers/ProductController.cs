using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Ecommerce.DAL;
using Ecommerce.Helper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Ecommerce.Models;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "customer")]
    public class ProductController : Controller
    {

        private readonly UserManager<IdentityUser> userManager;
        UnitOfWork unitOfWork;


        public ProductController(UserManager<IdentityUser> userManager, UnitOfWork unitOfWork)
        {
            this.userManager = userManager;
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        public IActionResult GetProductList()
        {
            
            IEnumerable<Product> listOfProduct = unitOfWork.ProductRepository.Get(orderBy: q => q.OrderBy(d => d.ProductName));


            return Ok(listOfProduct);
        }


        [HttpPost]
        public async Task< IActionResult> PlaceOrder(List<OrderProduct> orderProductList)
        {

           int userId= ClaimsIdentityHelper.GetUserId(HttpContext);
            if (userId > 0 && orderProductList.Count > 0)
            {
              
                try
                {
                    List<OrderProduct> verifiedOrderProductList = new List<OrderProduct>();

                    decimal total = 0;
                    foreach (var item in orderProductList)
                    {
                        var Product = unitOfWork.ProductRepository.GetByID(item.ProductID);
                        if (Product != null)
                        {
                            total += Product.ProductPrice * item.ProductCount;
                            OrderProduct orderProduct = new OrderProduct();
                            orderProduct.ProductID = Product.ProductID;
                            orderProduct.ProductCount = item.ProductCount;
                            verifiedOrderProductList.Add(orderProduct);
                        }
                    }

                    if (verifiedOrderProductList.Count > 0)
                    {

                        Order order = new Order();
                        order.CustomerID = userId;
                        order.OrderDate = DateTime.Now;
                        order.TotalPrice = total;

                        unitOfWork.OrderRepository.Insert(order);
                        unitOfWork.Save();

                        verifiedOrderProductList = verifiedOrderProductList.Select(c => { c.OrderID = order.OrderID; return c; }).ToList();

                        await unitOfWork.OrderProductRepository.InsertALL(verifiedOrderProductList);

                
                        unitOfWork.Save();
                    }

                    return Ok(new { Message = "Order place success" });
                }

                catch (Exception ex)
                {
                    return new BadRequestObjectResult(new { Message = "Order place failed" });
                }
            }

            return new BadRequestObjectResult(new { Message = "Order place failed" } );
        }

        protected override void Dispose(bool disposing)
        {
            unitOfWork.Dispose();
            base.Dispose(disposing);
        }



    }
}