```markdown
# Node.js Blog API

This is a Node.js application built using Express.js framework to create a RESTful API for managing blog posts with user authentication using JSON Web Tokens (JWT). The API allows users to register, log in, create, read, update, and delete blog posts. PSQL is used as a database here with sequelize ORM

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/ajeeshcp/blog-post-management.git
    ```

2. Navigate to the project directory:

    ```bash
        cd blog-post-management
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:

Create a `.env` file in the root directory and specify the following variables:

    ```plaintext
    SECRET_KEY = 'ASDFGHJKL123456789!@#$%^&*'
    PORT = 3000
    ```

5. Run the application:

    ```bash
    npm start
    ```

6. Check the `SQL_Changes/v1.sql` file which contain all the SQL queries to run before starting the application

## Endpoints

### User Authentication

- `POST /api/register`: Allows users to register by providing a username and password.
- `POST /api/login`: Allows registered users to log in and obtain a token for authentication.

### Blog Posts

- `GET /api/posts`: Fetches a list of all blog posts.
- `GET /api/posts/:id`: Retrieves a specific blog post by ID.
- `POST /api/posts`: Allows authenticated users to create a new blog post.
- `PUT /api/posts/:id`: Allows authenticated users to update their own blog post.
- `DELETE /api/posts/:id`: Allows authenticated users to delete their own blog post.

- `POST /api/posts/:id/comment`: Allows authenticated users to post comments.
- `GET /api/posts/:id/comment`: Allows users to view all the comments under a post with a child-parent  relationship.

## Additional Features

- Pagination for the list of blog posts.
- Added categories to blog posts.
- Added comments to blog posts.

## Error Handling

The API provides appropriate error handling for common scenarios such as invalid input, unauthorized access, non-existent resources, etc.

## Validations

Express validator is used as a middleware for the purpose of input data validations.

## Documentation

API documentation can be found using Postman and the link is given below

https://documenter.getpostman.com/view/26922886/2sA35MzeZW

## Technologies Used

- Node.js
- Express.js
- JSON Web Tokens (JWT)
- PostgreSQL
- Express validator
- Sequelize ORM 
- Postman (for API documentation)
```
