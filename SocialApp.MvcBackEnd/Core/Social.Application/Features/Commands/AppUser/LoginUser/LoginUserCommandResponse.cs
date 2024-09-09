using Social.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Commands.AppUser.LoginUser
{
    public class LoginUserCommandResponse
    {
      

      
    }

    public class LoginUserSuccesComandResponse : LoginUserCommandResponse
    {
        public TokenConfig tokenConfig { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string? Image { get; set; }
        public string? Bio { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public bool  isSucces { get; set; }

    }
    public class LoginUsserErrorCommandResponse : LoginUserCommandResponse
    {
        public string message { get; set; }
        public bool isSucces { get; set; } = false;
    }

}
