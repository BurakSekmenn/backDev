using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Social.Application.Features.Commands.PostLike.PostLikeAdd;
using Social.Application.Features.Commands.PostLike.PostLikeRemove;
using Social.Application.Features.Queries.Post.UserPostLikeStatus;

namespace Social.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostLikesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public PostLikesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> LikePost([FromBody] PostLikeAddCommandRequest likeAddCommandRequest )
        {
            PostLikeAddCommandResponse response = await _mediator.Send(likeAddCommandRequest);
            return Ok(response);
        }
        [HttpDelete]
        public async Task<IActionResult> RemoveLike([FromBody] PostLikeRemoveCommandRequest likeRemoveCommandRequest)
        {
            PostLikeRemoveCommandResponse response = await _mediator.Send(likeRemoveCommandRequest);
            return Ok(response);
        }
        [HttpGet]
        public async Task<IActionResult> GetUserPostLikeStatus([FromQuery] UserPostLikeStatusQueryRequest userPostLikeStatusQueryRequest)
        {
            UserPostLikeStatusQueryResponse response = await _mediator.Send(userPostLikeStatusQueryRequest);
            return Ok(response);
        }
    }
}
