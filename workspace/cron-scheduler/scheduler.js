# Cron Scheduler

This is the main program for the Cron Scheduler. It parses cron expressions, schedules tasks, and executes them at the specified times.

## Features

- Parse cron expressions
- Schedule and execute tasks
- Support multiple tasks
- Task execution history
- Error handling and retry

## Usage

To use this scheduler, you need to provide a configuration file in JSON format. Here is an example:

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