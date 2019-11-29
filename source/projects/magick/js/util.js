'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  // Случайное число
  var randomVal = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Генерация цвета
  var getRandomColor = function (arrayColors) {
    return arrayColors[randomVal(0, arrayColors.length - 1)];
  };

  // Нажатине на ESC
  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  // Нажатие на ENTER
  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  // При провале
  var onError = function (errorMessage) {
    var element = document.createElement('div');
    element.classList.add('error-block');
    element.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', element);
  };


  window.util = {
    randomVal: randomVal,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomColor: getRandomColor,
    onError: onError
  };
})();
