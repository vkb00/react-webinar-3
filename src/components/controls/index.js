import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { plural } from "../../utils";
import './style.css';

function Controls({ bucketSpace, openModal, sumBucket, totalBucketPrice, countProductsInbucket, sumCountProductsInBucket }) {
  const [sum, setSum] = useState(0);
  const [count, setCount] = useState(0);

  // const sumBucketPrice = (bucket) => {
  //   console.log(bucket)
  //   bucket.forEach(item => {
  //     setSum(sum + item.price);
  //     setCount(count + 1);
  //   });
  // }
  useEffect(() => {
    console.log('effect');
    // sumBucketPrice(bucketSpace);
    sumCountProductsInBucket();
    sumBucket();
  }, [bucketSpace])
  return (
    <div className='Controls'>
      <p>В корзине: {countProductsInbucket} {plural(countProductsInbucket, {
        one: 'товар',
        few: 'товара',
        many: 'товаров'
      })} / {totalBucketPrice} ₽</p>
      <button onClick={openModal}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => { }
}

export default React.memo(Controls);
