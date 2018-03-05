const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');

const orgRouter = express.Router();

orgRouter.use(bodyParser.json());

orgRouter.route('/')
.get((req, res) => {
    cmd.get(
        'sfdx force:org:list --json',
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
})
.post((req, res) => {
    cmd.get(
        'sfdx force:org:open -u ' + req.body.username + ' --json',
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

module.exports = orgRouter;