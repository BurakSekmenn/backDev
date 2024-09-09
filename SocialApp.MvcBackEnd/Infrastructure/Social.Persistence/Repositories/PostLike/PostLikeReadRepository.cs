using Microsoft.EntityFrameworkCore;
using Social.Application.Repositories.Postlike;
using Social.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Persistence.Repositories.PostLike
{
    public class PostLikeReadRepository : ReadRepository<Domain.Entities.PostLike>, IPostLikeReadRepostiory
    {
        private readonly SocialAppContext _context;
        public PostLikeReadRepository(SocialAppContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Domain.Entities.PostLike> GetPostLikeByUserAndPostAsync(string userId, string postId)
        {
            return await _context.PostLikes.FirstOrDefaultAsync(data => data.UserId == userId && data.PostId == Guid.Parse(postId));
        }

        public bool IsPostLikedByUser(string postId, string userId)
        {
           var result = _context.PostLikes.Any(pl => pl.PostId ==Guid.Parse(postId) && pl.UserId == userId);
           return result;
        }
    }
}
