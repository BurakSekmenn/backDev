using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using P = Social.Domain.Entities;

namespace Social.Application.Repositories.Post
{
    public interface IPostWriteRepository : IWriteRepository<P.Post>
    {
    }
}
