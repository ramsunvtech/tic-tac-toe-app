define([
  'model/Base'
], function (BaseModel) {

  return BaseModel.extend({

    localStorage: 'GamePlayer',
    
    defaults: {
      crossPlayerName: "",
      noughtPlayerName: ""
    }
  });

});