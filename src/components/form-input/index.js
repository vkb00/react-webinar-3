import { memo, useCallback, useLayoutEffect, useState } from 'react';
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';

import './style.css';

function FormInput({ title, name, register }) {

  const cn = bem('Input');
  return (
    <>
      <label>{title}</label>
      <input {...register(name, {
        required: true,
      })} />
    </>
  )
}

FormInput.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  register: PropTypes.func,
}

export default memo(FormInput);
