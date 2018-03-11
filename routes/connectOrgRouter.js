const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');

const connectOrgRouter = express.Router();

connectOrgRouter.use(bodyParser.json());

connectOrgRouter.route('/')
.post((req, res) => {
    let devhub = "";
    let sandbox = "";
    let alias = "";
    if(req.body.isDevHub === true) {
        devhub = " -d";
    } 
    if(req.body.isSandbox === true) {
        sandbox = " -r https://test.salesforce.com";
    }
    if(req.body.alias !== undefined && req.body.alias !== "") {
        alias = " -a " + req.body.alias;
    }
    cmd.get(
        `sfdx force:auth:web:login${devhub}${alias}${sandbox} --json`,
        function(err, data, stderr) {
        }
    );
    setTimeout(function() {
        res.statusCode = 200;
        res.send("Success");
    }, 8000);

});

module.exports = connectOrgRouter;