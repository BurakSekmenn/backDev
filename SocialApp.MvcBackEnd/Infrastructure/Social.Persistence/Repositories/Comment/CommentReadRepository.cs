using Social.Application.Repositories.Comment;
using Social.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Persistence.Repositories.Comment
{
    public class CommentReadRepository : ReadRepository<Domain.Entities.Comment>, ICommentReadRepository
    {
        public CommentReadRepository(SocialAppContext context) : base(context)
        {
        }
    }

}
