'use strict';

(function () {
  // Инициализация проекта
  var init = function () {
    // Деактивируем страницу
    window.page.deactive();

    // Слушаем форму
    window.form.listenForm();
  };


  // Запускаем проект
  document.addEventListener('DOMContentLoaded', function () {
    init();
  });
})();
