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
  portfolioImage.addEventListener('click', () => {
    addSliderBlock();
    /* showPopupImage(portfolioImage); */
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


// Слайдер
// Логика
// Вставляем в попап картинки из выбранного тега (копипуем с массивом)
// Next
// Тогглим класс hidded
// Prev
// Тогглим класс hidded
// Если дошли до первой - меняем на последнюю


// Выбираем шаблон (template) карточки
const sliderTemplate = document.querySelector('#slider-template').content;
console.log(sliderTemplate);

// Создаем блок с картинками для вставки в поп-ап
const createSliderBlock = function (name, link, alt) {
  const sliderBlock = sliderTemplate.querySelector('.popup-image__container').cloneNode(true);
  const sliderBlockImage = document.createElement('img');
  const sliderBlockText = document.createElement('p');
  sliderBlockText.textContent = name;
  sliderBlockImage.src = link;
  sliderBlockText.alt = alt;
  sliderBlockImage.classList.add('popup-image__image');
  sliderBlockText.classList.add('popup-image__text');
  return sliderBlock;
};

// Выбираем контейнер для вставки
const popupImageContainer = document.querySelector('.popup-image__container');


// Вставляем блок с картинками в попап
const addSliderBlock = function () {
  imagesContainer.querySelectorAll('.portfolio__image').forEach(image => {
    const sliderBlockForAdding = createSliderBlock(image.dataset.name, image.src, image.alt);
    console.log(sliderBlockForAdding);
    popupImage.append(sliderBlockForAdding);
  });
};

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

/* buttonShowNextImage.addEventListener('click', () => {
  console.log('Next Clicked!');;
}); */

/* buttonShowPrevImage.addEventListener('click', () => {
  console.log(('Prev clicked'));
}); */




const showNextPopupImage = function () {
  const pageImagesArray = imagesContainer.querySelectorAll('.portfolio__image');
  /*  console.log(pageImagesArray.indexOf('penis')); */
  /* console.log(pageImagesArray.indexOf('penis')); */
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

/* buttonClosePopupImage.addEventListener('click', () => {
  togglePopup(popupImage);
}); */

priceSection.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('button_place_price')) {
    togglePopup(popupForm);
  }
});
