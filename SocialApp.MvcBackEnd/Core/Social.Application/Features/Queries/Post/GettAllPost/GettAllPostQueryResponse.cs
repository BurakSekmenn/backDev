﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Social.Application.Features.Queries.Post.GettAllPost
{
    public class GettAllPostQueryResponse
    {
        public int PostCount { get; set; }
 
        public object Posts { get; set; }
        public int currentPage { get; set; }
    }
}
