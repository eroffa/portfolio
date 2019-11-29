'use strict';

(function () {
  // Окно персонажей
  var setup = window.domElement.setup.setup;

  // Закрузка аватара пользователя и перемещение окна
  var setupUload = window.domElement.setup.upload;

  // Открывает окно персонажей
  var setupOpen = window.domElement.setup.buttonOpen;
  var iconSetupOpen = window.domElement.setup.iconButtonOpen;

  // Закрывает окно персонажей
  var setupClose = window.domElement.setup.buttonClose;

  // Поле ввода имени персонажа
  var setupUserName = window.domElement.setup.inputName;

  // Открытие попап окна с настройками персонажа
  var openSetup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onSetupEscPress);
  };

  // Закрытие попап окна с настройками персонажа
  var closeSetup = function () {
    setup.classList.add('hidden');
    setup.removeAttribute('style');

    document.removeEventListener('keydown', onSetupEscPress);
  };

  // Открытие попап окна с настройками персонажа при нажатии на ENTER
  var onSetupOpenEnterPress = function (evt) {
    window.util.isEnterEvent(evt, openSetup);
  };

  // Закрытие попап окна с настройками персонажа при нажатии на ENTER
  var onSetupCloseEnterPress = function (evt) {
    window.util.isEnterEvent(evt, closeSetup);
  };

  // Закрытие попап окна с настройками персонажа при нажатии на ESC
  var onSetupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeSetup);
  };

  // Событие клика на иконку пользователя
  setupOpen.addEventListener('click', function (evt) {
    evt.preventDefault();

    openSetup();
  });

  // Событие клика на крестик
  setupClose.addEventListener('click', function (evt) {
    evt.preventDefault();

    closeSetup();
  });

  // При фокусе на иконке пользователя добавляем обработчик события ENTER
  iconSetupOpen.addEventListener('focus', function () {
    document.addEventListener('keydown', onSetupOpenEnterPress);
  });
  // При отмене фокуса на иконке пользователя убираем обработчик события ENTER
  iconSetupOpen.addEventListener('blur', function () {
    document.removeEventListener('keydown', onSetupOpenEnterPress);
  });

  // При фокусе на поле ввода имени добавляем обработчик события ESC
  setupUserName.addEventListener('focus', function () {
    document.removeEventListener('keydown', onSetupEscPress);
  });
  // При отмене фокуса на поле ввода имени убираем обработчик события ESC
  setupUserName.addEventListener('blur', function () {
    document.addEventListener('keydown', onSetupEscPress);
  });

  // При фокусе на крестике добавляем обработчик события ENTER
  setupClose.addEventListener('focus', function () {
    document.addEventListener('keydown', onSetupCloseEnterPress);
  });
  // При отмене фокуса на крестике добавляем убираем обработчик события ENTER
  setupUserName.addEventListener('blur', function () {
    document.removeEventListener('keydown', onSetupCloseEnterPress);
  });

  // Перемещение окна настроек персонажа
  setupUload.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - evtMove.clientX,
        y: startCoords.y - evtMove.clientY
      };

      startCoords.x = evtMove.clientX;
      startCoords.y = evtMove.clientY;

      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
      setup.style.top = (setup.offsetTop - shift.y) + 'px';
    };

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();

      if (dragged) {
        var onClickPreventDefault = function (evtClick) {
          evtClick.preventDefault();
          setupUload.removeEventListener('click', onClickPreventDefault);
        };

        setupUload.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.dialog = {
    closeSetup: closeSetup
  };
})();
