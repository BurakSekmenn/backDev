using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Social.Application.Repositories.Post;
using Social.Application.Repositories.Image;
using Social.Application.Features.Commands.Image.UploadImage;

namespace Social.Application.Features.Commands.Image.UploadPostImage
{
    public class UploadPostImageCommandHandler : IRequestHandler<UploadPostImageCommandRequest, UploadPostImageCommandResponse>
    {
        private readonly IImageWriteRepository _imageWriteRepository;

        public UploadPostImageCommandHandler(IImageWriteRepository imageWriteRepository)
        {
            _imageWriteRepository = imageWriteRepository;
        }

        public  async Task<UploadPostImageCommandResponse> Handle(UploadPostImageCommandRequest request, CancellationToken cancellationToken)
        {
            var fileurl = await _imageWriteRepository.SaveFileAsyn(request.file);
            var response = new UploadPostImageCommandResponse
            {
                ImageUrl = fileurl
            };
            return response;
        }
    }
}
