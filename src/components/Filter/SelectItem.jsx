import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import s from './styles.scss';
import {
  fetchPaintings,
  setAuthorId,
  setCurrentPage,
  setLocationId,
} from '../../store/paintings/paintingsSlice';
import { selectTheme } from '../../store/theme/themeSlice';

const cx = classNames.bind(s);

function SelectItem(props) {
  const dispatch = useDispatch();
  const {
    text, className, selectStatus, id, type,
  } = props;
  const isDark = useSelector(selectTheme);
  const handleItem = () => {
    if (type === 'Author') dispatch(setAuthorId(id));
    if (type === 'Location') dispatch(setLocationId(id));
    dispatch(setCurrentPage(1));
    selectStatus(text);
    dispatch(fetchPaintings());
  };

  return (
    <div
      onClick={handleItem}
      aria-hidden="true"
      className={cx(
        className,
        { 'filter__select-item--dark': isDark },
      )}
    >
      {text}
    </div>
  );
}

SelectItem.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  selectStatus: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default SelectItem;
