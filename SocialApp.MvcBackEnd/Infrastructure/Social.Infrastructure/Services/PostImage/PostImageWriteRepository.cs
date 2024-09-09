using Microsoft.AspNetCore.Http;
using Social.Application.Repositories.Image;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Infrastructure.Services.PostImage
{
    public class PostImageWriteRepository : IImageWriteRepository
    {
        public async Task<string> SaveFileAsyn(IFormFile file)
        {
            // Dosyanın orijinal adını ve uzantısını al
            var originalFileName = Path.GetFileName(file.FileName);
            var guid = Guid.NewGuid().ToString();

            // Yeni dosya adını oluştur
            var fileExtension = Path.GetExtension(originalFileName);
            var fileName = $"{guid}{fileExtension}";

            // wwwroot/uploads klasörünü hedef olarak al
            var wwwRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "posts");
            var filePath = Path.Combine(wwwRootPath, fileName);

            // Klasörün var olup olmadığını kontrol et ve gerekirse oluştur
            if (!Directory.Exists(wwwRootPath))
            {
                Directory.CreateDirectory(wwwRootPath);
            }

            // Dosyayı kaydet
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Dosyanın URL'sini oluştur ve döndür
            var fileUrl = $"/posts/{fileName}";
            return fileUrl;
        }
    }
}
