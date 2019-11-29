'use strict';

(function () {
  var form = window.dom.filter.form;
  var fieldsets = window.dom.filter.fieldsets;
  var selects = window.dom.filter.selects;

  // Фильтр активен
  var filterEnabled = function () {
    selects.forEach(function (value) {
      value.removeAttribute('disabled');
    });

    fieldsets.forEach(function (value) {
      value.removeAttribute('disabled');
    });
  };


  // Фильтр активен
  var filterDisabled = function () {
    selects.forEach(function (value) {
      value.setAttribute('disabled', true);
    });

    fieldsets.forEach(function (value) {
      value.setAttribute('disabled', true);
    });
  };


  // Фильтрация количества объявлений
  var filterCountData = function (data, count) {
    if (!count || count <= 0) {
      count = window.assets.countData;
    }

    if (data.length > count) {
      data = data.slice(0, count);
    }

    return data;
  };


  // Фильтрация
  var filterItem = function (input, value) {
    var valueCheck = window.assets.filter[input].value;

    return value.offer[input].toString() === valueCheck || valueCheck === 'any';
  };


  // Фильтрация по типу жилья
  var filterTypeHouse = function (data) {
    data = data.filter(function (value) {
      return filterItem('type', value);
    });

    return data;
  };


  // Фильтрация по цене
  var filterPrice = function (input, data) {
    var valueCheck = window.assets.filter[input].value;

    var priceMin = window.assets.filterPrice[valueCheck][0];
    var priceMax = window.assets.filterPrice[valueCheck][1];

    data = data.filter(function (value) {
      return value.offer.price >= priceMin && value.offer.price <= priceMax || valueCheck === 'any';
    });

    return data;
  };


  // Фильтрация по комнатам
  var filterRoom = function (data) {
    data = data.filter(function (value) {
      return filterItem('rooms', value);
    });

    return data;
  };


  // Фильтрация по гостям
  var filterGuest = function (data) {
    data = data.filter(function (value) {
      return filterItem('guests', value);
    });

    return data;
  };

  // Фильтрация по услугам
  var filterFeature = function (data) {
    // Все отмеченные услуги
    var valueCheck = window.assets.filter['feature'].querySelectorAll('input:checked');

    // Превращаем коллекцию в массив
    valueCheck = [].map.call(valueCheck, function (item) {
      return item;
    });

    // Фильтруем
    data = data.filter(function (value) {
      // Услуги в объявлении
      var offerFeatures = value.offer.features;

      // Возвращаем отмеченные услуг содержащиеся в объявлении
      return valueCheck.every(function (checkFeature) {
        return offerFeatures.includes(checkFeature.value);
      });
    });

    return data;
  };

  //
  var onFilterData = window.debounce(function () {
    // Удаляем страные пины
    window.pin.removePin();

    // Удаляем карточку объявления
    window.card.removeCard();

    // Загружаем новые пины
    window.backend.loadData(function (xhr) {
      var data = xhr.response;

      data = filterTypeHouse(data);
      data = filterPrice('price', data);
      data = filterRoom(data);
      data = filterGuest(data);
      data = filterFeature(data);

      // Фильтрация по количеству
      data = filterCountData(data);

      // Выводим данные
      window.pin.addPin(data);
    });
  });


  form.addEventListener('change', onFilterData, true);

  window.filter = {
    filterEnabled: filterEnabled,
    filterDisabled: filterDisabled,

    filterCountData: filterCountData
  };
})();
