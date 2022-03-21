import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import s from './styles.scss';
import { ReactComponent as OpenArrow } from '../../svg/open_arrow.svg';
import {
  fetchPaintings,
  selectYearFrom,
  selectYearTo, setCurrentPage,
  setYearFrom,
  setYearTo,
} from '../../store/paintings/paintingsSlice';
import { getRangeValue } from '../../utils/helper';
import { selectTheme } from '../../store/theme/themeSlice';

const cx = classNames.bind(s);

function Range(props) {
  const dispatch = useDispatch();
  const { className, type } = props;
  const [value, setValue] = useState(type);
  const [isOpen, setIsOpen] = useState(false);
  const valueFrom = useSelector(selectYearFrom);
  const valueTo = useSelector(selectYearTo);
  const isDark = useSelector(selectTheme);

  const rootEl = useRef(null);

  const handleFromVal = (e, maxLength = 4) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '').slice(0, maxLength);
    dispatch(setYearFrom(inputValue));
    setValue(getRangeValue(inputValue, valueTo));
    dispatch(setCurrentPage(1));
    dispatch(fetchPaintings());
  };

  const handleEndVal = (e, maxLength = 4) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '').slice(0, maxLength);
    dispatch(setYearTo(inputValue));
    setValue(getRangeValue(valueFrom, inputValue));
    dispatch(fetchPaintings());
  };

  const openDropDown = () => {
    setIsOpen(!isOpen);
  };

  // при клике вне компоненка, селект закрывается
  useEffect(() => {
    const onClick = (e) => {
      rootEl.current.contains(e.target) || setIsOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // при скроле открытый селект закрывается
  useEffect(() => {
    const closeByScroll = () => setIsOpen(false);
    document.addEventListener('scroll', closeByScroll);
    return () => document.removeEventListener('scroll', closeByScroll);
  }, []);

  return (
    <div ref={rootEl} className={cx(className)}>
      <div
        onClick={openDropDown}
        aria-hidden="true"
        className={cx(
          'filter__range-value',
          {
            'filter__range-value--open': isOpen,
            'filter__range-value--dark': isDark,
          },
        )}
      >
        <span>{value}</span>
        <span className={cx(
          'filter__range-svg',
          {
            'filter__range-svg--open': isOpen,
            'filter__range-svg--dark': isDark,
          },
        )}
        >
          <OpenArrow />
        </span>
      </div>
      <div className={cx(
        'filter__range-dropdown',
        {
          'filter__range-dropdown--open': isOpen,
          'filter__range-dropdown--dark': isDark,
        },
      )}
      >
        <div className={cx('filter__range-inputs', { 'filter__range-inputs--dark': isDark })}>
          <input
            onChange={handleFromVal}
            className={cx('filter__range-input')}
            type="text"
            value={valueFrom}
            placeholder="from"
          />
          <input
            onChange={handleEndVal}
            className={cx('filter__range-input')}
            type="text"
            value={valueTo}
            placeholder="before"
          />
        </div>
      </div>
    </div>
  );
}

Range.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Range;
