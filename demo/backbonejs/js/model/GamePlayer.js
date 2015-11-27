// Game Player: Store the Players Details.

define([
  'model/shared/Base'
], function (BaseModel) {

  'use strict';

  return BaseModel.extend({
    
    localStorage: 'GamePlayer',
    
    defaults: {
      crossPlayerName: "",
      noughtPlayerName: ""
    }
  });

});