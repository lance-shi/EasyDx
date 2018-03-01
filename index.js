const express = require("express");
const cmd = require('node-cmd');
const Promise = require('bluebird');
const bodyParser = require('body-parser');

const orgRouter = require('./routes/orgRouter');
const defaultOrgRouter = require('./routes/defaultOrgRouter');
const projectRouter = require('./routes/projectRouter');

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use("/api/org", orgRouter);
app.use("/api/defaultOrg", defaultOrgRouter);
app.use("/api/project", projectRouter);

app.use(express.static('dist'));

app.listen(port, () => console.log(`Listening to port ${port}`));