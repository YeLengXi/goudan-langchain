# GitHub Auto

A tool to automate GitHub repository creation, initialization, and push process.

## Features

- Create repositories on GitHub
- Initialize repositories locally
- Push repositories to GitHub

## Installation

```bash
npm install -g github-auto
```

## Usage

### Create a repository

```bash
github-auto create <repository-name> --public
github-auto create <repository-name> --private --description "My awesome project"
```

### Initialize a repository

```bash
github-auto init --template <template>
```

### Push to GitHub

```bash
github-auto push
```
