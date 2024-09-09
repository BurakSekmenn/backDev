using MediatR;
using Microsoft.AspNetCore.Identity;
using Social.Application.Repositories.Postlike;
using Social.Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Queries.Post.UserPostLikeStatus
{
    public class UserPostLikeStatusQueryHandler : IRequestHandler<UserPostLikeStatusQueryRequest, UserPostLikeStatusQueryResponse>
    {
        private readonly IPostLikeReadRepostiory _postLikeReadRepostiory;
        private readonly UserManager<Domain.Entities.Identity.AppUser> _userManager;

        public UserPostLikeStatusQueryHandler(IPostLikeReadRepostiory postLikeReadRepostiory, UserManager<AppUser> userManager)
        {
            _postLikeReadRepostiory = postLikeReadRepostiory;
            _userManager = userManager;
        }

        public async Task<UserPostLikeStatusQueryResponse> Handle(UserPostLikeStatusQueryRequest request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByNameAsync(request.userName);

            var isLiked = _postLikeReadRepostiory.IsPostLikedByUser(request.postId, user.Id);
            return new UserPostLikeStatusQueryResponse { IsLiked = isLiked };
        }
    }
}
