// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  baseUrl: 'js/',

  paths: {
    jquery: "libs/jquery-min",
    underscore: "libs/underscore-min",
    backbone: "libs/backbone-min",
    text: "libs/requirejs/text",
    templates: "../templates"
  },

  shim: {

    underscore: {
      exports: "_"
    },

    backbone: {
      exports: "Backbone",
      deps: [
        "jquery",
        "underscore"
      ]
    }

  }

});

require([
  // Load our app module and pass it to our definition function
  'App',

], function(App){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  App.initialize();
});