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
    }, 'Категории загружены');
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
      console.log(res);
    }

  }
  transformCommentsTree(list, primeId) {

    let result = [];
    if (list.length === 0)
      return;
    list.forEach(item => {

      if (item.parent._id === primeId)
        result.push(item);
    })
    list.forEach(item => {

      let currentElement = result.find(element => element._id === item.parent._id);

      if (currentElement) {
        //debugger
        if (currentElement.children)
          currentElement.children = [...currentElement.children].push(item);
        else
          currentElement.children = [item];
      }
      console.log('cur', currentElement);


    })
    console.log(result);
  }

}

export default CommentsState;
