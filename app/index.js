var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var BroGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json')

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    })
  },

  askFor: function () {
    var done = this.async()
      , self = this

    // Have Yeoman greet the user.
    this.log(yosay('Sup bro'))

    var prompts = [
      {
        type: 'input',
        name: 'appname',
        message: 'Name?'
      },
      {
        type: 'input',
        name: 'appdescription',
        message: 'Description?'
      },
      {
        type: 'confirm',
        name: 'coffee',
        message: 'Do you coffeescript, bro?',
        default: true
      },
      {
        type: 'confirm',
        name: 'stylus',
        message: 'Do you stylus, bro?',
        default: true
      }
    ]

    this.prompt(prompts, function (opts) {
      Object.keys(opts).forEach(function(key) { self[key] = opts[key] })
      done()
    })
  },

  folders: function () {
    this.mkdir('public')
    this.mkdir('public/css')
    this.mkdir('public/stylus')
    this.mkdir('public/js')
    this.mkdir('public/coffee')
    this.mkdir('public/bower_components')
    this.mkdir('views')
  },

  files: function() {
    this.template('_index.js', 'index.js')
    this.template('_package.json', 'package.json')
    this.template('_bower.json', 'bower.json')
    this.template('_index.hjs', 'views/index.hjs')

    if (this.coffee) {
      this.template('_app.coffee', 'public/coffee/app.coffee')
    } else {
      this.template('_app.js', 'public/js/app.js')
    }

    if (this.stylus) {
      this.template('_app.styl', 'public/stylus/app.styl')
    } else {
      this.template('_app.css', 'public/css/app.css')
    }

    this.copy('bowerrc.json', '.bowerrc')
    this.copy('gitignore', '.gitignore')
    this.copy('editorconfig', '.editorconfig')
    this.copy('jshintrc', '.jshintrc')
  }
})

module.exports = BroGenerator;
