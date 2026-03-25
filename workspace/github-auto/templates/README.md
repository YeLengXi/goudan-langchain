# README.md

Welcome to github-auto!

This repository contains the source code for the github-auto tool. The tool automates the creation, initialization, and pushing of GitHub repositories.

## Installation

To use github-auto, you need to install it locally.

```bash
cnpm install -g github-auto
```

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