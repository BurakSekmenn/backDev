using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Social.Application.Features.Commands.Comment.AddComment;
using Social.Application.Features.Queries.Comment;
using Social.Application.Features.Queries.Post.UserPostLikeStatus;

namespace Social.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CommentsController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> CreateComment([FromBody] AddCommentCommandRequst addCommentCommandRequst)
        {
            var result = await _mediator.Send(addCommentCommandRequst);
            return Ok(result);
        }
        [HttpGet]
        public async Task<IActionResult> GetPostCommen([FromQuery] GetByIdCommentQueryRequest getByIdCommentQueryRequest)
        {
            var result = await _mediator.Send(getByIdCommentQueryRequest);
            return Ok(result);
        }
    }
}
