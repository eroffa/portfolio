var aboutMap = document.querySelector(".about-map");
var aboutFeedback = document.querySelector(".about-feedback");

var formFeedback = document.querySelector(".modal-contact-form");
var inputName = document.querySelector("[name=name]");
var inputEmail = document.querySelector("[name=email]");
var inputText = document.querySelector("[name=text]");
var inputSubmit = document.querySelector(".modal-contact-submit");

var modal = document.querySelectorAll(".modal");
var modalContact = document.querySelector(".modal-contact");
var modalMap = document.querySelector(".modal-map");
var overlay = document.querySelector(".overlay");
var modalClose = document.querySelectorAll(".modal-close");

var isStorageSupport = true;
var storageName = "";
var storageEmail = "";

// Открываем модальное окно с формой обратной связи
aboutFeedback.addEventListener("click", function (evt) {
  evt.preventDefault();

  try {
    storageName = localStorage.getItem("name");
    storageEmail = localStorage.getItem("email");
  } catch (err) {
    isStorageSupport = false;
  }

  if (!modalContact.classList.contains("open") && !overlay.classList.contains("open")) {
    overlay.classList.add("open");
    modalContact.classList.add("open");

    if (storageName && storageEmail) {
      inputName.value = storageName;
      inputEmail.value = storageEmail;
      inputText.focus();
    } else if (storageName) {
      inputName.value = storageName;
      inputEmail.focus();
    } else if (storageEmail) {
      inputEmail.value = storageEmail;
      inputName.focus();
    } else {
      inputName.focus();
    }
  }
});

// Отправка сообщения
formFeedback.addEventListener("submit", function (evt) {
  if (!inputName.value) {
    evt.preventDefault();
    inputName.classList.remove("input-error");
    inputName.offsetWidth = inputName.offsetWidth;
    inputName.classList.add("input-error");
    inputName.placeholder = "Это поле обязательно для заполнения";
  } else {
    inputName.classList.remove("input-error");
    localStorage.setItem("name", inputName.value);
  }

  if (!inputEmail.value) {
    evt.preventDefault();
    inputEmail.classList.remove("input-error");
    inputEmail.offsetWidth = inputEmail.offsetWidth;
    inputEmail.classList.add("input-error");
    inputEmail.placeholder = "Это поле обязательно для заполнения";
  } else {
    inputEmail.classList.remove("input-error");
    localStorage.setItem("email", inputEmail.value);
  }

  if (!inputText.value) {
    evt.preventDefault();
    inputText.classList.remove("input-error");
    inputText.offsetWidth = inputText.offsetWidth;
    inputText.classList.add("input-error");
    inputText.placeholder = "Это поле обязательно для заполнения";
  }

  if (!inputName.value && !inputEmail.value && !inputText.value) {
    inputName.focus();
  } else if (!inputEmail.value && !inputText.value) {
    inputEmail.focus();
  } else {
    inputText.focus();
  }
});

// Открываем модальное окно с картой проезда
aboutMap.addEventListener("click", function (evt) {
  evt.preventDefault();
  if (!modalMap.classList.contains("open") && !overlay.classList.contains("open")) {
    overlay.classList.add("open");
    modalMap.classList.add("open");
  }
});

// Закрытие модальных окон через кнопку Закрыть
for (i = 0; i < modalClose.length; i++) {
  modalClose[i].addEventListener("click", function (evt) {
    evt.preventDefault();
    for (j = 0; j < modal.length; j++) {
      if (modal[j].classList.contains("open") && overlay.classList.contains("open")) {
        overlay.classList.remove("open");
        modal[j].classList.remove("open");
      }
    }
  });
}

// Закрытие модальных окон через клавишу Esc
window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    for (i = 0; i < modal.length; i++) {
      if (modal[i].classList.contains("open") && overlay.classList.contains("open")) {
        overlay.classList.remove("open");
        modal[i].classList.remove("open");
      }
    }
  }
});

ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
      center: [55.68697956906804, 37.52965449999998],
      zoom: 16,
      controls: ['zoomControl']
    }, {
      searchControlProvider: 'yandex#search'
    }),

    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
      hintContent: 'Мы здесь',
      balloonContent: 'Интерет магазин Device'
    }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: 'img/yandex.png',
      // Размеры метки.
      iconImageSize: [40, 60],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-5, -38]
    });

  myMap.geoObjects
    .add(myPlacemark);
});
