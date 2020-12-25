#!/usr/bin/env node
require('dotenv').config()
var express = require('express'),
app = express(),
options  = require('minimist')(process.argv.slice(2)),
accountSid = process.env.SID || options.sid,
authToken = process.env.TOK || options.token,
port = process.env.PORT || options.port || options.p || 3000,
path = require('path'),
pck = require('./package.json'),
chalk = require('chalk');
app.use(express.json());
app.use(express.urlencoded({ extended: false }))