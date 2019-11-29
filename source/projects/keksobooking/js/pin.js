'use strict';

(function () {
  // Главный пин
  var mapPinMain = window.dom.map.mapPinMain;
  var mapPins = window.dom.map.mapPins;

  // Высота заостренного элемента метки
  var mapPinMainAfterHeight = parseInt(window.getComputedStyle(mapPinMain, '::after').height, 10);


  // Добавление меток
  var addPin = function (offers) {
    var fragment = document.createDocumentFragment();

    offers.forEach(function (value) {
      var mapItem = renderPin(value);
      fragment.appendChild(mapItem);
    });

    mapPins.appendChild(fragment);
  };


  // Создание меток
  var renderPin = function (offer) {
    var templatePin = document.querySelector('#pin').content;
    var mapPin = templatePin.querySelector('.map__pin');

    var itemPin = mapPin.cloneNode(true);
    var img = itemPin.querySelector('img');

    itemPin.setAttribute('tabindex', 0);

    itemPin.setAttribute('style', 'left: ' + offer.location.x + 'px; top: ' + offer.location.y + 'px;');
    img.src = offer.author.avatar;
    img.alt = offer.offer.title;

    itemPin.addEventListener('click', function (evt) {
      evt.preventDefault();

      window.card.addCard(offer);

      itemPin.classList.add('map__pin--active');
    });

    return itemPin;
  };


  // Удаление меток
  var removePin = function () {
    var pins = document.querySelectorAll('.map__pin');

    // Удаляем все пины кроме главного
    pins.forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        item.parentNode.removeChild(item);
      }
    });
  };


  // Диактивация меток
  var deactivatePin = function () {
    // Активный пин объявления
    var mapPinActive = window.dom.map.mapPins.querySelector('.map__pin--active');

    if (mapPinActive) {
      mapPinActive.classList.remove('map__pin--active');
    }
  };


  // Возврат главного пина в исходное положение
  var setPositionMapPinMainDefault = function () {
    mapPinMain.style.top = window.assets.locateMainPin.y + 'px';
    mapPinMain.style.left = window.assets.locateMainPin.x + 'px';
  };


  // Перемещение главного пина
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };


    // Перемещение метки
    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();

      // Смещение координат
      var shiftCoords = {
        x: startCoords.x - evtMove.clientX,
        y: startCoords.y - evtMove.clientY
      };

      // Перезадаем стартовую позицию
      startCoords.x = evtMove.clientX;
      startCoords.y = evtMove.clientY;

      // Расстояние главной метки от начала карты
      var mapPinMainTop = mapPinMain.offsetTop - shiftCoords.y;
      var mapPinMainLeft = mapPinMain.offsetLeft - shiftCoords.x;

      // Допустимые значения для смещения главной метки по оси X
      var shiftMapPinMainX = {
        min: window.assets.sizeMap['WIDTH_MIN'] - (mapPinMain.offsetWidth / 2),
        max: window.assets.sizeMap['WIDTH_MAX'] - (mapPinMain.offsetWidth / 2)
      };

      // Допустимые значения для смещения главной метки по оси Y
      var shiftMapPinMainY = {
        min: window.assets.sizeMap['HEIGHT_MIN'] - (mapPinMain.offsetHeight / 2),
        max: window.assets.sizeMap['HEIGHT_MAX'] - mapPinMainAfterHeight
      };

      // Изменение положения метки по оси Y
      if (mapPinMainTop >= shiftMapPinMainY.min && mapPinMainTop <= shiftMapPinMainY.max) {
        mapPinMain.style.top = mapPinMainTop + 'px';
      }

      // Изменение положения метки по оси X
      if (mapPinMainLeft >= shiftMapPinMainX.min && mapPinMainLeft <= shiftMapPinMainX.max) {
        mapPinMain.style.left = mapPinMainLeft + 'px';
      }

      // Описываем координаты главной метки в поле адрес
      window.form.setAddressPinMain(true);
    };


    // Отмена перемещения метки
    var onMouseUp = function (evtDown) {
      evtDown.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  window.pin = {
    addPin: addPin,
    deactivatePin: deactivatePin,
    removePin: removePin,
    mapPinMainAfterHeight: mapPinMainAfterHeight,
    setPositionMapPinMainDefault: setPositionMapPinMainDefault
  };
})();
