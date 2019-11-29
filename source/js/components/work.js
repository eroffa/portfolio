'use strict';

/**
 * Взаимодействие с работами
 *
 * @param this.$content object Главный контейнер в котором находятся секции миниатюр и описания
 * @param this.$list object Секция с миниатюрами
 * @param this.$links object Ссылки на работы
 * @param this.$full object Обертка для секции с описанием
 * @param this.$info object Секция с описанием
 * @param this.$backButtons object Кнопки вернуться назад
 *
 * @returns void
 */

(function () {
  var Work = function () {
    this.$content = document.querySelector('.work__content');

    this.$list = this.$content.querySelector('.work__list');
    this.$links = this.$list.querySelectorAll('.work__item-link');

    this.$full = this.$content.querySelector('.work__full');
    this.$info = this.$full.querySelector('.work__full-info');
    this.$backButtons = this.$full.querySelectorAll('.work__full-back');

    this.start();
  };

  /**
   * Запуск логики
   *
   * @param file string Содержимое атрибута data-file
   * @param url string Путь до файла с работой
   * @param spiner string Анимация загрузки
   * @param spiner string Анимация загрузки
   * @param success function Успех загрузки
   * @param error function Провал загрузки
   *
   * @returns void
   */
  Work.prototype.start = function () {
    [].map.call(this.$links, function ($link) {
      // При нажатии на работы
      $link.addEventListener('click', function (evt) {
        evt.preventDefault();

        var file = $link.dataset.file;
        var url = '../works/' + file + '.html';
        var spiner = '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';

        this.$backButtons[0].textContent = $link.querySelector('.work__item-title').textContent;
        this.$info.innerHTML = spiner;

        this.$content.style.left = '-100%';
        this.actionButton($link);

        this.return(this.$content.parentElement);

        this.load(url, {
          success: success,
          error: error
        });

        function success(response) {
          this.$backButtons[1].classList.remove('hidden');

          this.$info.innerHTML = response;

          this.sizeOpen();
        }

        function error(xhr) {
          this.$backButtons[0].textContent = 'Что то пошло не так. Не удалось загрузить работу.';
          this.$info.textContent = xhr.status + ' ' + xhr.statusText;
        }
      }.bind(this));
    }.bind(this));
  };

  /**
   *	Подгоняет высоту главного контейнера this.$content под содержимое
   * при открытии работы
   *
   * @param startInfoHeight number Начальная высота секции с описанием
   * @param interval number Уникальный номер интервала
   *
   * @returns void
   */
  Work.prototype.sizeOpen = function () {
    this.$info.style.height = 'auto';
    var startInfoHeight = this.$info.clientHeight;

    var interval = setInterval(function () {
      var currentInfoHeight = this.$info.clientHeight;

      if (currentInfoHeight - startInfoHeight > 0) {
        this.$content.style.height = this.$full.clientHeight + 'px';
        clearInterval(interval);
      }
    }.bind(this), 100);
  };

  /**
   *	Подгоняет высоту главного контейнера this.$content под содержимое
   * при закрытии работы
   *
   * @returns void
   */
  Work.prototype.sizeClose = function () {
    this.$info.style.height = 0;
    this.$content.style.height = 'auto';
  };

  /**
   *	Взаимодействие с кнопками вернуться назад
   *
   * @param $button object Текущая кнопка вернуться назад
   *
   * @returns void
   */
  Work.prototype.actionButton = function ($link) {
    [].map.call(this.$backButtons, function ($button) {
      // При нажатии на кнопки назад
      $button.addEventListener('click', function (evt) {
        evt.preventDefault();

        this.$content.style.left = '0';
        this.$backButtons[1].classList.add('hidden');

        this.sizeClose();

        this.return($link);

      }.bind(this));
    }.bind(this));
  };

  /**
   *	Загрузка работы
   *
   * @param xhr object Ajax запрос
   *
   * @returns void
   */
  Work.prototype.load = function (url, obj) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        obj.success.call(this, xhr.responseText);
      } else {
        obj.error.call(this, xhr);
      }
    }.bind(this));

    xhr.addEventListener('error', function () {
      if (xhr.status !== 200) {
        obj.error.call(this, xhr);
      }
    }.bind(this));

    xhr.send();
  };

  /**
   *	Прокручивает страницу к указанному элементу
   *
   * @param startPosition number Позиция нахождения пользователя на странице
   * @param duration number Интервал времени
   * @param duration number Интервал времени
   * @param startTime number Начальное время прокрутки
   * @param animation function Анимация прокрутки
   * @param ease function Формула анимации
   */
  Work.prototype.scroll = function (endPosition) {
    var startPosition = window.pageYOffset;
    var duration = 1000;
    var startTime = null;

    requestAnimationFrame(animation);

    /**
     *	@param currentTime number Текущее время прокрутки
     *	@param progress number Разница во времени
     *	@param run number Текущая позиция прокрутки
     *
     * @returns void
     */
    function animation(currentTime) {
      if (!startTime) startTime = currentTime;

      var progress = currentTime - startTime;

      var run = ease(progress, startPosition, endPosition, duration);

      window.scrollTo(0, run);

      if (progress < duration) {
        requestAnimationFrame(animation);
      }
    }

    function ease(t, b, c, d) {
      t /= d;
      return -c * t * (t - 2) + b;
    }
  };

  /**
   *	Возврат пользователя на указанную позицию
   *
   * @returns void
   */
  Work.prototype.return = function ($elem) {
    setTimeout(function () {
      this.scroll($elem.getBoundingClientRect().top);
    }.bind(this), 600);
  };

  window.Work = Work;
})();
