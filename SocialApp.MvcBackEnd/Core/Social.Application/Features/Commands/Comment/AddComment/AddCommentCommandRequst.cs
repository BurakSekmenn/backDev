using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Commands.Comment.AddComment
{
    public class AddCommentCommandRequst : IRequest<AddCommentCommandResponse>
    {
        public string postID { get; set; }
        public string userName { get; set; }
        public string content { get; set; }
    }
}
