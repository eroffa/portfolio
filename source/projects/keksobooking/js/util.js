'use strict';

(function () {
  // Клавиши
  var Key = {
    ENTER: 13,
    SPACE: 32,
    ESC: 27
  };


  // Нажатие клавиши ESC
  var isEscEvent = function (evt, action) {
    if (evt.keyCode === Key['ESC']) {
      action();
    }
  };


  // Нажатие клавиши ENTER
  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === Key['ENTER']) {
      action();
    }
  };


  // Нажатие клавиши SPACE
  var isSpaceEvent = function (evt, action) {
    if (evt.keyCode === Key['SPACE']) {
      action();
    }
  };


  // Случайное число
  var randomVal = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };


  // Случайная строка
  var randomString = function (lenghtOffer) {
    if (!lenghtOffer || lenghtOffer <= 0) {
      lenghtOffer = 250;
    }

    var letterEn = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var letterRu = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'э', 'ю', 'я', 'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Э', 'Ю', 'Я'];
    var letterNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    var letterSymb = ['!', '@', '#', '$', '%', '&', '?', '-', '+', '=', '~'];
    var abc = [
      letterEn,
      letterRu,
      letterNum,
      letterSymb
    ];

    var str = '';

    for (var i = 0, j = 0; i < lenghtOffer; i++, j++) {
      var abcRandom = abc[randomVal(0, abc.length - 1)];
      var letterRandom = abcRandom[randomVal(0, abcRandom.length - 1)];

      if (j === 5) {
        str += ' ';
        j = 0;
      }

      str += String(letterRandom);
    }

    return str;
  };


  // Клонирование объектов
  var cloneObj = function (obj) {
    var clone = {};

    for (var i = 0; i < obj.length; i++) {
      clone[i] = obj[i];
    }

    return clone;
  };


  // Множетсвенные события
  var manyEvents = function (events, callback) {
    events.forEach(function (item) {
      callback(item);
    });
  };


  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    isSpaceEvent: isSpaceEvent,

    randomString: randomString,
    randomVal: randomVal,

    cloneObj: cloneObj,
    manyEvents: manyEvents
  };
})();
