// Game Model: Store the Game Result.

define([
  'model/shared/Base'
], function (BaseModel) {

  'use strict';

  return BaseModel.extend({

    defaults: {
      crossPlayerName: "",
      noughtPlayerName: "",
      points: ""
    }

  });

});