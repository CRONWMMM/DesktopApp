/**
 * Created by CRONWMMM on 2017/12/28.
 */

const express = require('express');
// const static = require('express-static');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const config = require('./config');

let server = express();
let rootPath = path.resolve(__dirname, '..')
let dirname = 'src';
if (process.env.NODE_ENV === 'production') {
    dirname = 'dist';
}

// parse application/json
server.use(bodyParser.json());
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));

// cookie
server.use(cookieParser());

// static
server.use(express.static(path.join(rootPath, dirname)));


// views engine setup

 server.set('views', path.join(`${rootPath}/${dirname}/views`));
 server.set('view engine', 'html');
 server.engine('.html', ejs.__express);

server.get('/', (req, res) => {
    res.render('index.html', {});
});

// router
// require('./routers/main');



// catch 404 and forward to error handler
server.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
server.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(res.locals.message);
    // render the error page
    res.status(err.status || 500);
    res.redirect('/error/404');
});

server.listen(config.port);


module.exports = server;


