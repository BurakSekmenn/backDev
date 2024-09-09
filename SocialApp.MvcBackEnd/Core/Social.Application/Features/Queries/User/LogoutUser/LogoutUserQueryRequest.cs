using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Queries.User.LogoutUser
{
    public class LogoutUserQueryRequest : IRequest<LogoutUserQueryResponse>
    {
    }
}
