import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { plural } from "../../utils";
import './style.css';

function Controls({ bucketSpace, openModal }) {
  const [sum, setSum] = useState(0);
  const [count, setCount] = useState(0);

  const sumBucketPrice = (bucket) => {
    console.log(bucket)
    bucket.forEach(item => {
      setSum(sum + item.price);
      setCount(count + 1);
    });
  }
  useEffect(() => {
    console.log('effect');
    sumBucketPrice(bucketSpace);

  }, [bucketSpace])
  return (
    <div className='Controls'>
      <p>В корзине: {count} {plural(count, {
        one: 'товар',
        few: 'товара',
        many: 'товаров'
      })} / {sum} ₽</p>
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
