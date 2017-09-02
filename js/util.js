'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getUniqueRandomElement: function (arr) {
      if (arr.length === 1) {
        return [arr[0], []];
      }
      var randomIndex = Math.floor(Math.random() * arr.length);
      var selectedElement = arr.splice(randomIndex, 1);
      return [selectedElement, arr];
    }
  };
})();
