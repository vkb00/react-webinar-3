import { memo, useEffect, useCallback, useState } from "react";
import PropTypes, { func } from 'prop-types';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import { Link, useNavigate } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import './style.css';

function AuthorizationTool() {

  const cn = bem('AuthorizationTool');
  const store = useStore();
  const navigate = useNavigate();
  const callbacks = {
    getUserInfo: useCallback(() => store.actions.login.getUserInfo(), [store]),
    logout: useCallback(() => store.actions.login.logout(), [store]),
    setAuthorization: useCallback(() => store.actions.session.setAuthorization(), [store]),
    getToken: useCallback(() => store.actions.session.getToken(), [store]),

  }
  const [auth, setAuth] = useState(false);
  const { t } = useTranslate();
  const select = useSelector(state => ({
    profile: state.login.data,
    authorization: state.session.authorization

  }));
  const login = () => {
    callbacks.getUserInfo();
    callbacks.setAuthorization(true);

    navigate("/login");
  }
  const logout = () => {
    callbacks.logout();
    callbacks.setAuthorization(false);
    setAuth(false);

    navigate("/");
  }
  useEffect(() => {
    console.log(select);
    setAuth(select.authorization);
    if (select.authorization) {
      callbacks.getUserInfo();
      console.log('авторизован', select.profile)
    }
  }, [select.authorization])
  return (
    <div className={cn()}>
      <Link className={cn('userName')} to={'/profile'}>{auth ? select.profile?.profile?.name : ""}</Link>
      {!select.authorization &&
        <button onClick={login}>{t('login')}</button>
      }
      {select.authorization &&
        <button onClick={logout}>{t('logout')}</button>
      }

    </div>
  );
}

export default memo(AuthorizationTool);
