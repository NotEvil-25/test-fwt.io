/* eslint-disable no-nested-ternary */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
import React from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import s from './styles.scss';
import Paintings from '../Paintings';
import Pagination from '../Pagination';
import Filter from '../Filter';
import Header from '../Header';
import { selectTheme } from '../../store/theme/themeSlice';

const cx = classNames.bind(s);

function App() {
  const isDark = useSelector(selectTheme);
  
  return (
    <div className={cx('app', { 'app--dark': isDark })}>
      <Header />
      <Filter />
      <Paintings />
      <Pagination />
    </div>
  );
}

export default App;
