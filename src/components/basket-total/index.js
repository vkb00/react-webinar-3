import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import { useLanguage } from "../../change-language";
import './style.css';

function BasketTotal({ sum }) {
  const cn = bem('BasketTotal');
  const { language, languagePack } = useLanguage();
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{languagePack[language].total}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number
};

BasketTotal.defaultProps = {
  sum: 0
}

export default memo(BasketTotal);
