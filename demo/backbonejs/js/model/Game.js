define([
  'model/Base'
], function (BaseModel) {

  return BaseModel.extend({

    defaults: {
      crossPlayerName: "",
      noughtPlayerName: "",
      win: "",
      draw: ""
    }

  });

});