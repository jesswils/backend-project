# Northcoders News API

NC News is a RESTful API intended to be a clone of the popular news website Reddit. This project has been developed using TDD with Jest and Supertest, Node.js, Axios, Express.js and PostgreSQL. The application is hosted via Heroku which you can visit [here](https://nc-news-jesswils3.herokuapp.com/api).

---

## The Setup

Run the following commands to clone the project and install the required dependencies:

```
git clone https://github.com/jesswils/nc-news-jesswils.git

cd nc-news-jesswils

npm install
```

### Environment variables

To setup the test and development databases locally, you need to create a .env file for each database, at the root level of the project. Inside each file, add PGDATABASE=name-of-database (nc_news_test for testing and nc_news for development) and finally, make sure to add .env.\* to your .gitignore.

### Seeding and testing the database

Run the following commands:
<br>
<br>
To seed the SQL database
<br>

```
npm run setup-dbs
npm run seed
```

To run the tests

```
npm test app
```

Note: The minimum versions of Node.js and PostgreSQL required to run this project are:

**Node v14.18.1**
<br>
**Postgres v14.2**
