using Social.Application.Repositories;
using Social.Domain.Entities.Identity;
using Social.Persistence.Contexts;
using Social.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Social.Application.Abstractions.Token;
using Social.Infrastructure.Services.Token;
using Social.Application.Repositories.Image;
using Social.Infrastructure.Services.Image;
using Social.Application.Repositories.Post;
using Social.Persistence.Repositories.Post;
using Social.Infrastructure.Services.PostImage;
using Social.Application.Repositories.Postlike;
using Social.Persistence.Repositories.PostLike;
using Social.Application.Repositories.Comment;
using Social.Persistence.Repositories.Comment;


namespace Social.Persistence
{
    public static class ServiceRegistration
    {
        public static void AddPersistanceServices(this IServiceCollection services) {



            services.AddDbContext<SocialAppContext>(options =>
            {
                options.UseMySql(Configuration.ConnectionString, new MySqlServerVersion(new Version(8, 0, 32)));
            }, ServiceLifetime.Scoped);


            services.AddIdentity<AppUser, AppRole>(options =>
            {
                options.User.RequireUniqueEmail = true;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequiredLength = 3;
                options.Password.RequiredUniqueChars = 0;
                
               

                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(3);
                options.Lockout.MaxFailedAccessAttempts = 3;
            })
            .AddDefaultTokenProviders()
            .AddEntityFrameworkStores<SocialAppContext>();






            services.AddScoped<IImageWriteRepository, ImageWriteRepostiroy>();

            services.AddScoped<IPostReadRepository,PostReadRepository>();
            services.AddScoped<IPostWriteRepository,PostWriteRepository>();
            services.AddScoped<IImageWriteRepository, PostImageWriteRepository>();
            services.AddScoped<IPostLikeReadRepostiory,PostLikeReadRepository>();
            services.AddScoped<IPostLikeWriteRepostiory,PostLikeWriteRepository>();

            services.AddScoped<ICommentReadRepository, CommentReadRepository>();
            services.AddScoped<ICommentWriteRepostiory, CommentWriteRepository>();

            services.AddScoped<ITokenHandler, TokenHandler>();
        }

    }
}
