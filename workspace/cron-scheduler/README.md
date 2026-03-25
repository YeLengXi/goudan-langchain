## Cron Scheduler

This document provides instructions on how to use the Cron Scheduler.

### Features

- Cron expression parsing
- Task scheduling
- Support for multiple tasks
- Task execution history
- Error handling and retry

### Configuration File

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

### CLI Interface

To start the scheduler, run the following command:
```
node scheduler.js --config tasks.json
```