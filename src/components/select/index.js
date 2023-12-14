import { memo, useEffect } from "react";
import PropTypes from 'prop-types';
import './style.css';

function Select(props) {

  const onSelect = (e) => {
    props.onChange(e.target.value);
    console.log(e.target.value)
  };
  useEffect(() => {
    console.log(props)
  })
  return (
    <select className="Select" value={props.value} onChange={onSelect}>
      {props.options.map(item => (
        <option key={item.value ? item.value : item._id} value={item.value ? item.value : item._id}>{item.title}</option>
      ))}
    </select>
  )
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string
  })).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func
};

Select.defaultProps = {
  onChange: () => {
  }
}

export default memo(Select);
