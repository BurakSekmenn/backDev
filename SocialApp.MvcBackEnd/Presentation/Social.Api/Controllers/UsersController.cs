using Social.Application.Features.Commands.AppUser.CreateUser;
using Social.Application.Features.Commands.AppUser.LoginUser;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Social.Application.Features.Queries.User.LogoutUser;
using Social.Application.Features.Commands.AppUser.UpdateUser;
using Social.Application.Features.Commands.Image.UploadImage;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Social.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        readonly IMediator _mediator;

        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> CreateUser(CreateUserCommandRequest createUserCommandRequest)
        {
           CreateUserCommandResponse response =  await _mediator.Send(createUserCommandRequest);
           return Ok(response);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Login(LoginUserCommandRequst loginUserCommandRequst)
        {
            LoginUserCommandResponse response = await _mediator.Send(loginUserCommandRequst);
            return Ok(response);
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> Logout(LogoutUserQueryRequest logoutUserQueryRequest)
        {
           
            LogoutUserQueryResponse response = await _mediator.Send(logoutUserQueryRequest);
            return Ok(response);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateUser(UpdateUserCommandRequest updateUserCommandRequest)
        {
            UpdateUserCommandResponse response = await _mediator.Send(updateUserCommandRequest);
            return Ok(response);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile filem)
        {
            var command = new UploadImageCommandRequest
            {
                file = filem
            };
            UploadImageCommandResponse response = await _mediator.Send(command);
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
