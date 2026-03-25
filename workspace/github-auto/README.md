# GitHub Auto

An automation tool for creating GitHub repositories.

## Features

- Create public or private repositories
- Initialize README, .gitignore, and LICENSE
- Automate local git initialization and first commit
- Push to GitHub and set default branch

## Usage

### Create a Repository

To create a new repository, run:

```bash
github-auto create <repository-name> --[public|private] [--description <description>]
```

Example:

```bash
github-auto create my-project --public
github-auto create my-project --private --description "My awesome project"
```

### Initialize a Local Repository

To initialize a local repository, run:

```bash
github-auto init --template <template>
```

Available templates: nodejs, python, java

Example:

```bash
github-auto init --template nodejs
```

### Push to GitHub

To push your local repository to GitHub, run:

```bash
github-auto push
```

## Requirements

- GitHub Personal Access Token

## Installation

```bash
npm install -g github-auto
```

## Contributing

Contributions are welcome! Please read the CONTRIBUTING.md for details.

## License

MIT
