#!/usr/bin/env node
require('dotenv').config()
var express = require('express'),
app = express(),
options  = require('minimist')(process.argv.slice(2));
path = require('path'),
pck = require('./package.json'),
chalk = require('chalk');