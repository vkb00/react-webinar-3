import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item);

    },
    onAddToBucket: () => {
      props.onAddToBucket(props.item);

    }
  }


  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {props.item.price + " ₽"}
      </div>
      {props.isDelete &&
        <div className={cn('count')}>
          <span>{props.countOnBucket.count + " шт"}</span>
        </div>
      }

      <div className={cn('actions')}>
        <button onClick={!props.isDelete ?
          callbacks.onAddToBucket :
          callbacks.onDelete}>
          {!props.isDelete ? "Довавить" : "Удалить"}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    countOnBucket: PropTypes.number,
    price: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
  onAddToBucket: PropTypes.func,
  isDelete: PropTypes.bool
};

Item.defaultProps = {
  onDelete: () => {
  },
}

export default React.memo(Item);
