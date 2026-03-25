// Format and log the response
const util = require('util');

module.exports = {
  formatResponse: (response) => {
    const responseBody = response.body ? response.body : response.text;
    const formattedBody = util.inspect(responseBody, { depth: null });

    return {
      status: response.status,
      headers: response.headers.raw(),
      body: formattedBody,
      time: new Date().toISOString()
    };n
  }
}