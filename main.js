window.addEventListener('load', () => {
  setTarget();
  window.text.focus();
});

window['check-open-window'].addEventListener('change', setTarget);

function setTarget() {
  window.url.target = window['check-open-window'].checked ? '_blank' : '_self';
}

let translator;
window.deepl.addEventListener('click', () => (translator = new DeepL()).setUrl());
window.google.addEventListener('click', () => (translator = new Google()).setUrl());
window.bing.addEventListener('click', () => (translator = new Bing()).setUrl());
window.text.addEventListener('input', () => translator && translator.setUrl());

class Translator {
  constructor(url) {
    this.url = new URL(`https://${url}`);
  }

  get text() {
    return window.text.value.replace(/^\s+|\s+$/, '');
  }

  setHash() {
    this.url.hash = `auto/ja/${this.text}`;
  }

  setUrl() {
    window.url.href = this.url;
    window.url.textContent = this.url;
  }
}

class DeepL extends Translator {
  constructor() {
    super('www.deepl.com/translator');
  }

  setUrl() {
    this.setHash();
    super.setUrl();
  }
}

class Google extends Translator {
  constructor() {
    super('translate.google.com');
  }

  setUrl() {
    this.setHash();
    super.setUrl();
  }
}

class Bing extends Translator {
  constructor() {
    super('www.bing.com/translator');
  }

  setUrl() {
    this.url.search = ['to=ja', `text=${this.text}`].join('&');
    super.setUrl();
  }
}
