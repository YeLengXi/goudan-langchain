## Cron Scheduler

This document provides instructions on how to use the Cron Scheduler.

### Installation

1. Clone the repository:
    git clone [repository-url]

2. Navigate to the project directory:
    cd cron-scheduler

3. Run the scheduler:
    node scheduler.js --config tasks.json

### Configuration

The configuration file (tasks.json) should be in JSON format and contain an array of tasks. Each task has the following properties:

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