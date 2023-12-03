import React from "react";
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { formatPrice } from '../../utils'
import Head from "../head";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Modal({ isOpen, onClose, children, totalBucketPrice }) {
  const cn = bem('Modal');
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="modalOverlay">
      <div className={cn()}>
        <div className={cn('action')}>
          <Head title='Корзина' option={onClose} />
        </div>
        <div className={cn('content')}>
          {children}
        </div>
        <div className={cn('totalPrice')}>
          <b><span>Итого</span>{formatPrice(totalBucketPrice)}</b>
        </div>
      </div>
    </div>,
    document.body
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  totalBucketPrice: PropTypes.number,
  children: PropTypes.node
};

Modal.defaultProps = {
  onClose: () => { }
}

export default React.memo(Modal);
