import React, { useState } from "react";
import PropTypes from "prop-types";

import './style.css';

function Item(props) {
  const [countOnBucket, setCountOnBucket] = useState(props.item.countOnBucket)
  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item);

      setCountOnBucket(countOnBucket - 1);

    },
    onAddToBucket: () => {
      props.onAddToBucket(props.item);

    }
  }


  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>
        {props.item.price + " ₽"}
      </div>
      {props.isDelete &&
        <div className='Item-count'>
          <span>{countOnBucket + " шт"}</span>
        </div>
      }

      <div className='Item-actions'>
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
