# Cron Scheduler

This is a simple cron scheduler that can execute tasks based on cron expressions.

## Features

- Parse cron expressions
- Schedule and execute tasks
- Support multiple tasks
- Task execution history
- Error handling and retry

## Usage

To use the scheduler, create a configuration file in JSON format with the following structure:

```json
{
  "tasks": [
    {
      "name": "task_name",
      "cron": "cron_expression",
      "command": "command_to_execute"
    },
    {
      "name": "another_task",
      "cron": "another_cron_expression",
      "command": "another_command"
    }
  ]
}
```

Then, run the scheduler with the following command:

```bash
node scheduler.js --config path_to_config_file
```

## Example

Create a file named `tasks.json` with the following content:

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

This will schedule the `backup` task to run every day at 2 AM and the `cleanup` task to run every 6 hours.
