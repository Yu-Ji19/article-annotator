const cheerio = require('cheerio');
const request = require('request');


module.exports.scrape = function (url){
	request(url, (error,
		res, html) =>{
			if(!error && res.statusCode == 200){
				let $ = cheerio.load(html);
				let text = $('p').text();
				console.log(text);
				return text;
			}
			else{
				console.log("Failed to load Page")
			}
	});	
}

