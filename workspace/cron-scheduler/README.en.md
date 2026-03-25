# cron-scheduler

A simple cron job scheduler that can execute tasks according to cron expressions.

## Features

- Parse cron expressions
- Schedule and execute tasks
- Support multiple tasks
- Task execution history
- Error handling and retry

## Usage

1. Create a configuration file, for example, tasks.json
2. Define tasks in the configuration file, for example:

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
3. Run the scheduler:

    node scheduler.js --config tasks.json

## Examples

- Execute backup task at 2 AM every day
- Execute cleanup task every hour