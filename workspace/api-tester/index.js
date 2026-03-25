const axios = require('axios');

const parseArgs = require('minimist');

const { read_file, write_file, exec_command, list_directory } = require('./utils');

const API_TESTER = {
  get: async (url) => {
    try {
      const response = await axios.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },

  post: async (url, data) => {
    try {
      const response = await axios.post(url, data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  put: async (url, data) => {
    try {
      const response = await axios.put(url, data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  delete: async (url) => {
    try {
      const response = await axios.delete(url);
      return response;
    } catch (error) {
      throw error;
    }
  },

  patch: async (url, data) => {
    try {
      const response = await axios.patch(url, data);
      return response;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = API_TESTER;