const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');

const deleteOrgRouter = express.Router();

deleteOrgRouter.use(bodyParser.json());

deleteOrgRouter.route('/')
.post((req, res) => {
    let orgName = req.body.orgName;
    cmd.get(
        `sfdx force:org:delete -u ${orgName} -p --json`,
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

module.exports = deleteOrgRouter;