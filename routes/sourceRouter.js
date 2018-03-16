const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');
const fs = require('fs');

const sourceRouter = express.Router();

sourceRouter.use(bodyParser.json());

sourceRouter.route('/')
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

        cmd.get(
            `cd ${directory} && sfdx force:source:status --json`,
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

module.exports = sourceRouter;