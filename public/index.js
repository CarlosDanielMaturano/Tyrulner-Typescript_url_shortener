import createNewUrl from './newUrl.js';
import { addUrlToContainer, createNoteMessage } from './elementsManipulator.js';

const button = document.getElementById('url-button');
const origin = window.location.origin;
const form = document.getElementById('form');
const urlInput = document.getElementById('url-input');
const urlContainer = document.getElementById('url-container');

button.addEventListener('click', async (e) => {
  e.preventDefault();
  urlContainer.innerHTML = '';
  const url = urlInput.value;
  if (!url) {
    return alert('Please, Do not leave blank fields');
  }
  const response = await createNewUrl(url);
  const shortUrl = response.shorten;
  addUrlToContainer(shortUrl, urlContainer);
  createNoteMessage(response);
  urlInput.value = '';
});
