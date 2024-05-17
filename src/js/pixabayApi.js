'use strict';

import axios from 'axios';
export { searchImages };
const apiKey = '26682637-dbd8b52f010b530b6481286b3';
async function searchImages(searchQuery, pageNum, perPage) {
  const params = new URLSearchParams({
    key: apiKey,
    orientation: 'horizontal',
    image_type: 'photo',
    safesearch: true,
    per_page: perPage,
    page: pageNum,
    q: searchQuery,
  });

  const response = await axios.get(`https://pixabay.com/api/?${params}`);
  const data = response.data;
  console.log(data);
  return data;
}
