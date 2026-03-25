# GitHub Auto

GitHub Auto is a CLI tool that automates the process of creating, initializing, and pushing GitHub repositories.

## Features

- Create repositories
- Initialize local git repositories
- Push to GitHub

## Usage

### Create a new repository

```bash
github-auto create <repository-name> --public
github-auto create <repository-name> --private --description "My awesome project"
```

### Initialize a local repository

```bash
github-auto init --template <template>
```

### Push to GitHub

```bash
github-auto push
```

## Configuration

You can set your GitHub Personal Access Token in the environment variables.

## License

MIT