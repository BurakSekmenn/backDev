using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Queries.Comment
{
    public class GetByIdCommentQueryResponse
    {
        public object Comment { get; set; }
        public int CommentCount { get; set; }
    }
}
