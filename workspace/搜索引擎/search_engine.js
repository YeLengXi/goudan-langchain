const search_engine = (parsedLogs, searchQuery) => {
  return parsedLogs.filter(log => {
    return log.message.includes(searchQuery);
  });
};

module.exports = { search_engine };