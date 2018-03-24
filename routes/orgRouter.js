const express = require('express');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');
const cmd = require('node-cmd');
const fs = require('fs');

const orgRouter = express.Router();
const orgFile = './data/orgs.json';

orgRouter.use(bodyParser.json());
const ncp = require('ncp').ncp;

orgRouter.route('/')
.get((req, res) => {
    const dir = './data';
    if (!fs.existsSync(dir)){
        ncp('./dataSample', './data', function(err) {
            jsonfile.readFile(orgFile, function(err, obj) {
                res.send(JSON.stringify(obj));
            });
        });
    } else {
        jsonfile.readFile(orgFile, function(err, obj) {
            res.send(JSON.stringify(obj));
        });
    }
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