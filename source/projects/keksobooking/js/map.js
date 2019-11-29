'use strict';

(function () {
  // Карта объявлений
  var map = window.dom.map.mapContainer;

  // Карта активна
  var mapEnabled = function () {
    if (map.classList.contains('map--faded')) {
      map.classList.remove('map--faded');
    }
  };


  // Карта не активна
  var mapDisabled = function () {
    if (!map.classList.contains('map--faded')) {
      map.classList.add('map--faded');
    }
  };


  window.map = {
    mapEnabled: mapEnabled,
    mapDisabled: mapDisabled
  };
})();
