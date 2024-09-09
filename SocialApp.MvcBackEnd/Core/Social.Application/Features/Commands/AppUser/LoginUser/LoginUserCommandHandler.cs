using Social.Application.Abstractions.Token;
using Social.Application.Dtos;
using Social.Application.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Commands.AppUser.LoginUser
{
    public class LoginUserCommandHandler : IRequestHandler<LoginUserCommandRequst, LoginUserCommandResponse>
    {
        private readonly UserManager<Domain.Entities.Identity.AppUser> _userManager;
        private readonly SignInManager<Domain.Entities.Identity.AppUser> _signInManager;
        private readonly ITokenHandler _tokenHandler;

        public LoginUserCommandHandler(
            UserManager<Domain.Entities.Identity.AppUser> userManager, 
            SignInManager<Domain.Entities.Identity.AppUser> signInManager,
            ITokenHandler tokenHandler)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenHandler = tokenHandler;
        }

        public async Task<LoginUserCommandResponse> Handle(LoginUserCommandRequst request, CancellationToken cancellationToken)
        {
            Domain.Entities.Identity.AppUser appUser = await _userManager.FindByNameAsync(request.UsernameOrEmail);
            if (appUser == null)
                appUser = await _userManager.FindByEmailAsync(request.UsernameOrEmail);

            if (appUser == null)
                return new LoginUsserErrorCommandResponse() { isSucces=false,message=$"Not Found {request.UsernameOrEmail}"};


            SignInResult result = await _signInManager.CheckPasswordSignInAsync(appUser, request.Password, false);

            if (result.Succeeded)
            {
                TokenConfig token = _tokenHandler.CreateAccesToken(1000);
                return new LoginUserSuccesComandResponse()
                {
                    tokenConfig = token,
                    UserName = appUser.UserName,
                    Email = appUser.Email,
                    PhoneNumber = appUser.PhoneNumber,
                    Address = appUser.Address,
                    Bio = appUser.Bio,
                    Image = appUser.Image,
                    isSucces = true

                };
            }else
                return new LoginUsserErrorCommandResponse() { isSucces = false, message = "UserName and Password is wrong" };
            


        }
    }
}
