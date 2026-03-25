# GitHub Auto

This tool automates the process of creating, initializing, and pushing GitHub repositories.

## Features

- Create public or private repositories via GitHub API
- Initialize README, .gitignore, and LICENSE files
- Push to GitHub and set the default branch

## Usage

```bash
github-auto create my-project --public
github-auto create my-project --private --description "My awesome project"
github-auto init --template nodejs
github-auto push
```