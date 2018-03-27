const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');

const changeAliasRouter = express.Router();
changeAliasRouter.use(bodyParser.json());

changeAliasRouter.route('/')
.post((req, res) => {
    let { alias, userName } = req.body;
    cmd.get(
        `sfdx force:alias:set ${alias}=${userName}`,
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

module.exports = changeAliasRouter;