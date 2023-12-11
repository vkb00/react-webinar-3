import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import { Link } from "react-router-dom";
import { useLanguage } from "../../change-language";
import './style.css';

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem('BasketTool');
  const { language, languagePack } = useLanguage();
  return (
    <div className={cn()}>
      <div>
        <span className={cn('label')}>{languagePack[language].inBasket}:</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
              one: languagePack[language].oneProduct,
              few: languagePack[language].fewProducts,
              many: languagePack[language].manyProducts
            })} / ${numberFormat(sum)} ₽`
            : languagePack[language].empty
          }
        </span>
        <button onClick={onOpen}>{languagePack[language].follow}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => { },
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
