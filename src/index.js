import { createRoot } from 'react-dom/client';
import App from './app';
import Router from './Router/Router'
import Store from "./store";
import { StoreContext } from "./store/context";
import { LanguageProvider } from "./changeLanguage"
const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <LanguageProvider>
      <Router />
    </LanguageProvider>
  </StoreContext.Provider>
);
