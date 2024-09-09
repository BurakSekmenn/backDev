using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Queries.Comment
{
    public class GetByIdCommentQueryRequest : IRequest<GetByIdCommentQueryResponse>
    {
        public string PostId { get; set; }
    }
    
}
