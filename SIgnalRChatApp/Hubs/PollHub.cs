using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SIgnalRChatApp.Hubs
{
    public class PollHub:Hub
    {
        public async Task SendMessage(string name,string
            message,string frameworkId,string frameworkName)
        {
            await Clients.All.SendAsync("RecieveMessage", name, message, frameworkId, frameworkName);
        }
    }
}
