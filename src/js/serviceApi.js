export default class ServiceApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const API_KEY = '25359275-764cc4a5f322ad48333636f40';
    const BASE_URL = 'https://pixabay.com/api/'

    return fetch(`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&page=${this.page}&per_page=40&orientation=horizontal&safesearch=true`)
      .then(res => res.json())
      .then(data => {
        this.page += 1;
        return data;
      });
      }

  resetPage() {
    this.page = 1;
   }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}