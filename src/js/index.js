import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchFormEl = document.querySelector('.search-form');
const SubmitEl = document.querySelector('.search-form input');
const buttonLoadMoreEl = document.querySelector('.load-more');
let galleryEl = document.querySelector('.gallery');
const myApiKey = '38129087-a1875a38c8c49036313c55811';
const BASE_URL = 'https://pixabay.com/api/';
let pageCounter = 1;
const perPage = 40;

function clearGallery() {
  galleryEl.innerHTML = '';
}
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

  console.log(response.data.hits);
  return renderImgCard(response.data.hits);
}

searchFormEl.addEventListener('submit', requestValue);

function requestValue(event) {
  event.preventDefault();
  pageCounter = 1;
  clearGallery();
  let requestId = SubmitEl.value.trim();
  console.log(requestId);
  // SubmitEl.value = '';
  return fetchImg(requestId);
}
buttonLoadMoreEl.addEventListener('click', () => {
  pageCounter += 1;
  fetchImg(SubmitEl.value);
});

function renderImgCard(response) {
  let listArr = response.map(resp => {
    return `<a href='${resp.largeImageURL}' class='gallery__link'> 
      <img src="${resp.webformatURL}" alt="${resp.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes: ${resp.likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${resp.views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${resp.comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${resp.downloads}</b>
        </p>
      </div>
    </a>`;
  });

  galleryEl.insertAdjacentHTML('beforeend', listArr.join(''));
  var lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 100,
    captionsData: 'alt',
  });
}
