'use strict';

(function () {
  // DOM элементы карты объявлений
  var mapContainer = document.querySelector('.map');
  var mapPins = mapContainer.querySelector('.map__pins');
  var mapPinMain = mapContainer.querySelector('.map__pin--main');

  // DOM элементы фильтрации объявлений
  var mapFilterContainer = mapContainer.querySelector('.map__filters-container');
  var mapFilter = mapFilterContainer.querySelector('.map__filters');
  var mapFilterSelects = mapFilter.querySelectorAll('select');
  var mapFilterFieldsets = mapFilter.querySelectorAll('fieldset');

  var filterType = mapFilter.querySelector('#housing-type');
  var filterPrice = mapFilter.querySelector('#housing-price');
  var filterRooms = mapFilter.querySelector('#housing-rooms');
  var filterGuests = mapFilter.querySelector('#housing-guests');
  var filterFeature = mapFilter.querySelector('#housing-features');

  // DOM элементы форма добавления нового объявления
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');

  // Поля формы
  var titleForm = adForm.querySelector('#title');
  var addressForm = adForm.querySelector('#address');
  var typeHouseForm = adForm.querySelector('#type');
  var priceHouse = adForm.querySelector('#price');
  var roomsHouse = adForm.querySelector('#room_number');
  var capacityHouse = adForm.querySelector('#capacity');
  var submitForm = adForm.querySelector('.ad-form__submit');
  var resetForm = adForm.querySelector('.ad-form__reset');

  var avatarUpload = adForm.querySelector('.ad-form-header__upload');
  var avatarUploadImg = avatarUpload.querySelector('.ad-form-header__preview img');
  var avatarUploadDrop = adForm.querySelector('.ad-form-header__drop-zone');
  var avatarUploadFile = adForm.querySelector('.ad-form-header__input');

  var thumbContainer = adForm.querySelector('.ad-form__photo-container');
  var thumbUploadFile = thumbContainer.querySelector('.ad-form__input');
  var thumbUploadDrop = thumbContainer.querySelector('.ad-form__drop-zone');
  var thumbUploadImg = thumbContainer.querySelector('.ad-form__photo');


  // DOM элементы карты
  var Map = {
    mapContainer: mapContainer,
    mapPins: mapPins,
    mapPinMain: mapPinMain
  };


  // DOM элементы фильтра
  var Filter = {
    filterContainer: mapFilterContainer,
    form: mapFilter,
    selects: mapFilterSelects,
    fieldsets: mapFilterFieldsets,

    type: filterType,
    price: filterPrice,
    rooms: filterRooms,
    guests: filterGuests,
    feature: filterFeature
  };


  // DOM элементы формы
  var Form = {
    adForm: adForm,
    title: titleForm,
    address: addressForm,
    type: typeHouseForm,
    price: priceHouse,
    rooms: roomsHouse,
    capacity: capacityHouse,
    submit: submitForm,
    reset: resetForm,

    fieldsets: adFormFieldsets,

    avatar: {
      upload: avatarUpload,
      img: avatarUploadImg,
      drop: avatarUploadDrop,
      file: avatarUploadFile,
    },

    thumb: {
      container: thumbContainer,
      file: thumbUploadFile,
      drop: thumbUploadDrop,
      img: thumbUploadImg
    }
  };


  // Общий DOM
  window.dom = {
    map: Map,
    filter: Filter,
    form: Form
  };
})();
