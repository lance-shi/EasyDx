const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');
const fs = require('fs');

const createUserRouter = express.Router();

createUserRouter.use(bodyParser.json());

createUserRouter.route('/')
.post((req, res) => {
    let userName = req.body.userName;
    cmd.get(
        `sfdx force:user:password:generate -u ${userName} --json`,
        function(err, data, stderr) {
            if(!err) {
                res.statusCode = 200;
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

module.exports = createUserRouter;