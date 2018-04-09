const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');
const fs = require('fs');

const assignPermissionRouter = express.Router();

assignPermissionRouter.use(bodyParser.json());

assignPermissionRouter.route('/')
.post((req, res) => {
    let {permissionSet, userName} = req.body;
    cmd.get(
        `sfdx force:user:permset:assign -n ${permissionSet} -u ${userName} --json`,
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

module.exports = assignPermissionRouter;