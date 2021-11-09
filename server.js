var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});

// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});
// contact page
app.get('/contact', function(req, res) {
  res.render('pages/contact');
});
// product page
app.get('/product', function(req, res) {
  res.render('pages/product');
});
app.listen(8080);
console.log('Server is listening on port 8080');