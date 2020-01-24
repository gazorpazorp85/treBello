import axios from 'axios'


export default { getRandomId, createUserIcon, getRandomColor, uploadImg, getImagesFromUnsplash }

function getRandomId() {
  let letters = '1234567890poiiytreqwasdfghjklmnbvcxxssersgyushquiz';
  let id = '';
  for (let i = 0; i < 10; i++) {
    let ind = Math.floor(Math.random() * letters.length)
    id += letters[ind];
  }
  return id;
}

function createUserIcon(firstName, lastName) {
  let newIcon = firstName.charAt(0) + lastName.charAt(0)
  return (newIcon)
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



function uploadImg(file) {
  const CLOUD_NAME = 'dujlxvxxv'
  const PRESET_NAME = 'xi62wuas'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', PRESET_NAME);

  return axios.post(UPLOAD_URL, formData)
    .then(res => res.data)
    .then(res => {
      return res.url
    })
    .catch(err => console.error(err))
}


function getImagesFromUnsplash(filterName) {
  const client_id = '9a992bf0a58ef7c4735758c98ec044dcdb524c2178db25d55cd773d7436f15d1'
  const perPage = 4;
  const URL = `https://api.unsplash.com/search/photos?query=${filterName}?page=${perPage}&client_id=${client_id}`
  return axios.get(URL)
    .then(res => res.data)
    .then(res => {
      return res.results
    })
    .catch(err => console.error(err))
}
