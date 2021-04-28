"use strict"

var connection = new signalR.HubConnectionBuilder().withUrl("/pollHub").build();
var chartBlock="\u2605"



connection.on('RecieveMessage', function (user, message,frameworkId,frameworkName) {
    
    
   
    if (user === "") {
        alert("Please enter user")
    }
    else {
        message = user + " Vote for " + frameworkName;
        var rating = $("#" + frameworkId + "Block").text();
        $("#" + frameworkId + "Block").text(rating + chartBlock);
        $('#messagesList').prepend("<li>" + message + "</li>")

    }
    
});

connection.start().then(function () {

}).catch(function (err) {
    return console.error(err.toString());
})

document.getElementById('pollButton').addEventListener("click", function (event) {
    var user = document.getElementById('name').value;
    var message = "";
    if ($('input:radio[name=framework]').is(':checked')) {
        var frameworkId = $('input:radio[name=framework]:checked').attr('id');
        var frameworkName = $('input:radio[name=framework]:checked').attr('value');
        connection.invoke('SendMessage', user, message, frameworkId, frameworkName).catch(function (err) {
            return console.log(err.toString());

        })

    }
    else {
        return alert("No framework selected");
    }
    
   

  
    event.preventDefault();
})