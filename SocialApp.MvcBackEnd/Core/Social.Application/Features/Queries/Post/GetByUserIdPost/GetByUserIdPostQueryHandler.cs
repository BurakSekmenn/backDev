using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Social.Application.Features.Queries.Post.GettAllPost;
using Social.Application.Repositories.Post;
using Social.Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Queries.Post.GetByUserIdPost
{
    public class GetByUserIdPostQueryHandler : IRequestHandler<GetByUserIdPostQueryRequest, GetByUserIdPostQueryResponse>
    {
        private readonly IPostReadRepository _postReadRepository;
        private readonly UserManager<Domain.Entities.Identity.AppUser>  _userManager;

        public GetByUserIdPostQueryHandler(IPostReadRepository postReadRepository, UserManager<AppUser> userManager)
        {
            _postReadRepository = postReadRepository;
            _userManager = userManager;
        }

        public async Task<GetByUserIdPostQueryResponse> Handle(GetByUserIdPostQueryRequest request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByNameAsync(request.userName);
            var postCount = _postReadRepository.GetAll(false).Where(x=>x.UserId== user!.Id ).Count();

            // Sayfalamayı düzgün yapmak için page 1'den başlamalı
            var currentPage = request.Page > 0 ? request.Page : 1;

            // Her sayfada gösterilecek kayıt sayısı request.Size ile belirleniyor
            var posts = _postReadRepository.GetAll(false)
                .Where(x=>x.UserId == user!.Id)
                .OrderByDescending(p => p.CreatedAt) // Verilerin sıralı gelmesi için
                .Skip((currentPage - 1) * request.Size) // Hangi sayfadan başlanacak
                .Take(request.Size) // Sayfadaki kayıt sayısı
                .Include(p => p.User)
                .Include(p => p.PostLikes)
                .Include(p => p.Comments)
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
                    CommentCount = p.Comments.Count
                })
                .ToList();
            var results = new GetByUserIdPostQueryResponse()
            {
                currentPage = currentPage,
                PostCount = postCount,
                Posts = posts
            };

            return results;
          
        }
    }
}
