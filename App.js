#!/usr/bin/env node
require('dotenv').config()
var express = require('express'),
app = express(),
options  = require('minimist')(process.argv.slice(2)),
accountSid = process.env.SID || options.sid,
authToken = process.env.TOK || options.token,
port = process.env.PORT || options.port || options.p || 3000,
path = require('path'),
fs = require('fs'),
pck = require('./package.json'),
chalk = require('chalk');
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get('/github', (req,res) => {
	res.redirect(pck.homepage)
	logger.req('Redirect',req)
})

app.post('/sms', (req,res) => {
logger.req(`Number:${req.body.number} , Message : ${req.body.message}`,req)
})



app.listen(port, () => logger(`Server running at ${port}`))


// Logger
function logger(message){
    console.log(chalk.bgYellow.red(`(LOG):${Date()}:${message}`))
    fsLog(message)
    }
logger.req = (message,req) => {
    console.log(chalk.bgYellow.blue(`(REQUEST):${Date()}:Ip : ${req.ip} : ${message}`))
    fsLog(message)
    }
    logger.err = (message) => {
    console.error(chalk.bgRed.green(`(ERROR):${Date()} : ${message}`))
    fsLog(message)
    }
    // Main 
    // file logging 
    function fsLog(logText) {
        if(options.fslog || options.f ||  process.env.LOG || false ){
        fs.appendFile(options.fsLog || options.f ||  process.env.LOGPATH || 'logs.log' ,`\n ${logText} \n` , (err) => {
            if (err) throw err;
          });
            }}