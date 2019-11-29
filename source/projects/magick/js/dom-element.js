'use strict';

(function () {
  // Окно персонажей
  var setup = document.querySelector('.setup');

  // Закрузка аватара пользователя и перемещение окна
  var setupUload = setup.querySelector('.upload');
  var setupPreview = setupUload.querySelector('.setup-user-pic');
  var setupFile = setupUload.querySelector('input[type="file"]');

  // Блок персонажей
  var setupSimilar = setup.querySelector('.setup-similar');

  // Список персонажей
  var similarList = setupSimilar.querySelector('.setup-similar-list');

  // Открывает окно персонажей
  var setupOpen = document.querySelector('.setup-open');
  var iconSetupOpen = setupOpen.querySelector('.setup-open-icon');

  // Закрывает окно персонажей
  var setupClose = document.querySelector('.setup-close');

  // Поле ввода имени персонажа
  var setupUserName = setup.querySelector('.setup-user-name');

  // Блок обертка для создаваемого персонажа
  var setupWizardAppearance = setup.querySelector('.setup-wizard-appearance');

  // SVG иконка создаваемого персонажа
  var setupWizard = setupWizardAppearance.querySelector('.setup-wizard');

  // Части создаваемого персонажа
  var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireball = setup.querySelector('.setup-fireball-wrap');

  // Кнопка отправки формы настроек персонажа
  var setupForm = setup.querySelector('.setup-wizard-form');


  // Скодка
  var Setup = {
    setup: setup,
    upload: setupUload,
    uploadPreview: setupPreview,
    uploadFile: setupFile,
    similar: setupSimilar,
    list: similarList,
    buttonOpen: setupOpen,
    iconButtonOpen: iconSetupOpen,
    buttonClose: setupClose,
    inputName: setupUserName,
    wizardAppearance: setupWizardAppearance,
    wizard: setupWizard,
    wizardCoat: setupWizardCoat,
    wizardEyes: setupWizardEyes,
    wizardFireball: setupFireball,
    submitButton: setupForm
  };


  window.domElement = {
    setup: Setup
  };
})();
