using System;
using Microsoft.Build.Framework;

namespace API.DTOs;

public class RegisterDto
{
    [Required]
    public required string Username { get; set; }
    
    [Required]
    public required string Password { get; set; }
}
