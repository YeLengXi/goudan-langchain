# GitHub Auto

GitHub Auto is a command-line tool that automates the process of creating and initializing GitHub repositories.

## Features

- Create repositories (public/private)
- Initialize repositories with README, .gitignore, and LICENSE
- Push repositories to GitHub

## Installation

```bash
npm install -g github-auto
```

## Usage

### Create a repository

```bash
github-auto create my-project --public
```

```bash
github-auto create my-project --private --description "My awesome project"
```

### Initialize a repository

```bash
github-auto init --template nodejs
```

### Push a repository

```bash
github-auto push
```

## Templates

You can choose different templates for README, .gitignore, and LICENSE.

## Contributing

Contributions are welcome!
