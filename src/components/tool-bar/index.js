import { Children, memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import { Link } from "react-router-dom";
import { useLanguage } from "../../change-language";
import './style.css';

function ToolBar({ children }) {
  const cn = bem('ToolBar');

  return (
    <div className={cn()}>
      {children}
    </div>
  );
}

ToolBar.propTypes = {
  children: PropTypes.node
};



export default memo(ToolBar);
