import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';
import { useLanguage } from '../../change-language';
function LanguageTool() {
  const { languagePack, language, changeLanguage } = useLanguage();
  return (
    <div className='LanguageTool'>
      <label>{languagePack[language].language}</label>
      <button onClick={() => changeLanguage('ru')}>ru</button>
      <button onClick={() => changeLanguage('en')}>en</button>
    </div>
  )
}



LanguageTool.defaultProps = {
  onAdd: () => { }
}

export default memo(LanguageTool);
