const request = require('request'), fs = require('fs'), path = require('path'), {channels, type} = require('./JSON.json'), arr = [],
base = Buffer.from('aHR0cHM6Ly9pbWFnZXMud2VzZXJ2Lm5sLz9vdXRwdXQ9d2VicCZ1cmw9aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL1BINE5UT01pa2kvbWlraXR2YmFAYzU3ZDYxNS8=', 'base64').toString('binary'),
hqLogo = base + 'hq_logo/', logosWhite = base + 'logos_white/';
var i = 0;

fs.existsSync('hq_logo')||fs.mkdirSync('hq_logo');
fs.existsSync('logos_white')||fs.mkdirSync('logos_white');

function check(ch){return type[ch]!=2 || ch=='bjelasnica';}
channels.forEach(ch=>{check(ch) && arr.push(hqLogo + ch + '.png')});
channels.forEach(ch=>{check(ch) && arr.push(logosWhite + ch + '.png')});

doIt();



function doIt(){if(i>=arr.length)return;
	const relPath = arr[i].replace('.png', '.webp').split('/').slice(-2), fullPath = path.join(__dirname, relPath[0], relPath[1]);
	//console.log(fullPath, fs.existsSync(fullPath));
	if(fs.existsSync(fullPath)){i++;doIt();} else {
		request.get(arr[i], {encoding: 'binary'}, (error, response, body)=>{
			fs.writeFileSync(fullPath, body, 'binary');
			i++;doIt();
		});}
}
