using MediatR;
using Social.Application.Repositories.Image;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Commands.Image.UploadImage
{
    public class UploadImageCommandHandler : IRequestHandler<UploadImageCommandRequest, UploadImageCommandResponse>
    {
        private readonly IImageWriteRepository _imageWriteRepository;

        public UploadImageCommandHandler(IImageWriteRepository imageWriteRepository)
        {
            _imageWriteRepository = imageWriteRepository;
        }

        public async Task<UploadImageCommandResponse> Handle(UploadImageCommandRequest request, CancellationToken cancellationToken)
        {
            var fileurl = await _imageWriteRepository.SaveFileAsyn(request.file);
            var response = new UploadImageCommandResponse
            {
                ImageUrl = fileurl
            };
            return response;

        }
    }

}
