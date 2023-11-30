import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { plural } from "../../utils";
import './style.css';

function Controls({ bucketSpace, openModal, sumBucket, totalBucketPrice, countProductsInbucket, sumCountProductsInBucket }) {

  useEffect(() => {
    console.log('effect', countProductsInbucket);
    sumCountProductsInBucket();
    sumBucket();
  }, [bucketSpace])
  if (countProductsInbucket) {
    return (
      <div className='Controls'>
        <p>В корзине:
          <b className='Controls-info'>
            {" " + countProductsInbucket + " "}
            {plural(countProductsInbucket, {
              one: 'товар',
              few: 'товара',
              many: 'товаров'
            })} / {totalBucketPrice} ₽
          </b>
        </p>
        <div className='Controls-action'>
          <button onClick={openModal}>Перейти</button>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className='Controls'>
        <p>В корзине: <b className='Controls-info'>пусто</b></p>
        <div className='Controls-action'>
          <button onClick={openModal}>Перейти</button>
        </div>
      </div>
    )
  }


}

Controls.propTypes = {
  bucketSpace: PropTypes.array,
  openModal: PropTypes.func,
  sumBucket: PropTypes.func,
  totalBucketPrice: PropTypes.number,
  countProductsInbucket: PropTypes.number,
  sumCountProductsInBucket: PropTypes.func,
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => { }
}

export default React.memo(Controls);
