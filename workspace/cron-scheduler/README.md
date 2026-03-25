## Cron Scheduler

This document provides instructions on how to use the Cron Scheduler.

### Installation

1. Clone the repository:
   git clone https://github.com/your-username/cron-scheduler.git

2. Navigate to the project directory:
   cd cron-scheduler

3. Install dependencies:
   npm install

### Usage

To run the scheduler, use the following command:

   node scheduler.js --config tasks.json

The --config flag is used to specify the configuration file containing the tasks to be scheduled.

### Configuration File

The configuration file is a JSON file that defines the tasks to be scheduled. The format is as follows:

```json
{
  "tasks": [
    {
      "name": "task-name",
      "cron": "cron-expression",
      "command": "command-to-execute"
    },
    {
      "name": "another-task",
      "cron": "another-cron-expression",
      "command": "another-command-to-execute"
    }
  ]
}
```

Each task has a name, a cron expression, and a command to execute.

### Examples

Here are some examples of cron expressions:

- `0 9 * * *`: Runs at 9 AM every day
- `*/5 * * * *`: Runs every 5 minutes
- `0 0 * * 1`: Runs at midnight every Monday

### Contributing

Contributions are welcome. Please see the CONTRIBUTING.md file for details.
