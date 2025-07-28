// using API.Data;
// using API.DTOs;
// using API.Entities;
// using API.Extensions;
// using API.Helpers;
// using API.Interfaces;
// using Microsoft.AspNetCore.Mvc;

// namespace API.Controllers;

// public class LikesController(UnitOfWork unitOfWork) : BaseApiController
// {
//     [HttpPost("{targetUserId:int}")]
//     public async Task<ActionResult> ToggleLike(int targetUserId)
//     {
//         var sourceUserId = User.GetUserId();

//         if (sourceUserId == targetUserId) return BadRequest("You cannot like yourself");

//         var existingLike = await unitOfWork.LikeRepository.GetUserLike(sourceUserId, targetUserId);

//         if (existingLike == null)
//         {
//             var like = new UserLike
//             {
//                 SourceUserId = sourceUserId,
//                 TargetUserId = targetUserId
//             };

//             unitOfWork.LikeRepository.AddLike(like);
//         }
//         else
//         {
//             unitOfWork.LikeRepository.DeleteLike(existingLike);
//         }

//         if (await unitOfWork.Complete()) return Ok();

//         return BadRequest("Failed to update like");
//     }

//     [HttpGet("list")]
//     public async Task<ActionResult<IEnumerable<int>>> GetCurrentUserLikeIds()
//     {
//         return Ok(await unitOfWork.LikeRepository.GetCurrentUserLikeIds(User.GetUserId()));
//     }

//     [HttpGet]
//     public async Task<ActionResult<IEnumerable<MemberDto>>> GetUserLikes([FromQuery]LikesParams likesParams)
//     {
//         likesParams.UserId = User.GetUserId();
//         var users = await unitOfWork.LikeRepository.GetUserLikes(likesParams);

//         Response.AddPaginationHeader(users);

//         return Ok(users);
//     }
// }
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class LikesController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;

    public LikesController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpPost("{targetUserId:int}")]
    public async Task<ActionResult> ToggleLike(int targetUserId)
    {
        var sourceUserId = User.GetUserId();

        if (sourceUserId == targetUserId) return BadRequest("You cannot like yourself");

        var existingLike = await _unitOfWork.LikeRepository.GetUserLike(sourceUserId, targetUserId);

        if (existingLike == null)
        {
            var like = new UserLike
            {
                SourceUserId = sourceUserId,
                TargetUserId = targetUserId
            };

            _unitOfWork.LikeRepository.AddLike(like);
        }
        else
        {
            _unitOfWork.LikeRepository.DeleteLike(existingLike);
        }

        if (await _unitOfWork.Complete()) return Ok();

        return BadRequest("Failed to update like");
    }

    [HttpGet("list")]
    public async Task<ActionResult<IEnumerable<int>>> GetCurrentUserLikeIds()
    {
        return Ok(await _unitOfWork.LikeRepository.GetCurrentUserLikeIds(User.GetUserId()));
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUserLikes([FromQuery] LikesParams likesParams)
    {
        likesParams.UserId = User.GetUserId();
        var users = await _unitOfWork.LikeRepository.GetUserLikes(likesParams);

        Response.AddPaginationHeader(users);

        return Ok(users);
    }
}
