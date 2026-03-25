# Portfolio Generator

This is a static website generator for creating personal portfolios. It allows you to easily create a professional-looking portfolio website by providing your personal information and project details.

## Features

- Read personal information from a JSON configuration file.
- Use HTML templates to customize the appearance of your portfolio.
- Generate a complete website with HTML and CSS.
- Preview the generated website locally.

## Usage

1. Create a `portfolio.json` file with your personal information and project details.
2. Run the generator using `npm start`.
3. Open the generated website in your browser.

## Configuration

Here is an example of a `portfolio.json` file:

```json
{
  "name": "John Doe",
  "position": "Software Developer",
  "bio": "I am a passionate software developer with 5 years of experience in building web applications.",
  "skills": ["JavaScript", "React", "Node.js"],
  "projects": [
    {
      "name": "Project 1",
      "description": "A web application for managing tasks."    },
    {
      "name": "Project 2",
      "description": "A mobile app for tracking fitness goals."    }
  ],
  "social_links": {
    "GitHub": "https://github.com/johndoe",
    "LinkedIn": "https://linkedin.com/in/johndoe",
    "Email": "johndoe@example.com"
  }
}
```