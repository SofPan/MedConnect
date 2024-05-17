const fixTimeStamp = (timestamp) => {
  const locale = timestamp.toLocaleString();
  // console.log("locale", splitTimeStamp);
  return locale;
}

module.exports = { fixTimeStamp };