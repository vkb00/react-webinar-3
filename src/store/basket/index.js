import StoreModule from "../module";

class Basket extends StoreModule {

  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0,
      currentItem: {
        category: { title: '' },
        description: "",
        edition: 0,
        madeIn: { title: '' },
        price: 0,
        title: "",
        _id: ""

      },

    }
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   */
  async getItemInfo(id) {
    console.log('ci2', this.getState().currentItem)
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      currentItem: json.result
    }, 'Загружен товар из АПИ');
  }
  addToBasket(_id) {

    let sum = 0;
    // Ищем товар в корзине, чтобы увеличить его количество
    let exist = false;
    const list = this.getState().list.map(item => {
      let result = item;
      if (item._id === _id) {
        exist = true; // Запомним, что был найден в корзине
        result = { ...item, amount: item.amount + 1 };
      }
      sum += result.price * result.amount;
      return result;
    });

    if (!exist) {
      // Поиск товара в каталоге, чтобы его добавить в корзину.
      // @todo В реальном приложении будет запрос к АПИ вместо поиска по состоянию.
      let item;
      if (this.store.getState().catalog.list.find(item => item._id === _id))
        item = this.store.getState().catalog.list.find(item => item._id === _id);
      else
        item = this.getState().currentItem;


      console.log("item", item)

      list.push({ ...item, amount: 1 }); // list уже новый, в него можно пушить.
      // Добавляем к сумме.
      sum += item.price;
    }

    this.setState({
      ...this.getState(),
      list,
      sum,
      amount: list.length
    }, 'Добавление в корзину');
  }

  /**
   * Удаление товара из корзины
   * @param _id Код товара
   */
  removeFromBasket(_id) {
    let sum = 0;
    const list = this.getState().list.filter(item => {
      if (item._id === _id) return false;
      sum += item.price * item.amount;
      return true;
    });

    this.setState({
      ...this.getState(),
      list,
      sum,
      amount: list.length
    }, 'Удаление из корзины');
  }
}

export default Basket;
