import './sass/main.scss';
import galleryMarkupTpl from './templates/galleryMarkup.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';



const API_KEY = '25359275-764cc4a5f322ad48333636f40';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery')
}

// refs.form.addEventListener('input', onInputSearch);
refs.form.addEventListener('submit', onSubmit);


function onSubmit(e) { 
  e.preventDefault();
  console.log(e.target.searchQuery.value);
  fetchedImages(e.target.searchQuery.value);
}

function fetchedImages(value) {


  // console.log(fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${value}&image_type=photo&per_page=40`).then(res => { return res.json() }).then(img => img.hits[2]).then(img => refs.gallery.insertAdjacentHTML('beforeend', oneImgTpl(img))))
  // return fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${value}&image_type=photo&per_page=40`).then(res => { return res.json() }).then(img => img.hits[2]).then(img => refs.gallery.insertAdjacentHTML('beforeend', oneImgTpl(img)));
  return fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${value}&image_type=photo&per_page=20&orientation=horizontal&safesearch=true`).then(res => { return res.json() }).then(img => { 

    new SimpleLightbox('.gallery a', {
    captions: true,
    captionDelay: 250,
  widthRatio: .9,
})

    return refs.gallery.insertAdjacentHTML('beforeend', galleryMarkupTpl(img.hits))
  }
  )}
// fetchedImages('black flower')