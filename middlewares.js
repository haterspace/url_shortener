// Для генератора сокращенных ссылок

function generateRandomString(length) {
  const letters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let str = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    str += letters[randomIndex];
  }
  return str;
}

function generateShortUrl() {
  const randomString = generateRandomString(4);
  const shortUrl = `${randomString}`;
  return shortUrl;
}

// Для валидации ссылок

function urlValidation(url) {
  const urlCheck =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
  return urlCheck.test(url);
}

module.exports = { generateRandomString, generateShortUrl, urlValidation };
