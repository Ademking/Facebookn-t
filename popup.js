/*


facebookn't est desactivé
        status = false
        text = "TURN ON"
        class = "btn-secondary"

facebookn't est activé
        status = true
        text = "TURN OFF"
        class = "btn-tertiary"


*/



function myFunction(url) {
    var tarea = url;
    var tarea_regex = /(?:https:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/;
    if(tarea_regex.test(String(tarea)) == true)
    {
        console.log("This is Facebook!!!!!!!!!!!!");
    }
}







document.addEventListener('DOMContentLoaded', function() {


    chrome.tabs.getSelected(null, function(tab) {
        myFunction(tab.url);
    });




















    // 1. Make Gloabal status Variable
    var status;

    // 2. Get Status Stored in Storage API
    chrome.storage.sync.get(['status', 'turnOnTime', 'limitTime'], function(items) {

        console.log('Etat Status : ', items['status']);

        // Check timing
        var limitTimeInSec = items['limitTime'] * 60;
        var timePassedInSec = (Date.now() - items['turnOnTime']) / 1000;
        if (timePassedInSec < limitTimeInSec) {
            $('#btn-toggle').css('display', 'none');
        } else {
            $('#btn-toggle').css('display', 'block');
        }

        status = items['status'];

        // 3. Change Button Text Depending on Status
        if (status == false ) {
            $('#btn-toggle').addClass('btn-secondary');
            $('#btn-toggle').html(`<i class="fas fa-play"></i>&nbsp;&nbsp;Turn On`);

            // Show the time form
            $('.time-form-container').css('display', 'inline');

            chrome.browserAction.setBadgeText({
                'text': '' //an empty string displays nothing!
            });

            $('#status_text').text("Disabled");
       }
    
       else {
            $('#btn-toggle').addClass('btn-tertiary');
            $('#btn-toggle').html(`<i class="fas fa-stop"></i>&nbsp;&nbsp;Turn OFF`);
            $('#status_text').text("Enabled");

            // Hide time form
            $('.time-form-container').css('display', 'none');

            chrome.browserAction.setBadgeBackgroundColor({color: "red"})
            chrome.browserAction.setBadgeText({text: "ON"}); 

       }
    
    });



 
  




    // 4. Handle Click Event on Button
    $("#btn-toggle").click(function() {
        //when status is False -> turn on 
        if (status == false) {
            // Hide the button
            $('#btn-toggle').css('display', 'none');
            
            // Change button style (to TURN OFF style)
            $('#btn-toggle').addClass('btn-tertiary').removeClass('btn-secondary');
            $('#btn-toggle').html(`<i class="fas fa-stop"></i>&nbsp;&nbsp;Turn OFF`);

            // Get limit time and hide the form
            var limitTime = $('#time-form').val();
            $('.time-form-container').css('display', 'none');

            // Change status
            $('#status_text').text("Enabled");
            status = true;

            chrome.browserAction.setBadgeBackgroundColor({color: "red"})
            chrome.browserAction.setBadgeText({text: "ON"});            

            // Save it To extension storage API.
            chrome.storage.sync.set({'status': true, 'turnOnTime': Date.now(), 'limitTime': limitTime}, function() {
                console.log('Status = True - Settings saved');
                console.log('Turn On Time saved');
                console.log('Limit Time saved');
            });
        
        }
        else {

            //when status is True -> turn OFF 

            // Change button style (to TURN ON style)
            $('#btn-toggle').addClass('btn-secondary').removeClass('btn-tertiary');
            $('#btn-toggle').html(`<i class="fas fa-play"></i>&nbsp;&nbsp;Turn On`);

            // Show the time form
            $('.time-form-container').css('display', 'inline');

            // Change status
            $('#status_text').text("Disabled");
            status = false;
            chrome.browserAction.setBadgeText({
                'text': '' //an empty string displays nothing!
            });
             // Save it To extension storage API.
             chrome.storage.sync.set({'status': false}, function() {
                console.log('Status = False - Settings saved');
            });
        }








     });
});