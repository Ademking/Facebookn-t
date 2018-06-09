
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
    chrome.storage.sync.get(['status'], function(items) {

        console.log('Etat Status : ', items['status']);

        status = items['status'];

        // 3. Change Button Text Depending on Status
        if (status == false ) {
            $('#btn-toggle').addClass('btn-secondary');
            $('#btn-toggle').html(`<i class="fas fa-play"></i>&nbsp;&nbsp;Turn On`);
            chrome.browserAction.setBadgeText({
                'text': '' //an empty string displays nothing!
            });
            $('#status_text').text("Disabled");
       }
    
       else {
            $('#btn-toggle').addClass('btn-tertiary');
            $('#btn-toggle').html(`<i class="fas fa-stop"></i>&nbsp;&nbsp;Turn OFF`);
            $('#status_text').text("Enabled");

            chrome.browserAction.setBadgeBackgroundColor({color: "red"})
            chrome.browserAction.setBadgeText({text: "ON"}); 

       }
    
    });



 
  




    // 4. Handle Click Event on Button
    $("#btn-toggle").click(function() {
        //when status is False -> turn on 
        if (status == false) {
            $('#btn-toggle').addClass('btn-tertiary').removeClass('btn-secondary');
           
            $('#btn-toggle').html(`<i class="fas fa-stop"></i>&nbsp;&nbsp;Turn OFF`);
            $('#status_text').text("Enabled");
            status = true;
            chrome.browserAction.setBadgeBackgroundColor({color: "red"})
            chrome.browserAction.setBadgeText({text: "ON"});            
            // Save it To extension storage API.
            chrome.storage.sync.set({'status': true}, function() {
                console.log('Status = True - Settings saved');
            });
        
        }
        else {

            //when status is True -> turn OFF 

            $('#btn-toggle').addClass('btn-secondary').removeClass('btn-tertiary');
            $('#btn-toggle').html(`<i class="fas fa-play"></i>&nbsp;&nbsp;Turn On`);
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