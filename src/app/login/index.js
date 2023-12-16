import { memo, useCallback } from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import ItemBasket from "../../components/item-basket";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from '../../components/login-form';
import Navigation from "../../containers/navigation";
import AuthorizationTool from '../authorization-tool';


/**
 * Корзина в модальном окне
 */
function Login() {

  const { t } = useTranslate();

  return (
    <PageLayout>
      <AuthorizationTool />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm />
    </PageLayout>
  );
}

export default memo(Login);
