
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Ecommerce.Helper
{
    public class ClaimsIdentityHelper
    {

        public static int GetUserId(HttpContext httpContext)
        {
            try
            {

                var identity = httpContext.User.Identity as ClaimsIdentity;

                // Gets list of claims.
                IEnumerable<Claim> claim = identity.Claims;

                // Gets name from claims. Generally it's an email address.
                var userIdString = claim
                    .Where(x => x.Type == ClaimTypes.NameIdentifier)
                    .FirstOrDefault().Value;
                if (!string.IsNullOrEmpty(userIdString)) {
                    return Convert.ToInt32(userIdString);
                }

                return -1;
            }
            catch (Exception ) {

                return -1;
            }
        }
    }
}
