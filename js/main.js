/*Created By: Ashris Choudhury.
Done as a self initiated project.
The file is open sourced and is well annotated to comprehend the intention of code.
Creative Common Share Alike Non-Commercial License.
*/

var vidid;
//id name of the YouTube Video
var ytPlayer;
//Handler sort of variable for Youtube
var $ = $ || undefined;
var playerLastState = -1;
var preset;
//The mode set by user
var starter=[];
//array that holds all timestamps to begin skipping from
var ender=[];
//array that holds all timestamps to terminate skipping to
var clok;
//Holder variable for parsed json file from Web
var ononce=true;
//A boolean used to execute the create button command only once
var butclick=0;
//COunter that counts number of time Cut has been used
var startitem;
//The variable that stores every odd indexed timestamp at which CUt was clicked
var enditem;
//Variable that stores even indexed timestamp at which CutNot was clicked
var text;
var name;
var type;
//variables used to download the final .txt file
var timejson = {
    slots: []
};
//the variable that stitches startitem and enditem together

//Request file from web
var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.open("get", "https://gist.githubusercontent.com/iashris/3d3a8427868adcd2cc7c/raw/bfdade8e6db28afea54d229502de249e6bb6ea5a/bull.json", true);
oReq.send();

function reqListener(e) {
clok = JSON.parse(this.responseText);
}


function init(){
	//This function executes first.

    var ready = yt.player.getPlayerByElement("player-api").isReady();
    if(!ready){
        setTimeout(init, 100);
        return;
    }
	//Check if Player is ready, if not, restart after 0.1seconds

    // ytPlayer is ready for manipulation!!! Hooray!!!
   cacheElements();
}

function cacheElements(){
	//Set variables up
	//console.log("cache enter");
    ytPlayer = yt.player.getPlayerByElement("player-api");
	vidid=ytPlayer.getVideoData()['video_id'];
	//Video ID saved in Vidid
	preset=$("body").attr("ytskipper"); //The use mode
	if(preset=="a"){
		//preset codes: o for Condenser Off; a for Condenser On; s for Editing Mode
		//If Condenser is On, pause the video till all the arrays from online json file is parsed into arrays to begin usage
	ytPlayer.pauseVideo();}
}
function maker(callback){
	//A callback function here to execute the long process of array making occur before the skipping process begins.
	setTimeout(function(){
		preset=$("body").attr("ytskipper");
	if(preset=="a"){
		//console.log("Array Generation Starts");
		//clok is the variable that holds the parsed json file
	console.log(clok.restrictedslots.length);
	for(i=0;i<clok.restrictedslots.length;i++){
		if(clok.restrictedslots[i].id==vidid){
			//If the required JSON object is found
			for(k=0;k<clok.restrictedslots[i].slots.length;k++){
				starter.push(clok.restrictedslots[i].slots[k].Start);
				ender.push(clok.restrictedslots[i].slots[k].End);
				
			}
			
			break;
		}
	}
	}
	callback && callback();
	//The function is given 5seconds to execute after which skipping begins. As online json file gets larger, this time will have to be increased.
	},5000); 
}
function change(){
	butclick++;
	//Function that executes when cut button is pressed in the editing mode.
	var btn=document.getElementById("myButton1");
	if (btn.value=="Saving"){
		btn.value= "Ignoring";
		btn.style.backgroundColor="#ff8c8c";
	}
     else{
		 btn.value="Saving";
		 btn.style.backgroundColor="#abe8ae";
	 }
	if(butclick%2==1){
		startitem=Math.floor(ytPlayer.getCurrentTime());
	}
	else{
		enditem=Math.floor(ytPlayer.getCurrentTime());
		timejson.slots.push({"Start":startitem,"End":enditem});
	}
	}
function download(){
	//Function to initiate when Export Button is pressed
	text=JSON.stringify(timejson);
	name='Condensed'.concat(vidid,'.txt');
	type='text/json';
	  var a = document.createElement("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}
function skipIntro(){
	//console.log("Hello ashris");
preset = $("body").attr("ytskipper"); 
	    if(preset == "o"){
        //Off
        return;
    } 
	if(preset=="s" && ononce==true/*editing mode*/){
		console.log("Button adding mode entered")
		ononce=false;
$('.ytp-right-controls') // Find the youtube right panel id
.append('<input type="button" onclick="change()" value="Saving" id="myButton1" style="vertical-align: top;height: 36px;"></input>');
$('.ytp-right-controls').append('<input type="button" onclick="download()" value="Export" id="myButton2" style="vertical-align: top;height: 36px;"></input>');  // Create the element  
	}

if(preset=="a"){
	/* if(ytPlayer.getPlayerState()==1 || ytPlayer.getPlayerState()==-1){  */
	var timenow=Math.floor(ytPlayer.getCurrentTime());
	if(starter.indexOf(timenow)!==-1){
		//if the integral value of current time matches the starting of a restricted slot
		ytPlayer.seekTo(ender[starter.indexOf(timenow)],true);
		//shift the time to end time of the same slot index
	}
		setTimeout(skipIntro,500); 
		//check whether current time falls in the restricted slot every half a second
	}
}


maker(function(){
	//start playing the paused video as soon as arrays are made.
	ytPlayer.playVideo();
skipIntro();});


function refresh(f) {
  if(document.readyState !== 'complete' || !window.yt || !$) {
    setTimeout('refresh(' + f + ')', 100);
  } else {
    $(document).ready(f);
  }
}
refresh(init); 

