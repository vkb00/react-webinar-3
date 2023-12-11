import { memo, useCallback, useEffect, useState } from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import MainMenu from "../../components/main-menu";
import ToolBar from "../../components/tool-bar"
import Loading from "../../components/loading"
import List from "../../components/list";
import Pagination from "../../components/pagination";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useLanguage } from '../../change-language';
function Main() {

  const store = useStore();
  const { language, languagePack } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [allProductsCount, setAllProductsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const limitProductsOnPage = 10;


  let lastProductIndex = currentPage * limitProductsOnPage;
  let firstProductIndex = lastProductIndex - limitProductsOnPage;


  const paginate = (pageNumber) => {
    lastProductIndex = pageNumber * limitProductsOnPage;
    firstProductIndex = lastProductIndex - limitProductsOnPage;
    setCurrentPage(pageNumber);
    store.actions.catalog.load(limitProductsOnPage, firstProductIndex, setLoading);
    console.log(pageNumber)
  }
  useEffect(() => {
    console.log('ef', loading);
    store.actions.catalog.load(limitProductsOnPage, firstProductIndex, setLoading);
    store.actions.catalog.getAllProductsCount().then(res => setAllProductsCount(res));
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} />
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>

      <Head title={languagePack[language].shop} />
      <ToolBar>
        <MainMenu />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
          sum={select.sum} />
      </ToolBar>
      {loading ?
        <Loading />
        : <List list={select.list} renderItem={renders.item} />

      }
      <Pagination
        limitProductsOnPage={limitProductsOnPage}
        allProductsCount={allProductsCount}
        paginate={paginate}
        currentPage={currentPage}
      />
    </PageLayout>

  );
}

export default memo(Main);
