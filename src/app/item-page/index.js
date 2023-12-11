import React, { useEffect, useState, useCallback } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import MainMenu from "../../components/main-menu";
import ToolBar from "../../components/tool-bar"
import Basket from "../basket";
import PageLayout from "../../components/page-layout";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ItemInfo from "../../components/item-info"

const ItemPage = () => {
    const { state, pathname, search, hash } = useLocation();
    const { myParam } = useParams();
    const store = useStore();
    const getItemInfo = async () => {
        await store.actions.currentItem.getItemInfo(pathname.slice(1));
        await store.actions.basket.getItemInfo(pathname.slice(1));
    }
    const select = useSelector(state => ({
        currentItem: state.currentItem.currentItem,
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
        console.log('page', pathname.slice(1))
        getItemInfo();
    }, [state])

    return (
        <PageLayout>
            <Head title={select.currentItem.title} />
            <ToolBar>
                <MainMenu />
                <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum} />
            </ToolBar>
            {select.activeModal === 'basket' && <Basket />}
            <ItemInfo
                description={select.currentItem.description}
                country={select.currentItem.madeIn.title}
                category={select.currentItem.category.title}
                year={select.currentItem.edition}
                price={select.currentItem.price}
                addToBasket={callbacks.addToBasket}
            />
        </PageLayout>
    );
};

export default ItemPage