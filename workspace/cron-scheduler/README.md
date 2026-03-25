# cron-scheduler

This is a simple cron job scheduler written in Node.js.

## Features

- Parse cron expressions
- Schedule and execute tasks
- Support multiple tasks
- Task execution history
- Error handling and retry

## Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/cron-scheduler.git
``` 

2. Install dependencies

```bash
npm install
``` 

## Usage

To run the scheduler, use the following command:

```bash
dotnet cron-scheduler --config path/to/config.json
``` 

Replace `path/to/config.json` with the path to your configuration file.

## Configuration File

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

## License

MIT
