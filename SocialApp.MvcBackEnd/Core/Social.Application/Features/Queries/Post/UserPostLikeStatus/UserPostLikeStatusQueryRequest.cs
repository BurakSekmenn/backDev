using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Queries.Post.UserPostLikeStatus
{
    public class UserPostLikeStatusQueryRequest : IRequest<UserPostLikeStatusQueryResponse>
    {
        public string postId { get; set; }
        public string userName { get; set; }
    }
}
