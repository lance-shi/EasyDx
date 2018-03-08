const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');

const listOrgRouter = express.Router();

listOrgRouter.use(bodyParser.json());

listOrgRouter.route('/')
.post((req, res) => {
    let directory = req.body.directory;
    cmd.get(
        `cd ${directory} && sfdx force:org:list --json`,
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

module.exports = listOrgRouter;