import { sortCardsByParam } from './src/utils/sortCardsByParam';

let id = 0;

const loaderEl = document.querySelector('.overlay-loader');
const cityInputEl = document.querySelector('.city-input');
const citySearchButtonEl = document.querySelector('.city-search-btn');

const cityCardListEl = document.querySelector('.city-card-list');
const cityCardTemplateEl = document.querySelector('#city-card-template');

const cityCardLeftButtonEl = document.querySelector('#city-card-left-btn');
const cityCardRightButtonEl = document.querySelector('#city-card-right-btn');

const sortByNameButtonEl = document.querySelector('#sort-name-btn');
const sortByTemperatureButtonEl = document.querySelector('#sort-temperature-btn');

const sortCardsEl = document.querySelector('#sort-cards-goup');

citySearchButtonEl.addEventListener('click', onCitySearchClick);
sortByNameButtonEl.addEventListener('click', handleSortByNameClick);
sortByTemperatureButtonEl.addEventListener('click', handleSortByTemperatureClick);
cityInputEl.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    onCitySearchClick();
  }
});

cityCardLeftButtonEl.addEventListener('click', () => cityCardListEl.scroll({
  left: cityCardListEl.scrollLeft - 253,
  behavior: 'smooth'
}));

cityCardRightButtonEl.addEventListener('click', () => cityCardListEl.scroll({
  left: cityCardListEl.scrollLeft + 253,
  behavior: 'smooth'
}));

cityCardListEl.addEventListener('wheel', (event) => {
  cityCardListEl.scroll({
    left: cityCardListEl.scrollLeft + event.deltaY,
    behavior: 'smooth'
  })
});

function handleSortByNameClick() {
  // filter out empty tag names
  const cardNodes = [...cityCardListEl.childNodes].filter(e => e.tagName !== undefined);
  const sortedCards = [...cardNodes].sort((a, b) => sortCardsByParam(a, b, 'city'));

  cityCardListEl.replaceChildren(...sortedCards);
}

function handleSortByTemperatureClick() {
  const cardNodes = [...cityCardListEl.childNodes].filter(e => e.tagName !== undefined);
  const sortedCards = [...cardNodes].sort((a, b) => sortCardsByParam(a, b, 'temperature', 'number'));

  cityCardListEl.replaceChildren(...sortedCards);
}

function onCitySearchClick() {
  getWeatherData(cityInputEl.value);
  cityInputEl.value = '';
}

function getWeatherData(location) {
  loaderEl.hidden = false;
  fetch(`https://api.weatherapi.com/v1/current.json?key=6dff9e9af6924898825174855223005&q=${location}&aqi=yes`)
    .then(response => response.json())
    .then(data => {
      if (!data.error) return data;
      else throw new Error(data.error.message);
    })
    .then(data => {
      const city = data.location.name;
      const temperature = data.current.temp_c;
      const icon = data.current.condition.icon;
      const condition = data.current.condition.text;

      createNewCard(id, city, temperature, icon, condition);

      loaderEl.hidden = true;
      setCardButtonsHiddenState(false);

      id++;
    }).catch(error => {
      loaderEl.hidden = true;
      console.error(error);
    });
}

function setCardButtonsHiddenState(isHidden) {
  cityCardLeftButtonEl.hidden = isHidden;
  cityCardRightButtonEl.hidden = isHidden;
  // sortByNameButtonEl.hidden = isHidden;
  // sortByTemperatureButtonEl.hidden = isHidden;
  sortCardsEl.hidden = isHidden;
}

function createNewCard(id, city, temperature, icon, condition) {
  const newEl = cityCardTemplateEl.cloneNode(true);
  const newCityEl = newEl.querySelector('#city');
  const newTemperatureEl = newEl.querySelector('#temperature');
  const newWeatherIconEl = newEl.querySelector('#weather-icon');
  const newWeatherConditionEl = newEl.querySelector('#weather-condition');
  const newCityCardDeleteButtonEl = newEl.querySelector('#city-card-delete-btn');

  newEl.hidden = false;
  newEl.id = 'city-card-' + id;
  newEl['data-id'] = id;
  
  newCityEl.id = 'city-' + id;
  newCityEl.innerHTML = city;

  newTemperatureEl.id = 'temperature-' + id;
  newTemperatureEl.innerHTML = Math.round(temperature);

  newWeatherIconEl.id = 'weather-icon-' + id;
  newWeatherIconEl.src = icon;

  newWeatherConditionEl.id = 'weather-condition-' + id;
  newWeatherConditionEl.innerHTML = condition;

  newCityCardDeleteButtonEl.id = 'city-card-delete-btn-' + id;
  newCityCardDeleteButtonEl.addEventListener('click', () => handleDeleteCardButtonClick(id));

  cityCardListEl.appendChild(newEl);
}

function handleDeleteCardButtonClick(id) {
  getCard(id).remove();

  const cardNodes = [...cityCardListEl.childNodes].filter(e => e.tagName !== undefined);
  if (cardNodes.length === 0) setCardButtonsHiddenState(true);
}

function getCard(id) {
  return document.querySelector(`#city-card-${id}`);
}

// TODO:
// dodać scroll na touchpadzie