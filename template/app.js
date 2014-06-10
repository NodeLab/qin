
/**
 * Module dependencies.
 */

var express = require('express')
	routes = require('./routes'),
	http = require('http'),
	path = require('path'),
	app = express();



// set environment
app.set('env', 'development');

// all environments
app.set('port', process.env.PORT || 9100);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({ 
		uploadDir: path.join(__dirname, 'public/images'),
		keepExtensions:true
}));

app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/push', routes.push);
app.post('/uploadpic', routes.uploadpic);

app.post('/publish', routes.publish);

app.get('/project/:name/*?', routes.project);
app.get('/project/:name', routes.project);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
