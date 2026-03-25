## Cron Scheduler

This is a simple cron scheduler that can execute tasks based on cron expressions.

### Features

- Parse cron expressions
- Schedule and execute tasks
- Support multiple tasks
- Task execution history
- Error handling and retry

### Usage

To use the scheduler, create a JSON configuration file with the following format:

```json
{
  "tasks": [
    {
      "name": "task_name",
      "cron": "cron_expression",
      "command": "command_to_execute"
    },
    {
      // More tasks
    }
  ]
}
```

Then, run the scheduler with the following command:

```bash
node scheduler.js --config path_to_config_file
```
