# Cron Scheduler

This is a simple cron scheduler that can execute tasks according to cron expressions.

## Features

- Parse cron expressions
- Schedule and execute tasks
- Support multiple tasks
- Task execution history
- Error handling and retry

## Usage

To use the scheduler, create a configuration file in JSON format, for example, `tasks.json`:

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

Then run the scheduler with the following command:

```bash
node scheduler.js --config tasks.json
```
