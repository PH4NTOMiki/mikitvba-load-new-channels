var request = require('request'),fs = require('fs'),lastModified,lastTime,firstTime=1,times=[];

function requestIt(){request.head('https://webtvstream.bhtelecom.ba/client/thumbs/ftv.jpg?ts='+(+new Date()),gotIt);}
function gotIt(error,response){
	let thisModified=response.headers['last-modified'],currTime=+new Date();
	if(firstTime){
		firstTime=0;
		lastModified=thisModified;
		lastTime=+new Date(lastModified);
		console.log('firstTime: ', lastModified, ' miliseconds: ', lastTime);
	} else if(lastModified!==thisModified){
		times.push((currTime-lastTime)/1000);
		lastModified=thisModified;
		lastTime=currTime;
		console.log((times.length+1)+' time: ', times[times.length-1], ' avg: ', times.reduce((total,num)=>{return total+num})/times.length);
	}
}

requestIt();
setInterval(requestIt,1000);