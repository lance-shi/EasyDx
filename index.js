const express = require("express");
const cmd = require('node-cmd');
const Promise = require('bluebird');
const bodyParser = require('body-parser');

const orgRouter = require('./routes/orgRouter');
const listOrgRouter = require('./routes/listOrgRouter');
const defaultOrgRouter = require('./routes/defaultOrgRouter');
const connectOrgRouter = require('./routes/connectOrgRouter');
const createOrgRouter = require('./routes/createOrgRouter');
const projectRouter = require('./routes/projectRouter');
const removeProjectRouter = require('./routes/removeProjectRouter');
const defaultProjectRouter = require('./routes/defaultProjectRouter');
const convertProjectRouter = require('./routes/convertProjectRouter');
const sourceRouter = require('./routes/sourceRouter');
const pushSourceRouter = require('./routes/pushSourceRouter');

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use("/api/org", orgRouter);
app.use("/api/listOrg", listOrgRouter);
app.use("/api/defaultOrg", defaultOrgRouter);
app.use("/api/connectOrg", connectOrgRouter);
app.use("/api/createOrg", createOrgRouter);
app.use("/api/project", projectRouter);
app.use("/api/defaultProject", defaultProjectRouter);
app.use("/api/convertProject", convertProjectRouter);
app.use("/api/removeProject", removeProjectRouter);
app.use("/api/source", sourceRouter);
app.use("/api/pushSource", pushSourceRouter);

app.use(express.static('dist'));

app.listen(port, () => console.log(`Listening to port ${port}`));