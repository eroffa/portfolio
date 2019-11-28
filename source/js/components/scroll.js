'use strict';

/**
 *	Плавный скрол
 *
 */

(function () {
  var Scroll = function (selector, speed) {
    this.$elem = typeof selector === 'object' ? selector : document.querySelector(selector);
    this.$links = this.$elem.querySelectorAll('a');

    this.SPEED = speed || 1000;

    this.start();
  };

  Scroll.prototype.start = function () {
    [].map.call(this.$links, function ($link) {
      $link.addEventListener('click', function (evt) {
        evt.preventDefault();

        var $a = evt.currentTarget;
        var anchor = $a.href.replace(/[^#]*(.*)/, '$1');

        var sectionElement = document.querySelector(anchor);
        var sectionPosition = sectionElement.getBoundingClientRect().top;
        var startPosition = window.pageYOffset;

        // var sum = startPosition + sectionPosition;
        var startTime = null;

        var duration = this.SPEED;

        requestAnimationFrame(animation.bind(this));


        function animation(currentTime) {

          if (!startTime) startTime = currentTime;

          var progress = currentTime - startTime;

          var run = ease(progress, startPosition, sectionPosition, duration); // или 0

          // Если run = 0
          // if (sectionPosition < 0) {
          //   run = Math.max(startPosition - progress / duration * 100, sum); // вверх
          // } else {
          //   run = Math.min(startPosition + progress / duration * 100, sum); // вниз
          // }
          // run != sum ? requestAnimationFrame(animation.bind(this)) : location.hash = anchor;

          window.scrollTo(0, run);

          progress < duration ? requestAnimationFrame(animation) : location.hash = anchor;
        }

        function ease (t, b, c, d) {
          t /= d;
          return -c * t*(t-2) + b;
        }

      }.bind(this));
    }.bind(this));
  };

  window.Scroll = Scroll;

})();
