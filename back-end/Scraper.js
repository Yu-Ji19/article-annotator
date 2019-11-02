const cheerio = require('cheerio');
const request = require('request');

function scrape(url){
	request(url, (error,
		res, html) =>{
			if(!error && res.statusCode == 200){
				let $ = cheerio.load(html);
				let text = $('p').text();
				return text;
			}
			else{
				console.log("Failed to load Page")
			}
	});	
}