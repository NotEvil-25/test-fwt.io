import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { fetchPaintings, setCurrentPage, setName } from '../../store/paintings/paintingsSlice';
import { selectTheme } from '../../store/theme/themeSlice';
import s from './styles.scss';

const cx = classNames.bind(s);

function Input(props) {
  const dispatch = useDispatch();
  const { type, placeholder, className } = props;
  const [value, setValue] = useState('');
  const isDark = useSelector(selectTheme);

  const handleValue = (e) => {
    const inputVal = e.target;
    setValue(inputVal);
    dispatch(setCurrentPage(1));
    dispatch(setName(inputVal));
    dispatch(fetchPaintings());
  };

  return (
    <input
      className={cx(className, { 'filter__input--dark': isDark })}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleValue}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Input;
