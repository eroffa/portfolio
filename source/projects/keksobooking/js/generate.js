'use strict';

(function () {
  // Размер карты
  var mapData = window.assets.sizeMap;

  // Расценки
  var priceData = window.assets.sizePrice;

  // Тип здания и цены
  var typePriceData = window.assets.typePrice;

  // Время заселения и выселения
  var timesData = window.assets.time;

  // Виды услуг
  var featuresData = window.assets.feature;

  // Виды услуг
  var pinData = window.assets.sizePin;


  // Генерация чисел 01 - 08 / 10 - 18 / n0 - n8 кроме 9
  var generateNumber = function (minVal, maxVal) {
    var arrayNumbers = [];

    for (var i = minVal, str = ''; i <= maxVal; i++) {
      str = String(i);

      if (str.length === 1 && i !== 9) {
        arrayNumbers.push('0' + str);
      }

      if (str.length > 1 && str.indexOf('9') === -1) {
        arrayNumbers.push(str);
      }
    }

    return arrayNumbers;
  };


  // Генерация адреса аватара
  var generateAvatar = function (numbers) {
    var avatars = [];

    for (var i = 0; i < numbers.length; i++) {
      avatars.push('img/avatars/user' + numbers[i] + '.png');
    }

    return avatars;
  };


  // Генерация заголовков предложения
  var generateTitleOffer = function (count) {
    if (!count) {
      count = 1;
    }

    var titles = [];

    for (var i = 1; i <= count; i++) {
      titles.push(window.util.randomString(window.util.randomVal(10, 20)));
    }

    return titles;
  };


  // Генерация адреса предложения
  var generateAddressOffer = function (count) {
    if (!count) {
      count = 1;
    }

    var address = [];

    for (var i = 1; i <= count; i++) {
      var x = window.util.randomVal(mapData['WIDTH_MIN'], mapData['WIDTH_MAX']);
      var y = window.util.randomVal(mapData['HEIGHT_MIN'], mapData['HEIGHT_MAX']);

      address.push(x + '; ' + y);
    }

    return address;
  };


  // Генерация стоимости предложения
  var generatePriceOffer = function (count) {
    if (!count) {
      count = 1;
    }

    var prices = [];

    for (var i = 1; i <= count; i++) {
      prices.push(window.util.randomVal(priceData.MIN, priceData.MAX));
    }

    return prices;
  };


  // Генерация типа здания
  var generateTypeOffer = function (count) {
    if (!count) {
      count = 1;
    }

    var types = Object.keys(typePriceData);

    var typesList = [];

    for (var i = 1; i <= count; i++) {
      var randomType = types[window.util.randomVal(0, types.length - 1)];
      typesList.push(randomType);
    }

    return typesList;
  };


  // Генерация количества гостей
  var generateGuestsOffer = function (count) {
    if (!count) {
      count = 1;
    }

    var guests = [];

    for (var i = 1; i <= count; i++) {
      guests.push(window.util.randomVal(0, 3));
    }

    return guests;
  };


  // Генерация количества комнат
  var generateRoomOffer = function (count) {
    if (!count) {
      count = 1;
    }

    var rooms = [];

    for (var i = 1; i <= count; i++) {
      rooms.push(window.util.randomVal(1, 100));
    }

    return rooms;
  };


  // Генерация времени регистрации/выселения
  var generateCheckOffer = function (count) {
    if (!count) {
      count = 1;
    }

    var checkinList = [];

    for (var i = 1; i <= count; i++) {
      var randomCheckin = timesData[window.util.randomVal(0, timesData.length - 1)];
      checkinList.push(randomCheckin);
    }

    return checkinList;
  };


  // Генерация услуг
  var generateFeatureOffer = function (count) {
    if (!count) {
      count = 1;
    }

    var featuresList = [];

    // Количсетво генераций
    for (var i = 0; i < count; i++) {
      var featuresCount = window.util.randomVal(1, featuresData.length);
      featuresList[i] = [];

      // Количество услуг
      for (var j = 0, key = 0; j < featuresCount; j++) {
        var featuresRandom = window.util.randomVal(0, featuresData.length - 1);

        var item = featuresData[featuresRandom];

        // Если выпавшей услуши еще нет в списке добавляем
        if (featuresList[i].indexOf(item) === -1) {
          featuresList[i][key] = item;
          key++;
        }
      }
    }

    return featuresList;
  };


  // Генерация фотографий
  var generatePhotoOffer = function (count) {
    if (!count) {
      count = 1;
    }

    // Ссылки на фотографии
    var photoLinks = [];
    for (var i = 1; i <= 3; i++) {
      photoLinks.push('http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg');
    }

    // Генерируем массив для фотографий
    var photosList = [];
    for (var j = 0; j < count; j++) {
      var photosCount = window.util.randomVal(1, photoLinks.length);
      photosList[j] = [];

      // Генерируем фотографии
      for (var k = 0, key = 0; k < photosCount; k++) {
        var photosRandom = window.util.randomVal(0, photoLinks.length - 1);

        var item = photoLinks[photosRandom];

        if (photosList[j].indexOf(item) < 0) {
          photosList[j][key] = item;
          key++;
        }
      }
    }

    return photosList;
  };


  // Генерация описания
  var generateDescriptionOffer = function (count) {
    if (!count) {
      count = 1;
    }

    var descriptions = [];

    for (var i = 1; i <= count; i++) {
      var lengthString = window.util.randomVal(100, 500);
      descriptions.push(window.util.randomString(lengthString));
    }

    return descriptions;
  };


  // Генерация локационных данных
  var generateLocation = function (count) {
    if (!count) {
      count = 1;
    }

    // Координаты пинов
    var locations = [];

    // Задаем случайниые координаты для пинов объявлений
    for (var i = 0; i < count; i++) {
      locations[i] = [];
      locations[i]['x'] = window.util.randomVal(mapData['WIDTH_MIN'], mapData['WIDTH_MAX']);
      locations[i]['y'] = window.util.randomVal(mapData['HEIGHT_MIN'], mapData['HEIGHT_MAX']);
    }

    // Координаты относительно нижней центральной точки
    locations.x = Math.floor(locations.x - (pinData.WIDTH / 2));
    locations.y = locations.y - pinData.HEIGHT;

    return locations;
  };


  // Генерация объявлений
  window.generate = function (countOffer) {
    if (!countOffer || countOffer <= 0) {
      countOffer = 8;
    }

    // Данные
    var avatars = generateAvatar(generateNumber(1, countOffer));
    var titles = generateTitleOffer(countOffer);
    var address = generateAddressOffer(countOffer);
    var prices = generatePriceOffer(countOffer);
    var types = generateTypeOffer(countOffer);
    var rooms = generateRoomOffer(countOffer);
    var guests = generateGuestsOffer(countOffer);
    var checkin = generateCheckOffer(countOffer);
    var checkout = generateCheckOffer(countOffer);
    var features = generateFeatureOffer(countOffer);
    var descriptions = generateDescriptionOffer(countOffer);
    var photos = generatePhotoOffer(countOffer);
    var locations = generateLocation(countOffer);

    var offer = [];

    for (var i = 0; i < countOffer; i++) {
      offer[i] = {
        'author': {
          'avatar': avatars[i]
        },

        'offer': {
          'title': titles[i],
          'address': address[i],
          'price': prices[i],
          'type': types[i],
          'rooms': rooms[i],
          'guests': guests[i],
          'checkin': checkin[i],
          'checkout': checkout[i],
          'features': features[i],
          'description': descriptions[i],
          'photos': photos[i]
        },

        'location': {
          'x': locations[i]['x'],
          'y': locations[i]['y']
        }
      };
    }

    return offer;
  };
})();

