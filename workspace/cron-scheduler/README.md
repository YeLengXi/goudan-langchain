# Cron Scheduler

This is a simple cron scheduler that can execute tasks based on cron expressions.

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Run `npm install`

## Usage

1. Create a configuration file, for example `tasks.json`
2. Define tasks in the configuration file
3. Run `node scheduler.js --config tasks.json`

## Configuration File Example

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

## Task Definition

Each task contains the following fields:

- `name`：Task name
- `cron`：Cron expression
- `command`：Command to execute

## CLI Interface

```bash
node scheduler.js --config tasks.json
```
