import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38105470-652721ced6ff5551f65b62ae6';
const perPage = 12;

export async function AllImages(query, page) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: perPage,
      page: page,
    },
  });

  return response.data;
}
