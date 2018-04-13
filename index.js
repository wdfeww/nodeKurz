const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const connectMongo = require('connect-mongo');
const MongoStore = connectMongo(session);
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
const connection_string = `mongodb://eshopuser:eshoppassword@ds031988.mlab.com:31988/eshop`;
const port = 8010;

const app = express();


require('./configurator/configureHandlebars')(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
 extended: false
}));

mongoose.connect(connection_string);

   mongoose.connection.on('connected', () => {
    console.log('Mongo connected');
   });
   mongoose.connection.on('disconnected', () => {
    console.log('Mongo disconnected');
   });


app.use(
    session({
    resave: true,
    saveUninitialized: true,
    secret:'asdasdasdasdasdasd',
    store: new MongoStore({
        mongooseConnection: mongoose.connection
        })
    })
);
require('./configurator/configureCsrf')(app);// na poradi zalezi cize za session, alebo json api
app.use(( req, res, next)=>{
    res.locals.cartSize = (req.session.cart || [] ).length;
    next();
});

app.use(( req, res, next)=>{
    console.log('path', req.url);
    next();
});

// const homeRouter = require('./routers/home');
// app.use(homeRouter);
app.use(require('./routers/home'));

app.use(require('./routers/catalog'));

app.use(require('./routers/user'));

app.listen(port);
console.log(`Running at http://localhost:${port}`)