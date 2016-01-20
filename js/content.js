var j = document.createElement('script');
j.src = chrome.extension.getURL('js/jquery-2.1.3.min.js');
(document.head || document.documentElement).appendChild(j);
var s = document.createElement('script');
s.src = chrome.extension.getURL('js/main.js');
(document.head || document.documentElement).appendChild(s);

var body = $("body");

function setMode(mode){
    body.attr("ytSkipper",mode);
    
}

function getSettings(){
    chrome.storage.sync.get(["mode"],function(data){
        var mode = data.mode.slice(0,1) || "adaptive";
        setMode(mode);
    });
}

getSettings();
chrome.storage.onChanged.addListener(getSettings);