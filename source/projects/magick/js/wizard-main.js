'use strict';

(function () {
  var fireballSize = 22;

  var getFireballSpeed = function (left) {
    if (left) {
      return 5;
    }

    return 2;
  };

  var wizardSpeed = 3;
  var wizardWidth = 70;

  var getWizardHeight = function (widthWizard) {
    return 1.337 * widthWizard;
  };

  var getWizardX = function (width) {
    return width / 2 - wizardWidth / 2;
  };

  var getWizardY = function (height) {
    return height - (height * 2 / 3);
  };

  window.wizardMain = {
    fireballSize: fireballSize,
    wizardSpeed: wizardSpeed,
    wizardWidth: wizardWidth,

    getFireballSpeed: getFireballSpeed,
    getWizardHeight: getWizardHeight,
    getWizardX: getWizardX,
    getWizardY: getWizardY
  };
})();
