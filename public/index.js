import createNewUrl from './newUrl.js';
import {
  addUrlToContainer,
  createQrCode,
  createAdvice,
} from './elementsManipulator.js';
import { handleError } from './newUrl.js';

const button = document.getElementById('url-button');
const urlInput = document.getElementById('url-input');
const urlContainer = document.getElementById('url-container');
const qrCodeContainer = document.getElementById('qrcode-container');

button.addEventListener('click', async (e) => {
  e.preventDefault();
  urlContainer.innerHTML = '';
  const url = urlInput.value;
  if (!url) {
    return alert('Please, Do not leave blank fields');
  }
  const data = await createNewUrl(url);
  const { statusCode, shortUrl, qrCodeBufData } = data;
  if (statusCode !== 200 && statusCode !== 201) {
    handleError(new Error(data.message));
    return createAdvice(data);
  }

  addUrlToContainer(shortUrl, urlContainer);
  createQrCode(qrCodeBufData, qrCodeContainer);
  createAdvice(data);
  urlInput.value = '';
});
