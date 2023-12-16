import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CatalogState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
      params: {
        page: 1,
        limit: 10,
        sort: 'order',
        query: '',
        category: '0',
      },
      count: 0,
      waiting: false
    }
  }

  /**
   * Инициализация параметров.
   * Восстановление из адреса
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async initParams(newParams = {}) {
    const urlParams = new URLSearchParams(window.location.search);
    let validParams = {};
    if (urlParams.has('page')) validParams.page = Number(urlParams.get('page')) || 1;
    if (urlParams.has('limit')) validParams.limit = Math.min(Number(urlParams.get('limit')) || 10, 50);
    if (urlParams.has('sort')) validParams.sort = urlParams.get('sort');
    if (urlParams.has('query')) validParams.query = urlParams.get('query');
    await this.setParams({ ...this.initState().params, ...validParams, ...newParams }, true);
  }

  /**
   * Сброс параметров к начальным
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async resetParams(newParams = {}) {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const params = { ...this.initState().params, ...newParams };
    // Установка параметров и загрузка данных
    await this.setParams(params);
  }

  /**
   * Установка параметров и загрузка списка товаров
   * @param [newParams] {Object} Новые параметры
   * @param [replaceHistory] {Boolean} Заменить адрес (true) или новая запись в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setParams(newParams = {}, replaceHistory = false) {
    const params = { ...this.getState().params, ...newParams };
    console.log('params', newParams)
    // Установка новых параметров и признака загрузки
    this.setState({
      ...this.getState(),
      params,
      waiting: true
    }, 'Установлены параметры каталога');

    // Сохранить параметры в адрес страницы
    let urlSearch = new URLSearchParams(params).toString();
    console.log('url', urlSearch)
    const url = window.location.pathname + '?' + urlSearch + window.location.hash;
    if (replaceHistory) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }

    const apiParams = {
      limit: params.limit,
      skip: (params.page - 1) * params.limit,
      fields: 'items(*),count',
      sort: params.sort,
      'search[query]': params.query,

    };

    console.log('cp', params.category, "api", apiParams);
    if (params.category) {
      apiParams['search[category]'] = params.category;
    }
    if (apiParams['search[category]'] === "0")
      delete apiParams['search[category]'];


    const response = await fetch(`/api/v1/articles?${new URLSearchParams(apiParams)}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
      waiting: false
    }, 'Загружен список товаров из АПИ');
  }
  buildCategoryTree(categories, parentId = null) {
    const categoryTree = [];
    categories
      .filter(category => category.parent?._id == parentId)
      .forEach(category => {
        const children = this.buildCategoryTree(categories, category._id);
        if (children.length) {
          category.children = children;
        }
        categoryTree.push(category);
      });
    return categoryTree;
  }
  formatTree(node, depth) {
    if (!node.children) {
      return [{ node, depth }];
    }
    const children = node.children.flatMap(item =>
      this.formatTree(item, depth + 1)
    )
    return [{ node, depth }, ...children];
  }
  async getAllCategory(setCategorySort) {
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();
    const res = json.result.items;
    let result = [];
    res.forEach(item => {
      if (!item.parent)
        result.push(item);
    });
    let categoryTree = this.buildCategoryTree(res);
    let formatedCategoryTree = categoryTree.flatMap(node => this.formatTree(node, 0));
    formatedCategoryTree.forEach(({ node, depth }) => {
      node.title = '-'.repeat(depth) + node.title;
    })
    setCategorySort([{ title: 'Все', _id: 0 }, ...formatedCategoryTree.map(item => item.node)]);
  }
}

export default CatalogState;
