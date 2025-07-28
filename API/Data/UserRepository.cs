// using System;
// using API.DTOs;
// using API.Entities;
// using API.Helpers;
// using API.Interfaces;
// using AutoMapper;
// using AutoMapper.QueryableExtensions;
// using Microsoft.EntityFrameworkCore;

// namespace API.Data;

// public class UserRepository(DataContext context,IMapper mapper) : IUserRepository
// {
//     public async Task<PagedList<MemberDto>> GetMemberAsync(UserParams userParams)
//     {
//         var query = context.Users.AsQueryable();

//         query = query.Where(x => x.UserName != userParams.CurrentUsername);

//         if (userParams.Gender != null)
//         {
//             query = query.Where(x => x.Gender == userParams.Gender);
//         }

//         var minDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.MaxAge - 1));
//         var maxDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.MinAge));

//         query = query.Where(x => x.DateOfBirth >= minDob && x.DateOfBirth <= maxDob);

//         query = userParams.OrderBy switch
//         {
//             "created" => query.OrderByDescending(x => x.Created),
//             _ => query.OrderByDescending(x => x.LastActive)
//         };

//         return await PagedList<MemberDto>.CreateAsync(query.ProjectTo<MemberDto>(mapper.ConfigurationProvider),
//          userParams.PageNumber, userParams.PageSize);
//     }

//     public async Task<MemberDto?> GetMemberAsync(string username)
//     {
//         return await context.Users
//             .Where(x => x.UserName == username)
//             .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
//             .SingleOrDefaultAsync();
//     }
    
//     public async Task<AppUser?> GetUserByIdAsync(int id)
//     {
//         return await context.Users.FindAsync(id);
//     }

//     public async Task<IEnumerable<AppUser>> GetUSerAsync()
//     {
//         return await context.Users
//             .Include(x => x.Photos)
//             .ToListAsync();
//     }

//     public async Task<AppUser?> GetUserByUsernameAsync(string username)
//     {
//         return await context.Users
//             .Include(x => x.Photos) 
//             .SingleOrDefaultAsync(x => x.UserName == username);
//     }

//     public async Task<bool> SaveAllAsync()
//     {
//         return await context.SaveChangesAsync() > 0;
//     }

//     public void Update(AppUser user)
//     {
//         context.Entry(user).State = EntityState.Modified;
//     }
// }
using System;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class UserRepository(DataContext context, IMapper mapper) : IUserRepository
{
    public async Task<PagedList<MemberDto>> GetMemberAsync(UserParams userParams)
    {
        var query = context.Users
            .Include(u => u.Photos)
            .AsQueryable();

        query = query.Where(x => x.UserName != userParams.CurrentUsername);

        if (!string.IsNullOrEmpty(userParams.Gender))
        {
            query = query.Where(x => x.Gender == userParams.Gender);
        }

        var minDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.MaxAge - 1));
        var maxDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.MinAge));

        query = query.Where(x => x.DateOfBirth >= minDob && x.DateOfBirth <= maxDob);

        query = userParams.OrderBy switch
        {
            "created" => query.OrderByDescending(x => x.Created),
            _ => query.OrderByDescending(x => x.LastActive)
        };

        var users = await PagedList<AppUser>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);

        var members = users.Select(user => mapper.Map<MemberDto>(user)).ToList();

        return new PagedList<MemberDto>(members, users.TotalCount, userParams.PageNumber, userParams.PageSize);
    }

    public async Task<MemberDto?> GetMemberAsync(string username)
    {
        var user = await context.Users
            .Include(u => u.Photos)
            .SingleOrDefaultAsync(x => x.UserName == username);

        return user != null ? mapper.Map<MemberDto>(user) : null;
    }

    public async Task<AppUser?> GetUserByIdAsync(int id)
    {
        return await context.Users.FindAsync(id);
    }

    public async Task<IEnumerable<AppUser>> GetUSerAsync()
    {
        return await context.Users
            .Include(x => x.Photos)
            .ToListAsync();
    }

    public async Task<AppUser?> GetUserByUsernameAsync(string username)
    {
        return await context.Users
            .Include(x => x.Photos)
            .SingleOrDefaultAsync(x => x.UserName == username);
    }

    public void Update(AppUser user)
    {
        context.Entry(user).State = EntityState.Modified;
    }
}
