const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Workspace = new Schema({

	// UNIQUELY GENERATED URL
	url_id: {
		type: String
	},

	// CREATION TIME
	date: {
		type: String
	},

	// ORIGINAL URL
	original_url: {
		type: String
	},

	// WEBPAGE CONTENT THAT'S SCRAPED
	content: {
		type: String
	}
})

module.exports = mongoose.model('Workspace', Workspace);