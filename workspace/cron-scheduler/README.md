# Cron Scheduler

This is a simple cron scheduler that can execute tasks based on cron expressions.

## Installation

Make sure you have Node.js installed.

## Usage

1. Create a configuration file, for example `tasks.json`.
2. Run `node scheduler.js --config tasks.json`.

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

## CLI Interface

```bash
node scheduler.js --config tasks.json
```
