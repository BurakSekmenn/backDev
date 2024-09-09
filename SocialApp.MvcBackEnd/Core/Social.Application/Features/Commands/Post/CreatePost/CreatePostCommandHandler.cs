using MediatR;
using Microsoft.AspNetCore.Identity;
using Social.Application.Repositories.Post;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using P = Social.Domain.Entities;

namespace Social.Application.Features.Commands.Post.CreatePost
{
    public class CreatePostCommandHandler : IRequestHandler<CreatePostCommandRequest, CreatePostCommandResponse>
    {
        private readonly IPostWriteRepository _postWriteRepository;
        private readonly UserManager<P.Identity.AppUser> _userManager;

        public CreatePostCommandHandler(IPostWriteRepository postWriteRepository, UserManager<P.Identity.AppUser> userManager)
        {
            _postWriteRepository = postWriteRepository;
            _userManager = userManager;
        }

        public async Task<CreatePostCommandResponse> Handle(CreatePostCommandRequest request, CancellationToken cancellationToken)
        {
            var getUserıd = await _userManager.FindByNameAsync(request.userName);
            
            var post = new P.Post
            {
                body = request.body,
                file = request.file,
                UserId = getUserıd.Id
            };
            await _postWriteRepository.AddAsync(post);
            var result =  await _postWriteRepository.SaveAsync();
            if (result)
            {
                return new CreatePostSuccessResponse { IsSuccess = true, Message = "Post created successfully" };
            }
            return new CreatePostFailureResponse { IsSuccess = false, Message = "Post could not be created" };
        }
    }
}
