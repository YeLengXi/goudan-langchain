# github-auto

GitHub repository automation tool

## Description
This tool automates the process of creating, initializing, and pushing GitHub repositories.

## Features
- Create repositories through GitHub API
- Support public/private repositories
- Auto-initialize README
- Add .gitignore and LICENSE

## Usage

### Create Repository
```bash
github-auto create <repository-name> --public
github-auto create <repository-name> --private --description <description>
```

### Initialize Repository
```bash
github-auto init --template <template>
```

### Push to GitHub
```bash
github-auto push
```