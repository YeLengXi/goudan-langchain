# Cron Scheduler

This is a simple cron scheduler implemented in Node.js.

## Features

- Cron expression parsing
- Task scheduling and execution
- Support for multiple tasks
- Task execution history
- Error handling and retry

## Configuration

The scheduler uses a JSON configuration file to define tasks. The format of the configuration file is as follows:

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

Each task is defined by a name, a cron expression, and a command to execute. The cron expression specifies when the task should be executed, and the command specifies what command to run.

## Usage

To use the scheduler, run the following command:

```bash
node scheduler.js --config tasks.json
```

Replace `tasks.json` with the path to your configuration file.

## Example

Here is an example configuration file:

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

This configuration file defines two tasks: `backup` and `cleanup`. The `backup` task is scheduled to run at 2 AM every day, and the `cleanup` task is scheduled to run every 6 hours.

## Testing

To test the scheduler, you can run the following command:

```bash
node scheduler.js --config tests/scheduler.test.json
```

Replace `scheduler.test.json` with the path to your test configuration file.