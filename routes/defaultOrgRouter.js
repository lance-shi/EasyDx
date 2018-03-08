const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');

const defaultOrgRouter = express.Router();

defaultOrgRouter.use(bodyParser.json());

defaultOrgRouter.route('/')
.post((req, res) => {
    let directory = req.body.directory;
    console.log("directory is: " + directory);
    console.log("user name is: " + req.body.username);
    cmd.get(
        `cd ${directory} && sfdx force:config:set defaultusername=${req.body.username} --json`,
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

module.exports = defaultOrgRouter;