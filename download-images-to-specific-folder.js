//function nf(n,m){typeof(m)!='undefined'||(m=2);n=String(n);while(n.length<m){n='0'+n;}return n;}
var request = require('request'),
fs = require('fs'), path = require('path'),
fileContent=JSON.parse(fs.readFileSync('gtm.json')),
//photos=fileContent.photos,
i=0,j=fileContent.length;

function doIt(){if(i>=j)return;
	request.get(fileContent[i][1], {encoding: 'binary'}, function(error, response, body) {
		//let a=fileContent[i].split('/').slice(-2);
    let fullPath = path.join(__dirname, fileContent[i][0].substr(8));
    console.log(fullPath);
		fs.mkdirSync(fullPath.split('\\').slice(0,-1).join('\\'), { recursive: true });
		fs.writeFileSync(fullPath, body, 'binary');
		i++;
		doIt();
	});
}
doIt();
