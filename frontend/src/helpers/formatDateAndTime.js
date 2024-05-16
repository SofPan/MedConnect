export const formatDateAndTime = (date) => {
  const splitDate = date.replace(":00.000Z", "").split("T");
  return {
    date: splitDate[0],
    time: splitDate[1]
  }
};