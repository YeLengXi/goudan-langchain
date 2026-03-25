# GitHub Auto

This tool automates the process of creating, initializing, and pushing GitHub repositories.

## Features

- Create repositories through GitHub API
- Support public/private repositories
- Auto-initialize README
- Add .gitignore and LICENSE

## Usage

```bash
github-auto create my-project --public
github-auto create my-project --private --description "My awesome project"
github-auto init --template nodejs
github-auto push
```