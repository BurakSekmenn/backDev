using MediatR;
using Microsoft.EntityFrameworkCore;
using Social.Application.Repositories.Post;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Queries.Post.GetByIdPost
{
    public class GetByIdPostQueryHandler : IRequestHandler<GetByIdPostQueryRequest, GetByIdPostQueryResponse>
    {
        private readonly IPostReadRepository _postReadRepository;

        public GetByIdPostQueryHandler(IPostReadRepository postReadRepository)
        {
            _postReadRepository = postReadRepository;
        }

        public async Task<GetByIdPostQueryResponse> Handle(GetByIdPostQueryRequest request, CancellationToken cancellationToken)
        {

            var posts = _postReadRepository.GetAll(false)
               .OrderByDescending(p => p.CreatedAt) // Verilerin sıralı gelmesi için
               .Where(p=>p.Id == Guid.Parse(request.postId))
               .Include(p => p.User)
               .Include(p => p.PostLikes)
               .Select(p => new
               {
                   p.Id,
                   p.body,
                   p.file,
                   p.CreatedAt,
                   p.UpdatedDate,
                   UserName = p.User.UserName,
                   UserPhoto = p.User.Image,
                   LikeCount = p.PostLikes.Count,

               })
               .ToList();
            return new GetByIdPostQueryResponse
            {
                Post = posts
            };
        }
    }
}
