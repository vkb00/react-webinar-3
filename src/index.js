import React from 'react';
import { createRoot } from 'react-dom/client';
import { generateCode } from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    { code: generateCode(), countOnBucket: 0, title: 'Название товара', price: 100.0 },
    { code: generateCode(), countOnBucket: 0, title: 'Книга про React', price: 770 },
    { code: generateCode(), countOnBucket: 0, title: 'Конфета', price: 33 },
    { code: generateCode(), countOnBucket: 0, title: 'Трактор', price: 7955320 },
    { code: generateCode(), countOnBucket: 0, title: 'Телефон iPhone XIXV', price: 120000 },
    { code: generateCode(), countOnBucket: 0, title: 'Карандаши цветные', price: 111 },
    { code: generateCode(), countOnBucket: 0, title: 'Товар сюрприз', price: 0 },
  ],
  bucketSpace: []
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
