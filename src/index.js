import './sass/main.scss';
import galleryMarkupTpl from './templates/galleryMarkup.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';



const API_KEY = '25359275-764cc4a5f322ad48333636f40';
const BASE_URL = 'https://pixabay.com/api/'
let chto = null

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.btn-load-more'),
  btnToTheTop: document.querySelector('.btn-to-top')
}

// refs.form.addEventListener('input', onInputSearch);
refs.form.addEventListener('submit', onSubmit);
// refs.btnLoadMore.addEventListener('click', fetchedImage)


function onSubmit(e) { 
  e.preventDefault();
  console.log(e.target.searchQuery.value);
  fetchedImages(e.target.searchQuery.value);
}

function fetchedImages(value) {
  chto += 1;
  // console.log(fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${value}&image_type=photo&per_page=40`).then(res => { return res.json() }).then(img => img.hits[2]).then(img => refs.gallery.insertAdjacentHTML('beforeend', oneImgTpl(img))))
  return fetch(`${BASE_URL}?key=${API_KEY}&q=${value}&image_type=photo&page=${chto}&per_page=12&orientation=horizontal&safesearch=true`)
    .then(res => { return res.json() })
    .then(img => {
      new SimpleLightbox('.gallery a').refresh()
      
      refs.btnLoadMore.classList.remove('is-hidden')

      if (chto >= 2) {
        refs.btnToTheTop.classList.add('btn-to-top--visible')
       }


      if (img.total === 0) {
        console.log('change this fucking search')
       }

    return refs.gallery.insertAdjacentHTML('beforeend', galleryMarkupTpl(img.hits))
  }
  )
}