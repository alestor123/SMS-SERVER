#!/usr/bin/env node
require('dotenv').config()
var express = require('express'),
app = express(),
options  = require('minimist')(process.argv.slice(2)),
accountSid = process.env.SID || options.sid,
authToken = process.env.TOK || options.token,
client = require('twilio')(accountSid, authToken),
port = process.env.PORT || options.port || options.p || 3000,
path = require('path'),
fs = require('fs'),
key = process.env.KEY || options.key || 'sms',
pck = require('./package.json'),
chalk = require('chalk');
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
if(options.v || options.version){
    console.log( `${pck.version}`)
  process.exit(1);
}
else if (options.h || options.help) { // checking undifined args
    console.log(`
Usage: ${pck.name} -p <Port Number> -t <Token> -s <Sid> -f <file path>
-t , --token    for setting tokn
-s , --sid    for setting tokn
-n , --number twilio number 
-p , --port setting port number
-v , --version for showing cli version
-i , --issue for reporting web page (any issue or bugs)
-f , --fsLog for setting path for log file by default this option is not true 
`);
process.exit(0)

}
else if (options.i || options.issue) { // checking undifined args
  console.log(`
  Issues at ${pck.bugs.url} 
`);
process.exit(0)
}

else{
logger(`SID : ${accountSid} , TOKEN : ${authToken} KEY: ${key}`)
app.listen(port, () => logger(`Server running at ${port}`))
}
app.get('/github', (req,res) => {
	res.redirect(pck.homepage)
	logger.req('Redirect',req)
})

app.post('/sms', (req,res) => {
if(key==req.body.key){
    client.messages
  .create({
     body: req.body.message,
     from: process.env.NUM,
     to: req.body.number
   })
res.send(`Successfully sent Number:${req.body.number} , Message : ${req.body.message}`)
   logger.req(`Number:${req.body.number} , Message : ${req.body.message} Key: ${req.body.key} `,req)

}
else {
    logger.err(`Number:${req.body.number} , Message : ${req.body.message} Key: ${req.body.key} Unauth `)
    res.status(401).send('Auth Error')
}
})




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