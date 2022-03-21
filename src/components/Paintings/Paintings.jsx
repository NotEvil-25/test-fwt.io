import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import Painting from './Painting';
import {
  fetchPaintings,
  selectCurrentPage,
  selectError,
  selectLoading,
  selectPaintings,
  setPerView,
} from '../../store/paintings/paintingsSlice';
import s from './styles.scss';
import { getPerView } from '../../utils/helper';

const cx = classNames.bind(s);

function Paintings() {
  const dispatch = useDispatch();
  const paintings = useSelector(selectPaintings);
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);
  const currentPage = useSelector(selectCurrentPage);

  useEffect(() => {
    const perView = getPerView();
    dispatch(setPerView(perView));
    dispatch(fetchPaintings());
  }, [dispatch, currentPage]);

  const content = paintings.map((painting) => (
    <Col sm={12} md={6} lg={4} xl={4} key={painting.id}>
      <Painting className={cx('paintings__item')} data={painting} />
    </Col>
  ));

  return (
    <div className={cx('paintings')}>
      <Container>
        <Row>
          {isError && 'Error'}
          {isLoading && '...Loading'}
          {content}
        </Row>
      </Container>
    </div>
  );
}

export default Paintings;
