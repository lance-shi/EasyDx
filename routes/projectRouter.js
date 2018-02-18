const express = require('express');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');

const projectRouter = express.Router();
projectRouter.use(bodyParser.json());

const projectFile = './data/projects.json';

projectRouter.route('/')
.get((req, res) => {
    jsonfile.readFile(projectFile, function(err, obj) {
        console.log('get is called');
        res.send(JSON.stringify(obj));
    });
})
.post((req, res) => {
    if(req.body.method === 'Add') {
        let newProj = {};
        newProj.alias = req.body.alias;
        newProj.directory = req.body.directory;

        jsonfile.readFile(projectFile, function(err, obj) {
            obj.push(newProj);
            jsonfile.writeFile(file, obj, function(err) {
                if(err==null) {
                    res.send({result: 'success'});
                } else {
                    res.statusCode = 400;
                    res.send({result: 'error'});
                    console.log(err);
                }
            });
        });

    }
});

module.exports = projectRouter;