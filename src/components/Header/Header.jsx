import React from 'react';
import Container from 'react-bootstrap/Container';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as ThemeSVG } from '../../svg/theme.svg';
import { ReactComponent as LogoIcon } from '../../svg/logo.svg';
import s from './styles.scss';
import { selectTheme, setTheme } from '../../store/theme/themeSlice';

const cx = classNames.bind(s);

function Header() {
  const dispatch = useDispatch();
  const isDark = useSelector(selectTheme);

  const handleTheme = () => {
    dispatch(setTheme(!isDark));
  };

  return (
    <div className={cx('header')}>
      <Container>
        <div className={cx('header__wrp')}>
          <div className={cx('header__logo')}>
            <LogoIcon />
          </div>
          <div className={cx('header__btn', { 'header__btn--dark': isDark })}>
            <button
              onClick={handleTheme}
              type="button"
            >
              <ThemeSVG />
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
