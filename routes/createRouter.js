const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');
const fs = require('fs');

const createRouter = express.Router();

createRouter.use(bodyParser.json());

createRouter.route('/')
.post((req, res) => {
    const { directory, methodName, componentName } = req.body;
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
        let methodType = "";
        let subFolder = "";
        
        switch (methodName) {
            case "ApexClass": 
                methodType = "apex:class";
                subFolder = "classes";
                break;
            case "ApexTrigger":
                methodType = "apex:trigger";
                subFolder = "triggers";
                break;
            case "VisualforcePage":
                methodType = "visualforce:page";
                subFolder = "pages";
                break;
            case "VisualforceComponent": 
                methodType = "visualforce:component";
                subFolder = "components";
                break;
            case "LightningApp":
                methodType = "lightning:app";
                subFolder = "aura";
                break;
            case "LightningComponent":
                methodType = "lightning:component";
                subFolder = "aura";
                break;
            case "LightningEvent":
                methodType = "lightning:event";
                subFolder = "aura";
                break;
            case "LightningInterface":
                methodType = "lightning:interface";
                subFolder = "aura";
                break;
            default: 
                methodType = "apex:class";
        }
        cmd.get(
            `cd ${directory} && sfdx force:${methodType}:create -n ${componentName} -d force-app/main/default/${subFolder} --json`,
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

module.exports = createRouter;