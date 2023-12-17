import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import Profile from './profile';
import useStore from '../hooks/use-store';
import { useNavigate } from 'react-router-dom';
/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);
  const store = useStore();
  const navigate = useNavigate();
  const callbacks = {
    recoveryAuth: useCallback((setSession) => store.actions.session.recoveryAuth(setSession), [store]),

    recoveryAuthorizationApp: useCallback(() => store.actions.session.recoveryAuthorizationApp(), [store])
  }
  const [session, setSession] = useState(false);
  useEffect(() => {
    console.log('sss')
    callbacks.recoveryAuthorizationApp();
  }, [])
  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/profile'} element={<Profile />} />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
