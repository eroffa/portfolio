'use strict';

(function () {
  // Блок с похожими персонажами
  var setupSimilar = window.domElement.setup.similar;

  // Загрузка данных с сервера
  // onLoad(data)
  // onError(errorMessage)
  var load = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick/data';

    var xhr = new XMLHttpRequest();

    // xhr.responseType = 'json';
    xhr.timeout = 10000;

    // Открываем запрос
    xhr.open('GET', URL);

    // Отправляем запрос
    xhr.send();

    // При успешной загрузке
    xhr.addEventListener('load', function () {
      var error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText + '/ ';

      try {
        var data = JSON.parse(xhr.responseText);
      } catch (e) {
        onError('Произошла ошибка ' + error);
        throw new Error(error + e);
      }

      switch (xhr.status) {
        case 200:
          onLoad(data);

          // Показываем список похожих персонажей
          if (setupSimilar.classList.contains('hidden')) {
            setupSimilar.classList.remove('hidden');
          }

          break;
        case 400:
          onError('Неверный запрос');
          throw new Error(error);
        case 401:
          onError('Пользователь не авторизован');
          throw new Error(error);
        case 404:
          onError('Данные не найдены');
          throw new Error(error);
        default:
          onError(error);
          throw new Error(error);
      }

      xhr.abort();
    });

    // При ошибке
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
      xhr.abort();
    });

    // При задержке
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполнится за ' + xhr.timeout + ' мл. секунд.');
      xhr.abort();
    });
  };


  // Сохранение данных на сервер
  var save = function (data, onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick';

    var xhr = new XMLHttpRequest();

    // xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.open('POST', URL);

    // Если раскомментировать ошибка 400
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // Если раскомментировать ошибка 500
    // xhr.send(JSON.stringify(data));

    xhr.send(data);

    // При успешной загрузке
    xhr.addEventListener('load', function () {
      var error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText + '/ ';

      // try {
      //   var data = JSON.parse(xhr.responseText);
      // } catch (e) {
      //   throw new Error(error + e);
      // }

      switch (xhr.status) {
        case 200:
          onLoad();
          break;
        case 400:
          onError('Неверный запрос');
          throw new Error(error);
        case 401:
          onError('Пользователь не авторизован');
          throw new Error(error);
        case 404:
          onError('Данные не найдены');
          throw new Error(error);
        case 500:
          onError('Внутренняя ошибка сервера');
          throw new Error(error);
        default:
          onError(error);
          throw new Error(error);
      }

      xhr.abort();
    });

    // При ошибке
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
      xhr.abort();
    });

    // При задержке
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполнится за ' + xhr.timeout + ' мл. секунд.');
      xhr.abort();
    });
  };


  window.backend = {
    load: load,
    save: save
  };
})();
