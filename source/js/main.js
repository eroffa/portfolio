'use strict';

(function () {
  var init = function () {
    new window.Form('form[name="form"]');
    new window.Scroll('.nav');
    new window.Work();
  };

  document.addEventListener('DOMContentLoaded', init);
})();
