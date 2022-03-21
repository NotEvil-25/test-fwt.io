import React from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ReactComponent as RightIcon } from '../../svg/arrow-right.svg';
import { ReactComponent as DoubleRightIcon } from '../../svg/double-arrow-right.svg';
import s from './styles.scss';
import {
  fetchPaintings, selectCurrentPage, setCurrentPage,
} from '../../store/paintings/paintingsSlice';
import { selectTheme } from '../../store/theme/themeSlice';

const cx = classNames.bind(s);

function ArrowsRight(props) {
  const { className, pages } = props;
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const isDark = useSelector(selectTheme);

  const lastPage = pages[pages.length - 1];
  const disabled = currentPage === lastPage;

  const handleLastPage = () => {
    dispatch(setCurrentPage(lastPage));
    dispatch(fetchPaintings());
  };

  const handleNextPage = () => {
    dispatch(setCurrentPage(currentPage + 1));
    dispatch(fetchPaintings());
  };

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        onClick={handleNextPage}
        className={cx(
          className,
          {
            'pagination__btn--disabled': disabled && !isDark,
            'pagination__btn--dark-disabled': disabled && isDark,
            'pagination__btn--dark': isDark,
          },
        )}
      >
        <RightIcon />
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={handleLastPage}
        className={cx(
          className,
          {
            'pagination__btn--disabled': disabled && !isDark,
            'pagination__btn--dark-disabled': disabled && isDark,
            'pagination__btn--dark': isDark,
          },
        )}
      >
        <DoubleRightIcon />
      </button>
    </>
  );
}

ArrowsRight.propTypes = {
  className: PropTypes.string.isRequired,
  pages: PropTypes.instanceOf(Array).isRequired,
};

export default ArrowsRight;
