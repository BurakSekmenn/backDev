using Microsoft.AspNetCore.Identity;
using Social.Domain.Entities.Common;
using Social.Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Domain.Entities
{
    public class PostLike : BaseEntity
    {
        public string UserId { get; set; }
        public Guid PostId { get; set; }
        public AppUser User { get; set; }
        public Post Post { get; set; }


    }
}
