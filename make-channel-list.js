const request = require('request'), fs = require('fs'), channels = [], title = {}, timeshift = {}, type = {},
apiUrl = Buffer.from('aHR0cHM6Ly93ZWJ0dnN0cmVhbS5iaHRlbGVjb20uYmEvY2xpZW50L2NoYW5uZWxz', 'base64').toString('binary');

request.get(apiUrl, (error, response, body) => {
	let feed=JSON.parse(body)["feed"],radioStart=feed.length;
	console.log("Successfully loaded tv JSON, tv length and radioStart: ", radioStart);
	request.get(apiUrl + '_cat_11', (error, response, body) => {
		feed=feed.concat(JSON.parse(body)["feed"]);
		console.log("Successfully loaded radio JSON, radio length: ",(feed.length-radioStart),", full length: ",feed.length);
		for(let i=0,j=feed.length;i<j;i++){
		let c=feed[i],currch=c.ch;
		channels.push(currch);
		title[currch]=c.title;
		/*if(i<radioStart){timeshift[currch]=c.timeshift;if(c.cat=="4"){type[currch]="2";} else {type[currch]="1";}} else {type[currch]="3";}*/
		i<radioStart?(timeshift[currch]=Number(c.timeshift),type[currch]=(c.cat==4)?2:1):(type[currch]=3)
		}
		let jsonText=JSON.stringify({channels:channels,title:title,timeshift:timeshift,type:type}),
		variablesText='var channels='+JSON.stringify(channels)+',title='+JSON.stringify(title).replace(/\"([^(\")"]+)\":/g,"$1:")+',timeshift='+JSON.stringify(timeshift).replace(/\"([^(\")"]+)\":/g,"$1:")+',type='+JSON.stringify(type).replace(/\"([^(\")"]+)\":/g,"$1:");
		// uncomment next line to console.log the result
		//console.log("result:\n"+jsonText);
		if(fs.existsSync('channels.js') && variablesText === fs.readFileSync('channels.js').toString()){console.log('No changes!');return;}
		//if(!fs.existsSync('channels.json')||jsonText!==fs.readFileSync('channels.json').toString()){
			fs.writeFile('channels.json', jsonText, (err, data)=>{
				if(err)console.log("Unsuccessfully tried to write to channels.json file, error: ", err);
				else console.log("Successfully written channels.json file");
			});
		//}
		//if(!fs.existsSync('channels.js')||variablesText!==fs.readFileSync('channels.js').toString()){
			fs.writeFile('channels.js', variablesText, (err, data)=>{
				if(err)console.log("Unsuccessfully tried to write channels.js file, error: ", err);
				else console.log("Successfully written channels.js file");
			});
		//}
	});
});
