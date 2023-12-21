const commentsActions = {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });
      console.log(services)
      //debugger
      try {
        console.log('try', id)
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });
        // Товар загружен успешно
        console.log('res', id)
        console.log(res.data.result.items);
        dispatch({ type: 'comments/load-success', payload: { data: res.data.result.items } });

      } catch (e) {
        //Ошибка загрузки
        console.log('err', e)
        dispatch({ type: 'comments/load-error' });
      }
    }
  },
  createComment: (text, type, parentId, primeId) => {
    return async (dispatch, getState, services) => {

      const data = {
        text: text,
        parent: {
          _id: parentId,
          _type: type
        }
      }
      try {
        services._store.actions.session.remind();
        const token = services._store.state.session.token;
        if (token) {
          const res = await services.api.request({
            url: '/api/v1/comments',
            method: 'POST',
            heders: {
              "X-Token": token
            },
            body: JSON.stringify(data)
          });
        }
        dispatch(commentsActions.load(primeId));
      }
      catch (e) {
        console.log('erCom', e)
      }
    }
  }
  // async createComment(text, type, parentId) {
  //   const data = {
  //     text: text,
  //     parent: {
  //       _id: parentId,
  //       _type: type
  //     }
  //   }
  //   this.store.actions.session.remind();
  //   const token = this.store.state.session.token;
  //   if (token) {
  //     const res = await this.services.api.request({
  //       url: '/api/v1/comments',
  //       method: 'POST',
  //       heders: {
  //         "X-Token": token
  //       },
  //       body: JSON.stringify(data)
  //     });
  //     this.setState({
  //       ...this.getState(),
  //       listComments: this.listComments,
  //       waiting: false
  //     }, 'Комментарии загружены');
  //     console.log(res);
  //   }

  // }
}
export default commentsActions;
