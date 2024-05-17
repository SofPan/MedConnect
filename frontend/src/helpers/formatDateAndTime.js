export const formatDateAndTime = (date) => {
  const splitDate = date.split(",");
  return {
    date: splitDate[0],
    time: splitDate[1].replace(":00 ", " ")
  }
};