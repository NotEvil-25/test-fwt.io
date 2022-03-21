import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import ArrowsRight from './ArrowsRight';
import ArrowsLeft from './ArrowsLeft';
import s from './styles.scss';
import {
  fetchPages,
  selectCurrentPage,
  selectFilters,
  selectPages,
  setCurrentPage, setNumberOfItems, setPages,
} from '../../store/paintings/paintingsSlice';
import { fillArray, getPerView, pagesCreator } from '../../utils/helper';
import { selectTheme } from '../../store/theme/themeSlice';

const cx = classNames.bind(s);

function Pagination() {
  const dispatch = useDispatch();
  const numberOfPages = useSelector(selectPages);
  const pages = fillArray(numberOfPages);
  const currentPage = useSelector(selectCurrentPage);
  const countedPages = pagesCreator(pages, 3, currentPage);
  const filters = useSelector(selectFilters);
  const isDark = useSelector(selectTheme);

  useEffect(() => {
    dispatch(fetchPages())
      .unwrap()
      .then((result) => {
        const items = result.length;
        const calculatedPages = Math.ceil(items / getPerView());
        dispatch(setNumberOfItems(items));
        dispatch(setPages(calculatedPages));
      })
      .catch((error) => {
        throw error.message;
      });
  }, [dispatch, filters]);

  const handlePageNumber = (e) => {
    const value = parseInt(e.target.textContent, 10);
    dispatch(setCurrentPage(value));
  };

  const content = countedPages.map((item, i) => {
    const active = item === currentPage || false;
    return (
      <button
        type="button"
        onClick={handlePageNumber}
        disabled={active || false}
        className={cx(
          'pagination__btn',
          {
            'pagination__btn--active': active && !isDark,
            'pagination__btn--dark-active': active && isDark,
            'pagination__btn--dark': isDark,
          },
        )}
        // eslint-disable-next-line react/no-array-index-key
        key={i}
      >
        {item}
      </button>
    );
  });

  return (
    <div className={cx('pagination', { 'pagination--dark': isDark })}>
      <Container>
        <ArrowsLeft
          className={cx('pagination__btn')}
          pages={pages}
        />
        {content}
        <ArrowsRight
          className={cx('pagination__btn')}
          pages={pages}
        />
      </Container>
    </div>
  );
}

export default Pagination;
