using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Commands.AppUser.CreateUser
{
    public class CreateUserCommandResponse
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        
    }
    public class CreateUserSucces : CreateUserCommandResponse
    {
        public string UserName { get; set; }
        public string Email { get; set; }
    }
}
