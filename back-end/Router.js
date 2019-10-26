const Router = require('express').Router();
let URL = require('./models/URL');

Router.get('/api/delete', (req, res)=>{
    console.log("try to delete url");
    URL.find(req.body, (err, urls)=>{
        console.log("documents being deleted:");
        console.log(urls);
    }).remove(()=>{
        console.log("documents removed");
    });
    res.send();
})

Router.post('/', (req, res) => {
    console.log(req.body);
    URL.findOne(req.body, (err, url)=>{
        if(err){
            console.log("error when checking if url exists");
            res.status(400).send("error when checking if url exists");
        }
        else if(url){
            console.log("url already exists");
            res.status(400).send("url already exists");
        }else{
            const url = new URL(req.body);
            url.save()
                .then(() => {
                    console.log("url added");
                    res.status(200).send("url added");
                })
                .catch(() => {
                    console.log("error when checking if url exists");
                    res.status(400).send("error when checking if url exists");
                });
        }
    })
    
    
});

Router.get('/api/workspace/:id', (req, res) => {
    console.log('get called');
    URL.find((err, urls) => {
        res.json(urls);
    });
});

module.exports = Router;