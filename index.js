const config = require('./config');
const path = require('path');
const express = require('express');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

const api_router = require('./api_router');
const admin_router = require('./admin_router');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(session({
  secret: 'hello, i am torzo-logger',
  cookie: { maxAge: 60 * 60 * 1000 },
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* 静态文件目录 */
const staticDir = path.join(__dirname, 'static');
app.use('/', express.static(staticDir));

app.use('/api', api_router);
app.use('/admin', admin_router);

app.listen(config.port, function () {
  console.log('started.');
});
