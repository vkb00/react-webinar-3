import React from 'react';
import { createElement } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;
  const formatCountString = (count) => {
    if (count % 100 > 10 && count % 100 < 20)
      return 'раз';
    if (count % 10 <= 1 || count % 10 > 4)
      return 'раз';
    else
      return 'раза';
  }
  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls'>
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className='App-center'>
        <div className='List'>{
          list.map(item =>
            <div key={item.code} className='List-item'>
              <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(item.code)}>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>{item.title} {!!item.countSelected && `| Выделяли ${item.countSelected} ${formatCountString(item.countSelected)}`}</div>
                <div className='Item-actions'>
                  <button onClick={(e) => {
                    store.deleteItem(item.code);
                    e.stopPropagation();
                  }}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
