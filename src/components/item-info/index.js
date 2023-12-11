import React, { useEffect, useState, useCallback } from 'react'
import { numberFormat } from "../../utils";
import { useLanguage } from '../../change-language';
import PropTypes from 'prop-types';
import './style.css';
const ItemInfo = (props) => {
    const { language, languagePack } = useLanguage();
    return (
        <div className='content'>
            <p>{props.description}</p>
            <p>Страна производитель <b>{props.country}</b></p>
            <p>Категория <b>{props.category}</b></p>
            <p>Год выпуска <b>{props.year}</b></p>
            <p className='price'><b>Цена {numberFormat(props.price)} ₽</b></p>
            <button onClick={props.addToBasket}>{languagePack[language].add}</button>
        </div>
    );
};
ItemInfo.propTypes = {
    description: PropTypes.string,
    country: PropTypes.string,
    category: PropTypes.string,
    year: PropTypes.number,
    price: PropTypes.number,
    addToBasket: PropTypes.func,
};
export default ItemInfo