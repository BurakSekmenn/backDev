using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Queries.Post.GetByIdPost
{
    public class GetByIdPostQueryRequest : IRequest<GetByIdPostQueryResponse>
    {
        public string postId { get; set; }
    }
   
}
