using MediatR;
using Microsoft.EntityFrameworkCore;
using Social.Application.Repositories.Comment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Queries.Comment
{
    public class GetByIdCommentQueryHandler : IRequestHandler<GetByIdCommentQueryRequest, GetByIdCommentQueryResponse>
    {
        private readonly ICommentReadRepository _commentReadRepository;

        public GetByIdCommentQueryHandler(ICommentReadRepository commentReadRepository)
        {
            _commentReadRepository = commentReadRepository;
        }

        public Task<GetByIdCommentQueryResponse> Handle(GetByIdCommentQueryRequest request, CancellationToken cancellationToken)
        {
            var postids = Guid.Parse(request.PostId);
            var count = _commentReadRepository.GetAll(false).Where(x=>x.postId == postids).Count();

            var data = _commentReadRepository.GetAll(false)
                .Where(x => x.postId == postids)
                .Include(p => p.User)
                .Select(p => new
                {
                    p.content,
                    p.CreatedAt,
                    UserName = p.User.UserName,
                    UserPhoto = p.User.Image,
                    
                }).ToList();
            return Task.FromResult(new GetByIdCommentQueryResponse
            {
                Comment = data,
                CommentCount = count
            });

        }
    }
    
}
