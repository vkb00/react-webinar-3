import React, { useEffect, useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom';
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import Basket from "../../app/basket";
import PageLayout from "../../components/page-layout";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { numberFormat } from "../../utils";
import './style.css';
const ItemInfo = () => {
    const { state } = useLocation();
    const [item, setItem] = useState({});
    const store = useStore();
    const getItemInfo = async () => {
        await store.actions.currentItem.getItemInfo(state.itemId);
        await store.actions.basket.getItemInfo(state.itemId);
    }
    const select = useSelector(state => ({
        currentItem: state.currentItem.currentItem,
        list: state.catalog.list,
        amount: state.basket.amount,
        sum: state.basket.sum,
        activeModal: state.modals.name
    }))
    const callbacks = {
        addToBasket: useCallback(() => store.actions.basket.addToBasket(state.itemId), [store]),
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    }
    useEffect(() => {
        getItemInfo();


    }, [state])
    return (
        <PageLayout>
            <Head title={select.currentItem.title} />
            <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                sum={select.sum} />
            {select.activeModal === 'basket' && <Basket />}
            <div className='content'>
                <p>{select.currentItem.description}</p>
                <p>Страна производитель <b>{select.currentItem.madeIn.title}</b></p>
                <p>Категория <b>{select.currentItem.category.title}</b></p>
                <p>Год выпуска <b>{select.currentItem.edition}</b></p>
                <p className='price'><b>Цена {numberFormat(select.currentItem.price)} ₽</b></p>
                <button onClick={callbacks.addToBasket}>Добавить</button>
            </div>
        </PageLayout>
    );
};

export default ItemInfo