const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');
const fs = require('fs');

const connectOrgRouter = express.Router();

connectOrgRouter.use(bodyParser.json());

connectOrgRouter.route('/')
.post((req, res) => {
    let directory = req.body.directory;
    const sfdxProjFileName = 'sfdx-project.json';
    const isWin = process.platform === "win32";
    let directoryDelimeter = "/";
    if(isWin) {
        directoryDelimeter = "\\";
    }

    fs.access(directory + directoryDelimeter + sfdxProjFileName, (err) => {
        if(err) {
            res.statusCode = 202;
            res.send({err: 'The default project directory doesnot exist or doesnot contain a valid sfdx project!'});
            console.log(err);
            return;
        }

        let devhub = "";
        let sandbox = "";
        let alias = "";
        if(req.body.isDevHub === true) {
            devhub = " -d";
        } 
        if(req.body.isSandbox === true) {
            sandbox = " -r https://test.salesforce.com";
        }
        if(req.body.alias !== undefined && req.body.alias !== "") {
            alias = " -a " + req.body.alias;
        }
        cmd.get(
            `cd ${directory} && sfdx force:auth:web:login${devhub}${alias}${sandbox} --json`,
            function(err, data, stderr) {
                if(!err) {
                    console.log(data);
                } else {
                    console.log(stderr);
                }
            }
        );
        setTimeout(function() {
            res.statusCode = 200;
            res.send("Success");
        }, 8000);
    });

});

module.exports = connectOrgRouter;