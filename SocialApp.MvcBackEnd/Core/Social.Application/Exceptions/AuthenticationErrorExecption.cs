using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Exceptions
{
    public class AuthenticationErrorExecption : Exception
    {
        public AuthenticationErrorExecption() : base("Kimlik Doğrulama Hatası !")
        {
        }

        public AuthenticationErrorExecption(string? message) : base(message)
        {
        }

        public AuthenticationErrorExecption(string? message, Exception? innerException) : base(message, innerException)
        {
        }
    }
}
