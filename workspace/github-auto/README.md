# GitHub Automation Tool

This tool automates the process of creating GitHub repositories, initializing them locally, and pushing changes to GitHub.

## Features

- Create GitHub repositories (public/private)
- Initialize local repositories
- Push changes to GitHub
- Template system for README, .gitignore, and LICENSE

## Usage

### Create a new repository

```bash
github-auto create my-project --public

# Create a private repository with a description
github-auto create my-project --private --description "My awesome project"

### Initialize a local repository

```bash
github-auto init --template nodejs

### Push to GitHub

```bash
github-auto push

## Configuration

You can configure the tool by creating a config.json file in the root directory of your project.

```json
{
  "github_token": "your_github_token"
}

## License

MIT