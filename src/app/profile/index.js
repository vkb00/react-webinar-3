import { memo, useCallback, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import AuthorizationTool from '../authorization-tool';
import UserCard from '../../components/user-card';
/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Profile() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    profile: state.login.data,

  }));
  const { t } = useTranslate();
  const callbacks = {
    getUserInfo: useCallback(token => store.actions.login.getUserInfo(token), [store]),
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      callbacks.getUserInfo(token);
      console.log(select.profile)
    }
    else {
      navigate('/login');
    }

  }, [])
  return (
    <PageLayout>
      <AuthorizationTool />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <UserCard user={select.profile} />
    </PageLayout>
  );
}

export default memo(Profile);
