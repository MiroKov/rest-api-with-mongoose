const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');
const accounts = require('./routes/accounts');
const winAuth = require('./authentication/sspi');

const schema = require('./mongoose/schemas');
const uris = 'mongodb://localhost:27017/edx-restful-mongoose';
mongoose.connect(uris);

let app = express()
    .use(logger('dev'))
    .use(bodyParser.json())
    .use(winAuth.auth);

app.get('/accounts', accounts.get);
app.post('/accounts', accounts.post);
app.put('/accounts/:id', accounts.put);
app.delete('/accounts/:id', accounts.delete);

app.use(errorHandler());
app.listen(3000);

