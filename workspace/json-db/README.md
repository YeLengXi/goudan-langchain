## README.md

# JSON Database Tool

This is a simple JSON-based database tool that supports CRUD operations and queries.

## Features

- Supports multiple tables
- Auto-generated IDs
- Conditional queries
- Data validation
- Simple transaction support
- Error handling

## Usage

### Initialize the database

```bash
node database.js init
```

### Create a table

```bash
node database.js create <table_name>
```

### Insert a record

```bash
node database.js insert <table_name> --data '<json_data>'
```

### Find records

```bash
node database.js find <table_name> --query '<json_query>'
```

### Update a record

```bash
node database.js update <table_name> --id <record_id> --data '<json_data>'
```

### Delete a record

```bash
node database.js delete <table_name> --id <record_id>
```

### Save the database

```bash
node database.js save
```
