const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');
const Promise = require('bluebird');

const sourceRouter = express.Router();

sourceRouter.use(bodyParser.json());

const getAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd });

sourceRouter.route('/')
.get((req, res) => {
    getAsync('sfdx force:org:list --json').then(data => {
        res.send(data);
    }).catch(err => {
        console.log('cmd err', err);
    });
});

module.exports = sourceRouter;