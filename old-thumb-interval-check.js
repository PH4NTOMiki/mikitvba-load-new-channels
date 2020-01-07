var request = require('request'),fs = require('fs'),lastBody="",lastTime=0,requestTime=0,cnt=-1,
times=[120.112,120.184,120.039,119.986,125.197,115.202,120.137,120.363,117.878,120.409,120.336,120.323];

function requestIt(){/*requestTime=Date.now();*/request.get(Buffer.from('aHR0cHM6Ly93ZWJ0dnN0cmVhbS5iaHRlbGVjb20uYmEvY2xpZW50L3RodW1icy8=', 'base64').toString('binary') + 'ftv.jpg?ts=' + requestTime, gotIt);}
function gotIt(error,response,body){
	//console.log(body.length);//console.log(body===last);//console.log('------------------------');//lastBody=body;
	requestTime=new Date().getTime();
	
	if(cnt===-1){
		console.log("test check");
		lastBody=body;
		cnt++;
	} else if(cnt===0 && lastBody!=="" && body!==lastBody){
		console.log("started counting");
		lastBody=body;
		lastTime=requestTime;
		cnt++;
	} else if(cnt>0 && lastBody!=="" && body!==lastBody){
		times.push(((new Date().getTime())-lastTime)/1000);
		lastBody=body;
		lastTime=requestTime;
		console.log(cnt+" time: ", times[times.length-1], "avg: ", times.reduce((total,num)=>{return total+num})/times.length);
		cnt++;
	}
}

requestIt();
setInterval(requestIt,2500);