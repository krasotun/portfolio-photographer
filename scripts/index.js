// Поп-ап с формой для контактов
const togglePopup = function (popupName) {
  popupName.classList.toggle('popup_opened');
};

// Папап по клику на картинку

const popupImage = document.querySelector('.popup-image');
const popupImageImage = popupImage.querySelector('.popup-image__image');
const popupImageText = popupImage.querySelector('.popup-image__text');

// Выбираем контейнер с картинками
const imagesContainer = document.querySelector('.portfolio__gallery-wrapper');

// Наполняем картинку
const createPortfolioImage = function (name, link, alt) {
  const portfolioImage = document.createElement('img');
  portfolioImage.dataset.name = name;
  portfolioImage.src = link;
  portfolioImage.alt = alt;
  portfolioImage.classList.add('portfolio__image');
  portfolioImage.addEventListener('click', () => {
    showPopupImage(portfolioImage);
    togglePopup(popupImage);
  });
  return portfolioImage;
};



// Вставояем картинки из массива на сайт
const firstAddImages = function () {
  imagesArray.forEach((item) => {
    const newImage = createPortfolioImage(item.name, item.link, item.alt);
    imagesContainer.append(newImage);
  });
};
firstAddImages();

// Выбираем контейнер с табами
const tabsContainer = document.querySelector('.portfolio__tabs-wrapper');

// Выбираем табы в контейнере
const portfolioTabs = tabsContainer.querySelectorAll('.tab');

// Выбираем картинки из контейнера
const portfolioImages = imagesContainer.querySelectorAll('.portfolio__image');

// Скрываем все картинки на странице
const hideAllImages = function () {
  imagesContainer.querySelectorAll('.portfolio__image').forEach(image => {
    image.remove();
  });
};

// Показываем попап с картинкой
const showPopupImage = function (image) {
  popupImageImage.src = image.src;
  popupImageText.textContent = image.dataset.name;
};

// Переключаем картинку вперед
const buttonShowNextImage = document.querySelector('.popup-image__arrow_next');
const buttonShowPrevImage = document.querySelector('.popup-image__arrow_prev');

buttonShowNextImage.addEventListener('click', () => {
  showNextPopupImage();
});

buttonShowPrevImage.addEventListener('click', () => {
  console.log(('Prev clicked'));
});


// Логика
// (всегда) Определяем текущую картинку (ее номер в массиве)
// Next
// Меняем адрес и название на следующую в массиве
// Если дошли до последней - меняем на первую
// Prev
// Меняем адрес и название на предыдущую в массиве
// Если дошли до первой - меняем на последнюю

const showNextPopupImage = function () {
  const imagesArray = imagesContainer.querySelectorAll('.portfolio__image');

};



// Показ изображений по тегу
const selectImagesFromPortfolio = function () {
  tabsContainer.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('tab')) {
      let clickedTag = evt.target;
      removeActiveTabs(); // Убираем со всех табов активный
      togglePortfolioTag(clickedTag); // Меняем вид таба
      if (clickedTag.innerText === 'All') {
        hideAllImages();
        firstAddImages();
      } else {
        hideAllImages();
        firstAddImages();
        imagesContainer.querySelectorAll('.portfolio__image').forEach(image => {
          if (clickedTag.innerText != image.dataset.name) {
            image.remove();
          }
        });
      }
    }
  });
};
selectImagesFromPortfolio();

// Для смены класса у кликнутого таба
const togglePortfolioTag = function (clickedTag) {
  clickedTag.classList.toggle('tab_active');
};

// Убирает active у кого он есть
const removeActiveTabs = function () {
  portfolioTabs.forEach(tab => {
    if (tab.classList.contains('tab_active')) {
      tab.classList.remove('tab_active');
    }
  });
};

// Работа с поп-апами
const popupForm = document.querySelector('.popup-form');
const buttonClosePopupForm = document.querySelector('.popup-form__close');
const buttonClosePopupImage = document.querySelector('.popup-image__close');
const buttonHeroSection = document.querySelector('.button_place_hero');
const priceSection = document.querySelector('.price__content-wrapper');


buttonHeroSection.addEventListener('click', () => {
  togglePopup(popupForm);
});

buttonClosePopupForm.addEventListener('click', () => {
  togglePopup(popupForm);
});

buttonClosePopupImage.addEventListener('click', () => {
  togglePopup(popupImage);
});

priceSection.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('button_place_price')) {
    togglePopup(popupForm);
  }
});
