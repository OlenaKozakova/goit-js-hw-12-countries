import fetchCountries from '../js/fetchCountries.js';
import countryOne from '../templates/countryOne.hbs';
import countryTen from '../templates/countryTen.hbs';

import debounce from 'lodash.debounce';
import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
  input: document.querySelector('.js-input-search'),
  country: document.querySelector('.js-country'),
};

refs.input.addEventListener('input', debounce(searchCountry, 500));

let catalogeCountries = '';

function searchCountry() {
  clearSearch();
  catalogeCountries = refs.input.value;
  if (!catalogeCountries) {
    return;
  }
  fetchCountries(catalogeCountries)
    .then(displayResults)
    .catch(err => console.log(err));
}

function clearSearch() {
  refs.country.innerHTML = '';
}

function displayResults(countries) {
  if (countries.length === 1) {
    displayCountries(countryOne, countries);
  } else if (countries.length > 1 && countries.length <= 10) {
    displayCountries(countryTen, countries);
  } else if (countries.length > 10) {
    createMessage(
      error,
      'To many matches found. Please enter a more specific query!',
    );
  }
}

function createMessage(information, text) {
  information({
    text: `${text}`,
    delay: 1400,
    closerHover: true,
  });
}

function displayCountries(template, countries) {
  refs.country.insertAdjacentHTML('beforeend', template(countries));
}
