import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Head from "../head";
import './style.css';

function Modal({ isOpen, onClose, children, totalBucketPrice }) {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="modalOverlay">
      <div className='Modal'>
        <div className='Modal-action'>
          <Head title='Корзина' option={onClose} />

        </div>
        <div className="Modal-content">
          {children}
        </div>
        <div className="Modal-totalPrice">
          Итого{totalBucketPrice}
        </div>
      </div>
    </div>,
    document.body
  );
}

Modal.propTypes = {
  onAdd: PropTypes.func
};

Modal.defaultProps = {
  onAdd: () => { }
}

export default React.memo(Modal);
