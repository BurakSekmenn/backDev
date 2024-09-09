using Social.Application.Repositories;
using Social.Domain.Entities.Common;
using Social.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Social.Persistence.Repositories
{
    //base entity marker pattern olayından geliyor burası
    public class ReadRepository<T> : IReadRepository<T> where T : BaseEntity
    {
         readonly SocialAppContext _context; // IOC container belirleyeceğiz daha 

        public ReadRepository(SocialAppContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context)); ;
        }

        public DbSet<T> Table => _context.Set<T>();

        public IQueryable<T> GetAll(bool tracking = true)
        {
            var query = Table.AsQueryable();
            if (!tracking)
                query = query.AsNoTracking(); // gelecek olan data üzerinde değişiklik yapmamak için ve oluşabilecek performans sorunları için
            return query;
        }
        public IQueryable<T> GetWhere(Expression<Func<T, bool>> method, bool tracking = true)
        { 
           var query = Table.Where(method);
                if (!tracking)
                 query = query.AsNoTracking(); // gelecek olan data üzerinde değişiklik yapmamak için ve oluşabilecek performans sorunları için
                return query;
        }

        public async Task<T> GetSingleAsync(Expression<Func<T, bool>> method, bool tracking = true)
        {
            var query = Table.AsQueryable();
            if (!tracking)
                query = query.AsNoTracking(); // gelecek olan data üzerinde değişiklik yapmamak için ve oluşabilecek performans sorunları için
            return await query.FirstOrDefaultAsync(method);
        } 

        public async Task<T> GetByIdAsync(string id, bool tracking = true)
        {
            //return await Table.FirstOrDefaultAsync(data => data.Id == Guid.Parse(id));// desing pattern marker pattern destekliyorsa güzel bir yol
            var query = Table.AsQueryable();
            if (!tracking)
                query = query.AsNoTracking(); // gelecek olan data üzerinde değişiklik yapmamak için ve oluşabilecek performans sorunları için
            return await query.FirstOrDefaultAsync(data => data.Id == Guid.Parse(id));
        }

       

       
    }
}
