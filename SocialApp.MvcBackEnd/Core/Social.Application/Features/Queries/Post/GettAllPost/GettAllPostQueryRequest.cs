using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Queries.Post.GettAllPost
{
    public class GettAllPostQueryRequest : IRequest<GettAllPostQueryResponse>
    {
        public int Page { get; set; } 
        public int Size { get; set; } 
    }
}
