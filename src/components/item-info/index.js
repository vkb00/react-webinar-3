import React, { useEffect, useState, useCallback } from 'react'
import { numberFormat } from "../../utils";
import { useLanguage } from '../../change-language';
import PropTypes from 'prop-types';
import './style.css';
const ItemInfo = (props) => {
    const { language, languagePack } = useLanguage();
    return (
        <div className='content'>
            <p>{props.item.description}</p>
            <p>Страна производитель <b>{props.item.madeIn.title}</b></p>
            <p>Категория <b>{props.item.category.title}</b></p>
            <p>Год выпуска <b>{props.item.edition}</b></p>
            <p className='price'><b>Цена {numberFormat(props.item.price)} ₽</b></p>
            <button onClick={props.addToBasket}>{languagePack[language].add}</button>
        </div>
    );
};
ItemInfo.propTypes = {
    item: PropTypes.object,
    addToBasket: PropTypes.func,
};
export default ItemInfo