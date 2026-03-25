# Cron Scheduler

A simple cron job scheduler written in Node.js.

## Features
- Parse cron expressions
- Schedule and execute tasks
- Support multiple tasks
- Task execution history
- Error handling and retry

## Installation

Make sure you have Node.js installed.

## Usage

To start the scheduler, run:

    node scheduler.js --config path/to/config.json

## Configuration

The configuration file is in JSON format and contains an array of tasks.

Example:

```json
{
  "tasks": [
    {
      "name": "backup",
      "cron": "0 2 * * *",
      "command": "node backup.js"
    },
    {
      "name": "cleanup",
      "cron": "0 */6 * * *",
      "command": "node cleanup.js"
    }
  ]
}
```

Each task has a name, a cron expression, and a command to execute.

## Contributing

Contributions are welcome!

