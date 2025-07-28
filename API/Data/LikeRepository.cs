// using System;
// using API.DTOs;
// using API.Entities;
// using API.Helpers;
// using API.Interfaces;
// using AutoMapper;
// using AutoMapper.QueryableExtensions;
// using Microsoft.EntityFrameworkCore;

// namespace API.Data;

// public class LikeRepository(DataContext context, IMapper mapper) : ILikeRepository
// {
//     public void AddLike(UserLike like)
//     {
//         context.Likes.Add(like);
//     }

//     public void DeleteLike(UserLike like)
//     {
//         context.Likes.Remove(like);
//     }

//     public async Task<IEnumerable<int>> GetCurrentUserLikeIds(int currentUserId)
//     {
//         return await context.Likes
//              .Where(x => x.SourceUserId == currentUserId)
//              .Select(x => x.TargetUserId)
//              .ToListAsync();
//     }

//     public async Task<UserLike?> GetUserLike(int sourceUserId, int targetUserId)
//     {
//         return await context.Likes.FindAsync(sourceUserId, targetUserId);
//     }

//     public async Task<PagedList<MemberDto>> GetUserLikes(LikesParams likesParams)
//     {
//         var likes = context.Likes.AsQueryable();
//         IQueryable<MemberDto> query;

//         switch (likesParams.Predicate)
//         {
//             case "liked":
//                 query = likes
//                     .Where(x => x.SourceUserId == likesParams.UserId)
//                     .Select(x => x.TargetUser)
//                     .ProjectTo<MemberDto>(mapper.ConfigurationProvider);
//                 break;
//             case "likedBy":
//                 query = likes
//                     .Where(x => x.TargetUserId == likesParams.UserId)
//                     .Select(x => x.SourceUser)
//                     .ProjectTo<MemberDto>(mapper.ConfigurationProvider);
//                 break;

//             default:
//                 var likeIds = await GetCurrentUserLikeIds(likesParams.UserId);

//                 query = likes
//                     .Where(x => x.TargetUserId == likesParams.UserId && likeIds.Contains(x.SourceUserId))
//                     .Select(x => x.SourceUser)
//                     .ProjectTo<MemberDto>(mapper.ConfigurationProvider);
//                 break;
//         }

//         return await PagedList<MemberDto>.CreateAsync(query, likesParams.PageNumber, likesParams.PageSize);
//     }

//     public async Task<bool> SaveChanges()
//     {
//         return await context.SaveChangesAsync() > 0;
//     }
// }
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class LikeRepository(DataContext context, IMapper mapper) : ILikeRepository
    {
        public void AddLike(UserLike like)
        {
            context.Likes.Add(like);
        }

        public void DeleteLike(UserLike like)
        {
            context.Likes.Remove(like);
        }

        public async Task<IEnumerable<int>> GetCurrentUserLikeIds(int currentUserId)
        {
            return await context.Likes
                .Where(x => x.SourceUserId == currentUserId)
                .Select(x => x.TargetUserId)
                .ToListAsync();
        }

        public async Task<UserLike?> GetUserLike(int sourceUserId, int targetUserId)
        {
            return await context.Likes.FindAsync(sourceUserId, targetUserId);
        }

        public async Task<PagedList<MemberDto>> GetUserLikes(LikesParams likesParams)
        {
            IQueryable<AppUser> users;

            if (likesParams.Predicate == "liked")
            {
                var likedUserIds = await context.Likes
                    .Where(l => l.SourceUserId == likesParams.UserId)
                    .Select(l => l.TargetUserId)
                    .ToListAsync();

                users = context.Users
                    .Where(u => likedUserIds.Contains(u.Id));
            }
            else if (likesParams.Predicate == "likedBy")
            {
                var likedByUserIds = await context.Likes
                    .Where(l => l.TargetUserId == likesParams.UserId)
                    .Select(l => l.SourceUserId)
                    .ToListAsync();

                users = context.Users
                    .Where(u => likedByUserIds.Contains(u.Id));
            }
            else
            {
                users = context.Users.Where(u => false);

            }

            var query = users
                .Include(u => u.Photos)
                .OrderBy(u => u.UserName);

            var pagedUsers = await PagedList<AppUser>.CreateAsync(query, likesParams.PageNumber, likesParams.PageSize);

            var memberDtos = pagedUsers.Select(user => mapper.Map<MemberDto>(user)).ToList();

            return new PagedList<MemberDto>(
                memberDtos,
                pagedUsers.TotalCount,
                pagedUsers.CurrentPage,
                pagedUsers.PageSize
            );
        }
    }
}

