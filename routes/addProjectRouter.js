const express = require('express');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');
const fs = require('fs');
const cmd = require('node-cmd');

const addProjectRouter = express.Router();
addProjectRouter.use(bodyParser.json());

const projectFile = './data/projects.json';

addProjectRouter.route('/')
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

    fs.access(newProj.directory, (err) => {
        if(err) {
            res.statusCode = 202;
            res.send({err: 'The directory doesnot exist!'});
            console.log(err);
            return;
        }

        cmd.get(
            `cd ${newProj.directory} && sfdx force:project:create -n ${newProj.alias}`,
            function(err, data, stderr) {
                if(!err) {
                    const isWin = process.platform === "win32";
                    let directoryDelimeter = "/";
                    if(isWin) {
                        directoryDelimeter = "\\";
                    }
                    newProj.directory = newProj.directory + directoryDelimeter + newProj.alias;
                    jsonfile.readFile(projectFile, function(readErr, obj) {
                        if(newProj.isDefault) {
                            for(let i = 0; i < obj.projects.length; i++) {
                                obj.projects[i].isDefault = false;
                            }
                        }
                        obj.projects.push(newProj);
                
                        jsonfile.writeFile(projectFile, obj, function(error) {
                            if(error==null) {
                                res.statusCode = 200;
                                res.send(JSON.stringify(obj));
                            } else {
                                res.statusCode = 202;
                                res.send({err: 'Project created but failed to update the config file. Please add the project later.'});
                                console.log(error);
                            }
                        });
                    });
                } else {
                    res.statusCode = 202;
                    let errObj = JSON.parse(stderr);
                    res.send({"err": errObj.message});
                }
            }
        );
    });
});

module.exports = addProjectRouter;