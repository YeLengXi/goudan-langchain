# Cron Scheduler

This is the main program for the Cron Scheduler. It uses Node.js to parse cron expressions and execute tasks at scheduled times.

## Features

- Parse cron expressions
- Schedule and execute tasks
- Support multiple tasks
- Task execution history
- Error handling and retry

## Usage

To use the Cron Scheduler, you need to provide a configuration file (tasks.json) that defines the tasks you want to schedule. The configuration file should be in JSON format and contain an array of tasks. Each task has the following properties:

- `name`: The name of the task.
- `cron`: The cron expression that determines when the task should be executed.
- `command`: The command that will be executed by the task.

Example configuration:
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

To run the scheduler, use the following command:

```bash
node scheduler.js --config tasks.json
```