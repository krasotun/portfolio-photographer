// Работа с табами

// Выбираем контейнер с картинками
const imagesContainer = document.querySelector('.portfolio__gallery-wrapper');

// Наполняем картинку
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
    console.log(newImage);
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
