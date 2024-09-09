using Social.Application.Repositories.Post;
using Social.Domain.Entities;
using Social.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using P = Social.Domain.Entities;

namespace Social.Persistence.Repositories.Post
{
    public class PostReadRepository : ReadRepository<P.Post>, IPostReadRepository
    {
        public PostReadRepository(SocialAppContext context) : base(context)
        {
        }
    }

}
