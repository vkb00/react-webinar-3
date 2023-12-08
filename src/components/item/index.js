import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import { Link } from "react-router-dom"
import { useLanguage } from "../../changeLanguage"
import './style.css';

function Item(props) {

  const cn = bem('Item');
  const { language, languagePack } = useLanguage();
  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }
  console.log('item')
  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}

      <Link to={props.item._id}
        state={{
          itemId: props.item._id,
        }}
        className={cn('title')}>
        {props.item.title}
      </Link>

      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button className={cn('addBtn')} onClick={callbacks.onAdd}>{languagePack[language].add}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => { },
}

export default memo(Item);
