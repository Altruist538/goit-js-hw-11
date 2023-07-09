import axios from 'axios';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const searchFormEl = document.querySelector('.search-form');
const SubmitEl = document.querySelector('.search-form input');
const buttonLoadMoreEl = document.querySelector('.load-more');
let galleryEl = document.querySelector('.gallery');
const myApiKey = '38129087-a1875a38c8c49036313c55811';
const BASE_URL = 'https://pixabay.com/api/';
const pageCounter = 1;
const perPage = 40;

async function fetchImg(value) {
  let response = await axios(`${BASE_URL}`, {
    params: {
      key: myApiKey,
      q: value,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: pageCounter,
      per_page: perPage,
    },
  });

  console.log(response.data);
  return renderImgCard(response);
}
searchFormEl.addEventListener('submit', requestValue);
function requestValue(event) {
  event.preventDefault();
  let requestId = SubmitEl.value.trim();
  console.log(requestId);
  SubmitEl.value = '';
  return fetchImg(requestId);
}

function renderImgCard(response) {
  let listArr = [];
  for (let i = 0; i < perPage; i += 1) {
    listArr.push(`<a href='${response.data.hits[i].largeImageURL}' class='gallery__link'> 
  <img src="${response.data.hits[i].webformatURL}" alt="${response.data.hits[i].tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${response.data.hits[i].likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${response.data.hits[i].views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${response.data.hits[i].comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${response.data.hits[i].downloads}</b>
    </p>
  </div>
  </a>`);
  }
  galleryEl.insertAdjacentHTML('beforeend', listArr.join(''));
  var lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 100,
    captionsData: 'alt',
  });
  return;
}
