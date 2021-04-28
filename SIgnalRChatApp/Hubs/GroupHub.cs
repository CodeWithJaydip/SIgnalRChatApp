using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SIgnalRChatApp.Hubs
{
    public class GroupHub:Hub
    {
        public Task JoinGroup(string groupName)
        {
            return Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }

        public async Task SendMessage(string sender,string message)
        {
            await Clients.All.SendAsync("SendMessage", sender, message);
        }
        public Task SendMessageToGroup(string groupname,string sender,string message)
        {
            return Clients.Group(groupname).SendAsync("SendMessage", sender, message);
        }
    }
}
