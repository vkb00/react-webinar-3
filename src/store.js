import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  deleteItem(item) {
    console.log(this.state.bucketSpace);
    item.countOnBucket = 0;
    this.setState({
      ...this.state,
      bucketSpace: this.state.bucketSpace.filter(i => i.code !== item.code)
    })

  };

  addToBucket(item) {
    item.countOnBucket += 1;
    this.setState({
      ...this.state,
      bucketSpace: [...this.state.bucketSpace, item]
    })
  }
  sumBucketPrice() {
    let sum = 0;
    this.state.bucketSpace.forEach(item => {
      sum += item.price;
    });
    this.setState({
      ...this.state,
      totalBucketPrice: sum
    })
  }
  sumCountProductsInBucket() {
    this.setState({
      ...this.state,
      countProductsInbucket: [...new Set(this.state.bucketSpace)].length
    })
  }

}

export default Store;
