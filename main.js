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
window.papago.addEventListener('click', () => (translator = new Papago()).setUrl());
window.baidu.addEventListener('click', () => (translator = new Baidu()).setUrl());
window.text.addEventListener('input', () => translator && translator.setUrl());
document.getElementsByName('translate-to').forEach((node) => node.addEventListener('change', () => translator && translator.setUrl()));

class Form {
  static get text() {
    return encodeURIComponent(window.text.value.replace(/^\s+|\s+$/g, ''));
  }

  static get to() {
    const checked = Array.prototype.find.call(document.getElementsByName('translate-to'), (node) => node.checked);
    return (checked && checked.value) || 'ja';
  }

  static set url(value) {
    window.url.href = window.url.textContent = value;
  }
}

class Translator {
  constructor(url) {
    this.url = new URL(`https://${url}`);
  }

  setHash() {}

  setUrl() {
    this.setHash();
    Form.url = this.url;
  }
}

class DeepL extends Translator {
  constructor() {
    super('www.deepl.com/translator');
  }

  setHash() {
    this.url.hash = `${Form.to === 'ja' ? 'en' : 'ja'}/${Form.to}/${Form.text}`.replace(/%2F/gi, '\\$&'); // escape slash (%2F)
  }
}

class Google extends Translator {
  constructor() {
    super('translate.google.com');
  }

  setHash() {
    this.url.hash = `auto/${Form.to}/${Form.text}`;
  }
}

class Baidu extends Translator {
  constructor() {
    super('fanyi.baidu.com');
  }

  setHash() {
    this.url.hash = `auto/${Form.to === 'ja' ? 'jp' : Form.to}/${Form.text}`;
  }
}

class Bing extends Translator {
  constructor() {
    super('www.bing.com/translator');
  }

  setHash() {
    this.url.search = [`to=${Form.to}`, `text=${Form.text.replace(/%20/g, '+')}`].join('&');
  }
}

class Papago extends Translator {
  constructor() {
    super('papago.naver.com');
  }

  setHash() {
    this.url.search = [`tk=${Form.to}`, `st=${Form.text}`].join('&');
  }
}
