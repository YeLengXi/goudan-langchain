## Cron Scheduler

This document provides instructions on how to use the Cron Scheduler.

### Installation

1. Clone the repository:
    git clone [repository-url]

2. Navigate to the project directory:
    cd cron-scheduler

3. Install dependencies:
    npm install

### Usage

To start the scheduler, run the following command:

    node scheduler.js --config tasks.json

The --config option is used to specify the configuration file path.

### Configuration File

The configuration file is in JSON format and contains the tasks to be scheduled. Here is an example:

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