import React from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ReactComponent as LeftIcon } from '../../svg/arrow-left.svg';
import { ReactComponent as DoubleLeftIcon } from '../../svg/double-arrow-left.svg';
import s from './styles.scss';
import { fetchPaintings, selectCurrentPage, setCurrentPage } from '../../store/paintings/paintingsSlice';
import { selectTheme } from '../../store/theme/themeSlice';

const cx = classNames.bind(s);

function ArrowsLeft(props) {
  const { className, pages } = props;
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const isDark = useSelector(selectTheme);

  const firstPage = pages[0];
  const disabled = currentPage === 1;

  const handleFirstPage = () => {
    dispatch(setCurrentPage(firstPage));
    dispatch(fetchPaintings());
  };

  const handlePastPage = () => {
    dispatch(setCurrentPage(currentPage - 1));
    dispatch(fetchPaintings());
  };

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        onClick={handleFirstPage}
        className={cx(
          className,
          {
            'pagination__btn--disabled': disabled && !isDark,
            'pagination__btn--dark-disabled': disabled && isDark,
            'pagination__btn--dark': isDark,
          },
        )}
      >
        <DoubleLeftIcon />
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={handlePastPage}
        className={cx(
          className,
          {
            'pagination__btn--disabled': disabled && !isDark,
            'pagination__btn--dark-disabled': disabled && isDark,
            'pagination__btn--dark': isDark,
          },
        )}
      >
        <LeftIcon />
      </button>
    </>
  );
}

ArrowsLeft.propTypes = {
  className: PropTypes.string.isRequired,
  pages: PropTypes.instanceOf(Array).isRequired,
};

export default ArrowsLeft;
