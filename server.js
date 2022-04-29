// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser=require('body-parser');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.use('/',function(req, res, next) {
  let log=`${req.method} ${req.path} - ${req.ip}`
  console.log(log);
  next();
})

app.use(bodyParser.urlencoded({extended: false}))


app.get("/api/:time?",function(req, res) {
  let time=req.params.time
  let obj=parse(time)
  res.json(obj);
})

function parse(time){
  let now=new Date()
  let response={
    unix:0,
    utc:""
  }
  let d=Date.parse(time)
  let regex=/([\d]){8,}[\d]$/
  if(d){
    response.unix=d
    let str=new Date(d)
    response.utc=str.toUTCString()
  }else if(regex.test(time)){
    let t=parseInt(time)
    response.unix=t
    response.utc=(new Date(t)).toUTCString()
  }else if(time==undefined){
    response.unix=now.getTime()
    response.utc=now.toUTCString()
  }else{
    return { error : "Invalid Date" }
  }
  return response
}


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
