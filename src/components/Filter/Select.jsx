import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import SelectItem from './SelectItem';
import s from './styles.scss';
import { ReactComponent as SelectArrow } from '../../svg/open_arrow.svg';
import { selectTheme } from '../../store/theme/themeSlice';

const cx = classNames.bind(s);

function Select(props) {
  const { className, data, type } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [placeHolder, setPlaceholder] = useState(type);
  const isDark = useSelector(selectTheme);

  const handleSelect = (text) => {
    setIsOpen(!isOpen);
    setPlaceholder(text);
  };

  const elements = data.items;
  const items = elements.map((el) => {
    const text = el.name || el.location || '';

    return (
      <SelectItem
        type={type}
        selectStatus={handleSelect}
        className={cx('filter__select-item')}
        key={el.id}
        id={el.id}
        text={text}
      />
    );
  });

  const openDropdown = () => {
    setIsOpen(!isOpen);
  };

  const rootEl = useRef(null);

  // при клике вне компоненка, селект закрывается
  useEffect(() => {
    const onClick = (e) => rootEl.current.contains(e.target) || setIsOpen(false);
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
        onClick={openDropdown}
        aria-hidden="true"
        className={cx(
          'filter__select-value',
          {
            'filter__select-value--open': isOpen,
            'filter__select-value--dark': isDark,
          },
        )}
      >
        <span>{placeHolder}</span>
        <span className={cx(
          'filter__select-svg',
          {
            'filter__select-svg--open': isOpen,
            'filter__select-svg--dark': isDark,
          },
        )}
        >
          <SelectArrow />
        </span>
      </div>
      <div className={cx(
        'filter__select-dropdown',
        {
          'filter__select-dropdown--open': isOpen,
          'filter__select-dropdown--dark': isDark,
        },
      )}
      >
        {items}
      </div>
    </div>
  );
}

Select.propTypes = {
  className: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default Select;
