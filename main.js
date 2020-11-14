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
window.baidu.addEventListener('click', () => (translator = new Baidu()).setUrl());
window.text.addEventListener('input', () => translator && translator.setUrl());
document.getElementsByName('translate-to').forEach((node) => node.addEventListener('change', () => translator && translator.setUrl()));

class Translator {
  constructor(url) {
    this.url = new URL(`https://${url}`);
  }

  get text() {
    return encodeURIComponent(window.text.value.replace(/^\s+|\s+$/g, ''));
  }

  get to() {
    const checked = Array.prototype.find.call(document.getElementsByName('translate-to'), (node) => node.checked);
    return (checked && checked.value) || 'ja';
  }

  setHash() {
    this.url.hash = `auto/${this.to}/${this.text}`;
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
    this.url.hash = this.url.hash.replace(/%2F/gi, '\\$&'); // escape slash (%2F)
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

class Baidu extends Translator {
  constructor() {
    super('fanyi.baidu.com');
  }

  setUrl() {
    this.setHash();
    super.setUrl();
  }

  get to() {
    const lang = super.to;
    return lang === 'ja' ? 'jp' : lang;
  }
}

class Bing extends Translator {
  constructor() {
    super('www.bing.com/translator');
  }

  setUrl() {
    this.url.search = [`to=${this.to}`, `text=${this.text.replace(/%20/g, '+')}`].join('&');
    super.setUrl();
  }
}
