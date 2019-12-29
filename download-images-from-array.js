function nf(n,m){typeof(m)!='undefined'||(m=2);n=String(n);while(n.length<m){n='0'+n;}return n;}
var request = require('request'),
fs = require('fs'), path = require('path'),
fileContent=JSON.parse(fs.readFileSync('arr-to-dl.json')),
//photos=fileContent.photos,
i=0,j=fileContent.length;

function doIt(){if(i>=j)return;
	request.get(fileContent[i], {encoding: 'binary'}, function(error, response, body) {
		let a=fileContent[i].split('/').slice(-2);
		fs.writeFileSync(path.join(__dirname,a[0],a[1]), body, 'binary');
		i++;
		doIt();
	});
}
doIt();