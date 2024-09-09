using Social.Application.Abstractions.Token;
using Social.Application.Dtos;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Infrastructure.Services.Token
{
    public class TokenHandler : ITokenHandler
    {
        readonly IConfiguration _configuration;

        public TokenHandler(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public TokenConfig CreateAccesToken(int minute)
        {
            Application.Dtos.TokenConfig token = new();

            // Security keyin simetriğini alıyoruz.
            SymmetricSecurityKey securityKey = new(Encoding.UTF8.GetBytes(_configuration["Token:SecurityKey"]));// security keyi alıyorum

            // Şifrelenmiş kimliği oluşturuyoruz

            SigningCredentials signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256); // token burada oluşturuyoruz


            // Oluşturacak token ayarlarını veriyoruz

            token.Expiration = DateTime.Now.AddMinutes(minute);
            JwtSecurityToken securityToken = new(
                audience: _configuration["Token:Audience"],
                issuer: _configuration["Token:Issuer"],
                expires: token.Expiration,
                notBefore: DateTime.Now, // üretlidiği an devreye girer
                signingCredentials: signingCredentials
                );
            // Oluşturulken ve kontrol edilirlen aynı değerleri vereceksin bu 

            // token oluşturucu sınıfından bir örnek alalım

            JwtSecurityTokenHandler tokenHandler = new();
            token.AccesToken = tokenHandler.WriteToken(securityToken);
            return token;

        }
    }
}
