import { searchImages } from './pixabayApi';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const searchForm = document.querySelector('form#search-form');
const inputData = searchForm.elements['searchQuery'];
const resultsGallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
// const submit = document.querySelector('form#search-form button[type=submit]');
let searchQuery = inputData.value;

searchQuery = '';
let pageNum = 1;
let perPage = 40;

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  resultsGallery.innerHTML = '';
  pageNum = 1;
  loadMore.style.display = 'none';
  searchQuery = event.currentTarget.elements.searchQuery.value;
  console.log(searchQuery);
  searchImages(searchQuery, pageNum, perPage).then(photos => {
    let totalpageNum = photos.totalHits / perPage;
    console.log(totalpageNum);
    loadMore.style.display = 'block';

    if (photos.hits.length > 0) {
      Notiflix.Notify.success(`Hooray! We found ${photos.totalHits} images.`);
      galleryMarkup(photos);

      if (totalpageNum <= pageNum) {
        loadMore.style.display = 'none';
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results"
        );
      }
    } else {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMore.style.display = 'none';
      resultsGallery.innerHTML = '';
    }
  });

  if (pageNum > 1) {
    loadMore.style.display = 'block';
  }
});

function galleryMarkup(photos) {
  const markup = photos.hits
    .map(photo => {
      return `<div class="photo-card">
  <a href="${photo.largeImageURL}"><img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy"></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${photo.likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${photo.views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${photo.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${photo.downloads}
    </p>
  </div>
  </div>`;
    })
    .join('');
  resultsGallery.insertAdjacentHTML('beforeend', markup);
  new SimpleLightbox('.gallery a');
}

loadMore.addEventListener('click', () => {
  pageNum++;
  // searchQuery = event.currentTarget.elements.searchQuery.value;
  searchImages(searchQuery, pageNum, perPage).then(photos => {
    let totalpageNum = photos.totalHits / perPage;
    console.log(totalpageNum);
    if (pageNum >= totalpageNum) {
      loadMore.style.display = 'none';
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    galleryMarkup(photos);
  });
});
