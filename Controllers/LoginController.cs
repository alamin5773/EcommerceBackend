using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Ecommerce.Configuration;
using Ecommerce.DAL;
using Ecommerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {

        UnitOfWork unitOfWork;

        private readonly UserManager<IdentityUser> userManager;
        private readonly JwtBearerTokenSettings jwtBearerTokenSettings;

        public LoginController(IOptions<JwtBearerTokenSettings> jwtTokenOptions,  UserManager<IdentityUser> userManager, UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.userManager = userManager;
            this.jwtBearerTokenSettings = jwtTokenOptions.Value;
        }

    

        [HttpPost]
        public async Task<IActionResult> Login([FromBody]LoginModel credentials)
        {
            User customer;

            if (!ModelState.IsValid
                || credentials == null)
            {
                return new BadRequestObjectResult(new { Message = "Login failed" });
            }


            var identityUser = await userManager.FindByNameAsync(credentials.Email);
            if (identityUser != null)
            {
                var result = userManager.PasswordHasher.VerifyHashedPassword(identityUser, identityUser.PasswordHash, credentials.Password);

                IList<string> rolename = await userManager.GetRolesAsync(identityUser);
                string rolenameString = string.Join(",", rolename);
             
                if (result == PasswordVerificationResult.Success ) {

                    customer= unitOfWork.CustomertRepoitory.Get(filter: x => x.AspNetUserID == identityUser.Id).FirstOrDefault();
                    var token = GenerateToken(customer, rolenameString);
                    return Ok(new { token = token });
                }

               
            }

            

            return new BadRequestObjectResult(new { Message = "Login failed" });

        }


        private string GenerateToken(User customer, string rolenameString)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(jwtBearerTokenSettings.SecretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                    {
                    new Claim(ClaimTypes.Role, rolenameString),
                    new Claim(ClaimTypes.Email, customer.EmailAddress.ToString()),
                    new Claim(ClaimTypes.NameIdentifier, customer.CustomerID.ToString())
                    }),

                Expires = DateTime.UtcNow.AddSeconds(jwtBearerTokenSettings.ExpiryTimeInSeconds),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Audience = jwtBearerTokenSettings.Audience,
                Issuer = jwtBearerTokenSettings.Issuer
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }


        protected override void Dispose(bool disposing)
        {
            unitOfWork.Dispose();
            base.Dispose(disposing);
        }


    }
}