window.addEventListener('load', function () {
  window.text.focus();
});

window['button-deepl'].addEventListener('click', () => new DeepL().open());
window['button-google'].addEventListener('click', () => new Google().open());
window['button-bing'].addEventListener('click', () => new Bing().open());

class Translator {
  setUrlWithHash(urlString) {
    this.url = new URL(urlString);
    this.url.hash = `auto/ja/${this.text}`;
  }

  get text() {
    return window.text.value.replace(/^\s+|\s+$/, '');
  }

  open() {
    window['url'].value = this.url;
    if (!window['open-window'].checked) window.location = this.url;
    window.open(this.url);
  }
}

class DeepL extends Translator {
  constructor() {
    super();
    this.setUrlWithHash('https://www.deepl.com/translator');
  }
}

class Google extends Translator {
  constructor() {
    super();
    this.setUrlWithHash('https://translate.google.com');
  }
}

class Bing extends Translator {
  constructor() {
    super();
    this.url = new URL('https://www.bing.com/translator');
    this.url.search = ['to=ja', `text=${this.text}`].join('&');
  }
}
