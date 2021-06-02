
# Parfait Admin

Parfait is a social, schedule sharing app which allows friends and family to view each other’s schedules to find available free space that suits the whole crew. 

Parfait admin is a management tool for the administraton of Parfait users and sessions
## Authors

[@FionaWrigley](https://github.com/FionaWrigley)

  
## Roadmap

- Usages statistic graphs
- Group maintenance
- Event maintenance


## Environment Variables

To run this project, you will need to add the following environment variables to your next.config.js file

`parfaitServer` 

## Demo

https://parfait-admin.vercel.app/

  
## Tech Stack

**Client:** 
- NextJS 10.2.0
- React 17.0.2
- TailwindCSS 2.1.2

**Server:** 
- Node v12.19.0
- Express 4.17.1
- Apache 2.4.41
- MySQL 8.0.18


## Additional technologies
  
  - Font Awesome -
      Provides free icons for navigation
  - Next themes -
      Used for dark mode    
  - React-confirm-alert -
      Confirmation window
  - React hook form -
      Input forms  
## Features

- Light/dark mode toggle
- Mobile mode
- Cross platform

  
## Run Locally

Before installing the Parfait Admin Panel, you will require the following services to be set up

Parfait database and API - please see the following repo for steps
https://github.com/FionaWrigley/ParfaitBackEnd/


## Getting Started on your local machine

Clone the project

```bash
  git clone https://github.com/FionaWrigley/ParfaitAdmin/
```

Go to the project directory

```bash
  cd ParfaitAdmin/parfait_admin
```

Install dependencies

```bash
  npm install
```

Update next.config.js file

- Set environment parfaitServer to point at your local api

Start the server

```bash
  npm run dev
```

  