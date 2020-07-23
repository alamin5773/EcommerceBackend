using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce.Models
{
    public class Customer
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
       public int CustomerID  { get; set; }
        [MaxLength(50)]
        public string Name { get; set; }
        [MaxLength(200)]
        public string EmailAddress { get; set; }
        [MaxLength(200)]
        public string Password { get; set; }
        [MaxLength(200)]
       public string AspNetUserID { get; set; }
    }



}
