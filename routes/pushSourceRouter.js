const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');

const pushSourceRouter = express.Router();

pushSourceRouter.use(bodyParser.json());

pushSourceRouter.route('/')
.post((req, res) => {
    let directory = req.body.directory;
    let forceOption = "";
    if(req.force === true) {
        forceOption = " -f";
    }
    cmd.get(
        `cd ${directory} && sfdx force:source:push${forceOption} --json`,
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

module.exports = pushSourceRouter;