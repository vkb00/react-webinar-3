/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}
export function paginationFormat(pageNumbers, currentPage) {

  if (currentPage === 1 || currentPage === 2)
    return [...pageNumbers.slice(0, 3), -1, pageNumbers.length];

  if (currentPage === pageNumbers.length || currentPage === pageNumbers.length - 1)
    return [1, -1, ...pageNumbers.slice(-3)];

  if (currentPage === 3)
    return [1, currentPage - 1, currentPage, currentPage + 1, -1, pageNumbers.length]

  if (currentPage === pageNumbers.length - 2)
    return [1, -1, currentPage - 1, currentPage, currentPage + 1, pageNumbers.length]

  return [1, -1, currentPage - 1, currentPage, currentPage + 1, -2, pageNumbers.length]

}
/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}
