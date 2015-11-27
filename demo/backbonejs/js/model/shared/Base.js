// Base Model.

define([
  'backbone'
], function (Backbone) {

  'use strict';

  return Backbone.Model.extend({

    /**
     *  Trigger on every Model Instantiation which is extending from Base Model.
     *  Read the `localStorage` for setting from localStorage to Model.
     */
    initialize: function () {
      
      if( this.localStorage ) {
        var data = '{}';

        try {
          data = JSON.parse ( localStorage.getItem ( this.localStorage ) );
        }
        catch (e) {
          console.log(e);
        }
        
        this.set( data );
      }

    },

    /**
     *  Stringify the Model data
     *  Store the string it in localStorage in given property name `localStorage`.
     */
    saveItem: function () {

      var data = JSON.stringify( this.toJSON() );
      localStorage.setItem(this.localStorage, data);

    }

  });

});