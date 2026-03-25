## Cron Scheduler

This document provides instructions on how to use the Cron Scheduler.

### Installation

1. Clone the repository:
    git clone https://github.com/your-username/cron-scheduler
2. Navigate to the repository directory:
    cd cron-scheduler
3. Install dependencies:
    npm install

### Usage

To start the scheduler, use the following command:
    node scheduler.js --config path/to/config.json

### Configuration

The configuration file is in JSON format and contains the following structure:

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
      "command": "another-command"
    }
  ]
}
```