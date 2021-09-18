# Acronyms

Messaging acronyms are everywhere now. Do you know all of them?

## How to RUN 

### Requirements to run
- Docker
- Docker-compose
- Insomnia or Postman to use the routes
### How to be able to use ?
- First up the server with `docker-compose up`
  - 2 services starts with this command: postgres and the app
  - be sure nothing is running on PORTS 3333 and 5432
- The second step is import the acronyms using the route `http://localhost:3333/acronyms/import`
  - use the file on the root of this repo `acronym.json` to fill the database
  - send the file using postman or insomnia with MultipartForm with key `file`
    - if you are using Insomnia, you can easily import the requests with the file in the root of this repo called `insomnia.json`
- Enjoy :D

## The endpoints for use:

- **GET** /auth
  - ▶ returns a token to use in protected routes
- **GET /acronym?from=50&limit=10&search=:search**
  - ▶ returns a list of acronyms, paginated using query parameters
  - ▶ response headers indicate if there are more results
  - ▶ returns all acronyms that fuzzy match against :search
- **POST /import**
  - ▶ receives a multipartform called 'file'
  - ▶ adds the acronyms definitions to the db
- **POST /acronym**
  - ▶ receives an acronym and definition strings
  - ▶ adds the acronym definition to the db
- **PUT /acronym/:acronym**
  - ▶ receives an acronym and definition strings
  - ▶ uses an authorization header to ensure acronyms are protected
  - ▶ updates the acronym definition to the db for :acronym
- **DELETE /acronym/:acronym**
  - ▶ deletes :acronym
  - ▶ uses an authorization header to ensure acronyms are protected

### Easily test server by just doing `docker-compose up`. 
