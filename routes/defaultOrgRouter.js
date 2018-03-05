const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');

const defaultOrgRouter = express.Router();

defaultOrgRouter.use(bodyParser.json());

defaultOrgRouter.route('/')
.post((req, res) => {
    cmd.get(
        'sfdx force:config:set defaultusername=' + req.body.username + ' --json',
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

module.exports = defaultOrgRouter;