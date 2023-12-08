import { memo } from "react";
import PropTypes from "prop-types";
import LanguageTool from "../language-tool"
import './style.css';

function Head({ title }) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <LanguageTool />
    </div>
  )
}


Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
