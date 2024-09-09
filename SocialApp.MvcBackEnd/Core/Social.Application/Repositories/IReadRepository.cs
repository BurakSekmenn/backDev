using Social.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Repositories
{
    public interface IReadRepository<T> : IRepository<T> where T : BaseEntity 
    {
        // Select Kullanacağımız metotlar burada olacak.
        IQueryable<T> GetAll(bool tracking = true); // Iqueryable ilgili veri tabanı sorgusunu oluşturur. // IEnumerable memoryde tutuar

        IQueryable<T> GetWhere(Expression<Func<T,bool>> method, bool tracking = true);

        Task<T> GetSingleAsync(Expression<Func<T, bool>> method, bool tracking = true);

        Task<T> GetByIdAsync(string id, bool tracking = true);

    }
}
