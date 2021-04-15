var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./gql/gql_schemas');
const resolvers = require('./gql/resolvers');

const apollo = new ApolloServer({ typeDefs,resolvers });
const gqlPath = '/graphql';

var app = express();

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

apollo.applyMiddleware({app , gqlPath});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
