'use strict';

(function () {
  var Work = function () {
    this.$content = document.querySelector('.work__content');

    this.$list = this.$content.querySelector('.work__list');
    this.$links = this.$list.querySelectorAll('.work__item-link');

    this.$full = this.$content.querySelector('.work__full');
    this.$info = this.$full.querySelector('.work__full-info');
    this.$backButtons = this.$full.querySelectorAll('.work__full-back');

    this.TIME = 500;

    this.start();
  };

  Work.prototype.start = function () {
    [].map.call(this.$links, function ($link) {
      // При нажатии на работы
      $link.addEventListener('click', function (evt) {
        evt.preventDefault();

        var file = $link.dataset.file;
        var url = '../works/' + file + '.html';
        var $spiner = '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';

        this.$backButtons[0].textContent = $link.querySelector('.work__item-title').textContent;
        this.$info.innerHTML = $spiner;

        this.$content.style.left = '-100%';
        this.actionButton($link);

        this.load(url, {success, error});

        function success (response) {
          setTimeout(function () {
            this.$info.innerHTML = response;
            this.$backButtons[1].classList.remove('hidden');
          }.bind(this), this.TIME);


          setTimeout(function () {
            this.size(true);

            var posWork = this.$content.parentElement.getBoundingClientRect().top;
            this.scroll(posWork);
          }.bind(this), this.TIME + 100);
        };

        function error (xhr) {
          this.$backButtons[0].textContent = 'Что то пошло не так. Не удалось загрузить работу.';
          this.$info.textContent = xhr.status + ' ' + xhr.statusText;
        };
      }.bind(this));
    }.bind(this));



  };

  Work.prototype.actionButton = function ($link) {
    [].map.call(this.$backButtons, function ($button) {
      // При нажатии на кнопки назад
      $button.addEventListener('click', function (evt) {
        evt.preventDefault();

        this.$content.style.left = '0';
        this.$backButtons[1].classList.add('hidden');
        this.size();

        setTimeout(function () {
          var posLink = $link.getBoundingClientRect().top;
          this.scroll(posLink);
        }.bind(this), this.TIME + 100);

      }.bind(this));
    }.bind(this));
  };

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
  }

  Work.prototype.sleep = function (cb) {
    var time = 600;
    window.setTimeout(cb, time);
  };

  Work.prototype.size = function (toggle) {
    // var heightContent = this.$content.getBoundingClientRect().height;
    var heightList = this.$list.getBoundingClientRect().height;
    var heightFull = this.$full.getBoundingClientRect().height;

    if (toggle) {
      this.$content.style.height = heightFull + 'px';
    } else {
      this.$content.style.height = heightList + 'px';
    }
  };

  Work.prototype.scroll = function (endPosition) {
    var startPosition = window.pageYOffset;
    var duration = 1000;
    var startTime = null;

    requestAnimationFrame(animation);

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;

      var progress = currentTime - startTime;

      var run = ease(progress, startPosition, endPosition, duration);

      window.scrollTo(0, run);

      if (progress < duration) {
        requestAnimationFrame(animation);
      }
    }

    function ease (t, b, c, d) {
      t /= d;
      return -c * t*(t-2) + b;
    }
  };

  window.Work = Work;
})();
