## Cron Scheduler

This is a simple cron scheduler that can execute tasks based on cron expressions.

### Features

- Parse cron expressions
- Schedule and execute tasks
- Support multiple tasks
- Task execution history
- Error handling and retry

### Configuration

The configuration file should be in JSON format and placed in the same directory as the scheduler script.

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

### Usage

To use the scheduler, run the following command:

```bash
node scheduler.js --config tasks.json
```
