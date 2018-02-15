const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');
const Promise = require('bluebird');

const orgRouter = express.Router();

orgRouter.use(bodyParser.json());

const getAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd });

orgRouter.route('/')
.get((req, res) => {
    getAsync('sfdx force:org:list --json').then(data => {
        res.send(data);
    }).catch(err => {
        console.log('cmd err', err);
    });
})
.post((req, res) => {
    getAsync('sfdx force:org:open -u ' + req.body.username + ' --json').then(data => {
        res.send(data);
    }).catch(err => {
        console.log('cmd err', err);
    });
});

module.exports = orgRouter;