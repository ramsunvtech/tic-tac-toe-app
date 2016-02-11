// Header View.

define([
  'view/shared/Base',
  'text!templates/header.html'
], function (BaseView, headerTpl) {

  'use strict';

  return BaseView.extend({

    el: $('header'),

    render: function () {
      this.$el.html(headerTpl);
    }

  });

});