using Ecommerce.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce
{
    public static class DbInitializer
    {
        public static void Initialize(DatabaseContext context, RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager) 
        {
            context.Database.EnsureCreated();


            // Add code to insert role identity tables

            if (!roleManager.RoleExistsAsync("admin").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "admin";
                role.NormalizedName = "admin";
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }


            if (!roleManager.RoleExistsAsync("customer").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "customer";
                role.NormalizedName = "customer";
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }

            // Add code to insert user identity tables

            if (userManager.FindByNameAsync("admin").Result == null)
            {
                IdentityUser user = new IdentityUser();
                user.UserName = "admin";
                user.Email = "admin@ecommerceapp.com";


                IdentityResult result = userManager.CreateAsync(user, "Admin@123").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user,"admin").Wait();

                    User customer = new User();
                    customer.EmailAddress = user.Email;
                    customer.Name = user.UserName;
                    customer.AspNetUserID = user.Id;
                    customer.Password = user.PasswordHash;
                    context.Add(customer);
                    context.SaveChanges();



                }
            }


            



        }

       


    }
}