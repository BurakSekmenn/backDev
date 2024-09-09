using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Commands.Comment.AddComment
{
    public class AddCommentCommandResponse
    {
        public bool isSuccess { get; set; }
        public string Message { get; set; }
    }
}
