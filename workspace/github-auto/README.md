# GitHub Auto

GitHub Auto is a CLI tool that automates the process of creating, initializing, and pushing GitHub repositories.

## Features

- Create public or private repositories
- Initialize repositories with README, .gitignore, and LICENSE
- Push repositories to GitHub

## Usage

To create a new repository:

```bash
github-auto create <repo-name> [--public|--private] [description]
```

To initialize a new project:

```bash
github-auto init [template]
```

To push the current project to GitHub:

```bash
github-auto push
```

## Dependencies

- Node.js
- npm

## Installation

```bash
npm install -g github-auto
```