using Social.Application.Repositories;
using Social.Domain.Entities.Common;
using Social.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Persistence.Repositories
{
    public class WriteRepository<T> : IWriteRepository<T> where T : BaseEntity
    {
        private readonly SocialAppContext _context;

        public WriteRepository(SocialAppContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context)); ;
        }

        public DbSet<T> Table => _context.Set<T>();

        public async Task<bool> AddAsync(T datas)
        {
          EntityEntry<T> entityEntry = await Table.AddAsync(datas);
          return entityEntry.State == EntityState.Added; // enum turunde EntityState.Added
        }

        public async Task<bool> AddRangeAsync(List<T> datas)
        {
            await Table.AddRangeAsync(datas);
            return true;
        }

        public bool Remove(T Model)
        {
           EntityEntry<T> entityEntry = Table.Remove(Model);
            return entityEntry.State == EntityState.Deleted;
        }
        public bool RemoveRange(List<T> datas)
        {
            Table.RemoveRange(datas);
            return true;
        }
        public async Task<bool> Remove(string id)
        {
           T model = await Table.FirstOrDefaultAsync(data => data.Id == Guid.Parse(id));
            return Remove(model);
        }

        public bool Update(T Model)
        {
            EntityEntry entityEntry = Table.Update(Model);
            return entityEntry.State == EntityState.Modified;
        }
        public async Task<bool> SaveAsync()
        {
      
                await _context.SaveChangesAsync();
            return true;
        }

        
    }
}
