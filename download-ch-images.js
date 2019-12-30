const request = require('request'),
fs = require('fs'),
path = require('path'),
{channels, type} = require('./JSON.json'),
arr = [];
var i = 0;

fs.existsSync('hq_logo')||fs.mkdirSync('hq_logo');
fs.existsSync('logos_white')||fs.mkdirSync('logos_white');


channels.forEach(ch=>{if(type[ch]!=2 || ch=='bjelasnica')
	arr.push('https://images.weserv.nl/?url=ze.webtvstream.bhtelecom.ba/client/hq_logo/'+ch+'.png')});
channels.forEach(ch=>{if(type[ch]!=2 || ch=='bjelasnica')
	arr.push('https://images.weserv.nl/?width=50&height=50&url=ze.webtvstream.bhtelecom.ba/client/logos_white/'+ch+'.png')});

doIt();



function doIt(){if(i>=arr.length)return;
	request.get(arr[i], {encoding: 'binary'}, function(error, response, body) {
		const relPath=arr[i].split('/').slice(-2);
		fs.writeFileSync(path.join(__dirname, relPath[0], relPath[1]), body, 'binary');
		i++;
		doIt();
	});
}