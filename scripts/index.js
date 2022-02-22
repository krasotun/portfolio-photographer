// Работа с табами
// Выбираем контейнер с картинками
const imagesContainer = document.querySelector('.portfolio__gallery-wrapper');
// Создаем картинку
const portfolioImage = document.createElement('img');

// Наполняем картинку
const createPortfolioImage = function (name, link, alt) {
  portfolioImage.dataset.name = name;
  portfolioImage.src = link;
  portfolioImage.alt = alt;
  portfolioImage.classList.add('portfolio__image');
};

// Вставляем картинку на сайт
const appendPortfolioImage = function () {
  imagesContainer.prepend(portfolioImage);
};
createPortfolioImage(imagesArray[0].name, imagesArray[0].link, imagesArray[0].alt);
appendPortfolioImage();

// Выбираем контейнер с табами
const tabsContainer = document.querySelector('.portfolio__tabs-wrapper');

// Выбираем табы в контейнере
const portfolioTabs = tabsContainer.querySelectorAll('.tab');

// Выбираем картинки из контейнера
const portfolioImages = imagesContainer.querySelectorAll('.portfolio__image');


// Скрываем все картинки на странице
const hideAllImages = function () {
  portfolioImages.forEach(image => {
    image.classList.add('portfolio__image_hidden');
  });
};

// Показываем все картинки на странице
const showAllImages = function () {
  portfolioImages.forEach(image => {
    image.classList.remove('portfolio__image_hidden');
  });
};


// Показ изображений по тегу
const selectImagesFromPortfolio = function () {
  tabsContainer.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('tab')) {
      let clickedTag = evt.target;
      removeActiveTabs(); // Убираем со всех табов активный
      togglePortfolioTag(clickedTag); // Меняем вид таба
      hideAllImages(); // Скрываем все картинки
      portfolioImages.forEach(image => {
        if (image.dataset.name === clickedTag.innerText) {
          image.classList.remove('portfolio__image_hidden');
        } else if (clickedTag.innerText === 'All') {
          showAllImages();
        }
      });
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
