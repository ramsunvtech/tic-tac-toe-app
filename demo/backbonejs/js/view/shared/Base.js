define([
  'backbone'
], function (Backbone) {

  return Backbone.View.extend({
    
    initialize: function () {
      this.processTemplate();
      this.render();
    },

    processTemplate: function () {
      if( this.template ) {
        var tpl = _.template(this.template),
            data = this.templateHelpers();
        this.$el.html( tpl(data) );
      }
    }
  });

});