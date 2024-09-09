﻿using Social.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Repositories.Postlike
{
    public interface IPostLikeReadRepostiory : IReadRepository<PostLike>
    {
        Task<PostLike> GetPostLikeByUserAndPostAsync(string userId, string postId);
        public bool IsPostLikedByUser(string postId, string userId);


    }
}
