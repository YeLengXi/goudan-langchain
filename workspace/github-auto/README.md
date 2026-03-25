# GitHub Auto

GitHub Auto is a tool that automates the process of creating, initializing, and pushing GitHub repositories.

## Features

- Create repositories on GitHub
- Support public/private repositories
- Initialize README
- Add .gitignore and LICENSE

## Usage

### Create a repository

```bash
github-auto create my-project --public

# Create a private repository with a description
github-auto create my-project --private --description "My awesome project"
```

### Initialize a local repository

```bash
github-auto init --template nodejs
```

### Push to GitHub

```bash
github-auto push
```
