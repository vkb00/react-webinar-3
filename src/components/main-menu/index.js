import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import { Link } from "react-router-dom";
import { useLanguage } from "../../change-language";
import './style.css';

function MainMenu() {
  const cn = bem('MainMenu');
  const { language, languagePack } = useLanguage();
  return (
    <div className={cn()}>
      <Link to={"/"} className={cn('linkToHome')}>{languagePack[language].home}</Link>
    </div>
  );
}



export default memo(MainMenu);
