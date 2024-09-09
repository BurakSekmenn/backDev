using MediatR;
using Microsoft.AspNetCore.Identity;
using Social.Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Queries.User.LogoutUser
{
    public class LogoutUserQueryHandler : IRequestHandler<LogoutUserQueryRequest, LogoutUserQueryResponse>
    {
        readonly SignInManager<AppUser> _signInManager;

        public LogoutUserQueryHandler(SignInManager<AppUser> signInManager)
        {
            _signInManager = signInManager;
        }

        public async Task<LogoutUserQueryResponse> Handle(LogoutUserQueryRequest request, CancellationToken cancellationToken)
        {
            await _signInManager.SignOutAsync();
            return new LogoutUserQueryResponse()
            {
                isSuccess = true
            };
        }
    }
}
