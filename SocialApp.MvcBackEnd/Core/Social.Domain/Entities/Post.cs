using Social.Domain.Entities.Common;
using Social.Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Domain.Entities
{
    public class Post : BaseEntity
    {
        public string body { get; set; }
        public string file { get; set; }

        public string UserId { get; set; }
        public AppUser User { get; set; }
        public ICollection<PostLike> PostLikes { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}
