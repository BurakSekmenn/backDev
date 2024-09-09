using MediatR;
using Microsoft.AspNetCore.Identity;
using P=Social.Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Commands.AppUser.UpdateUser
{
    public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommandRequest, UpdateUserCommandResponse>
    {
        private readonly UserManager<P.AppUser> _userManager;

        public UpdateUserCommandHandler(UserManager<P.AppUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<UpdateUserCommandResponse> Handle(UpdateUserCommandRequest request, CancellationToken cancellationToken)
        {
            P.AppUser user = await _userManager.FindByNameAsync(request.oldUsername);

            if (user == null)
            {
                throw new Exception("User not found");
            }
            
            user.UserName = request.newUsername;
            user.Bio = request.newBio;
            user.Image = request.newImage;
            user.PhoneNumber = request.newPhoneNumber;   
            user.Address = request.newAddress;

            IdentityResult result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return new UpdateUserCommandSuccesResponse();
            }
            return new UpdateUserCommandFailedResponse();


            
        }
    }
   
}
