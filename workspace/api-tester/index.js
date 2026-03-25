// Main program of the API tester
class APITester {
  constructor() {
    this.commands = {
      "get": this.handleGet,
      "post": this.handlePost,
      "put": this.handlePut,
      "delete": this.handleDelete,
      "patch": this.handlePatch
    }
  }

  async execute(command, url, options) {
    const method = command.toLowerCase();
    const handler = this.commands[method];
    if (handler) {
      try {
        const response = await handler(url, options);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error(`Unknown command: ${command}`);
    }
  }

  async handleGet(url, options) {
    // Implementation for GET
  }

  async handlePost(url, options) {
    // Implementation for POST
  }

  async handlePut(url, options) {
    // Implementation for PUT
  }

  async handleDelete(url, options) {
    // Implementation for DELETE
  }

  async handlePatch(url, options) {
    // Implementation for PATCH
  }
}

const tester = new APITester();
module.exports = tester;