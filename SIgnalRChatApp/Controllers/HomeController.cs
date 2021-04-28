using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using SIgnalRChatApp.Hubs;
using SIgnalRChatApp.Models;

namespace SIgnalRChatApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHubContext<ChatHub> _hubcontext;

        public HomeController(IHubContext<ChatHub> hubcontext)
        {
            _hubcontext = hubcontext;
        }

        [HttpGet]
        public IActionResult SendMessageFromController()
        {
            return View();
        }
        [HttpPost]
        public async Task< IActionResult> SendMessageFromController(string user,string message)
        {
           await _hubcontext.Clients.All.SendAsync("RecieveMessage", user, message);
            return RedirectToAction("index");
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }
        public IActionResult GroupChat()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
