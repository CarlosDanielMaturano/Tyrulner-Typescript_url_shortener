export const handleError = (error) => {
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
      qrCode: true,
    }),
  });
  const data = await res.json();
  return data;
};

export default createNewUrl;
