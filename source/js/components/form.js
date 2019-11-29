'use strict';

/**
*	Форма отправки сообщения
*
* @param this.$form object Форма отправки сообщения
* @param this.$name object Поле имя
* @param this.$email object Поле email
* @param this.$message object Поле сообщение
* @param this.$submit object Кнопка отправки формы
* @param error string Текст ошибки валидации
* @param this.$log object Элемент отображающий ошибку
*
* @return void
*/

(function () {
  var Form = function (form) {
    this.$form = typeof form === 'object' ? form : document.querySelector(form);
    this.$name = this.$form.elements.name;
    this.$email = this.$form.elements._replyto;
    this.$message = this.$form.elements.message;
    this.$submit = this.$form.querySelector('button[type="submit"]');

    this.error = null;
    this.$log = null;

    this.start();
  };

  /**
  *	Запуск логики формы
  *
  * @return void
  */
  Form.prototype.start = function () {
    this.$submit.addEventListener('click', this.onEdit.bind(this));
    this.$form.addEventListener('submit', this.onSubmit.bind(this));
  };

  /**
   * Валидация формы при отправке и редактировании полей
   *
   * @return void
   */
  Form.prototype.onEdit = function () {
    this.onValidation();

    this.$form.addEventListener('input', this.onValidation.bind(this), true);
  };

  /**
  *	Отправка формы
  *
  * @return void
  */
  Form.prototype.onSubmit = function () {
    this.$form.removeEventListener('input', this.onValidation, true);
    this.$submit.removeEventListener('click', this.onEdit);
    this.$form.removeEventListener('submit', this.onSubmit);
  };

  /**
  *	Валидация полей
  *
  * @return void
  */
  Form.prototype.onValidation = function () {
    this.validateName();
    this.validateEmail();
  };

  /**
  *	Валидация поля имени
  *
  * @param length number Количество введенных знаков
  * @param min number Минимальное значение введенных данных
  * @param max number Максимальное значение введенных данных
  *
  * @return void
  */
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

  /**
  *	Валидация поля email
  *
  * @param length number Количество введенных знаков
  * @param pattern object Шаблон для email
  *
  * @return void
  */
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

  /**
  *	Уведомление об ошибке
  *
  * @param parent object Родительский элемент в котором находится input
  *
  * @return void
  */
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

  /**
  * Отображение ошибки валидации
  *
  * @return void
  */
  Form.prototype.addError = function (elem) {
    this.removeError(elem);

    this.$log = document.createElement('div');
    this.$log.classList.add('contact__form-item-error');
    this.$log.textContent = this.error;
    elem.insertAdjacentElement('beforebegin', this.$log);
  };

  /**
  * Удаление ошибки валидации
  *
  * @return void
  */
  Form.prototype.removeError = function (elem) {
    this.$log = elem.parentElement.querySelector('.contact__form-item-error');
    if (this.$log) elem.parentElement.removeChild(this.$log);
  };


  window.Form = Form;
})();
