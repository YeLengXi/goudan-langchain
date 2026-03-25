# cron-scheduler

This is a simple cron scheduler that can execute tasks according to cron expressions.

## Features

- Parse cron expressions
- Schedule and execute tasks
- Support multiple tasks
- Task execution history
- Error handling and retry

## Usage

1. Create a configuration file, for example `tasks.json`, with the following content:

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

2. Run the scheduler:

```bash
node scheduler.js --config tasks.json
```