using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Queries.Post.GetByUserIdPost
{
    public class GetByUserIdPostQueryRequest : IRequest<GetByUserIdPostQueryResponse>
    {
        public string userName { get; set; }
        public int Page { get; set; }
        public int Size { get; set; }
    }
}
