window.addEventListener('load', function () {
  window.text.focus();
});

window['button-deepl'].addEventListener('click', function () {
  const url = new URL('https://www.deepl.com/translator');
  url.hash = `en/ja/${trim(window.text.value)}`;
  setUrl(url);
});

window['button-google'].addEventListener('click', function () {
  const url = new URL('https://translate.google.com');
  url.hash = `en/ja/${trim(window.text.value)}`;
  setUrl(url);
});

window['button-bing'].addEventListener('click', function () {
  const url = new URL('https://www.bing.com/translator');
  url.search = ['to=ja', `text=${trim(window.text.value)}`].join('&');
  setUrl(url);
});

function trim(text) {
  return text.replace(/^\s+|[\s\r\n]+$/, '');
}

function setUrl(url) {
  window['url'].value = url;
  open(url);
}
