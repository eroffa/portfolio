'use strict';

(function () {
  // Главный пин
  var mapPinMain = window.dom.map.mapPinMain;


  // Активируем страницу при клике мыши
  var onClickPageEnabled = function (evt) {
    evt.preventDefault();

    // Активация страницы
    window.page.active();
  };


  // Активируем страницу при нажатии клавиш
  var onKeydownPageEnabled = function (evt) {
    evt.preventDefault();

    // Клавиша Enter
    window.util.isEnterEvent(evt, window.page.active);

    // Клавиша Space
    window.util.isSpaceEvent(evt, window.page.active);
  };


  // Активация страницы
  var active = function () {
    // Активируем карту объявлений
    window.map.mapEnabled();

    // Активируем фильтр объявлений
    window.filter.filterEnabled();

    // Активируем форму
    window.form.formEnabled();

    // Меняем координаты главной метки
    window.form.setAddressPinMain(true);

    // Загружаем объявления с сервера
    window.backend.loadData(function (xhr) {
      var data = xhr.response;

      // Фильтруем количество данных
      data = window.filter.filterCountData(data);

      // Добавляем пины
      window.pin.addPin(data);
    });

    // Удаляем события активации страницы
    mapPinMain.removeEventListener('mousedown', onClickPageEnabled);
    mapPinMain.removeEventListener('keydown', onKeydownPageEnabled);
  };


  // Деактивация страницы
  var deactive = function () {
    // Возврат главного пина в исходное положение
    window.pin.setPositionMapPinMainDefault();

    // Деактивируем карту объявлений
    window.map.mapDisabled();

    // Деактивируем фильтр объявлений
    window.filter.filterDisabled();

    // Деактивируем форму
    window.form.formDisabled();

    // Устанавливаем значения полей формы поумолчанию
    window.form.setFormDefault();

    // Удаляем метки объявлений
    window.pin.removePin();

    // Удаляем карточки объявлений
    window.card.removeCard();

    // Создаем события активации страницы
    mapPinMain.addEventListener('mousedown', onClickPageEnabled);
    mapPinMain.addEventListener('keydown', onKeydownPageEnabled);
  };


  window.page = {
    active: active,
    deactive: deactive
  };
})();
