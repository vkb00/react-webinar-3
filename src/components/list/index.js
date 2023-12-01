import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({ list, onDeleteItem, onAddToBucket, isDelete }) {


  return (
    <div className='List'>{
      !isDelete ?
        list.map(item =>
          <div key={item.code} className='List-item'>
            <Item item={item} onDelete={onDeleteItem} onAddToBucket={onAddToBucket} isDelete={isDelete} />
          </div>
        ) :
        [...new Set(list)].map(item =>
          <div key={item.code} className='List-item'>
            <Item item={item} onDelete={onDeleteItem} onAddToBucket={onAddToBucket} isDelete={isDelete} />
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
