using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Dtos
{
    public class TokenConfig
    {
        public string AccesToken { get;set; }
        public DateTime Expiration { get; set; }
    }
}
