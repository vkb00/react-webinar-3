import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({ list, onDeleteItem, onAddToBucket, isDelete, arrayCountsOnBucket }) {


  return (
    <div className='List'>{
      !isDelete ?
        list.map(item =>
          <div key={item.code} className='List-item'>
            <Item item={item}
              onDelete={onDeleteItem}
              onAddToBucket={onAddToBucket}
              isDelete={isDelete}
              countOnBucket={arrayCountsOnBucket.find(product => product.code === item.code)} />
          </div>
        ) :
        [...new Set(list)].map(item =>
          <div key={item.code} className='List-item'>
            <Item item={item}
              onDelete={onDeleteItem}
              onAddToBucket={onAddToBucket}
              isDelete={isDelete}
              countOnBucket={arrayCountsOnBucket.find(product => product.code === item.code)} />
          </div>
        )


    }
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteItem: PropTypes.func,
  onAddToBucket: PropTypes.func,
  isDelete: PropTypes.bool
};

List.defaultProps = {
  onDeleteItem: () => {
  },
  onAddToBucket: () => {
  },

}

export default React.memo(List);
