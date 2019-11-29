'use strict';

(function () {
  // Контейнер для фильтров
  var filterContainer = window.dom.filter.filterContainer;


  // Отрисовка объявлений
  var renderCard = function (offer) {
    // Шаблон карточки товара
    var templateCard = document.querySelector('#card').content;
    var card = templateCard.querySelector('.map__card');

    // Нода карточки товара
    var itemCard = card.cloneNode(true);
    var closeButton = itemCard.querySelector('.popup__close');
    var title = itemCard.querySelector('.popup__title');
    var address = itemCard.querySelector('.popup__text--address');
    var price = itemCard.querySelector('.popup__text--price');
    var type = itemCard.querySelector('.popup__type');
    var roomsGuest = itemCard.querySelector('.popup__text--capacity');
    var checkInOut = itemCard.querySelector('.popup__text--time');

    var featureList = itemCard.querySelector('.popup__features');
    var featureItem = featureList.querySelectorAll('.popup__feature');

    var description = itemCard.querySelector('.popup__description');
    var avatar = itemCard.querySelector('.popup__avatar');
    var photos = itemCard.querySelector('.popup__photos');

    // Конфигурация типа зданий
    var configType = window.assets.typeMap;

    // Заголовок
    title.textContent = offer.offer.title;

    // Адрес
    address.textContent = offer.offer.address;

    // Цена
    price.textContent = offer.offer.price + '₽/ночь';

    // Тип здания
    type.textContent = configType[offer.offer.type];

    // Количество комнат и гостей
    roomsGuest.textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';

    // Время заезда и выезда
    checkInOut.textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;

    // Конвертируем коллекцию услуг в массив
    featureItem = [].map.call(featureItem, function (item) {
      return item;
    });

    // Выбираем активные услуги у объявления
    featureItem = offer.offer.features.map(function (feature) {
      return featureItem.filter(function (value) {
        var attr = value.getAttribute('data-feature');
        return attr === feature;
      })[0];
    });

    // Очищаем все услуги
    while (featureList.firstChild) {
      featureList.removeChild(featureList.firstChild);
    }

    // Добавляем активные услуги
    var fragmentList = document.createDocumentFragment();
    featureItem.forEach(function (val) {
      fragmentList.appendChild(val);
    });
    featureList.appendChild(fragmentList);

    // Описание
    description.textContent = offer.offer.description;

    // Фотографии
    // Удаляем дочерние элементы
    while (photos.firstChild) {
      photos.removeChild(photos.firstChild);
    }

    // Добавляем фотографии
    var photosFragment = document.createDocumentFragment();
    for (var k = 0; k < offer.offer.photos.length; k++) {
      var photoItem = document.createElement('img');
      photoItem.classList.add('popup__photo');
      photoItem.src = offer.offer.photos[k];
      photoItem.width = 45;
      photoItem.height = 40;
      photoItem.alt = offer.offer.title;
      photosFragment.appendChild(photoItem);
    }
    photos.appendChild(photosFragment);

    // Аватар
    avatar.src = offer.author.avatar;


    // Закрытие через ESC
    var onEscPress = function (evt) {
      window.util.isEscEvent(evt, closePopup);
      document.removeEventListener('keydown', onEscPress);
    };


    // Закрытие карточки объявления
    var closePopup = function () {
      itemCard.remove();
      window.pin.deactivatePin();

      document.removeEventListener('keydown', onEscPress);
    };


    // Кнопка закрыть у объявления
    closeButton.addEventListener('click', function () {
      closePopup();
    });

    document.addEventListener('keydown', onEscPress);

    return itemCard;
  };


  // Добавление объявления
  var addCard = function (offer) {
    removeCard();
    window.pin.deactivatePin();

    var fragment = document.createDocumentFragment();

    var cardItem = renderCard(offer);
    fragment.appendChild(cardItem);

    filterContainer.before(fragment);
    document.querySelector('.popup__close').focus();
  };

  // Удаление объявления
  var removeCard = function () {
    // Карточка объявления
    var mapCard = window.dom.map.mapContainer.querySelector('.map__card');

    if (mapCard) {
      mapCard.remove();
    }
  };

  window.card = {
    addCard: addCard,
    removeCard: removeCard
  };
})();
