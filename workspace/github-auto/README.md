# GitHub Auto

This tool automates the process of creating, initializing, and pushing GitHub repositories.

## Features

- Create repositories (public/private)
- Initialize local repositories
- Push to GitHub
- Template system (README, .gitignore, LICENSE)

## Usage

```bash
github-auto create my-project --public
github-auto create my-project --private --description "My awesome project"
github-auto init --template nodejs
github-auto push
```