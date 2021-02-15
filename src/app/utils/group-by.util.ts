export const groupBy = (array: any[], fieldName: string): any[][] => {
  const fieldValues = array.map((item) => item[fieldName]);
  const uniqueValues = new Set(fieldValues);

  return Array.from(uniqueValues).map((value) => {
    return array.filter((item) => item[fieldName] === value);
  });
};
