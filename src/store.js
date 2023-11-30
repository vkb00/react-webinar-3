import { useState } from "react";
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

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(item) {
    console.log(this.state.bucketSpace);
    if (item.countOnBucket > 1) {
      item.countOnBucket -= 1;
      this.setState({
        ...this.state,
        // Новый список, в котором не будет удаляемой записи
        totalBucketPrice: this.state.totalBucketPrice - item.price
      })
    }
    else {
      item.countOnBucket -= 1;
      this.setState({
        ...this.state,
        // Новый список, в котором не будет удаляемой записи
        bucketSpace: this.state.bucketSpace.filter(i => i.code !== item.code)
      })
    }
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
    console.log(...new Set(this.state.bucketSpace));
    let count = 0;
    [...new Set(this.state.bucketSpace)].forEach(item => {

      count += item.countOnBucket
    })
    this.setState({
      ...this.state,
      countProductsInbucket: count
    })
  }

}

export default Store;
