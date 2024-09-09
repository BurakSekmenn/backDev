using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Domain.Entities.Identity
{
    public class AppUser :  IdentityUser
    {
        public string NameSurname { get; set; }
        public string? Image { get; set; }
        public string? Bio { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
    }
}
