const Router = require('express').Router();
const uuidv4 = require('uuid/v4');
const cheerio = require('cheerio');
const request = require('request');

let URL = require('./models/URL');
let Workspace = require('./models/Workspace');
let Annotation = require('./models/Annotation');

const HOSTNAME = "http://article-analyzer-hdwhite.cloudapps.unc.edu/";
// DEV PURPOSE; GET THE LIST OF ALL WORKSPACES
Router.get("/api/get-all-workspace", (req, res) => {
	Workspace.find((err, workspaces) => {
		res.send(workspaces);
	})
});

Router.get("/api/get-all-annotation", (req, res) => {
	Annotation.find((err, annotations) => {
		res.send(annotations);
	})
})


// CREATE WORKSPACE
/*
req.body = {
	date: String,
	original_url: String,
}
res.body = {
	url_id: String, hostname/uuid
	date: String, same as req.body
	original_url: String, same as req.body
	content: String, parsed content of the webpage
}
*/
Router.post('/api/create', (req, res) => {
	console.log("try to create workspace");
	const id = uuidv4();
	console.log("generated uuid: " + id);
	var body = req.body;
	console.log(req.body);
	body.url_id = HOSTNAME + id;

	// parse the webpage
	request(req.body.original_url, (err, response, html)=>{
		console.log(err);
		console.log(html);
		console.log(response);
		if(!err && response.statusCode == 200){
			let $ = cheerio.load(html);
			let text = $('p').text();
			body.content = text;
			var workspace = new Workspace(body);
			console.log(body);
			workspace.save()
				.then(() => {
					console.log("workspace saved in database successfully");
					res.send(body);
				})
				.catch(() => {
					console.log("saving workspace failed");
					res.send("workspace not saved");
				});
		}
		else{
			console.log(err);
			console.log("Failed to load Page")
			res.send("Failed to load Page");
		}
	})
	
});

// GET WORKSPACE
/*
res.body = {
	same as above
}
*/
Router.get("/api/workspace/:id", (req, res) => {
	const url_id = HOSTNAME + req.params.id;
	console.log("try to get workspace: " + url_id);
	Workspace.findOne({ url_id: url_id }, (err, workspace) => {
		if (err) {
			console.log("error when accessing database");
			res.send("Database error, please contact maintanence");
		}
		if (!workspace) {
			console.log("counldn't find a matching workspace");
			res.send("Invalid URL");
		} else {
			console.log("found workspace");
			console.log(workspace);
			res.send(workspace);
		}
	});
});

// INSERT ANNOTATION
/* 
req.body = {
	follows all properties defined in models/Annotation.js
	Note: url_id should be the UUID without hostname(only randomly generated string)
}
res.body = {
	messages
}
*/
Router.post("/api/annotation/insert", (req, res) => {
	console.log(req.body);
	var annotation = new Annotation(req.body);
	annotation.save()
		.then(() => {
			console.log("annotation saved in database successfully");
			res.send("annotation saved successfully");
		})
		.catch(() => {
			console.log("saving annotation failed");
			res.send("annotation not saved");
		});
});

// GET THE LIST OF ANNOTATION FOR A WORKSPACE
/* 
res.body = {
	[Annotation1, Annotation2, ...] if found
	message if not found
}
*/
Router.get("/api/annotation/all/:id", (req, res) => {
	const url_id = req.params.id;
	console.log(url_id);
	Annotation.find({ url_id }, (err, annotations) => {
		if (err) {
			console.log("error when accessing database");
			res.send("Database error, please contact maintanence");
		}
		if (!annotations) {
			console.log("counldn't find matching annotations");
			res.send("Counldn't find annotations for the url");
		} else {
			console.log("found annotations");
			console.log(annotations);
			res.send(annotations);
		}
	})
})

// GET THE LIST OF COLLABORATORS
/* 
res.body = {
	{
		collaborator1: frequency,
		collaborator2: frequency,
		...
	}
}
*/
Router.get("/api/collaborators/:id", (req, res) => {
	const url_id = req.params.id;
	Annotation.find({ url_id }, (err, annotations) => {
		if (err) {
			console.log("error when accessing database");
			res.send("Database error, please contact maintanence");
		}
		if (!annotations) {
			console.log("counldn't find matching annotations");
			res.send("Counldn't find annotations for the url");
		} else {
			var collaborators = {};
			annotations.forEach((annotation) => {
				if (!collaborators[annotation.name]) {
					collaborators[annotation.name] = 1;
				} else {
					collaborators[annotation.name] += 1;
				}
			});
			console.log(collaborators);
			res.send(collaborators);
		}
	})
})















Router.get('/api/delete', (req, res) => {
	console.log("try to delete url");
	URL.find(req.body, (err, urls) => {
		console.log("documents being deleted:");
		console.log(urls);
	}).remove(() => {
		console.log("documents removed");
	});
	res.send();
})

module.exports = Router;