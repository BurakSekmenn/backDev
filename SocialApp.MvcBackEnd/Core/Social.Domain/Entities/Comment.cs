using Social.Domain.Entities.Common;
using Social.Domain.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Domain.Entities
{
    public class Comment : BaseEntity
    {
        public string content { get; set; }
        public Guid postId { get; set; }
        public string userId { get; set; }

        public AppUser User { get; set; }
        public Post Post { get; set; }


    }
}
