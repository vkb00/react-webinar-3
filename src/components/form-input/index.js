import { memo, useCallback, useLayoutEffect, useState } from 'react';
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';

import './style.css';

function FormInput({ title, name, value, onChange, type }) {


  return (
    <>
      <label>{title}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
      />
    </>
  )
}

FormInput.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  register: PropTypes.func,
}

export default memo(FormInput);
