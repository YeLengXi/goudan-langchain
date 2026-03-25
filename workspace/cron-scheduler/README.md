## Cron Scheduler

This document provides instructions on how to use the Cron Scheduler.

### Features

- Parse cron expressions
- Schedule tasks to run at specific times
- Support multiple tasks
- Maintain task execution history
- Error handling and retry

### Configuration File

The configuration file is in JSON format and contains the following structure:

```json
{
  "tasks": [
    {
      "name": "task_name",
      "cron": "cron_expression",
      "command": "command_to_execute"
    },
    {
      "name": "task_name_2",
      "cron": "cron_expression_2",
      "command": "command_to_execute_2"
    }
  ]
}
```

Each task has a name, a cron expression, and a command to execute.

### Usage

To use the Cron Scheduler, run the following command:

```bash
node scheduler.js --config path_to_config_file.json
```

Replace `path_to_config_file.json` with the path to your configuration file.
