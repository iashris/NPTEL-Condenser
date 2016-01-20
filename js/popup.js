var buttons;
var maxValue;

function init(){
    cacheElements();
    attachEvents();
    getSettings();
}
$('#marker').click(function() {
  if ($(this).is(':checked')) {
    $(this).siblings('label').html('Listening');
  } else {
    $(this).siblings('label').html('Ignoring');
  }
});
function cacheElements(){
    buttons = $(".menu > li > label");
    
}

function attachEvents(){
    buttons.on("click", onBtnClick);
    
}

function onBtnClick(){
    var name = $(this).attr("for");
    setSettings({
        "mode":name
    });
}


function getSettings(){
    var get = [
        "mode",
    ];
    chrome.storage.sync.get(get,gotSettings);
}

function gotSettings(data){
    s = data;
    //console.log(data.mode, data.intro, data.outro, data);
    if(!data.mode){
        s.mode = "adaptive";
        setSettings(s);
        checkOption(s);
    } else {
        checkOption(s);
    }
}

function setSettings(data){
    chrome.storage.sync.set(data,onSettingsSaved);
}

function onSettingsSaved(){
    console.log("settings saved.");
}

function checkOption(data){
    var name = data.mode;
    
    $("#"+name).prop('checked', true);
    
}

$(document).ready(init);