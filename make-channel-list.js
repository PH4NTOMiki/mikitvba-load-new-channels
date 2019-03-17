var request = require('request'),fs = require('fs'),channels=[],title={},timeshift={},type={};

request.get('https://webtvstream.bhtelecom.ba/client/channels', (error, response, body) => {
	let feed=JSON.parse(body)["feed"],radioStart=feed.length;
	console.log("Successfully loaded tv JSON, tv length and radioStart: ", radioStart);
	request.get('https://webtvstream.bhtelecom.ba/client/channels_cat_11', (error, response, body) => {
		feed=feed.concat(JSON.parse(body)["feed"]);
		console.log("Successfully loaded radio JSON, radio length: ",(feed.length-radioStart),", full length: ",feed.length);
		for(let i=0,j=feed.length;i<j;i++){
		let c=feed[i],currch=c.ch;
		channels.push(currch);
		title[currch]=c.title;
		/*if(i<radioStart){timeshift[currch]=c.timeshift;if(c.cat=="4"){type[currch]="2";} else {type[currch]="1";}} else {type[currch]="3";}*/
		i<radioStart?(timeshift[currch]=c.timeshift,type[currch]=(c.cat=="4")?"2":"1"):(type[currch]="3")
		}
		let jsonText=JSON.stringify({channels:channels,title:title,timeshift:timeshift,type:type}),
		variablesText='var channels='+JSON.stringify(channels)+',title='+JSON.stringify(title).replace(/\"([^(\")"]+)\":/g,"$1:")+',timeshift='+JSON.stringify(timeshift).replace(/\"([^(\")"]+)\":/g,"$1:")+',type='+JSON.stringify(type).replace(/\"([^(\")"]+)\":/g,"$1:");
		// uncomment next line to console.log the result
		//console.log("result:\n"+jsonText);
		if(!fs.existsSync('JSON.json')||jsonText!==fs.readFileSync('JSON.json').toString()){
			fs.writeFile('JSON.json', jsonText, (err, data)=>{
				if(err)console.log("Unsuccessfully tried to write to JSON.json file, error: ", err);
				else console.log("Successfully written JSON.json file");
		});
		}
		if(!fs.existsSync('variables.js')||variablesText!==fs.readFileSync('variables.js').toString()){
			fs.writeFile('variables.js', variablesText, (err, data)=>{
				if(err)console.log("Unsuccessfully tried to write variables.js file, error: ", err);
				else console.log("Successfully written variables.js file");
		});
		}
	});
});
