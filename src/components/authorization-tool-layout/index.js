import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import './style.css';

function AuthorizationToolLayout({ children }) {
  const cn = bem('AuthorizationToolLayout');
  return (
    <div className={cn()}>
      {children}
    </div>
  );
}

AuthorizationToolLayout.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  t: PropTypes.func
};



export default memo(AuthorizationToolLayout);
