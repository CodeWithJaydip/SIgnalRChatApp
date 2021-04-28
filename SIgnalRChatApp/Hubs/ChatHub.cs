using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;


namespace SIgnalRChatApp.Hubs
{
    public class ChatHub:Hub
    {
        public async Task SendMessage(string user,string message)
        {
            await Clients.All.SendAsync("RecieveMessage", user, message);
        }

        public async Task SendMessageMe(string user,string message)
        {
            await Clients.Caller.SendAsync("RecieveMessage", user, message);
        }

        public Task SendMessageToUser(string connectionId,string user, string message)
        {
           return Clients.Client(connectionId).SendAsync("RecieveMessage",user,message);
        }

        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendAsync("UserConnected", Context.ConnectionId);
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception ex)
        {
            await Clients.All.SendAsync("UserDisconnected", Context.ConnectionId);
            await base.OnDisconnectedAsync(ex);
        }
        public Task JoinGroup(string group)
        {
            return Groups.AddToGroupAsync(Context.ConnectionId, group);
        }
        public Task SendMessageToGroup(string group,string user, string message)
        {
            return Clients.Group(group).SendAsync("RecieveMessage",user,message);
        }
      
       
    }
}
