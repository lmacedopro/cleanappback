const express = require('express');
const mongoose = require ('mongoose');
const requireDir = require ('require-dir');

const app = express();
app.use(express.json());

requireDir('./src/app/models');

app.use('/api', require('./src/app/routes'));

app.listen(3000);