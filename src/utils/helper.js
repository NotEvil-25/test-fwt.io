/* eslint-disable no-param-reassign */
export const createExtraReducer = (item) => ({
  [item.pending]: (state) => {
    state.isLoading = true;
    state.isError = false;
  },
  [item.fulfilled]: (state, action) => {
    state.items.push(...action.payload);
    state.isLoading = false;
    state.isError = false;
  },
  [item.rejected]: (state) => {
    state.isLoading = false;
    state.isError = true;
  },
});

export const getPerView = () => {
  const width = {
    sm: 0,
    md: 768,
    lg: 1024,
    // xl: 1366,
  };
  const currentWidth = document.documentElement.clientWidth;
  const mobile = (currentWidth >= width.sm && currentWidth < width.md);
  const tab = (currentWidth >= width.md && currentWidth < width.lg);
  // const desktop = (currentWidth >= width.lg);

  if (mobile) {
    return 6;
  }

  if (tab) {
    return 8;
  }

  return 9;
};

export const getRangeValue = (yearFrom, yearTo) => {
  if (yearFrom && yearTo) {
    return `с ${yearFrom} до ${yearTo}`;
  }
  if (yearFrom) {
    return `с ${yearFrom}`;
  }
  if (yearTo) {
    return `до ${yearTo}`;
  }

  return 'Created';
};

export const fillArray = (untilValue) => {
  const array = [];
  for (let i = 1; i <= untilValue; i += 1) {
    array.push(i);
  }
  return array;
};

export const pagesCreator = (pages, pagesPerView, currentPage) => {
  const numberOfPages = pages.length;
  const result = [];

  if (numberOfPages > pagesPerView) {
    if (currentPage > 2) {
      for (let i = currentPage - 1; i <= currentPage + 1; i += 1) {
        result.push(i);
        if (i === numberOfPages) break;
      }
    } else {
      for (let i = 1; i <= pagesPerView; i += 1) {
        result.push(i);
        if (i === numberOfPages) break;
      }
    }
  } else {
    for (let i = 1; i <= numberOfPages; i += 1) {
      result.push(i);
    }
  }
  return result;
};
