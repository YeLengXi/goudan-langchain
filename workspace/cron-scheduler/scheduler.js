# Cron Scheduler

This is a simple cron scheduler that can execute tasks based on cron expressions.

## Features

- Parse cron expressions
- Schedule and execute tasks
- Support multiple tasks
- Task execution history
- Error handling and retry

## Configuration

The scheduler reads tasks from a JSON configuration file named `tasks.json`. The file should have the following format:

```json
{
  "tasks": [
    {
      "name": "task_name",
      "cron": "cron_expression",
      "command": "command_to_execute"
    },
    // Add more tasks here
  ]
}
```

Each task has the following properties:

- `name`: The name of the task.
- `cron`: The cron expression that defines when the task should be executed.
- `command`: The command to execute.

## Usage

To run the scheduler, execute the following command:

```bash
node scheduler.js --config tasks.json
```
