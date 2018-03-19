const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');
const fs = require('fs');

const createOrgRouter = express.Router();

createOrgRouter.use(bodyParser.json());

createOrgRouter.route('/')
.post((req, res) => {
    let defaultString = "";
    let alias = "";
    let directory = req.body.directory;
    const sfdxProjFileName = 'sfdx-project.json';
    const isWin = process.platform === "win32";
    let directoryDelimeter = "/";
    if(isWin) {
        directoryDelimeter = "\\";
    }

    if(req.body.isDefault === true) {
        defaultString = " -s";
    }
    if(req.body.alias !== undefined && req.body.alias !== "") {
        alias = " -a " + req.body.alias;
    }

    fs.access(directory + directoryDelimeter + sfdxProjFileName, (err) => {
        if(err) {
            res.statusCode = 202;
            res.send({err: 'The filepath doesnot exist or doesnot contain a valid sfdx project!'});
            console.log(err);
            return;
        }

        cmd.get(
            `cd ${directory} && sfdx force:org:create -f config/project-scratch-def.json${alias}${defaultString} --json`,
            function(err, data, stderr) {
                if(!err) {
                    res.statusCode = 200;
                    res.send(data);
                } else {
                    res.statusCode = 202;
                    let errObj = JSON.parse(stderr);
                    res.send({"err": errObj.message});
                }
            }
        );
    });

});

module.exports = createOrgRouter;