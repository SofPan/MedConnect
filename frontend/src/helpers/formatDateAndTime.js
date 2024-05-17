export const formatDateAndTime = (date) => {
  const splitDate = date.split("at");
  return {
    date: splitDate[0],
    time: splitDate[1]
  }
};