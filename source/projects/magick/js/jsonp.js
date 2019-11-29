'use strict';

(function () {
  var wizardData = function (data) {
    var jsop = document.createElement('div');
    jsop.classList.add('jsop');

    var text = 'JSONP: <br><br>';
    for (var i = 0; i < data.length; i++) {
      text += 'Name: ' + data[i].name + '; Цвет плаща: ' + data[i].colorCoat + '; Цвет глаз: ' + data[i].colorEyes + '.. и многое другое <br><br>';
    }

    jsop.innerHTML = text;

    document.body.insertAdjacentElement('afterbegin', jsop);
  };

  window.wizardData = wizardData;
})();
