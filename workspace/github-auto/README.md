# github-auto

A tool for automating GitHub repository creation, initialization, and pushing.

## Features

- Create repositories on GitHub
- Support public/private repositories
- Initialize README, .gitignore, and LICENSE
- Local initialization with git
- Push to GitHub
- Template system for README, .gitignore, and LICENSE

## Usage

To create a new repository:

```bash
github-auto create <repository-name> --[public|private] [--description <description>]
```

To initialize a local repository:

```bash
github-auto init --template <template>
```

To push to GitHub:

```bash
github-auto push
```