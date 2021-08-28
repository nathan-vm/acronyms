# G2i NodeJS Code Challenge

Messaging acronyms are everywhere now. Do you know all of them?

Build a REST API for the **World Texting Foundation**, also known as **WTF**.

A sample JSON data file will be provided with a base set of acronym definitions.

We expect you to create a NodeJS server using modern best practices for API development.

## Requirements

### These endpoints should be created:

- **GET /acronym?from=50&limit=10&search=:search**
  - ▶ returns a list of acronyms, paginated using query parameters
  - ▶ response headers indicate if there are more results
  - ▶ returns all acronyms that fuzzy match against :search
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

### What Do We Expect From You

- [] Complete the challenge requirements stated above. 
- [] Implement an organised and easily understandable Node.js code following best practices
- [] Include clear instructions and requirements for how to run the app in a Development environment.
- [] Follow HTTP standards best practices. 
- [] Dockerize your app by using docker-compose. We want to be able to easily test your server by just doing `docker-compose up`. 
