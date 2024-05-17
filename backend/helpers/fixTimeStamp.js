const fixTimeStamp = (timestamp) => {
  const locale = timestamp.toLocaleString();
  return locale;
}

module.exports = { fixTimeStamp };