using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Exceptions
{
    public class UserCreateException : Exception
    {
        public UserCreateException()
        {
        }

        public UserCreateException(string? message) : base(message)
        {
        }

        public UserCreateException(string? message, Exception? innerException) : base(message, innerException)
        {
        }

        protected UserCreateException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
