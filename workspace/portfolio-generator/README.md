# Portfolio Generator

This is a static website generator for creating personal portfolios. It allows you to easily create a professional-looking portfolio website by providing your personal information and project details.

## Features

- Read personal information from a configuration file
- Support for HTML templates
- Generate CSS and HTML files
- Local server for previewing

## Usage

1. Install the generator:

   npm install -g portfolio-generator

2. Create a configuration file (portfolio.json):

   {
     "name": "Your Name",
     "position": "Your Position",
     "bio": "Your bio",
     "skills": ["Skill 1", "Skill 2", ...],
     "projects": [
       {
         "name": "Project 1",
         "description": "Description of Project 1",
         "link": "https://github.com/yourname/project1"
       },
       {
         "name": "Project 2",
         "description": "Description of Project 2",
         "link": "https://github.com/yourname/project2"
       }
     ],
     "social_links": {
       "GitHub": "https://github.com/yourname",
       "LinkedIn": "https://linkedin.com/in/yourname",
       "Email": "yourname@example.com"
     }
   }

3. Generate the website:

   portfolio-generator

4. Preview the website:

   Open the output/index.html file in your browser.