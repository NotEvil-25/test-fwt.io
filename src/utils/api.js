const getPaintings = async (type, filters = {}) => {
  const page = filters.currentPage ? `_page=${filters.currentPage || 1}` : '';
  const perView = filters.perView ? `&_limit=${filters.perView}` : '';

  const authorId = filters.authorId ? `&authorId=${filters.authorId}` : '';
  const locationId = filters.locationId ? `&locationId=${filters.locationId}` : '';
  const name = filters.name ? `&q=${filters.name}` : '';
  const yearFrom = filters.year.from ? `&created_gte=${filters.year.from}` : '';
  const yearTo = filters.year.to ? `&created_lte=${filters.year.to}` : '';

  const mainFilter = page + perView;
  const detailFilter = authorId + locationId + name + yearFrom + yearTo;

  let response = await fetch(`https://test-front.framework.team/paintings?${detailFilter}`);

  if (type === 'filtered') {
    response = await fetch(`https://test-front.framework.team/paintings?${mainFilter}${detailFilter}`);
    return response;
  }

  return response;
};

const getAuthors = () => fetch('https://test-front.framework.team/authors');

const getLocations = () => fetch('https://test-front.framework.team/locations');

export { getPaintings, getAuthors, getLocations };
