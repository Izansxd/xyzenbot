const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function removebg(inputPath) {
  try {
    const formData = new FormData();
    formData.append('size', 'auto');
    formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath));

    const response = await axios({
      method: 'post',
      url: 'https://api.remove.bg/v1.0/removebg',
      data: formData,
      responseType: 'arraybuffer',
      headers: {
        ...formData.getHeaders(),
        'X-Api-Key': '2cMmrGhrMfAz1izWyxmuzVew',
      },
      encoding: null,
    });

    if (response.status !== 200) {
      console.error('Error:', response.status, response.statusText);
      return null;
    }

    return response.data;
  } catch (error) {
    console.error('Request failed:', error);
    return null;
  }
}

module.exports = { removebg }

exports