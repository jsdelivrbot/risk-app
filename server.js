var express = require('express');
var app = express();
var fs = require('fs');

//var index = require('/index.html');
//app.use('/',index);

//var create = require('./create.html');
//app.use('/create',create);

app.use(express.static(__dirname));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.get('/create', function(req,res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./create.html', null, function(error,data){
        if(error){
            res.writeHead(404);
        }
        else{
            res.write(data);
        }
        res.end();
    });
    //res.send('./create.html');
});

app.listen(3000);
