window.addEventListener('load', () => {
  setTarget();
  window.text.focus();
});

window['check-open-window'].addEventListener('change', setTarget);

function setTarget() {
  window.url.target = window['check-open-window'].checked ? '_blank' : '_self';
}

let translator;
window.deepl.addEventListener('click', () => {
  translator = new Translator('www.deepl.com/translator', function () {
    this.url.hash = `${Form.to === 'ja' ? 'en' : 'ja'}/${Form.to}/${Form.text}`.replace(/%2F/gi, '\\$&'); // escape slash (%2F)
  });
  translator.setUrl();
});
window.google.addEventListener('click', () => {
  translator = new Translator('translate.google.com', function () {
    this.url.hash = `auto/${Form.to}/${Form.text}`;
  });
  translator.setUrl();
});
window.bing.addEventListener('click', () => {
  translator = new Translator('www.bing.com/translator', function () {
    this.url.search = [`to=${Form.to}`, `text=${Form.text.replace(/%20/g, '+')}`].join('&');
  });
  translator.setUrl();
});
window.papago.addEventListener('click', () => {
  translator = new Translator('papago.naver.com', function () {
    this.url.search = [`tk=${Form.to}`, `st=${Form.text}`].join('&');
  });
  translator.setUrl();
});
window.baidu.addEventListener('click', () => {
  translator = new Translator('fanyi.baidu.com', function () {
    this.url.hash = `auto/${Form.to === 'ja' ? 'jp' : Form.to}/${Form.text}`;
  });
  translator.setUrl();
});
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
  constructor(url, setHash) {
    this.url = new URL(`https://${url}`);
    this.setHash = setHash;
  }

  setUrl() {
    this.setHash();
    Form.url = this.url;
  }
}
