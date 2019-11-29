'use strict';

(function () {
  // Событие добавления ошибки
  var error = function (xhr, message) {
    // Шаблон с выводом ошибок
    var template = document.querySelector('#error').content;
    var errorNode = template.querySelector('.error');

    // Нода
    var errorBlock = errorNode.cloneNode(true);
    var errorMessageBlock = errorBlock.querySelector('.error__message');
    var errorButton = errorBlock.querySelector('.error__button');

    if (typeof message === 'undefined') {
      message = xhr.status + ' ' + window.assets.errorCode[xhr.status];
    }

    // Добавление текста ошибки
    errorMessageBlock.innerHTML = message;

    // Отрисовка ошибку
    document.body.insertAdjacentElement('afterbegin', errorBlock);

    // Удаление уведомления об ошибки при клике
    var onClickRemoveError = function () {
      errorBlock.remove();
      window.form.onResetForm();

      errorButton.removeEventListener('click', onClickRemoveError);
    };

    // Удаление уведомления об ошибки при нажатии ESC
    var onKeydownRemoveError = function (evt) {
      window.util.isEscEvent(evt, onClickRemoveError);
      document.removeEventListener('keydown', onKeydownRemoveError);
    };

    // События закрытия окна с уведомлением об ошибки
    errorBlock.addEventListener('click', onClickRemoveError);
    errorButton.addEventListener('click', onClickRemoveError);
    document.addEventListener('keydown', onKeydownRemoveError);
  };


  // Событие добавление уведомления об успехе
  var success = function (xhr, message) {
    // Шаблон с выводом успеха
    var template = document.querySelector('#success').content;
    var successNode = template.querySelector('.success');

    // Нода
    var successBlock = successNode.cloneNode(true);
    var successMessageBlock = successBlock.querySelector('.success__message');

    if (!message) {
      message = xhr.status + ' ' + window.assets.errorCode[xhr.status];
    }

    // Добавление текста ошибки
    successMessageBlock.innerHTML = message;

    // Отрисовка ошибку
    document.body.insertAdjacentElement('afterbegin', successBlock);

    // Удаление уведомления об успехе при клике
    var onClickRemoveSuccess = function () {
      successBlock.remove();
      window.form.onResetForm();

      successBlock.removeEventListener('click', onClickRemoveSuccess);
      document.removeEventListener('keydown', onKeydownRemoveSuccess);
    };

    // Удаление уведомления об успехе при нажатии ESC
    var onKeydownRemoveSuccess = function (evt) {
      window.util.isEscEvent(evt, onClickRemoveSuccess);

      successBlock.removeEventListener('click', onClickRemoveSuccess);
      document.removeEventListener('keydown', onKeydownRemoveSuccess);
    };

    // События закрытия окна с уведомлением об успехе
    successBlock.addEventListener('click', onClickRemoveSuccess);
    document.addEventListener('keydown', onKeydownRemoveSuccess);
  };


  window.notification = {
    success: success,
    error: error
  };
})();
