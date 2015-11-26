// Base View.

define([
  'backbone'
], function (Backbone) {

  'use strict';

  return Backbone.View.extend({
    
    /**
     *  Trigger on every View Instantiation which is extending from Base View.
     *  Process the Template using underscore template `_.template` Method.
     *  Finally calling the Render Method.
     */
    initialize: function () {
      this.processTemplate();
      this.render();
    },

    /**
     *  Process the given `this.template` and `this.templateHelpers()` (template data).
     *  Set it to the View Element HTML.
     */
    processTemplate: function () {
      if( this.template ) {
        var tpl = _.template(this.template),
            data = this.templateHelpers();
        this.$el.html( tpl(data) );
      }
    }
  });

});