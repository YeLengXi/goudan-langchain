## README

This document describes how to use the JSON Database tool.

### Installation

Make sure you have Node.js installed.

Clone the repository: `git clone [repository-url]`

Navigate to the repository directory: `cd json-db`

Install dependencies: `npm install`

### Usage

- Create a table: `node database.js create [table-name]`
- Insert a record: `node database.js insert [table-name] --data '[data]'`
- Find records: `node database.js find [table-name] --query '[query]'`
- Update a record: `node database.js update [table-name] --id [id] --data '[data]'`
- Delete a record: `node database.js delete [table-name] --id [id]'`
- Save the database: `node database.js save`

### Examples

- Create a 'users' table: `node database.js create users`
- Insert a user: `node database.js insert users --data '{\"name\":\"Alice\",\"age\":30}'`
- Find users with age 30: `node database.js find users --query '{\"age\":30}'`
- Update the age of the first user: `node database.js update users --id 1 --data '{\"age\":31}'`
- Delete the first user: `node database.js delete users --id 1`

### Contributing

Contributions are welcome. Please follow the contributing guidelines.

### License

This project is licensed under the MIT License.