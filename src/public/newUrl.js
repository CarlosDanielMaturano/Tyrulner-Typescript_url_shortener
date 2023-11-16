import { createNoteMessage } from './elementsManipulator.js';

const handleError = (error) => {
  console.log(error);
};

const createNewUrl = async (url) => {
  const fetchLink = `${origin}/api/new/`;
  const res = await fetch(fetchLink, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
    }),
  });
  const data = await res.json();
  const { statusCode } = data;
  if (statusCode !== 200 && statusCode !== 201) {
    console.log(statusCode);
    console.log(data);
    handleError(new Error(data.message));
    return createNoteMessage(data);
  }
  return data;
};

export default createNewUrl;
