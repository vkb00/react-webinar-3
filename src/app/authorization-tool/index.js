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
  const [authorization, setAuthorization] = useState(false);
  const cn = bem('AuthorizationTool');
  const store = useStore();
  const navigate = useNavigate()
  const callbacks = {
    getUserInfo: useCallback(() => store.actions.login.getUserInfo(), [store]),
    logout: useCallback(() => store.actions.login.logout(), [store]),
  }
  const { t } = useTranslate();
  const select = useSelector(state => ({
    profile: state.login.data,

  }));
  const login = () => {
    callbacks.getUserInfo();
    setAuthorization(false);
    navigate("/login");
  }
  const logout = () => {
    callbacks.logout();
    setAuthorization(false);
    localStorage.removeItem('token');
    navigate("/");
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthorization(true);
      callbacks.getUserInfo();
      console.log('авторизован', select.profile)
    }
  }, [])
  return (
    <div className={cn()}>
      <Link className={cn('userName')} to={'/profile'}>{authorization ? select.profile?.profile?.name : ""}</Link>
      {!authorization &&
        <button onClick={login}>{t('login')}</button>
      }
      {authorization &&
        <button onClick={logout}>{t('logout')}</button>
      }

    </div>
  );
}

export default memo(AuthorizationTool);
