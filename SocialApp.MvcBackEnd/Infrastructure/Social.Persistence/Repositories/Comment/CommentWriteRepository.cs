using Social.Application.Repositories.Comment;
using Social.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Persistence.Repositories.Comment
{
    public class CommentWriteRepository : WriteRepository<Domain.Entities.Comment>, ICommentWriteRepostiory
    {
        public CommentWriteRepository(SocialAppContext context) : base(context)
        {
        }
    }
}
