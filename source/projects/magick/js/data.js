'use strict';

(function () {
  // Рейтинг фильтрации
  var Rate = {
    colorCoat: 5,
    colorEyes: 2,
    colorFireball: 1
  };


  // Данные
  var names = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];

  var surNames = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];

  var coatColors = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var eyesColors = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var fireballColors = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  // Перестановка местами имени и фамилии
  var nameOrSurname = function () {
    var coin = window.util.randomVal(0, 1);
    var nameOne = names[window.util.randomVal(0, names.length - 1)] + ' ' + surNames[window.util.randomVal(0, names.length - 1)];
    var surNameOne = surNames[window.util.randomVal(0, names.length - 1)] + ' ' + names[window.util.randomVal(0, names.length - 1)];

    return coin === 0 ? nameOne : surNameOne;
  };

  // Генерация случайных персонажей
  var generationData = function (count) {
    if (count <= 0 || !count) {
      count = 4;
    }

    var persons = [];
    for (var i = 0; i < count; i++) {
      var person = {
        name: nameOrSurname(),
        coatColor: window.util.getRandomColor(coatColors),
        eyesColor: window.util.getRandomColor(eyesColors)
      };

      persons.push(person);
    }

    return persons;
  };

  window.data = {
    generationData: generationData,
    coatColors: coatColors,
    eyesColors: eyesColors,
    fireballColors: fireballColors,

    rate: Rate
  };
})();
