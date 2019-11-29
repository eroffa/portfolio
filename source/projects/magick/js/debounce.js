'use strict';

(function () {
  // Индикатор последнего setTimeout
  var lastTimeout;

  // Устраняет дребезг
  var debounce = function (cb) {
    var DEBOUNCE_INTERVAL = 500;

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };


  // var debounceHard = function (cb) {
  //   var DEBOUNCE_INTERVAL = 300; // ms
  //   var lastTimeout = null;

  //   return function () {
  //     var parameters = arguments;
  //     if (lastTimeout) {
  //       window.clearTimeout(lastTimeout);
  //     }
  //     lastTimeout = window.setTimeout(function () {
  //       cb.apply(null, parameters);
  //     }, DEBOUNCE_INTERVAL);
  //   };
  // };


  window.debounce = debounce;
})();
