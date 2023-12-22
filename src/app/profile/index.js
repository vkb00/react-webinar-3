import { memo, useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import ProfileCard from '../../components/profile-card';
import useServices from '../../hooks/use-services';
import useTranslate2 from '../../hooks/use-translate2';
function Profile() {
  const store = useStore();
  const h = useTranslate2();

  useInit(() => {
    store.actions.profile.load();
  }, []);

  const select = useSelector(state => ({
    profile: state.profile.data,
    waiting: state.profile.waiting,
  }));
  const { t } = useTranslate();
  useEffect(() => {
    console.log(store.services.i18n);
    console.log(h);

    console.log(h.translate('title'));
  })
  return (
    <PageLayout>
      <button onClick={() => { h.changeLanguage('en') }}>{h.translate('title')}</button>
      <TopHead />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileCard data={select.profile} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
