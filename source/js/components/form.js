'use strict';

(function () {
  var Form = function (form) {
    this.$form = typeof form === 'object' ? form : document.querySelector(form);
    this.$name = this.$form.elements.name;
    this.$email = this.$form.elements._replyto;
    this.$message = this.$form.elements.message;
    this.$submit = this.$form.querySelector('button[type="submit"]');

    this.start();
  };

  // Старт
  Form.prototype.start = function () {
    this.$submit.addEventListener('click', this.onEdit.bind(this));
    this.$form.addEventListener('submit', this.onSubmit.bind(this));
  };

  // Валидация полей при отправке формы и редактировании полей
  Form.prototype.onEdit = function () {
    this.onValidation();

    this.$form.addEventListener('input', this.onValidation.bind(this), true);
  };

  // Отправка формы
  Form.prototype.onSubmit = function () {
    this.$form.removeEventListener('input', this.onValidation, true);
    this.$submit.removeEventListener('click', this.onEdit);
    this.$form.removeEventListener('submit', this.onSubmit);
  };

  // Валидация полей
  Form.prototype.onValidation = function () {
    this.validateName();
    this.validateEmail();
  };

  // Валидация поля имени
  Form.prototype.validateName = function () {
    var length = this.$name.value.length;
    var min = 2;
    var max = 16;

    if (!length) {
      this.error = 'Введите ваше имя';
    } else if (length > max) {
      this.error = 'Имя не должно превышать ' + max + ' символов';
    } else if (length < min) {
      this.error = 'Имя не должно быть меньше ' + min + ' символов';
    } else {
      this.error = '';
    }

    this.alert(this.$name);
  };

  // Валидация поля email
  Form.prototype.validateEmail = function () {
    var length = this.$email.value.length;
    var pattern  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!length) {
      this.error = 'Введите ваш email';
    } else if (!pattern.test(this.$email.value)) {
      this.error = 'Вы ввели не верный email';
    } else {
      this.error = '';
    }

    this.alert(this.$email);
  };

  // Уведомление об ошибке
  Form.prototype.alert = function (input) {
    var parent = input.parentElement;

    if (this.error) {
      input.setCustomValidity(this.error);
      parent.classList.add('error');

      this.addError(parent);
    } else {
      input.setCustomValidity('');
      parent.classList.remove('error');

      this.removeError(parent);
    }
  };

  // Добавляем ошибку
  Form.prototype.addError = function (elem) {
    this.removeError(elem);

    this.$log = document.createElement('div');
    this.$log.classList.add('contact__form-item-error');
    this.$log.textContent = this.error;
    elem.insertAdjacentElement('beforebegin', this.$log);

  };

  // Удаляем ошибку
  Form.prototype.removeError = function (elem) {
    this.$log = elem.parentElement.querySelector('.contact__form-item-error');
    if (this.$log) elem.parentElement.removeChild(this.$log);
  };


  window.Form = Form;
})();
