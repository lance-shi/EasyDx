const express = require('express');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');

const defaultProjectRouter = express.Router();
defaultProjectRouter.use(bodyParser.json());

const projectFile = './data/projects.json';

defaultProjectRouter.route('/')
.post((req, res) => {
    let newProj = {};
    newProj.alias = req.body.alias;
    newProj.directory = req.body.directory;

    jsonfile.readFile(projectFile, function(err, obj) {
        for(let i = 0; i < obj.projects.length; i++) {
            if(obj.projects[i].alias === newProj.alias && obj.projects[i].directory === newProj.directory) {
                obj.projects[i].isDefault = true;
            } else {
                obj.projects[i].isDefault = false;
            }
        }
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

module.exports = defaultProjectRouter;