const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');
const fs = require('fs');

const createPackage2Router = express.Router();

createPackage2Router.use(bodyParser.json());

createPackage2Router.route('/')
.post((req, res) => {
    let { directory, packageName, description, packageType } = req.body;
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
            `cd ${directory} && sfdx force:package2:create -n ${packageName} -d "${description}" -o ${packageType} --json`,
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

module.exports = createPackage2Router;