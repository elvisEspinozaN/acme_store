# the acme store

![seed file](https://i.imgur.com/oAhGH42.png)
![postman test](https://i.imgur.com/vqpoVLS.png)

## Overview

A RESTful API for managing user favorites. Users favorites through endpoints.

## Features

- Product management
- Favorite product tracking
- Unique constraint prevention for duplicate favorites

## Technologies Used

- Node.js
- Express.js
- PostgreSQL

## API Endpoints

Base URL: `http://localhost:3000/api`

| Method | Endpoint                       | Description                   |
| ------ | ------------------------------ | ----------------------------- |
| GET    | `/users`                       | Get all users                 |
| GET    | `/products`                    | Get all products              |
| GET    | `/users/:id/favorites`         | Get user's favorites          |
| POST   | `/users/:id/favorites`         | Add product to favorites      |
| DELETE | `/users/:userId/favorites/:id` | Remove product from favorites |

## Contact

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://www.linkedin.com/in/elvis-espinoza/)

✉️ elvis.espinoza.navarrete@outlook.com

## Acknowledgments

- Fullstack Academy instructors
