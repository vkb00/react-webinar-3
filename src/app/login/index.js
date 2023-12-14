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

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

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
