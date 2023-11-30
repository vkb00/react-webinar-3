import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({ title, option }) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      {option &&
        <div className="Head-action">
          <button onClick={option}>Закрыть</button>
        </div>}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
