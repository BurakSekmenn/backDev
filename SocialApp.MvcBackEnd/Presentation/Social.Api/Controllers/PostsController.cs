using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Social.Application.Features.Commands.Image.UploadImage;
using Social.Application.Features.Commands.Image.UploadPostImage;
using Social.Application.Features.Commands.Post.CreatePost;
using Social.Application.Features.Queries.Post.GetByIdPost;
using Social.Application.Features.Queries.Post.GetByUserIdPost;
using Social.Application.Features.Queries.Post.GettAllPost;

namespace Social.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        readonly IMediator _mediator;

        public PostsController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreatePostCommandRequest createPostCommandRequest)
        {
            CreatePostCommandResponse response = await _mediator.Send(createPostCommandRequest);
            return Ok(response);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllPost([FromQuery] GettAllPostQueryRequest gettAllPostQueryRequest)
        {
            GettAllPostQueryResponse response = await _mediator.Send(gettAllPostQueryRequest);
            return Ok(response);
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> GetByUserId([FromQuery] GetByUserIdPostQueryRequest getByUserIdPostQueryRequest)
        {
            GetByUserIdPostQueryResponse response = await _mediator.Send(getByUserIdPostQueryRequest);
            return Ok(response);
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> GetByIdPost([FromQuery] GetByIdPostQueryRequest getByIdPostQueryRequest)
        {
            GetByIdPostQueryResponse response = await _mediator.Send(getByIdPostQueryRequest);
            return Ok(response);
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile filem)
        {
            //UploadImageCommandRequest
            var command = new UploadPostImageCommandRequest
            {
                file = filem
            };
            UploadPostImageCommandResponse response = await _mediator.Send(command);
            if (response != null)
            {
                return Ok(new { ImageUrl = response.ImageUrl });
            }
            else
            {
                return BadRequest("Image upload failed");
            }
        }
    }
}
