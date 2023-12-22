import * as translations from './translations';

class I18nService {


  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.defaultLanguage = "ru";
    this.currentLanguage = this.defaultLanguage;

  }
  gg() {
    console.log(this);
  }
  changeLanguage(lang) {
    this.currentLanguage = lang;
    console.log('s')
  }
  translate(text, plural, lang = this.currentLanguage) {
    console.log(translations)

    let result = translations[lang] && (text in translations[lang])
      ? translations[lang][text]
      : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }
    return result;
  }
}

export default I18nService;
