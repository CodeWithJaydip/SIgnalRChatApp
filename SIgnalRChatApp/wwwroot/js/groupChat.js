"use strict"

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();



connection.on('RecieveMessage', function (user, message) {
    
    
    var msg = message.replace(/&/g, "&amp").replace(/</g, "&lt").replace(/>/g, "&gt")
    if (user === "" || msg === "") {
        alert("Please enter field")
    }
    else {
        var encodedMsg = user + " says " + msg;
        var li = document.createElement("li");
        li.textContent = encodedMsg;
        document.getElementById('messagesList').appendChild(li);
    }
    
});


connection.start().then(function () {

}).catch(function (err) {
    return console.error(err.toString());
})

document.getElementById('sendButton').addEventListener("click", function (event) {
    var user = document.getElementById('userInput').value;
    var msg = document.getElementById('messageInput').value
   
   
    connection.invoke("SendMessage", user, msg).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
})