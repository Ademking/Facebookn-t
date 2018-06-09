

// initiate Status to False
chrome.storage.sync.set({'status': false}, function() {
    console.log('Initiate Status to "false" -- bg.js Extension Start');
});

chrome.browserAction.setBadgeText({
    'text': '' //an empty string displays nothing!
});

    
var STATUS ;
var TAB_URL;



 // every time a tab Selected
 chrome.tabs.onUpdated.addListener(function() {

            chrome.storage.sync.get(['status'], function(items) {
                STATUS = items['status'];
                console.log("Status Now : " + STATUS);
                
                
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                    TAB_URL = tabs[0].url;
                    console.log("Active Tab URL : " + TAB_URL);



                    var tarea = TAB_URL;
                    var tarea_regex = /(https?:\/\/(.+?\.)?facebook\.com(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/g;
                    if (tarea_regex.test(String(tarea).toLowerCase()) == true && STATUS == true) {


                        console.log(tabs);
                        chrome.tabs.remove(tabs[0].id);
                        chrome.tabs.create({'url': chrome.extension.getURL('noface.html')});
                           
                       };
                    
                });




            });    
    

            



});



    
    








