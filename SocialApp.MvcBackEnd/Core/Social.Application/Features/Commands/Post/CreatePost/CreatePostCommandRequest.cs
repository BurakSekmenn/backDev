using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Commands.Post.CreatePost
{
    public class CreatePostCommandRequest : IRequest<CreatePostCommandResponse>
    {
        public string body { get; set; }
        public string file { get; set; }
        public string userName { get; set; }
    }
}
