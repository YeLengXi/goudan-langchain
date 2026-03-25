const axios = require('axios');
const dotenv = require('dotenv');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

dotenv.config();

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
const contentType = ['application/json', 'multipart/form-data'];

async function main() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'method',
        message: 'Enter HTTP method (GET, POST, PUT, DELETE, PATCH): ',
        validate: (value) => methods.includes(value) || 'Invalid method'
      },
      {
        type: 'input',
        name: 'url',
        message: 'Enter URL: '
      },
      {
        type: 'list',
        name: 'contentType',
        message: 'Select content type (application/json, multipart/form-data): ',
        choices: contentType
      },
      {
        type: 'input',
        name: 'body',
        message: 'Enter request body (leave blank for empty body):
        ',
        when: (answers) => answers.contentType === 'application/json'
      },
      {
        type: 'input',
        name: 'formData',
        message: 'Enter form data (leave blank for empty form data):
        ',
        when: (answers) => answers.contentType === 'multipart/form-data'
      }
    ]);

    const { method, url, contentType, body, formData } = answers;

    let options = {
      method: method,
      url: url
    }

    if (contentType === 'application/json') {
      options.headers = {
        'Content-Type': 'application/json'
      }
      options.data = JSON.parse(body);
    } else if (contentType === 'multipart/form-data') {
      options.headers = {
        'Content-Type': 'multipart/form-data'
      }
      options.data = formData;
    }

    const response = await axios(options);
    console.log('Status Code:', response.status);
    console.log('Headers:', response.headers);
    console.log('Response Time:', response.duration);
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();