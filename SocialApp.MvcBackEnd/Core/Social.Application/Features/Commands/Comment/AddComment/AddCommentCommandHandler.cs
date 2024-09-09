using MediatR;
using Microsoft.AspNetCore.Identity;
using Social.Application.Repositories.Comment;
using Social.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Commands.Comment.AddComment
{
    public class AddCommentCommandHandler : IRequestHandler<AddCommentCommandRequst, AddCommentCommandResponse>
    {
        private readonly ICommentWriteRepostiory _commentWriteRepostiory;
        private readonly UserManager<Domain.Entities.Identity.AppUser> _userManager;

        public AddCommentCommandHandler(ICommentWriteRepostiory commentWriteRepostiory, UserManager<Domain.Entities.Identity.AppUser> userManager)
        {
            _commentWriteRepostiory = commentWriteRepostiory;
            _userManager = userManager;
        }

        public async Task<AddCommentCommandResponse> Handle(AddCommentCommandRequst request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByNameAsync(request.userName);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            var postid =Guid.Parse(request.postID);
            var comment = new Domain.Entities.Comment
            {
                content = request.content,
                postId = postid,
                userId = user.Id
            };
            await _commentWriteRepostiory.AddAsync(comment);
            var result = await _commentWriteRepostiory.SaveAsync();
            if (result)
            {
                return new AddCommentCommandResponse { isSuccess = true, Message = "Comment added successfully" };
            }
          
            return new AddCommentCommandResponse { isSuccess = false, Message = "Comment could not be added" };
        }
    }
}
