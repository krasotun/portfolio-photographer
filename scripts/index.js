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

// Наполняем картинку для портфолио
const createPortfolioImage = function (name, link, alt) {
  const portfolioImage = document.createElement('img');
  portfolioImage.dataset.name = name;
  portfolioImage.src = link;
  portfolioImage.alt = alt;
  portfolioImage.classList.add('portfolio__image');
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

// Вставляем картинки в попап
imagesContainer.addEventListener('click', (evt) => {
  let clickedImage = evt.target;
  if (clickedImage.classList.contains('portfolio__image')) {
    togglePopup(popupImage);
    hideAllPopupContent();
    const imagesForPopup = imagesContainer.querySelectorAll('.portfolio__image');
    imagesForPopup.forEach(image => {
      createSliderBlock(image.dataset.name, image.src, image.alt, image.dataset.name);
    });

    // Работа со слайдером
    const imagesForSlider = popupImageContainer.querySelectorAll('.popup-image__image');
    const textsForSlider = popupImageContainer.querySelectorAll('.popup-image__text');
    const buttonShowNextImage = document.querySelector('.popup-image__arrow_next');
    const buttonShowPrevImage = document.querySelector('.popup-image__arrow_prev');


    // Ищем кликнутый элемент
    const findStartingIndex = function () {
      for (let clickedSlideIndex = 0; clickedSlideIndex <= imagesForSlider.length; clickedSlideIndex++) {
        if (clickedImage.src === imagesForSlider[clickedSlideIndex].src) {
          return clickedSlideIndex;
        }
      }
    };
    // Задаем индекс начального слайда
    let sliderIndex = findStartingIndex();

    // Выводим первую картинку
    showCurrentSlide(imagesForSlider[sliderIndex], textsForSlider[sliderIndex]);

    // Функция для переключения картинки вперед
    const showNextSlide = function () {
      hideCurrentSlide(imagesForSlider[sliderIndex], textsForSlider[sliderIndex]);
      if (sliderIndex == imagesForSlider.length - 1) {
        sliderIndex = 0;
        hideCurrentSlide(imagesForSlider[sliderIndex], textsForSlider[sliderIndex]);
        showCurrentSlide(imagesForSlider[sliderIndex], textsForSlider[sliderIndex]);
      } else {
        hideCurrentSlide(imagesForSlider[sliderIndex], textsForSlider[sliderIndex]);
        showCurrentSlide(imagesForSlider[sliderIndex + 1], textsForSlider[sliderIndex + 1]);
        sliderIndex++;
      }
    };
    // Функция для переключения картинки назад
    const showPrevSlide = function () {
      hideCurrentSlide(imagesForSlider[sliderIndex], textsForSlider[sliderIndex]);
      if (sliderIndex == 0) {
        sliderIndex = imagesForSlider.length - 1;
        hideCurrentSlide(imagesForSlider[sliderIndex], textsForSlider[sliderIndex]);
        showCurrentSlide(imagesForSlider[sliderIndex], textsForSlider[sliderIndex]);
      } else {
        hideCurrentSlide(imagesForSlider[sliderIndex], textsForSlider[sliderIndex]);
        showCurrentSlide(imagesForSlider[sliderIndex - 1], textsForSlider[sliderIndex - 1]);
        sliderIndex--;
      }
    };
    buttonShowNextImage.addEventListener('click', () => {
      showNextSlide();
    });
    buttonShowPrevImage.addEventListener('click', () => {
      showPrevSlide();
    });
  }
});

// Показываем  слайд
const showCurrentSlide = function (image, text) {
  image.classList.remove('popup-image_hidden');
  text.classList.remove('popup-image_hidden');
};

// Скрываем  слайд
const hideCurrentSlide = function (image, text) {
  image.classList.add('popup-image_hidden');
  text.classList.add('popup-image_hidden');
};

// Выбираем контейнер для вставки
const popupImageContainer = document.querySelector('.popup-image__container');

// Создаем блок с картинками для вставки в поп-ап
const createSliderBlock = function (name, link, alt, data) {
  const sliderBlockImage = document.createElement('img');
  const sliderBlockText = document.createElement('p');
  sliderBlockText.textContent = name;
  sliderBlockImage.src = link;
  sliderBlockImage.alt = alt;
  sliderBlockImage.dataset.name = data;
  sliderBlockImage.classList.add('popup-image__image', 'popup-image_hidden');
  sliderBlockText.classList.add('popup-image__text', 'popup-image_hidden');
  popupImageContainer.append(sliderBlockImage);
  popupImageContainer.append(sliderBlockText);
};

// Выбираем контейнер с табами
const tabsContainer = document.querySelector('.portfolio__tabs-wrapper');

// Выбираем табы в контейнере
const portfolioTabs = tabsContainer.querySelectorAll('.tab');

// Выбираем картинки из контейнера
const portfolioImages = document.querySelectorAll('.portfolio__image');

// Скрываем все картинки на странице
const hideAllImages = function () {
  imagesContainer.querySelectorAll('.portfolio__image').forEach(image => {
    image.remove();
  });
};

// Скрываем все картинки в попапе
const hideAllPopupContent = function () {
  popupImageContainer.querySelectorAll('.popup-image__image').forEach(image => {
    image.remove();
  });
  popupImageContainer.querySelectorAll('.popup-image__text').forEach(text => {
    text.remove();
  });
};

// Показываем попап с картинкой
const showPopupImage = function (image) {
  popupImageImage.src = image.src;
  popupImageText.textContent = image.dataset.name;
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
