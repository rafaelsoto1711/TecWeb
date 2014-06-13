var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cons = require('consolidate');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.engine('html', cons.mustache);

var exec = require('child_process').exec, child;

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'html');
app.set('views',__dirname + '/views');


app.get('/', function(req, res){
    res.render('index' , {
            title: 'Buscador'
        });
});

app.get('/prueba', function(req, res){
    res.render('home' , {
            title: 'Home'
        });
});


app.post('/', function(req, res){


    var text_query = JSON.parse(JSON.stringify(req.body));
    console.log("recibido: "+ text_query.query);
    var q = '"{query: ' + text_query.query + '}"';
    var command = "java -jar -Dfile.encoding=UTF-8  Buscador.jar " + q;
    console.log(command);   
    var json_tweet;
    var json_response = [];

    child = exec(command, function (error, stdout, stderr){
        
        if(error !== null){
          console.log('exec error: ' + error);
        }

        console.log(stdout);
        json_tweet = JSON.parse(stdout);

        for(i=0;i<json_tweet.length;i++) {
            //console.log(json_tweet[i].text_tweet);
            json_response.push(json_tweet[i].text_tweet);
        }
        
        //res.json({response: json_response});
        //console.log(json_response);
        res.charset = 'iso-8859-1';
        res.send(JSON.stringify(json_response));
    });

    
    //var a_enviar = JSON.stringify(json_response);
    


    
});


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



module.exports = app;