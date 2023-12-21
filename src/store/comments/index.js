import StoreModule from '../module';

/**
 * Список категорий
 */
class CommentsState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      listComments: [],
      waiting: false
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(id) {
    this.setState({ ...this.getState(), waiting: true }, 'Ожидание загрузки Комментариев');

    const res = await this.services.api.request({
      url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
    });
    console.log(res.data.result.items);
    // Товар загружен успешно
    this.setState({
      ...this.getState(),
      listComments: res.data.result.items,
      waiting: false
    }, 'Комментарии загружены');
  }

  async createComment(text, type, parentId) {
    const data = {
      text: text,
      parent: {
        _id: parentId,
        _type: type
      }
    }
    this.store.actions.session.remind();
    const token = this.store.state.session.token;
    if (token) {
      const res = await this.services.api.request({
        url: '/api/v1/comments',
        method: 'POST',
        heders: {
          "X-Token": token
        },
        body: JSON.stringify(data)
      });
      this.setState({
        ...this.getState(),
        listComments: this.listComments,
        waiting: false
      }, 'Комментарии загружены');
      console.log(res);
    }

  }


}

export default CommentsState;
