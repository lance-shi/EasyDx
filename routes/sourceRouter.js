const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');

const sourceRouter = express.Router();

sourceRouter.use(bodyParser.json());

sourceRouter.route('/')
.post((req, res) => {
    let directory = req.body.directory;
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

module.exports = sourceRouter;