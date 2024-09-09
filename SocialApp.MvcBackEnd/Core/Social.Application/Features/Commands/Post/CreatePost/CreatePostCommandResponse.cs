using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Commands.Post.CreatePost
{
    public class CreatePostCommandResponse
    {
        public bool IsSuccess { get; set; }
    }
    public class CreatePostSuccessResponse : CreatePostCommandResponse
    {
        public string Message { get; set; }
    }
    public class CreatePostFailureResponse : CreatePostCommandResponse
    {
        public string Message { get; set; }
    }
}
