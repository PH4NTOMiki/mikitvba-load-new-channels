const request = require('request'), fs = require('fs'), path = require('path'), {channels, type} = require('./JSON.json'), arr = [],
hqLogo = Buffer.from('aHR0cHM6Ly9pbWFnZXMud2VzZXJ2Lm5sLz91cmw9emUud2VidHZzdHJlYW0uYmh0ZWxlY29tLmJhL2NsaWVudC9ocV9sb2dvLw==', 'base64').toString('binary'),
logosWhite = Buffer.from('aHR0cHM6Ly9pbWFnZXMud2VzZXJ2Lm5sLz93aWR0aD01MCZoZWlnaHQ9NTAmdXJsPXplLndlYnR2c3RyZWFtLmJodGVsZWNvbS5iYS9jbGllbnQvbG9nb3Nfd2hpdGUv', 'base64').toString('binary');
var i = 0;

fs.existsSync('hq_logo')||fs.mkdirSync('hq_logo');
fs.existsSync('logos_white')||fs.mkdirSync('logos_white');

function check(ch){return type[ch]!=2 || ch=='bjelasnica';}
channels.forEach(ch=>{check(ch) && arr.push(hqLogo + ch + '.png')});
channels.forEach(ch=>{check(ch) && arr.push(logosWhite + ch + '.png')});

doIt();



function doIt(){if(i>=arr.length)return;
	request.get(arr[i], {encoding: 'binary'}, (error, response, body)=>{
		const relPath=arr[i].split('/').slice(-2);
		fs.writeFileSync(path.join(__dirname, relPath[0], relPath[1]), body, 'binary');
		i++;
		doIt();
	});
}