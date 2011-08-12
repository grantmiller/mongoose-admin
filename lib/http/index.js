var express = require('express');

var app = express.createServer()
    , routes = require('./routes')
    , routesJson = require('./routes/json');

module.exports = app;


app.set('view options', { doctype: 'html' });
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.set('title', 'Mongoose-Admin');

app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'mongoose-admin' }));

app.use(express.favicon());
app.use(app.router);
app.use(express.static(__dirname + '/static'));

app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/logout', routes.logout);
app.get('/model/:modelName', routes.model);
app.get('/model/:modelName/document/:documentId', routes.document);

app.post('/json/login', routesJson.login);
app.get('/json/documents', routesJson.documents);
app.post('/json/model/:collectionName/document', routesJson.createDocument);
app.put('/json/model/:collectionName/document', routesJson.updateDocument);
