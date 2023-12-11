import { useCallback, useContext, useEffect, useState } from 'react';
import Main from "./main";
import Basket from "./basket";
import ItemPage from './item-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useSelector from "../store/use-selector";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/artilce/:itemId" element={<ItemPage />} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </BrowserRouter>
  );
}

export default App;
