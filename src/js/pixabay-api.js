export const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '26682637 - dbd8b52f010b530b6481286b3';
export const options = {
  params: {
    key: API_KEY,
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 40,
  },
};
