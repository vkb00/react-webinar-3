/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export default function dateFormat(value, locale = 'ru-RU', options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }) {
  const date = new Date(value);
  return new Intl.DateTimeFormat(locale, options).format(date);
}
