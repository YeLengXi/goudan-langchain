## Cron Scheduler

This document provides instructions on how to use the Cron Scheduler.

### Features

- Cron expression parsing
- Task scheduling
- Support for multiple tasks
- Task execution history
- Error handling and retry

### Configuration File

The configuration file is in JSON format and contains tasks to be executed.

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