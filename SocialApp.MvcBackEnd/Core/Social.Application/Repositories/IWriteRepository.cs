using Social.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Repositories
{
    public interface IWriteRepository<T> : IRepository<T> where T : BaseEntity
    {
        Task<bool> AddAsync(T model);
        Task<bool> AddRangeAsync(List<T> datas);

        bool Remove(T Model);

        bool RemoveRange(List<T> datas);

        Task<bool> Remove(string id);

        bool Update(T Model);

        Task<bool> SaveAsync();

    }
}
