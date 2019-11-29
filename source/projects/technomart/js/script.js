// Затемнение
var overlay = document.querySelector(".overlay");

// Click
var mapImg = document.querySelector(".about-map");
var feedbackButton = document.querySelector(".about-button");
var closeButton = document.querySelectorAll(".modal-close");
var addСart = document.querySelectorAll(".add-cart");

// Модальные окна
var modal = document.querySelectorAll(".modal");
var modalMap = document.querySelector(".modal-map");
var modalContact = document.querySelector(".modal-contact");
var modalSuccess = document.querySelector(".modal-success");

// Поля ввода
var feedbackForm = document.querySelector(".form-contact");
var inputName = document.querySelector(".modal-contact [name=name]");
var inputEmail = document.querySelector(".modal-contact [name=email]");
var inputText = document.querySelector(".modal-contact [name=text]");

// Хранилище
var isStorageSupport = true;
var storageName = "";
var storageEmail = "";

// Закрываем модальное окно
for (i = 0; i < closeButton.length; i++) {
  closeButton[i].addEventListener("click", function (evt) {
    evt.preventDefault();

    if (overlay && overlay.classList.contains("modal-show")) {
      overlay.classList.remove("modal-show")
    }

    if (modalMap && modalMap.classList.contains("modal-show")) {
      modalMap.classList.remove("modal-show");
    }

    if (modalContact && modalContact.classList.contains("modal-show")) {
      modalContact.classList.remove("modal-show");
    }

    if (modalSuccess && modalSuccess.classList.contains("modal-show")) {
      modalSuccess.classList.remove("modal-show");
    }
  });
}

// Показываем карту проезда
if (mapImg) {
  mapImg.addEventListener("click", function (evt) {
    evt.preventDefault();
    overlay.classList.add("modal-show");
    modalMap.classList.add("modal-show");
  });
}

// Показываем форму обратной связи
if (feedbackButton) {
  feedbackButton.addEventListener("click", function (evt) {
    evt.preventDefault();

    try {
      storageName = localStorage.getItem("name");
      storageEmail = localStorage.getItem("email");
    } catch (err) {
      isStorageSupport = false;
    }

    overlay.classList.add("modal-show");
    modalContact.classList.add("modal-show");

    if (isStorageSupport) {
      inputName.value = storageName;
      inputEmail.value = storageEmail;
    }

    if (!inputName.value && !inputEmail.value && !inputText.value) {
      inputName.focus();
    } else if (!inputEmail.value && !inputText.value) {
      inputEmail.focus();
    } else {
      inputText.focus();
    }
  });
}

// Отправляем данные из формы
if (feedbackForm) {
  feedbackForm.addEventListener("submit", function (evt) {
    if (!inputName.value) {
      evt.preventDefault();
      inputName.classList.remove("error");
      inputName.offsetWidth = inputName.offsetWidth;
      inputName.classList.add("error");
      inputName.placeholder = "Это поле обязательно для ввода";
    } else {
      inputName.classList.remove("error");
      localStorage.setItem("name", inputName.value);
    }

    if (!inputEmail.value) {
      evt.preventDefault();
      inputEmail.classList.remove("error");
      inputEmail.offsetWidth = inputName.offsetWidth;
      inputEmail.classList.add("error");
      inputEmail.placeholder = "Это поле обязательно для ввода";
    } else {
      inputEmail.classList.remove("error");
      localStorage.setItem("email", inputEmail.value);
    }

    if (!inputText.value) {
      evt.preventDefault();
      inputText.classList.remove("error");
      inputText.offsetWidth = inputName.offsetWidth;
      inputText.classList.add("error");
      inputText.placeholder = "Это поле обязательно для ввода";
    }

    if (!inputName.value && !inputEmail.value && !inputText.value) {
      inputName.focus();
    } else if (!inputEmail.value && !inputText.value) {
      inputEmail.focus();
    } else {
      inputText.focus();
    }
  });
}

// Закрытие модальных окон через клавишу Esc
window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();

    for (i = 0; i < modal.length; i++) {
      if (modal[i].classList.contains("modal-show")) {
        modal[i].classList.remove("modal-show");
      }

      if (overlay.classList.contains("modal-show")) {
        overlay.classList.remove("modal-show");
      }
    }
  }
});

// Добавляем товар в корзину
for (i = 0; i < addСart.length; i++) {
  addСart[i].addEventListener("click", function (evt) {
    evt.preventDefault();
    if (modalSuccess.classList.contains("modal-show")) {
      modalSuccess.classList.remove("modal-show");
    } else {
      modalSuccess.classList.add("modal-show");
    }
  });
}

ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
      center: [59.938631, 30.323055],
      zoom: 17,
      controls: ['zoomControl']
    }, {
      searchControlProvider: 'yandex#search'
    }),

    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
      hintContent: 'Мы тут',
      balloonContent: 'Интернет магазин Техномарт'
    }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: 'img/metka.png',
      // Размеры метки.
      iconImageSize: [80, 80],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-5, -38]
    });

  myMap.geoObjects
    .add(myPlacemark);
});

