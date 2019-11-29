'use strict';

(function () {
  // Передает сообщение об ошибке
  var getErrorMessage = function (status, text) {
    var errorCode = window.assets.errorCode;
    var errorMessage = '';

    if (status === window.assets.successCode) {
      return errorMessage;
    }

    if (status && errorCode[status]) {
      errorMessage = status + ' Ошибка. ' + errorCode[status];
    } else {
      errorMessage = 'Не удалось получить данные: <br>' + status;
    }

    if (text && text.length > 0) {
      errorMessage += ' ' + text;
    }

    return errorMessage;
  };


  // Запрос к серверу
  var request = function (method, url, callback, data, type) {
    // Текст ошибок
    var errorMessage = '';

    // Запрос
    var xhr = new XMLHttpRequest();

    // Тип запроса, по умолчанию json
    if (type && typeof type === 'string') {
      xhr.responseType = type;
    } else {
      xhr.responseType = window.assets.responseType;
    }

    // Если запрос завершен
    xhr.addEventListener('load', function () {
      // Если не успешно
      if (xhr.status !== window.assets.successCode) {
        errorMessage = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;

        callback.error(xhr, callback.errorText);
        throw new Error(errorMessage);
      }

      // Если успешно
      callback.success(xhr, callback.successText);

      // Глобальные данные
      // window.data = xhr.response;
    });

    // Если возникли ошибки
    xhr.addEventListener('error', function () {
      errorMessage = getErrorMessage(xhr.status, xhr.statusText);

      callback.error(errorMessage);
      throw new Error(errorMessage);
    });

    // Если время запроса вышло
    xhr.addEventListener('timeout', function () {
      errorMessage = 'Ожидание превысило ' + String(xhr.timeout / window.assets.timeOut) + ' секунд.';

      callback.error(xhr, errorMessage);
      throw new Error(errorMessage);
    });


    // Отправляет запрос
    xhr.timeout = window.assets.timeOut; // 10 sec
    xhr.open(method, url);
    xhr.send(data);
  };


  // Загрузка данных
  var loadData = function (onSuccess, onError) {
    var callback = {
      success: onSuccess,
      error: onError ? onError : window.notification.error
    };

    request('GET', window.assets.link.load, callback);
  };

  // Отправка данных
  var uploadData = function (data, onSuccess, onError) {
    var callback = {
      success: onSuccess,
      error: onError ? onError : window.notification.error
    };

    request('POST', window.assets.link.save, callback, data);
  };


  window.backend = {
    request: request,
    getError: getErrorMessage,
    loadData: loadData,
    uploadData: uploadData
  };
})();
