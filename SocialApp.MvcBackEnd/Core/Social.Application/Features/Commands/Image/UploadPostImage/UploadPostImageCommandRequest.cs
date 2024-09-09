using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Commands.Image.UploadPostImage
{
    public class UploadPostImageCommandRequest : IRequest<UploadPostImageCommandResponse>
    {
        public IFormFile file { get; set; }
    }
}
