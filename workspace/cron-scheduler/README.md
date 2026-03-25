# Cron Scheduler

This is a simple cron scheduler that can execute tasks according to cron expressions.

## Features

- Parse cron expressions
- Schedule tasks to run at specific times
- Support multiple tasks
- Track task execution history
- Error handling and retry

## Usage

To use the scheduler, create a JSON configuration file named `tasks.json` with the following format:

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

