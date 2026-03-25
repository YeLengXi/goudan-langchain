# Cron Scheduler

A simple cron job scheduler that can execute tasks according to cron expressions.

## Features

- Parse cron expressions
- Schedule and execute tasks
- Support multiple tasks
- Task execution history
- Error handling and retry

## Configuration File Example

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

## CLI Interface

```bash
node scheduler.js --config tasks.json
```