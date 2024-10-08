﻿using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Commands.AppUser.LoginUser
{
    public class LoginUserCommandRequst : IRequest<LoginUserCommandResponse>
    {
        public string UsernameOrEmail { get; set; }

        public string Password { get; set; }
    }
}
