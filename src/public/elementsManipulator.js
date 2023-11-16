export const addUrlToContainer = (url, urlContainer) => {
  urlContainer.innerHTML = `
    <a class="short-url" href="${url}">${url}</a>
  `;
};

export const createNoteMessage = ({ message, statusCode }) => {
  const messageContainer = document.getElementById('message-container');
  messageContainer.innerHTML = '';
  let className = 'alert-primary';
  if (statusCode !== 200 && statusCode !== 201) {
    className = 'alert-danger';
  }

  messageContainer.innerHTML = `
    <h3 class="alert ${className}" role="alert">${message}</h3>
  `;
};
