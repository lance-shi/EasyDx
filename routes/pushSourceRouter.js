const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');
const fs = require('fs');

const pushSourceRouter = express.Router();

pushSourceRouter.use(bodyParser.json());

pushSourceRouter.route('/')
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
        let forceOption = "";
        if(req.body.force === true) {
            forceOption = " -f";
        }
        let orgStr = "";
        if(req.body.otherOrg && req.body.alias !== undefined && req.body.alias !== "") {
            orgStr = " -u " + req.body.alias;
        }

        cmd.get(
            `cd ${directory} && sfdx force:source:push${forceOption}${orgStr} --json`,
            function(err, data, stderr) {
                if(!err) {
                    res.statusCode = 200;
                    res.send(data);
                } else {
                    res.statusCode = 202;
                    res.send(stderr);
                }
            }
        );
    });
});

module.exports = pushSourceRouter;