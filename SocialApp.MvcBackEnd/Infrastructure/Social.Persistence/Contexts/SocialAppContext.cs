using Social.Domain.Entities;
using Social.Domain.Entities.Common;
using Social.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Persistence.Contexts
{
    public class SocialAppContext : IdentityDbContext<AppUser, AppRole, string>
    {
        public SocialAppContext(DbContextOptions options) : base(options)
        {}
        public DbSet<Post> Posts { get; set; }
        public DbSet<PostLike> PostLikes { get; set; }

        public DbSet<Comment> Comments { get; set; }


        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            //ChangeTracker: Entityler üzerinden yapılan değişiklillerin ya da yeni eklenen verinin yakalanmasını sağlayan propertydir. Update edilen opersoyunlarda Track edilen verileri yakalayıp elde etmemizi sağlar. 
            var datas =ChangeTracker
                .Entries<BaseEntity>();
                
            foreach (var data in datas)
            {
                if (data.State == EntityState.Added)
                {
                    data.Entity.CreatedAt = DateTime.Now;
                }
                else if (data.State == EntityState.Modified)
                {
                    data.Entity.UpdatedDate = DateTime.Now;
                }
            }
            return await base.SaveChangesAsync(cancellationToken);
        }


    }
}
