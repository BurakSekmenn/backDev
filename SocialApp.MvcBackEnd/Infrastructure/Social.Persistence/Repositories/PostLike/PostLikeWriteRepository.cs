using Social.Application.Repositories;
using Social.Application.Repositories.Postlike;
using Social.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Persistence.Repositories.PostLike
{
    public class PostLikeWriteRepository : WriteRepository<Domain.Entities.PostLike>, IPostLikeWriteRepostiory
    {
        public PostLikeWriteRepository(SocialAppContext context) : base(context)
        {
        }
    }
}
