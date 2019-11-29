'use strict';

(function () {
  // Список персонажей
  var similarList = window.domElement.setup.list;

  // Поле ввода имени персонажа
  var setupUserName = window.domElement.setup.inputName;

  // Части создаваемого персонажа
  var setupWizardCoat = window.domElement.setup.wizardCoat;
  var setupWizardEyes = window.domElement.setup.wizardEyes;
  var setupFireball = window.domElement.setup.wizardFireball;

  // Блок обертка для создаваемого персонажа
  var setupWizardAppearance = window.domElement.setup.wizardAppearance;
  var appearanceCoatColor = setupWizardAppearance.querySelector('input[name="coat-color"]');
  var appearanceEyesColor = setupWizardAppearance.querySelector('input[name="eyes-color"]');
  var appearanceFireballColor = setupFireball.querySelector('input[name="fireball-color"]');

  // Кнопка отправки формы настроек персонажа
  var setupForm = window.domElement.setup.submitButton;


  // Рисуем DOM
  var renderWizard = function (person) {
    var similarTemplate = document.querySelector('#similar-wizard-template').content;
    var similarItem = similarTemplate.querySelector('.setup-similar-item');

    var wizard = similarItem.cloneNode(true);

    var nameWizard = wizard.querySelector('.setup-similar-label');
    var coatWizard = wizard.querySelector('.wizard-coat');
    var eyesWizard = wizard.querySelector('.wizard-eyes');

    nameWizard.textContent = person.name;
    coatWizard.setAttribute('fill', person.colorCoat);
    eyesWizard.setAttribute('fill', person.colorEyes);

    return wizard;
  };


  // Удаляем всех предыдущих персонажей
  var removeWizard = function () {
    while (similarList.firstChild) {
      similarList.removeChild(similarList.firstChild);
    }
  };


  // Добавляем персонажа
  var addWizard = function (data) {
    var fragment = document.createDocumentFragment();

    // Удаляем всех предыдущих персонажей
    removeWizard();

    // Фильтруем персонажей
    var persons = filterWizard(data);

    // Количество персонажей на отрисовку
    var personsLength = persons.length < 4 ? persons.length : 4;

    for (var i = 0; i < personsLength; i++) {
      var node = renderWizard(persons[i]);
      fragment.appendChild(node);
    }

    similarList.appendChild(fragment);
  };


  // Фильтрация похожих персонажей
  var filterWizard = function (data) {
    // Правило подсчета рейтинга
    var rate = window.data.rate;

    // Задаем рейтинг
    data.forEach(function (value) {
      value.rate = 0;

      if (value.colorCoat === appearanceCoatColor.value) {
        value.rate += rate.colorCoat;
      }

      if (value.colorEyes === appearanceEyesColor.value) {
        value.rate += rate.colorEyes;
      }

      if (value.colorFireball === appearanceFireballColor.value) {
        value.rate += rate.colorFireball;
      }
    });

    // Сортириуем по убыванию рейтинга, если рейтинг одинаков то по имени
    data.sort(function (a, b) {
      if (a.rate > b.rate) {
        return -1;
      } else if (a.rate < b.rate) {
        return 1;
      } else {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        } else {
          return 0;
        }
      }
    });

    return data;
  };


  // Обновляем персонажей
  var wizardUpdate = function () {
    window.backend.load(addWizard, window.util.onError);
  };

  var wizardColorize = function (evt, element) {
    var target = evt.target;
    var color = 'black';

    switch (element.getAttribute('name')) {
      case 'coat-color':
        color = window.util.getRandomColor(window.data.coatColors);
        break;
      case 'eyes-color':
        color = window.util.getRandomColor(window.data.eyesColors);
        break;
      default:
        color = window.util.getRandomColor(window.data.fireballColors);
    }

    if (target.tagName.toLowerCase() === 'use') {
      target.setAttribute('style', 'fill: ' + color);
    } else {
      target.setAttribute('style', 'background-color: ' + color);
    }

    element.value = color;
  };


  // Меняем цвет одежды
  setupWizardCoat.addEventListener('click', function (evt) {
    wizardColorize(evt, appearanceCoatColor);

    window.debounce(wizardUpdate);
  });


  // Меняем цвет глаз
  setupWizardEyes.addEventListener('click', function (evt) {
    wizardColorize(evt, appearanceEyesColor);

    window.debounce(wizardUpdate);
  });


  // Меняем цвет фаирбола
  setupFireball.addEventListener('click', function (evt) {
    wizardColorize(evt, appearanceFireballColor);


    window.debounce(wizardUpdate);
  });


  // Проверка на валидность данных
  setupUserName.addEventListener('invalid', function () {
    if (setupUserName.validity.tooShort) {
      setupUserName.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (setupUserName.validity.tooLong) {
      setupUserName.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (setupUserName.validity.valueMissing) {
      setupUserName.setCustomValidity('Обязательное поле');
    } else {
      setupUserName.setCustomValidity('');
    }
  });


  // Отправляем форму
  setupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var data = new FormData(setupForm);

    window.backend.save(data, window.dialog.closeSetup, window.util.onError);

  });

  window.setup = {};
})();
