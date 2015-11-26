define([
  'backbone'
], function (Backbone) {

  return Backbone.Model.extend({

    initialize: function () {
      
      if( this.localStorage ) {
        var data = '{}';

        try {
          data = JSON.parse ( localStorage.getItem ( this.localStorage ) );
        }
        catch (e) {

        }
        
        this.set( data );
      }

    },

    saveItem: function () {

      var data = JSON.stringify( this.toJSON() );
      localStorage.setItem(this.localStorage, data);

    }

  });

});