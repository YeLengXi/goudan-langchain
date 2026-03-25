# GitHub Auto

This is a tool to automate the process of creating, initializing, and pushing GitHub repositories.

## Features

- Create repositories through GitHub API
- Support public/private repositories
- Initialize README, .gitignore, and LICENSE
- Local initialization with git
- Push to GitHub and set default branch
- Template system for README, .gitignore, and LICENSE

## Usage

```bash
github-auto create <project-name> --public
github-auto create <project-name> --private --description "Your project description"
github-auto init --template <template>
github-auto push
```