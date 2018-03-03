const express = require('express');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');

const projectRouter = express.Router();
projectRouter.use(bodyParser.json());

const projectFile = './data/projects.json';

projectRouter.route('/')
.get((req, res) => {
    jsonfile.readFile(projectFile, function(err, obj) {
        res.send(JSON.stringify(obj));
    });
})
.post((req, res) => {
    let newProj = {};
    newProj.alias = req.body.alias;
    newProj.directory = req.body.directory;
    newProj.isDefault = req.body.isDefault;
    console.log('newPro isDefault is: ' + newProj.isDefault);

    jsonfile.readFile(projectFile, function(err, obj) {
        if(newProj.isDefault) {
            for(let i = 0; i < obj.projects.length; i++) {
                obj.projects[i].isDefault = false;
            }
        }
        obj.projects.push(newProj);

        jsonfile.writeFile(projectFile, obj, function(err) {
            if(err==null) {
                res.send(JSON.stringify(obj));
            } else {
                res.statusCode = 400;
                res.send({result: 'error'});
                console.log(err);
            }
        });
    });
});

module.exports = projectRouter;