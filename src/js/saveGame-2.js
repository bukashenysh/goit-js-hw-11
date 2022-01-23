import './sass/main.scss';
import galleryMarkupTpl from './templates/galleryMarkup.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import ApiService from './js/serviceApi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let page = 1;

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.btn-load-more'),
  btnToTheTop: document.querySelector('.btn-to-top')
}

const apiService = new ApiService();
const simple = new SimpleLightbox('.gallery a');


refs.form.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onLoadMore);
window.addEventListener('scroll', onScroll);
refs.btnToTheTop.addEventListener('click', onTopBtn);

function onSearch(e) { 
  e.preventDefault();
  page += 1;
  clearImageMarkup();
  
  apiService.query = e.currentTarget.elements.searchQuery.value;
  apiService.resetPage();
  apiService.fetchImages().then(data => { 
    const totalPages = Math.ceil(data.totalHits / 40);
    if (data.totalHits === 0) { 
      alertNoImagesFound();
    };
    if (data.totalHits !== 0) {
      refs.btnLoadMore.classList.remove('is-hidden');
          alertImagesFound(data);
    };
    if (page > totalPages && data.totalHits !== 0) {
      refs.btnLoadMore.classList.add('is-hidden');
      alertEndOfSearch();
    }
    appendImagesMarkup(data);
  });
};

async function onLoadMore() {
  page += 1;
  const data = await apiService.fetchImages()
  const totalPages = Math.ceil(data.totalHits / 40);
  if (page > totalPages) {
    refs.btnLoadMore.classList.add('is-hidden');
    alertEndOfSearch();
  }
  appendImagesMarkup(data);
};




// function onLoadMore() {
//   page += 1;

//   apiService.fetchImages().then(data => {
//     const totalPages = Math.ceil(data.totalHits / 40);

//     if (page > totalPages) {
//       refs.btnLoadMore.classList.add('is-hidden');
//       // console.log('the end');
//       alertEndOfSearch();
//     }
//     appendImagesMarkup(data);
// })
// };

function appendImagesMarkup(data) {
  refs.gallery.insertAdjacentHTML('beforeend', galleryMarkupTpl(data.hits));
  simple.refresh();
};

function clearImageMarkup(data) { 
  refs.gallery.innerHTML = '';
};

function onScroll() {
  const scrolled = window.pageYOffset
  const coords = document.documentElement.clientHeight

  if (scrolled > coords) {
    refs.btnToTheTop.classList.add('btn-to-top--visible')
  }
  if (scrolled < coords) {
    refs.btnToTheTop.classList.remove('btn-to-top--visible')
  }
};

function onTopBtn() {
  if (window.pageYOffset > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
};

function alertImagesFound(data) {
  Notify.success(`Hooray! We found ${data.totalHits} images.`)
};

function alertNoImagesFound() {
  Notify.failure('Sorry, there are no images matching your search query. Please try again.')
};

function alertEndOfSearch() {
  Notify.info("We're sorry, but you've reached the end of search results.")
};
