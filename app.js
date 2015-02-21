var express = require('express'),
    port = 3000
    app = express(),
    expressHbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    url = require('url');

app.engine('hbs', expressHbs({extname: 'hbs'}));
app.set('view engine', 'hbs');
app.set('views', __dirname);
app.set('view cache', false);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var items = [];

app.get('/', function(req, res) {
  res.render('index', {items: items});
});

app.post('/', function(req, res) {
  items.push(req.body.item);
  res.render('index', {items: items});
});

app.delete('/:id', function(req, res) {
  var pathname = url.parse(req.url).pathname;
  var i = parseInt(pathname.slice(1), 10);

  console.log(i);


  if(isNaN(i)) {
    res.statusCode = 400;
    res.end('Item id not valid');
  }
  else if(!items[i]) {
    res.statusCode = 404;
    res.end('Item not found');
  }
  else {
    console.log(items);
    items.splice(i, 1);
    console.log(items);
    res.send({redirect: '/'});
  }
});

app.put('/', function(req, res) {
  var i = req.body.index;

  if(isNaN(i)) {
    res.statusCode = 400;
    res.end('Item id not valid');
  }
  else if(!items[i]) {
    res.statusCode = 404;
    res.end('Item not found');
  }
  else {
    items[i] = req.body.item;
    res.send({redirect: '/'});
  }
});

app.listen(3000);
