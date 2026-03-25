# Cron Scheduler

This is the main program for the Cron Scheduler. It uses Node.js to schedule tasks based on cron expressions.

## Features

- Parse cron expressions
- Schedule tasks
- Add/remove tasks
- Task execution logs
- Configuration file support

## Usage

To run the scheduler, use the following command:

```bash
node scheduler.js --config tasks.json
```

The --config flag is used to specify the configuration file containing the tasks to be scheduled.

## Configuration File

The configuration file is a JSON file that defines the tasks to be scheduled. The format is as follows:

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

Each task has a name, a cron expression, and a command to execute.

## Testing

To test the scheduler, run the following command:

```bash
test/scheduler.test.js
```

This will run the test cases for the scheduler.
