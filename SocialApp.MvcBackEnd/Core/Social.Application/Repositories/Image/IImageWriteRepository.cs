using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Repositories.Image
{
    public interface IImageWriteRepository
    {
        Task<string> SaveFileAsyn(IFormFile file);
    }
}
