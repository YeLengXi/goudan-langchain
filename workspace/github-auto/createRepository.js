const axios = require('axios');

const createRepository = async (token, name, private) => {
  const response = await axios.post('https://api.github.com/user/repos', {
    name,
    private
  }, {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  return response.data;
};

module.exports = createRepository;