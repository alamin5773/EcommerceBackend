using System;
using System.Collections.Generic;
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
    public class SignupController : Controller
    {

        private readonly UserManager<IdentityUser> userManager;

      
        UnitOfWork unitOfWork;


        public SignupController(UserManager<IdentityUser> userManager, UnitOfWork unitOfWork)
        {
            this.userManager = userManager;
            this.unitOfWork = unitOfWork;

        }


        [HttpPost]
        public async Task<IActionResult> Register([FromBody]Customer userDetails)
        {
            if (!ModelState.IsValid || userDetails == null)
            {
                return new BadRequestObjectResult(new { Message = "User Registration Failed" });
            }

            var identityUser = new IdentityUser() { UserName = userDetails.EmailAddress, Email = userDetails.EmailAddress };
            var result = await userManager.CreateAsync(identityUser, userDetails.Password);

            

            if (!result.Succeeded)
            {
                var dictionary = new ModelStateDictionary();

                foreach (IdentityError error in result.Errors)
                {
                    dictionary.AddModelError(error.Code, error.Description);
                }

                return new BadRequestObjectResult(new { Message = "Registration Failed", Errors = dictionary });
            }
            else
            {
                var identityUserResult = await userManager.FindByNameAsync(userDetails.EmailAddress);
                var resultT = await userManager.AddToRoleAsync(identityUserResult, "customer");

                userDetails.AspNetUserID = identityUserResult.Id;
                userDetails.Password = identityUserResult.PasswordHash;

              
                unitOfWork.CustomertRepoitory.Insert(userDetails);

                unitOfWork.Save();
              
            }

            return Ok(new { Message = "Reigstration Successful" });
        }

        protected override void Dispose(bool disposing)
        {
            unitOfWork.Dispose();
            base.Dispose(disposing);
        }
    }
}