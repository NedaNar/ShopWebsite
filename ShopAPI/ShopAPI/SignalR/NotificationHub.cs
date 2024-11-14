using Microsoft.AspNetCore.SignalR;

public class NotificationHub : Hub
{
    public async Task SendMessageToAdmin(string message)
    {
        await Clients.All.SendAsync("ReceiveNotification", message);
    }
}
