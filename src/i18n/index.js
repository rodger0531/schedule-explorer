import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import translationEN from '../languages/en.json';
import translationZH from '../languages/zh-tw.json';
import {SUPPORTED_LANGUAGE_CODES} from '../core/constants'

const supportedLangs = Object.keys(SUPPORTED_LANGUAGE_CODES)

const resource = {
  en: {translation: translationEN},
  'zh-tw': {translation: translationZH}
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: resource,
    lng: window.currentLanguageCode,
    fallbackLng: 'en',
    lowerCaseLng: true, // all lowercase for third-part library / frontend / backend consistency
    nsSeparator: false, // disable separator ':'
    interpolation: {escapeValue: false}, // react already safes from xss
    supportedLangCodes: supportedLangs, // we don't use `supportedLngs` option cause it inject unwanted `cimode`
    langCodesTitle: supportedLangs, // for UI display
    returnEmptyString: false // Disallow empty strings; show key for empty strings instead
  });

export default i18n;
