import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import s from './styles.scss';
import Input from './Input';
import Select from './Select';
import Range from './Range';
import { fetchAuthors, selectAuthorsState } from '../../store/authors/authorsSlice';
import { fetchLocations, selectLocationsState } from '../../store/locations/locationsSlice';

const cx = classNames.bind(s);

function Filter() {
  const dispatch = useDispatch();
  const authors = useSelector(selectAuthorsState);
  const locations = useSelector(selectLocationsState);

  useEffect(() => {
    dispatch(fetchAuthors());
    dispatch(fetchLocations());
  }, [dispatch]);

  return (
    <div className={cx('filter')}>
      <Container>
        <Row>
          <Col className={cx('filter__item')} sm={12} md={3} lg={3} xl={3}>
            <Input className={cx('filter__input')} type="text" placeholder="Name" />
          </Col>
          <Col className={cx('filter__item')} sm={12} md={3} lg={3} xl={3}>
            <Select
              type="Author"
              data={authors}
              className={cx('filter__select')}
            />
          </Col>
          <Col className={cx('filter__item')} sm={12} md={3} lg={3} xl={3}>
            <Select
              type="Location"
              data={locations}
              className={cx('filter__select')}
            />
          </Col>
          <Col className={cx('filter__item')} sm={12} md={3} lg={3} xl={3}>
            <Range type="Created" className={cx('filter__range')} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Filter;
