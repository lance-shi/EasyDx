const express = require("express");
const cmd = require('node-cmd');
const Promise = require('bluebird');

const app = express();
const port = process.env.PORT || 3000;
const getAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd });

app.get('/api/org', (req, res) => {
    getAsync('sfdx force:org:list --json').then(data => {
        res.send(data);
    }).catch(err => {
        console.log('cmd err', err);
    });
});

app.use(express.static('dist'));

app.listen(port, () => console.log(`Listening to port ${port}`));