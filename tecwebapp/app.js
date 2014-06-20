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

app.post('/query', function(req, res){
    var text_query = JSON.parse(JSON.stringify(req.body));
    console.log("recibidooooo: "+ text_query.query);
    var q = '"{query: ' + text_query.query + '}"';
    var command = "java -jar -Dfile.encoding=UTF-8  Buscador.jar " + q;
    console.log(command);

    var json_tweet;
    var json_response = [];

    var hash = {};


    child = exec(command, function (error, stdout, stderr){
        
        if(error !== null){
          console.log('exec error: ' + error);
        }

        //console.log(stdout);
        
        json_tweet = JSON.parse(stdout);

        for(var key in json_tweet) {
            if(json_tweet[key].keyword === 'PONTIFICIA UNIVERSIDAD CATOLICA DE CHILE' || json_tweet[key].keyword === 'PUC' || json_tweet[key].keyword === 'UNIVERSIDAD CATOLICA DE CHILE'){
                if(hash['PUC'] === undefined) {
                    hash['PUC'] = [];
                    hash['PUC'].push(json_tweet[key]);
                } else {
                    hash['PUC'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'PONTIFICIA UNIVERSIDAD CATOLICA DE VALPARAISO' || json_tweet[key].keyword === 'UNIVERSIDAD CATOLICA DE VALPARAISO' || json_tweet[key].keyword === 'PUCV') {
                if(hash['PUCV'] === undefined) {
                    hash['PUCV'] = [];
                    hash['PUCV'].push(json_tweet[key]);
                } else {
                    hash['PUCV'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD DE TARAPACA' || json_tweet[key].keyword === 'UTA') {
                if(hash['UTA'] === undefined) {
                    hash['UTA'] = [];
                    hash['UTA'].push(json_tweet[key]);
                } else {
                    hash['UTA'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD ACADEMIA DE HUMANISMO CRISTIANO' || json_tweet[key].keyword === 'UAHC') {
                if(hash['UAHC'] === undefined) {
                    hash['UAHC'] = [];
                    hash['UAHC'].push(json_tweet[key]);
                } else {
                    hash['UAHC'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD ADVENTISTA DE CHILE' || json_tweet[key].keyword === 'UNACH') {
                if(hash['UNACH'] === undefined) {
                    hash['UNACH'] = [];
                    hash['UNACH'].push(json_tweet[key]);
                } else {
                    hash['UNACH'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD ALBERTO HURTADO' || json_tweet[key].keyword === 'UAH') {
                if(hash['UAH'] === undefined) {
                    hash['UAH'] = [];
                    hash['UAH'].push(json_tweet[key]);
                } else {
                    hash['UAH'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD ARTURO PRAT' || json_tweet[key].keyword === 'UNAP') {
                if(hash['UNAP'] === undefined) {
                    hash['UNAP'] = [];
                    hash['UNAP'].push(json_tweet[key]);
                } else {
                    hash['UNAP'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD AUSTRAL DE CHILE' || json_tweet[key].keyword === 'UACH') {
                if(hash['UACH'] === undefined) {
                    hash['UACH'] = [];
                    hash['UACH'].push(json_tweet[key]);
                } else {
                    hash['UACH'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD AUTONOMA DE CHILE') {
                if(hash['uautonoma'] === undefined) {
                    hash['uautonoma'] = [];
                    hash['uautonoma'].push(json_tweet[key]);
                } else {
                    hash['uautonoma'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD BERNARDO OHIGGINS' || json_tweet[key].keyword === 'UBO') {
                if(hash['UBO'] === undefined) {
                    hash['UBO'] = [];
                    hash['UBO'].push(json_tweet[key]);
                } else {
                    hash['UBO'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD BOLIVARIANA' || json_tweet[key].keyword === 'UBOLIVARIANA') {
                if(hash['UBOLIVARIANA'] === undefined) {
                    hash['UBOLIVARIANA'] = [];
                    hash['UBOLIVARIANA'].push(json_tweet[key]);
                } else {
                    hash['UBOLIVARIANA'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD CATOLICA DE LA SANTISIMA CONCEPCION' || json_tweet[key].keyword === 'UCSC') {
                if(hash['UCSC'] === undefined) {
                    hash['UCSC'] = [];
                    hash['UCSC'].push(json_tweet[key]);
                } else {
                    hash['UCSC'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD CATOLICA DE TEMUCO') {
                if(hash['uctemuco'] === undefined) {
                    hash['uctemuco'] = [];
                    hash['uctemuco'].push(json_tweet[key]);
                } else {
                    hash['uctemuco'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD CATOLICA DEL MAULE' || json_tweet[key].keyword === 'UCM') {
                if(hash['UCM'] === undefined) {
                    hash['UCM'] = [];
                    hash['UCM'].push(json_tweet[key]);
                } else {
                    hash['UCM'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD CATOLICA DEL NORTE' || json_tweet[key].keyword === 'UCN') {
                if(hash['UCN'] === undefined) {
                    hash['UCN'] = [];
                    hash['UCN'].push(json_tweet[key]);
                } else {
                    hash['UCN'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD CATOLICA SILVA HENRIQUEZ' || json_tweet[key].keyword === 'UCSH') {
                if(hash['UCSH'] === undefined) {
                    hash['UCSH'] = [];
                    hash['UCSH'].push(json_tweet[key]);
                } else {
                    hash['UCSH'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD CENTRAL DE CHILE' || json_tweet[key].keyword === 'UCENTRAL') {
                if(hash['UCENTRAL'] === undefined) {
                    hash['UCENTRAL'] = [];
                    hash['UCENTRAL'].push(json_tweet[key]);
                } else {
                    hash['UCENTRAL'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD CHILENO BRITANICA DE CULTURA' || json_tweet[key].keyword === 'UBRITANICA') {
                if(hash['UBRITANICA'] === undefined) {
                    hash['UBRITANICA'] = [];
                    hash['UBRITANICA'].push(json_tweet[key]);
                } else {
                    hash['UBRITANICA'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD DE ACONCAGUA' || json_tweet[key].keyword === 'UACONCAGUA') {
                if(hash['UACONCAGUA'] === undefined) {
                    hash['UACONCAGUA'] = [];
                    hash['UACONCAGUA'].push(json_tweet[key]);
                } else {
                    hash['UACONCAGUA'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD DE ANTOFAGASTA' || json_tweet[key].keyword === 'UANTOF') {
                if(hash['UANTOF'] === undefined) {
                    hash['UANTOF'] = [];
                    hash['UANTOF'].push(json_tweet[key]);
                } else {
                    hash['UANTOF'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD DE ARTE Y CIENCIAS SOCIALES ARCIS' || json_tweet[key].keyword === 'UARCIS') {
                if(hash['UARCIS'] === undefined) {
                    hash['UARCIS'] = [];
                    hash['UARCIS'].push(json_tweet[key]);
                } else {
                    hash['UARCIS'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD DE ARTES, CIENCIAS Y COMUNICACION - UNIACC' || json_tweet[key].keyword === 'UNIACC') {
                if(hash['UNIACC'] === undefined) {
                    hash['UNIACC'] = [];
                    hash['UNIACC'].push(json_tweet[key]);
                } else {
                    hash['UNIACC'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD DE ATACAMA' || json_tweet[key].keyword === 'UDA') {
                if(hash['UDA'] === undefined) {
                    hash['UDA'] = [];
                    hash['UDA'].push(json_tweet[key]);
                } else {
                    hash['UDA'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD DE CHILE' || json_tweet[key].keyword === 'UCHILE') {
                if(hash['UCHILE'] === undefined) {
                    hash['UCHILE'] = [];
                    hash['UCHILE'].push(json_tweet[key]);
                } else {
                    hash['UCHILE'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD DE CONCEPCION' || json_tweet[key].keyword === 'UDEC') {
                if(hash['UDEC'] === undefined) {
                    hash['UDEC'] = [];
                    hash['UDEC'].push(json_tweet[key]);
                } else {
                    hash['UDEC'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD DE LA FRONTERA' || json_tweet[key].keyword === 'UFRO') {
                if(hash['UFRO'] === undefined) {
                    hash['UFRO'] = [];
                    hash['UFRO'].push(json_tweet[key]);
                } else {
                    hash['UFRO'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD DE LA SERENA' || json_tweet[key].keyword === 'USERENA') {
                if(hash['USERENA'] === undefined) {
                    hash['USERENA'] = [];
                    hash['USERENA'].push(json_tweet[key]);
                } else {
                    hash['USERENA'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD DE LAS AMERICAS' || json_tweet[key].keyword === 'UDLA') {
                if(hash['UDLA'] === undefined) {
                    hash['UDLA'] = [];
                    hash['UDLA'].push(json_tweet[key]);
                } else {
                    hash['UBRITANICA'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD DE LOS ANDES' || json_tweet[key].keyword === 'UANDES') {
                if(hash['UANDES'] === undefined) {
                    hash['UANDES'] = [];
                    hash['UANDES'].push(json_tweet[key]);
                } else {
                    hash['UANDES'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD DE LOS LAGOS' || json_tweet[key].keyword === 'ULAGOS') {
                if(hash['ULAGOS'] === undefined) {
                    hash['ULAGOS'] = [];
                    hash['ULAGOS'].push(json_tweet[key]);
                } else {
                    hash['ULAGOS'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD DE MAGALLANES' || json_tweet[key].keyword === 'UMAG') {
                if(hash['UMAG'] === undefined) {
                    hash['UMAG'] = [];
                    hash['UMAG'].push(json_tweet[key]);
                } else {
                    hash['UMAG'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD DE PLAYA ANCHA DE CIENCIAS DE LA EDUCACION' || json_tweet[key].keyword === 'UPLA') {
                if(hash['UPLA'] === undefined) {
                    hash['UPLA'] = [];
                    hash['UPLA'].push(json_tweet[key]);
                } else {
                    hash['UPLA'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD DE SANTIAGO DE CHILE' || json_tweet[key].keyword === 'USACH' || json_tweet[key].keyword === 'UDESANTIAGO') {
                if(hash['USACH'] === undefined) {
                    hash['USACH'] = [];
                    hash['USACH'].push(json_tweet[key]);
                } else {
                    hash['USACH'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD DE TALCA' || json_tweet[key].keyword === 'UTALCA') {
                if(hash['UTALCA'] === undefined) {
                    hash['UTALCA'] = [];
                    hash['UTALCA'].push(json_tweet[key]);
                } else {
                    hash['UTALCA'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD DE VALPARAISO' || json_tweet[key].keyword === 'UV') {
                if(hash['UV'] === undefined) {
                    hash['UV'] = [];
                    hash['UV'].push(json_tweet[key]);
                } else {
                    hash['UV'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD DEL BIO-BIO' || json_tweet[key].keyword === 'UBIOBIO') {
                if(hash['UBIOBIO'] === undefined) {
                    hash['UBIOBIO'] = [];
                    hash['UBIOBIO'].push(json_tweet[key]);
                } else {
                    hash['UBIOBIO'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD DEL DESARROLLO' || json_tweet[key].keyword === 'UDD') {
                if(hash['UDD'] === undefined) {
                    hash['UDD'] = [];
                    hash['UDD'].push(json_tweet[key]);
                } else {
                    hash['UDD'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD DEL MAR' || json_tweet[key].keyword === 'UDELMAR') {
                if(hash['UDELMAR'] === undefined) {
                    hash['UDELMAR'] = [];
                    hash['UDELMAR'].push(json_tweet[key]);
                } else {
                    hash['UDELMAR'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD DEL PACIFICO' || json_tweet[key].keyword === 'UPACIFICO') {
                if(hash['UPACIFICO'] === undefined) {
                    hash['UPACIFICO'] = [];
                    hash['UPACIFICO'].push(json_tweet[key]);
                } else {
                    hash['UPACIFICO'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD DIEGO PORTALES' || json_tweet[key].keyword === 'UDP') {
                if(hash['UDP'] === undefined) {
                    hash['UDP'] = [];
                    hash['UDP'].push(json_tweet[key]);
                } else {
                    hash['UDP'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD FINIS TERRAE' || json_tweet[key].keyword === 'FINISTERRAE') {
                if(hash['FINISTERRAE'] === undefined) {
                    hash['FINISTERRAE'] = [];
                    hash['FINISTERRAE'].push(json_tweet[key]);
                } else {
                    hash['FINISTERRAE'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD GABRIELA MISTRAL' || json_tweet[key].keyword === 'UGM') {
                if(hash['UGM'] === undefined) {
                    hash['UGM'] = [];
                    hash['UGM'].push(json_tweet[key]);
                } else {
                    hash['UGM'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD IBEROAMERICANA DE CIENCIAS Y TECNOLOGIA, UNICYT' || json_tweet[key].keyword === 'UIBEROAMERICANA') {
                if(hash['UIBEROAMERICANA'] === undefined) {
                    hash['UIBEROAMERICANA'] = [];
                    hash['UIBEROAMERICANA'].push(json_tweet[key]);
                } else {
                    hash['UIBEROAMERICANA'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD INTERNACIONAL SEK' || json_tweet[key].keyword === 'UISEK') {
                if(hash['UISEK'] === undefined) {
                    hash['UISEK'] = [];
                    hash['UISEK'].push(json_tweet[key]);
                } else {
                    hash['UISEK'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD LOS LEONES' || json_tweet[key].keyword === 'ULOSLEONES') {
                if(hash['ULOSLEONES'] === undefined) {
                    hash['ULOSLEONES'] = [];
                    hash['ULOSLEONES'].push(json_tweet[key]);
                } else {
                    hash['ULOSLEONES'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD MAYOR' || json_tweet[key].keyword === 'UMAYOR') {
                if(hash['UMAYOR'] === undefined) {
                    hash['UMAYOR'] = [];
                    hash['UMAYOR'].push(json_tweet[key]);
                } else {
                    hash['UMAYOR'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD METROPOLITANA DE CIENCIAS DE LA EDUCACION' || json_tweet[key].keyword === 'UMCE') {
                if(hash['UMCE'] === undefined) {
                    hash['UMCE'] = [];
                    hash['UMCE'].push(json_tweet[key]);
                } else {
                    hash['UMCE'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD MIGUEL DE CERVANTES' || json_tweet[key].keyword === 'UMCERVANTES') {
                if(hash['UMCERVANTES'] === undefined) {
                    hash['UMCERVANTES'] = [];
                    hash['UMCERVANTES'].push(json_tweet[key]);
                } else {
                    hash['UMCERVANTES'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD NACIONAL ANDRES BELLO' || json_tweet[key].keyword === 'UNAB') {
                if(hash['UNAB'] === undefined) {
                    hash['UNAB'] = [];
                    hash['UNAB'].push(json_tweet[key]);
                } else {
                    hash['UNAB'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD PEDRO DE VALDIVIA' || json_tweet[key].keyword === 'UPV') {
                if(hash['UPV'] === undefined) {
                    hash['UPV'] = [];
                    hash['UPV'].push(json_tweet[key]);
                } else {
                    hash['UPV'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD SAN SEBASTIAN' || json_tweet[key].keyword === 'USS') {
                if(hash['USS'] === undefined) {
                    hash['USS'] = [];
                    hash['USS'].push(json_tweet[key]);
                } else {
                    hash['USS'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD SANTO TOMAS' || json_tweet[key].keyword === 'UST') {
                if(hash['UST'] === undefined) {
                    hash['UST'] = [];
                    hash['UST'].push(json_tweet[key]);
                } else {
                    hash['UST'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD TECNICA FEDERICO SANTA MARIA' || json_tweet[key].keyword === 'UTFSM') {
                if(hash['UTFSM'] === undefined) {
                    hash['UTFSM'] = [];
                    hash['UTFSM'].push(json_tweet[key]);
                } else {
                    hash['UTFSM'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD TECNOLOGICA DE CHILE INACAP' || json_tweet[key].keyword === 'INACAP') {
                if(hash['INACAP'] === undefined) {
                    hash['INACAP'] = [];
                    hash['INACAP'].push(json_tweet[key]);
                } else {
                    hash['INACAP'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD TECNOLOGICA METROPOLITANA' || json_tweet[key].keyword === 'UTEM') {
                if(hash['UTEM'] === undefined) {
                    hash['UTEM'] = [];
                    hash['UTEM'].push(json_tweet[key]);
                } else {
                    hash['UTEM'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD UCINF' || json_tweet[key].keyword === 'UCINF') {
                if(hash['UCINF'] === undefined) {
                    hash['UCINF'] = [];
                    hash['UCINF'].push(json_tweet[key]);
                } else {
                    hash['UCINF'].push(json_tweet[key]);
                }
            } else if(json_tweet[key].keyword === 'UNIVERSIDAD ADOLFO IBAÑEZ' || json_tweet[key].keyword === 'UAI') {
                if(hash['UAI'] === undefined) {
                    hash['UAI'] = [];
                    hash['UAI'].push(json_tweet[key]);
                } else {
                    hash['UAI'].push(json_tweet[key]);
                }
            }
        }

        console.log(hash);



        // for(i=0;i<json_tweet.length;i++) {
        //     json_response.push(json_tweet[i].text_tweet);
        // }
        res.charset = 'iso-8859-1';
        res.send(JSON.stringify(hash));
    });


});


app.post('/', function(req, res){
    var ues = [] ;

    ues[1] = "PUC";
    ues[2] = "PUCV";
    ues[4] = "UAHC";
    ues[5] = "UNACH";
    ues[6] = "UAH";
    ues[7] = "UNAP";
    ues[8] = "UACH";
    ues[9] = "UACH";
    ues[10] = "UBO";
    ues[11] = "UBOLIVARIANA";
    ues[12] = "UCSC";
    ues[13] = "UCT";
    ues[14] = "UCM";
    ues[15] = "UCN";
    ues[16] = "UCSH";
    ues[17] = "UCENTRAL";
    ues[18] = "UBRITANICA";
    ues[19] = "UACONCAGUA";
    ues[20] = "UANTOF";
    ues[21] = "UARCIS";
    ues[22] = "UNIACC";
    ues[23] = "UDA";
    ues[24] = "UCH UDECHILE UCHILE";
    ues[25] = "UDEC";
    ues[26] = "UFRO";
    ues[27] = "USERENA";
    ues[28] = "UDLA";
    ues[29] = "UANDES";
    ues[30] = "ULAGOS";
    ues[31] = "UMAG";
    ues[32] = "UPLA";
    ues[33] = "USACH UDESANTIAGO";
    ues[34] = "UTALCA";
    ues[35] = "UTA";
    ues[36] = "UV VALPARAISO";
    ues[37] = "UBIOBIO";
    ues[38] = "UDD";
    ues[39] = "UDELMAR";
    ues[40] = "UPACIFICO";
    ues[41] = "UDP";
    ues[42] = "FINIS TERRAE FINISTERRAE";
    ues[43] = "UGM";
    ues[44] = "UNICYT UIBEROAMERICANA";
    ues[45] = "SEK UISEK";
    ues[46] = "ULOSLEONES";
    ues[47] = "UMAYOR";
    ues[48] = "UMCE";
    ues[49] = "UMCERVANTES";
    ues[50] = "UNAB";
    ues[51] = "UPV";
    ues[52] = "USS";
    ues[53] = "UST";
    ues[54] = "UTFSM";
    ues[55] = "INACAP";
    ues[56] = "UTEM";
    ues[57] = "UCINF";
    ues[58] = "UAI";

    var text_query = JSON.parse(JSON.stringify(req.body));
    console.log("recibido: "+ text_query.query);
    var q = '"{query: ' + ues[text_query.query] + '}"';
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

        // for(i=0;i<json_tweet.length;i++) {
        //     json_response.push(json_tweet[i].text_tweet);
        // }
        res.charset = 'iso-8859-1';
        res.send(JSON.stringify(json_tweet));
    });
    
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