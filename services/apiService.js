const axios = require('axios');

const responseHandler = async (config) => {
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    const apiError = {
      statusCode: 500,
      message: error.message,
      error
    }
    console.error(JSON.stringify(apiError));
    return apiError;
  }
};

const apiService = {
  getUsers: async = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://jsonplaceholder.typicode.com/users',
      headers: { }
    };

    return responseHandler(config);
  }
}

module.exports = apiService;
