using MediatR;
using Microsoft.AspNetCore.Identity;
using Social.Application.Repositories.Post;
using Social.Application.Repositories.Postlike;
using Social.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Commands.PostLike.PostLikeAdd
{
    public class PostLikeAddCommandHandler : IRequestHandler<PostLikeAddCommandRequest, PostLikeAddCommandResponse>
    {
        private readonly IPostLikeWriteRepostiory _postLikeWriteRepostiory;
        private readonly IPostLikeReadRepostiory _postLikeReadRepostiory;
        private readonly UserManager<Domain.Entities.Identity.AppUser> _userManager;

        public PostLikeAddCommandHandler(IPostLikeWriteRepostiory postLikeWriteRepostiory, IPostLikeReadRepostiory postLikeReadRepostiory, UserManager<Domain.Entities.Identity.AppUser> userManager)
        {
            _postLikeWriteRepostiory = postLikeWriteRepostiory;
            _postLikeReadRepostiory = postLikeReadRepostiory;
            _userManager = userManager;
        }

        public async Task<PostLikeAddCommandResponse> Handle(PostLikeAddCommandRequest request, CancellationToken cancellationToken)
        {
            var userID = await _userManager.FindByNameAsync(request.userName);
            if (userID == null)
            {
                throw new Exception("User not found");
            }
            var GuidPostId = Guid.Parse(request.postId);

            var existingLikeStatus = _postLikeReadRepostiory.IsPostLikedByUser(request.postId, userID.Id); // beğenimi var mı yok mu kontrol et
            var postLike = await _postLikeReadRepostiory.GetPostLikeByUserAndPostAsync(userID.Id, request.postId);

            if(existingLikeStatus == true)
            {
                _postLikeWriteRepostiory.Remove(postLike);
                await _postLikeWriteRepostiory.SaveAsync();

                return new PostLikeAddCommandResponse
                {
                    Message = "Post unliked successfully",
                    isSuccess = true
                };
            }
            else
            {
                await _postLikeWriteRepostiory.AddAsync(new()
                {
                    PostId = GuidPostId,
                    UserId = userID.Id
                });
                await _postLikeWriteRepostiory.SaveAsync();
                return new PostLikeAddCommandResponse
                {
                    Message = "Post liked successfully",
                    isSuccess = true
                };
            }




            
            
        }
    }
}
