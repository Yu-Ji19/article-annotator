const Router = require("express").Router();
const uuidv4 = require("uuid/v4");
const cheerio = require("cheerio");
const request = require("request");

let URL = require("./models/URL");
let Workspace = require("./models/Workspace");
let Annotation = require("./models/Annotation");

const HOSTNAME = "http://article-analyzer-hdwhite.cloudapps.unc.edu/";
// DEV PURPOSE; GET THE LIST OF ALL WORKSPACES
Router.get("/api/get-all-workspace", (req, res) => {
  Workspace.find((err, workspaces) => {
    res.send(workspaces);
  });
});

Router.get("/api/get-all-annotation", (req, res) => {
  Annotation.find((err, annotations) => {
    res.send(annotations);
  });
});

// CREATE A WORKSPACE
/*
req.body = {
	date: String,
	original_url: String,
}
res.body = {
	id: String, uuid
	date: String, same as req.body
	original_url: String, same as req.body
	content: String, parsed content of the webpage
}
*/

var scrape = html => {
  let $ = cheerio.load(html);
  let content = "";
      // '*' selects all elements 
			$('*').each(function () {
				if($(this).get(0).tagName == 'p'){
					content += $(this).text();
				}
				else if($(this).get(0).tagName == 'h1'){
					content += $(this).text();
        }
        //add whatever tagname following above format
      });
    
  return content;
};
Router.post("/api/create", (req, res) => {
  console.log("try to create workspace");
  const id = uuidv4();
  console.log("generated uuid: " + id);
  var body = req.body;
  console.log(req);
  console.log(req.body);
  body.id = id;

  // parse the webpage
  request(req.body.original_url, (err, response, html) => {
    if (!err && response.statusCode == 200) {
      body.content = scrape(html);
      var workspace = new Workspace(body);
      console.log(body);
      workspace
        .save()
        .then(() => {
          console.log("workspace saved in database successfully");
          res.send(body);
        })
        .catch(() => {
          console.log("saving workspace failed");
          res.send({message:"workspace not saved"});
        });
    } else {
      console.log(err);
      console.log("Failed to load Page");
      res.send({ message: "Failed to load Page" });
    }
  });
})

// GET WORKSPACE
/*
res.body = {
	same as above
}
*/
Router.get("/api/workspace/:id", (req, res) => {
  const id = req.params.id;
  console.log("try to get workspace: " + id);
  Workspace.findOne({ id: id }, (err, workspace) => {
    if (err) {
      console.log("error when accessing database");
      res.send({ message: "Database error, please contact maintanence" });
    }
    if (!workspace) {
      console.log("counldn't find a matching workspace");
      res.send({ message: "Invalid URL" });
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
}
res.body = {
	messages
}
*/
Router.post("/api/annotation/insert", (req, res) => {
  console.log(req.body);
  var annotation = new Annotation(req.body);
  annotation
    .save()
    .then(() => {
      console.log("annotation saved in database successfully");
      res.send({ message: "annotation saved successfully" });
    })
    .catch(() => {
      console.log("saving annotation failed");
      res.send({ message: "annotation not saved" });
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
  const id = req.params.id;
  console.log("try to access list of annotations for " + id);
  console.log(id);
  Workspace.findOne({id}, (err, workspace)=>{
    if(err){
      console.log("error when accessing database");
      res.send({message:"Database error, please contact maintanence"});
    }
    if(!workspace){
      console.log("Invalid URL");
      res.send({message: "Invalid URL"});
    }else{
      Annotation.find({ id }, (err, annotations) => {
        if (err) {
          console.log("error when accessing database");
          res.send({message:"Database error, please contact maintanence"});
        }
        else {
          console.log("found annotations");
          console.log(annotations);
          res.send({annotations:annotations});
        }
      });
    }
  })
});

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
  console.log("try to find collaborators");
  const id = req.params.id;
  Workspace.findOne({id}, (err, workspace)=>{
    if(err){
      console.log("error when accessing database");
      res.send({message:"Database error, please contact maintanence"});
    }
    if(!workspace){
      console.log("Invalid URL");
      res.send({message: "Invalid URL"});
    }else{
      Annotation.find({id}, (err, annotations)=>{
        if (err) {
          console.log("error when accessing database");
          res.send({message:"Database error, please contact maintanence"});
        }
        else {
          var collaborators = {};
          annotations.forEach(annotation => {
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
    }
  })
});


module.exports = Router;
