export default class ServiceApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async fetchImages() {
    const axios = require('axios').default;
    const options = {
      method: 'get',
      url: 'https://pixabay.com/api/',
      params: {
        key: '25359275-764cc4a5f322ad48333636f40',
        q: this.searchQuery,
        image_type: 'photo',
        per_page: 40,
        page: this.page,
        orientation: 'horizontal',
        safesearch: true,
      },
    };

    const serchResult = await axios(options);
    this.page += 1;
    return serchResult.data;
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

  // fetchImages() {
  //   const API_KEY = '25359275-764cc4a5f322ad48333636f40';
  //   const BASE_URL = 'https://pixabay.com/api/'

  //   return fetch(`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&page=${this.page}&per_page=40&orientation=horizontal&safesearch=true`)
  //     .then(res => res.json())
  //     .then(data => {
  //       this.page += 1;
  //       return data;
  //     });
  //     }
