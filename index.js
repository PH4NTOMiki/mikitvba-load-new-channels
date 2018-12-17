var request = require('request'),fs = require('fs'),channels=[],title={},timeshift={},type={};

request.get('https://webtvstream.bhtelecom.ba/client/channels', (error, response, body) => {
	let feed=JSON.parse(body)["feed"],radioStart=feed.length;
	request.get('https://webtvstream.bhtelecom.ba/client/channels_cat_11', (error, response, body) => {
		feed=feed.concat(JSON.parse(body)["feed"]);
		for(let i=0,j=feed.length;i<j;i++){
		let c=feed[i],currch=c.ch;
		channels.push(currch);
		title[currch]=c.title;
		if(i<radioStart){
			timeshift[currch]=c.timeshift;if(c.cat=="4"){type[currch]="2";} else {type[currch]="1";}
		} else {
			type[currch]="3";
		}
		}
		
		fs.writeFile('JSON.json', JSON.stringify({channels:channels,title:title,timeshift:timeshift,type:type}), (err, data)=>{
		if(err)console.log("Unsuccessfully tried to write to a file, error: ", err);
		else console.log("Successfully loaded both JSONs and wrote to JSON file");
		});
		fs.writeFile('variables.json', 'var channels='+JSON.stringify(channels)+',title='+JSON.stringify(title)+',timeshift='+JSON.stringify(timeshift)+',type='+JSON.stringify(type),
		(err, data)=>{
		if(err)console.log("Unsuccessfully tried to write to a file, error: ", err);
		else console.log("Successfully loaded both JSONs and wrote to variables file");
		});
	});
});