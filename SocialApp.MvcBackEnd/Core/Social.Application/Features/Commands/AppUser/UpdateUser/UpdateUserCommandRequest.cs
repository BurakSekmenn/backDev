using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Commands.AppUser.UpdateUser
{
    public class UpdateUserCommandRequest : IRequest<UpdateUserCommandResponse>
    {
        public string oldUsername { get; set; }
        public string newUsername { get; set; }
        public string newBio { get; set; }
        public string newImage { get; set; }
        public string newPhoneNumber { get; set; }
        public string newAddress { get; set; }



    }
}
