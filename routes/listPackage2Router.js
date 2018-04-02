const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');
const fs = require('fs');

const listPackage2Router = express.Router();

listPackage2Router.use(bodyParser.json());

listPackage2Router.route('/')
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
            `cd ${directory} && sfdx force:package2:list --json`,
            function(err, data, stderr) {
                if(!err) {
                    res.statusCode = 200;
                    console.log('data is: ' + data);
                    res.send(data);
                } else {
                    res.statusCode = 202;
                    console.log(stderr);
                    let errObj = JSON.parse(stderr);
                    res.send({"err": errObj.message});
                }
            }
        );
    });
});

module.exports = listPackage2Router;