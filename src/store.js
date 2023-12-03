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

  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  deleteItem(item) {
    this.setState({
      ...this.state,
      bucketSpace: this.state.bucketSpace.filter(i => i.code !== item.code),
      arrayCountsOnBucket: this.state.arrayCountsOnBucket.reduce((accumulator, currentValue) => {
        if (currentValue.code === item.code)
          return [...accumulator];
        else
          return [...accumulator, currentValue];
      }, [])
    })
  };

  addToBucket(item) {
    const tempItem = this.state.arrayCountsOnBucket.find(product => product.code === item.code);
    if (!tempItem) {
      this.setState({
        ...this.state,
        arrayCountsOnBucket: [...this.state.arrayCountsOnBucket, {
          code: item.code,
          count: 1
        }]
      })

    }
    else {
      this.setState({
        ...this.state,
        arrayCountsOnBucket: this.state.arrayCountsOnBucket.reduce((accumulator, currentValue) => {
          if (currentValue.code === item.code)
            return [...accumulator, {
              code: item.code,
              count: tempItem.count + 1
            }];
          else
            return [...accumulator, currentValue];
        }, [])
      })
    }

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
      countProductsInbucket: this.state.arrayCountsOnBucket.length
    })
  }

}

export default Store;
