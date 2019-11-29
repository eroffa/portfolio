'use strict';

(function () {
  // DOM элементы формы
  var form = window.dom.form.adForm;
  var fieldsetsForm = window.dom.form.fieldsets;
  var titleForm = window.dom.form.title;
  var typeForm = window.dom.form.type;
  var priceForm = window.dom.form.price;
  var roomsForm = window.dom.form.rooms;
  var capacityForm = window.dom.form.capacity;
  var addressForm = window.dom.form.address;

  var submitForm = window.dom.form.submit;
  var resetForm = window.dom.form.reset;

  // Миниатюра объявления
  var avatarUploadImg = window.dom.form.avatar.img;
  var avatarUploadDrop = window.dom.form.avatar.drop;

  // Миниатюры фотографий
  var thumbUploadDrop = window.dom.form.thumb.drop;
  var thumbUploadImg = window.dom.form.thumb.img;

  // Данные с формы
  var dataReader = new FormData();

  var fileTypes = window.assets.fileTypes;


  // Активируем форму
  var formEnabled = function () {
    if (form.classList.contains('ad-form--disabled')) {
      form.classList.remove('ad-form--disabled');
    }

    fieldsetsForm.forEach(function (value) {
      value.removeAttribute('disabled');
    });
  };


  // Дизактивируем форму
  var formDisabled = function () {
    if (!form.classList.contains('ad-form--disabled')) {
      form.classList.add('ad-form--disabled');
    }

    fieldsetsForm.forEach(function (value) {
      value.setAttribute('disabled', true);
    });
  };


  // Устанавливаем координаты главной метки  поле адрес
  var setAddressPinMain = function (statePage) {
    // Главная метка
    var mapPinMain = window.dom.map.mapPinMain;

    // Высота заостренного элемента метки
    var mapPinMainAfterHeight = window.pin.mapPinMainAfterHeight;

    // Координаты главной метки
    var locatePinMain = window.util.cloneObj(window.assets.locateMainPin);

    // Если страница активна координаты от нижней стороны метки
    // Если страница не активна координаты от центра метки
    if (statePage) {
      locatePinMain.x = Math.floor(mapPinMain.offsetLeft + (mapPinMain.offsetWidth / 2));
      locatePinMain.y = Math.floor(mapPinMain.offsetTop + mapPinMain.offsetHeight + mapPinMainAfterHeight - 5);
    } else {
      locatePinMain.x = Math.floor(mapPinMain.offsetLeft + (mapPinMain.offsetWidth / 2));
      locatePinMain.y = Math.floor(mapPinMain.offsetTop + (mapPinMain.offsetHeight / 2));
    }

    // Координаты метки
    addressForm.value = locatePinMain.x + ', ' + locatePinMain.y;
  };


  // Соотношение типа жилья с ценой
  var setTypeHousePrice = function () {
    // Поле тип жилья
    var selectedTypeHouse = typeForm.options[typeForm.options.selectedIndex];

    // Значения поля
    var value = selectedTypeHouse.value;

    // Конфигурации для поля тип жилья
    var typePrice = window.assets.typePrice;

    // Значение конфигурации
    var typePriceValue = typePrice[value];

    // Устанавливаем значения у поля с ценой
    priceForm.placeholder = typePriceValue;
    priceForm.setAttribute('min', typePriceValue);
  };


  // Соотношение количества комнат с количеством мест
  var setRoomsCapacity = function () {
    // Поле количество комнат
    var selectedRoomsHouse = roomsForm.options[roomsForm.options.selectedIndex];

    // Количество комнат
    var roomValue = selectedRoomsHouse.value;

    // Конфигурация количества комнат
    var config = window.assets.roomCapacity;


    // Проверяем каждое поле количество мест
    [].map.call(capacityForm, function (capacity) {
      var capacityValue = capacity.value;

      // Если количество мест удовлетворяет конфигурации, то оставляем
      if (config[roomValue].includes(capacityValue)) {
        capacity.setAttribute('selected', 'selected');
        capacity.classList.remove('hidden');
      } else {
        capacity.removeAttribute('selected');
        capacity.classList.add('hidden');
      }
    });
  };


  // Синхронизация времени заезда и времени выезда
  var setTimeInOut = function () {
    var timeIn = form.querySelector('#timein');
    var timeOut = form.querySelector('#timeout');

    var onClickTimein = function () {
      timeOut.value = timeIn.value;
    };

    var onClickTimeout = function () {
      timeIn.value = timeOut.value;
    };

    timeIn.addEventListener('click', onClickTimein);
    timeOut.addEventListener('click', onClickTimeout);
  };


  // Аватарка по умолчанию
  var setAvatarDefault = function () {
    avatarUploadImg.src = window.assets.pathAvatar;
    dataReader.delete('avatar');
  };


  // Фотографии по умолчанию
  var setPhotoDefault = function () {
    var thumbs = document.querySelectorAll('.ad-form__photo');

    thumbs.forEach(function (thumb) {
      if (thumb.querySelector('img')) {
        thumb.remove();
      }
    });

    dataReader.delete('images');
  };


  // Установка значений полей формы по умолчанию
  var setFormDefault = function () {
    // Устанавливаем координаты главной метки по умолчанию
    setAddressPinMain();

    // Устанавливаем соотношение типа жилья с ценой
    setTypeHousePrice();

    // Устанавливаем соотношение количества комнат с количеством мест
    setRoomsCapacity();

    // Синхронизируем временя заезда и временя выезда
    setTimeInOut();

    // Миниатюра объявления по умолчанию
    setAvatarDefault();

    // Список фотографий по умолчанию
    setPhotoDefault();

    // Убираем сообщения об ошибках
    removeErrorBlock(titleForm);
    removeErrorBlock(priceForm);
  };


  // Добавить сообщение об ошибки
  var addErrorBlock = function (element, errorMessage) {
    // DOM элемент блока с ошибкой
    var errorBlock = document.querySelector('#' + element.id + '+ .error-validate');

    // Если блока не существует создаем его
    if (!errorBlock) {
      var templateError = document.createDocumentFragment();
      errorBlock = document.createElement('div');

      errorBlock.classList.add('error-validate');
      templateError.appendChild(errorBlock);
      element.after(templateError);
    }

    errorBlock.textContent = errorMessage;
    element.style.border = '1px solid red';
    element.style.boxShadow = '0 0 10px red';
  };


  // Убрать сообщение об ошибки
  var removeErrorBlock = function (element) {
    // DOM элемент блока с ошибкой
    var errorBlock = document.querySelector('#' + element.id + '+ .error-validate');

    if (errorBlock) {
      errorBlock.remove();
      element.style.border = 'none';
      element.style.boxShadow = 'none';
    }
  };


  // Валидация заголовка объявления
  var titleValidation = function () {
    // Данные с формы
    var formData = new FormData(form);
    var titleData = formData.get('title');

    var message = '';

    // Валидируем данные
    if (!titleData) {
      message = 'Укажите заголовок объявления';
    } else if (titleData.length < 30) {
      message = 'Заголовок объявления не должен быть меньше 30 символов';
    } else if (titleData.length > 100) {
      message = 'Заголовок объявления не должен превышать 100 символов';
    }

    // Добавляем сообщение об ошибке
    if (message) {
      titleForm.setCustomValidity(message);
      removeErrorBlock(titleForm);
      addErrorBlock(titleForm, message);

      return false;
    }

    titleForm.setCustomValidity('');
    removeErrorBlock(titleForm);

    return true;
  };


  // Валидация типа и цены жилья
  var housingTypePriceValidation = function () {
    // Данные с формы
    var formData = new FormData(form);
    var priceData = formData.get('price');

    var message = '';

    var priceDataNum = parseInt(priceData, 10);
    var priceMinNum = parseInt(priceForm.min, 10);
    var priceMaxNum = parseInt(priceForm.max, 10);

    // Валидируем данные
    if (!priceData) {
      message = 'Укажите цену за ночь';
    } else if (priceDataNum < priceMinNum) {
      message = 'Цена за ночь не должна быть меньше ' + priceMinNum + ' руб.';
    } else if (priceDataNum > priceMaxNum) {
      message = 'Цена за ночь не должна быть больше ' + priceMaxNum + ' руб.';
    }

    // Добавляем сообщение об ошибке
    if (message) {
      priceForm.setCustomValidity(message);
      addErrorBlock(priceForm, message);

      return false;
    }

    priceForm.setCustomValidity('');
    removeErrorBlock(priceForm);

    return true;
  };


  // Событие при редактировании полей формы
  var onInputEdit = function () {
    titleValidation();
    housingTypePriceValidation();
  };


  // Валидация формы
  var onInvalidForm = function () {
    onInputEdit();

    form.addEventListener('input', onInputEdit, true);
  };


  // Корректное изменение связанных полей
  var onChangeInput = function (evt) {
    var target = evt.target;

    // Валидируем поле с которым было взаимодействие
    switch (target.name) {
      // Поля тип и цена жилья
      case 'type':
      case 'price':
        setTypeHousePrice();
        break;
        // Поле количество комнат
      case 'rooms':
        setRoomsCapacity();
        break;
        // Поля заселения и выселения
      case 'timein':
      case 'timeout':
        setTimeInOut();
        break;
      case 'avatar':
        dragAndDrop(evt, setAvatarFile);
        break;
      case 'images':
        dragAndDrop(evt, setPhotoFile);
        break;
    }
  };


  // Сброс формы
  var onResetForm = function () {
    form.reset();
    window.page.deactive();
    form.removeEventListener('input', window.form.onInputEdit, true);
  };


  // Данные с формы
  var getFormData = function () {
    // Получаем данные с формы
    var data = new FormData(form);

    var avatar = dataReader.get('avatar');
    var images = dataReader.getAll('images');


    if (data.get('images').size <= 0) {
      [].map.call(images, function (item) {
        data.append('images', item);
      });
    }

    data.set('avatar', avatar);

    return data;
  };


  // Слушаем форму
  var listenForm = function () {
    // Валидация формы
    submitForm.addEventListener('click', onInvalidForm);

    // Отправка формы
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();

      var data = getFormData();

      var callback = {
        success: window.notification.success,
        error: window.notification.error,
        successText: 'Объявление успешно добавилось'
      };

      // Отправка формы через ajax
      window.backend.request('POST', window.assets.link.save, callback, data);

      // Деактивируем страницу
      window.page.deactive();

      form.removeEventListener('input', onInputEdit, true);
    });

    // Событие изменения значений полей формы
    form.addEventListener('input', onChangeInput, true);

    // Сброс формы
    resetForm.addEventListener('click', onResetForm);
  };


  // Перемещение
  var dragAndDrop = function (evt, callback) {
    // Получаем картинки
    var files = evt.dataTransfer ? evt.dataTransfer.files : evt.target.files;

    [].map.call(files, function (file) {
      callback(file);
    });
  };


  // Чтение файла
  var readerFile = function (file, callback) {
    // Проверяем тип файла
    var match = fileTypes.some(function (item) {
      return file.name.endsWith(item);
    });

    if (match) {
      callback(file);
    }
  };


  // Живая загрузка миниатюры объявления
  var setAvatarFile = function (file) {
    readerFile(file, function () {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarUploadImg.src = reader.result;
        dataReader.set('avatar', file);
      });

      reader.readAsDataURL(file);
    });
  };


  // Живая загрузка фотографий объявления
  var setPhotoFile = function (file) {
    readerFile(file, function () {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var photo = thumbUploadImg.cloneNode();
        var img = document.createElement('img');

        img.src = reader.result;
        img.width = 70;
        img.height = 70;

        photo.appendChild(img);
        thumbUploadImg.insertAdjacentElement('beforeBegin', photo);

        dataReader.append('images', file);
      });

      reader.readAsDataURL(file);
    });
  };


  // Добавялем события для drag and drop
  var addDragAndDrop = function (element, callback) {
    // Отменяем действия по умолчанию и всплытие
    window.util.manyEvents(['dragenter', 'dragover', 'dragleave', 'drop'], function (item) {
      element.addEventListener(item, function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
      });
    });

    // Поведение над областю перемещения
    window.util.manyEvents(['dragenter', 'dragover'], function (item) {
      element.addEventListener(item, function () {
        element.classList.add('upload');
      });
    });

    // Поведение вне области перемещения
    window.util.manyEvents(['dragleave', 'drop'], function (item) {
      element.addEventListener(item, function () {
        element.classList.remove('upload');
      });
    });

    // После перемещения
    element.addEventListener('drop', function (evt) {
      dragAndDrop(evt, callback);
    });
  };


  addDragAndDrop(avatarUploadDrop, setAvatarFile);
  addDragAndDrop(thumbUploadDrop, setPhotoFile);


  window.form = {
    formEnabled: formEnabled,
    formDisabled: formDisabled,

    setAddressPinMain: setAddressPinMain,
    setFormDefault: setFormDefault,

    onResetForm: onResetForm,
    listenForm: listenForm
  };
})();
