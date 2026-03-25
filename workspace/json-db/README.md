## README.md

This document provides instructions on how to use the JSON Database tool.

## Features

- Supports multiple tables
- Auto-generates IDs
- Conditional queries
- Data validation
- Simple transaction support
- Error handling

## API

```javascript
const DB = require('./database');

// Initialize
const db = new DB('./data.json');

// Create table
db.createTable('users');

// Insert
db.insert('users', { name: 'Alice', age: 30 });

// Find
const users = db.find('users', { age: 30 });

// Update
db.update('users', 1, { age: 31 });

// Delete
db.delete('users', 1);

// Save
db.save();
```