import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import s from './styles.scss';
import { selectAuthors } from '../../store/authors/authorsSlice';
import { selectLocations } from '../../store/locations/locationsSlice';

const cx = classNames.bind(s);

function Painting(props) {
  const { className, data } = props;
  const path = `https://test-front.framework.team${data.imageUrl}`;

  const authors = useSelector(selectAuthors);
  const currentAuthor = authors.filter((author) => author.id === data.authorId)[0];

  const locations = useSelector(selectLocations);
  const currentLocation = locations.filter((location) => location.id === data.locationId)[0];

  return (
    <div className={className}>
      <div className={cx('paintings__item-img')}>
        <img src={path} alt={data.name} />
      </div>
      <div className={cx('paintings__item-content')}>
        <div className={cx('paintings__item-title')}>
          <strong>{data.name}</strong>
        </div>
        <div className={cx('paintings__item-info')}>
          <strong>Author:</strong>
          <span>{currentAuthor.name}</span>
        </div>
        <div className={cx('paintings__item-info')}>
          <strong>Created:</strong>
          <span>{data.created}</span>
        </div>
        <div className={cx('paintings__item-info')}>
          <strong>Location:</strong>
          <span>{currentLocation.location}</span>
        </div>
      </div>
    </div>
  );
}

Painting.propTypes = {
  className: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
};

export default Painting;
