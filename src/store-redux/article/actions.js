export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'article/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
        });
        // Товар загружен успешно
        console.log('article')
        dispatch({ type: 'article/load-success', payload: { data: res.data.result } });

      } catch (e) {
        //Ошибка загрузки
        console.log('articleEr')
        dispatch({ type: 'article/load-error' });
      }
    }
  },
}
