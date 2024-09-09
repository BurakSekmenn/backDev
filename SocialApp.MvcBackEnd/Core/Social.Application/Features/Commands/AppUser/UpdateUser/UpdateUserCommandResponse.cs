using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Commands.AppUser.UpdateUser
{
    public class UpdateUserCommandResponse
    {
        public bool isSucces { get; set; }
    }
    public class UpdateUserCommandSuccesResponse : UpdateUserCommandResponse
    {
        public UpdateUserCommandSuccesResponse()
        {
            isSucces = true;
        }
    }
    public class UpdateUserCommandFailedResponse : UpdateUserCommandResponse
    {
        public UpdateUserCommandFailedResponse()
        {
            isSucces = false;
        }
    }
}
