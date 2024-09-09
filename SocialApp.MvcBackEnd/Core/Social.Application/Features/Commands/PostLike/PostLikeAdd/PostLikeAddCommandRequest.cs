using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Commands.PostLike.PostLikeAdd
{
    public class PostLikeAddCommandRequest : IRequest<PostLikeAddCommandResponse>
    {
        public string userName { get; set; }
        public string postId { get; set; }
    }
}
