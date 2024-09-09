using MediatR;
using Microsoft.AspNetCore.Identity;
using Social.Application.Repositories.Postlike;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Commands.PostLike.PostLikeRemove
{
    public class PostLikeRemoveCommandHandler : IRequestHandler<PostLikeRemoveCommandRequest, PostLikeRemoveCommandResponse>
    {
        private readonly IPostLikeWriteRepostiory _postLikeWriteRepostiory;
        private readonly IPostLikeReadRepostiory _postLikeReadRepostiory;
        private readonly UserManager<Domain.Entities.Identity.AppUser> _userManager;

        public PostLikeRemoveCommandHandler(IPostLikeWriteRepostiory postLikeWriteRepostiory, IPostLikeReadRepostiory postLikeReadRepostiory, UserManager<Domain.Entities.Identity.AppUser> userManager)
        {
            _postLikeWriteRepostiory = postLikeWriteRepostiory;
            _postLikeReadRepostiory = postLikeReadRepostiory;
            _userManager = userManager;
        }

        public async Task<PostLikeRemoveCommandResponse> Handle(PostLikeRemoveCommandRequest request, CancellationToken cancellationToken)
        {
            
            var userId = await _userManager.FindByNameAsync(request.userName);
            if (userId == null)
            {
                throw new Exception("User not found");
            }
            var postLike = await _postLikeReadRepostiory.GetPostLikeByUserAndPostAsync(userId.Id, request.postId);
            if (postLike == null)
            {
                throw new Exception("Post like not found");
            }
            _postLikeWriteRepostiory.Remove(postLike);
            await _postLikeWriteRepostiory.SaveAsync();
            return new PostLikeRemoveCommandResponse
            {
                message = "Post like removed successfully"
            };
        }
    }
}
