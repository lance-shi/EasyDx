const express = require('express');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');
const cmd = require('node-cmd');

const convertProjectRouter = express.Router();
convertProjectRouter.use(bodyParser.json());

const projectFile = './data/projects.json';

convertProjectRouter.route('/')
.post((req, res) => {
    let directory = req.body.directory;

    cmd.get(
        `cd ${directory}
        sfdx force:source:convert -d outputTmp/`,
        function(err, data, stderr) {
            if(!err) {
                res.statusCode = 200;
                res.send(data);
            } else {
                res.statusCode = 400;
                let errObj = JSON.parse(stderr);
                res.send({"err": errObj.message});
            }
        }
    );
});

module.exports = convertProjectRouter;