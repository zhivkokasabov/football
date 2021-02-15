export const getLastUrlSegment = (url: string) => {
  return url.split('/').pop();
};
