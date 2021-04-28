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
connection.on("UserConnected", function (connectionId) {
    var groupElement = document.getElementById('group');
    var element = document.createElement('option');
    element.text = connectionId;
    element.value = connectionId;
    groupElement.options.add(element);
})

connection.on("UserDisconnected", function (connectionId) {
    var groupElement = document.getElementById('group');
    for (i = 0; i < groupElement.length; i++) {
        if (groupElement.options[i].value == connectionId) {
            groupElement.remove(i);
        }
    }
})


connection.start().then(function () {

}).catch(function (err) {
    return console.error(err.toString());
})

document.getElementById('sendButton').addEventListener("click", function (event) {
    var user = document.getElementById('userInput').value;
    var msg = document.getElementById('messageInput').value
    var groupElement = document.getElementById('group');
    var groupValue = groupElement.options[groupElement.selectedIndex].value;
    
    if (groupValue === "MySelf" || groupValue === "All") {
        var method = groupValue === "All" ? "SendMessage" : "SendMessageMe";
        connection.invoke(method, user, msg).catch(function (err) {
            return console.error(err.toString());
        });
    }
    else if (groupValue === "PrivateGroup") {
        connection.invoke("SendMessageToGroup", "PrivateGroup",user, msg).catch(function (err) {
            return console.error(err.toString());
        });
    }

    
    else {
        connection.invoke("SendMessageToUser", groupValue,user,msg).catch(function (err) {
            return console.error(err.toString());

        })
    }
    
   
   
    
    event.preventDefault();
})

document.getElementById('joinGroup').addEventListener('click', function (event) {
    connection.invoke('JoinGroup', "PrivateGroup").catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();

})