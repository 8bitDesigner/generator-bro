var express = require('express')
  , path = require('path')
  , port = process.env.PORT || 3000
  , app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
<% if (stylus) { %>app.use(require('stylus').middleware({ src: './public/stylus', dest: './public/css/' }))<% } %>
<% if (coffee) { %>app.use(require('connect-coffee-script')({ src:  './public/coffee', dest: './public/js/', prefix: '/js/' }))<% } %>
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index')
})

// Boot our server
app.listen(port, function() {
  console.log('Listening for requests on port', port)
})
