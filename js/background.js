chrome.browserAction.setBadgeBackgroundColor({"color":"#999"});
chrome.storage.onChanged.addListener(setBadge);
function setBadge(){
    chrome.storage.sync.get("mode", function(data){
        var mode = data.mode;
        switch(mode){
            case "strict" : //Editing Mode
                toggleIcon(true);
                chrome.browserAction.setBadgeText({"text":"Edit"});
                break;
            case "adaptive" ://Condenser On
                toggleIcon(true);
                chrome.browserAction.setBadgeText({"text":"ON"});
                break;
            case "off" ://Condenser Off
                toggleIcon(false);
                chrome.browserAction.setBadgeText({"text":"OFF"});
                break;
        }
    });
}

function toggleIcon(on){
    if(on){
        chrome.browserAction.setIcon({
            "path":"icons/19.png"
        });
    } else {
        chrome.browserAction.setIcon({
            "path":"icons/19_off.png"
        });
    }
}

setBadge();