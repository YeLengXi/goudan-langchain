# GitHub Automation Tool

This tool automates the process of creating GitHub repositories, initializing them locally, and pushing changes to GitHub.

## Features

- Create repositories on GitHub
- Initialize local repositories
- Push changes to GitHub
- Template system for README, .gitignore, and LICENSE

## Usage

### Create a new repository

```bash
github-auto create my-project --public
```

```bash
github-auto create my-project --private --description "My awesome project"
```

### Initialize a local repository

```bash
github-auto init --template nodejs
```

### Push changes to GitHub

```bash
github-auto push
```