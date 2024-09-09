﻿using MediatR;
using Microsoft.EntityFrameworkCore;
using Social.Application.Repositories.Post;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Queries.Post.GettAllPost
{
    public class GettAllPostQueryHandler : IRequestHandler<GettAllPostQueryRequest, GettAllPostQueryResponse>
    {
        private readonly IPostReadRepository _postReadRepository;

        public GettAllPostQueryHandler(IPostReadRepository postReadRepository)
        {
            _postReadRepository = postReadRepository;
        }

        public Task<GettAllPostQueryResponse> Handle(GettAllPostQueryRequest request, CancellationToken cancellationToken)
        {
            var postCount = _postReadRepository.GetAll(false).Count();

            // Sayfalamayı düzgün yapmak için page 1'den başlamalı
            var currentPage = request.Page > 0 ? request.Page : 1;

            // Her sayfada gösterilecek kayıt sayısı request.Size ile belirleniyor
            var posts = _postReadRepository.GetAll(false)
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

            return Task.FromResult(new GettAllPostQueryResponse
            {
                PostCount = postCount,
                Posts = posts,
                currentPage = currentPage
            });

        }
    }
}
