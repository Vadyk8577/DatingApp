// using System;
// using Microsoft.AspNetCore.Mvc;

// namespace API.Controllers;

// public class FallBackController : Controller
// {
//     public ActionResult Index()
//     {
        

//         return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "index.html"), "text/HTML");
//     }
// }
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace API.Controllers
{
    public class FallBackController : Controller
    {
        private readonly IWebHostEnvironment _env;

        public FallBackController(IWebHostEnvironment env)
        {
            _env = env;
        }

        public ActionResult Index()
        {
            var path = Path.Combine(_env.WebRootPath, "index.html");
            return PhysicalFile(path, "text/html");
        }
    }
}

