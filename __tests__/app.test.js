const res = require('express/lib/response');
const request = require('supertest');
const { response } = require('../app');
const app = require('../app');
const db = require('../db/connection');
const testData = require('../db/data/test-data/index');
const seed = require('../db/seeds/seed');

beforeEach(() => seed(testData));

describe('GET', () => {
  describe('/api/topics', () => {
    test('status: 200 - should respond with an array of topic objects, each of which should have a slug and description property', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then((response) => {
          expect(response.body.topic).toHaveLength(3);
          response.body.topic.forEach((topic) => {
            expect(topic).toEqual(
              expect.objectContaining({
                description: expect.any(String),
                slug: expect.any(String),
              })
            );
          });
        });
    });
  });
});

describe('GET', () => {
  describe('/api/articles', () => {
    test('status 200: should respond with an article object which should have the following properties: author, title, article_id, body, topic, created_at and votes.', () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then((response) => {
          expect(response.body.articles).toBeSortedBy('created_at', {
            descending: true,
          });
          response.body.articles.forEach((article) => {
            expect(article).toEqual(
              expect.objectContaining({
                article_id: expect.any(Number),
                author: expect.any(String), // author is the username from the users table
                created_at: expect.any(String),
                title: expect.any(String),
                topic: expect.any(String),
                votes: expect.any(Number),
              })
            );
          });
        });
    });
  });
});

describe('/api/articles queries', () => {
  test('should return articles sorted by article_id', () => {
    return request(app)
      .get('/api/articles?sort_by=article_id')
      .expect(200)
      .then((response) => {
        expect(response.body.articles).toBeSorted({
          key: 'article_id',
          descending: true,
        });
      });
  });
  test('should return articles in ascending order - defaults to descending', () => {
    return request(app)
      .get('/api/articles?order=asc')
      .expect(200)
      .then((response) => {
        expect(response.body.articles).toBeSorted({
          key: 'created_at',
          ascending: true,
        });
      });
  });
  test('should return filtered articles by topic "mitch"', () => {
    return request(app)
      .get('/api/articles?topic=mitch')
      .expect(200)
      .then((response) => {
        response.body.articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              topic: 'mitch',
            })
          );
        });
      });
  });
});

describe('/api/articles/:article_id', () => {
  test('status: 200 - should respond with an article object which should have the following properties: author, title, article_id, body, topic, created_at and votes.', () => {
    return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then((response) => {
        expect(response.body.article[0]).toEqual(
          expect.objectContaining({
            article_id: 1,
            author: 'butter_bridge',
            title: 'Living in the shadow of a great man',
            body: 'I find this existence challenging',
            created_at: expect.any(String),
            topic: 'mitch',
            votes: 100,
            comment_count: '11',
          })
        );
      });
  });
});
describe('/api/articles/:article_id/comments', () => {
  test('should respond with an array of comments for the given `article_id` of which each comment should have the following properties: comment_id, votes, created_at, author and body', () => {
    return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        // console.log(comments)
        expect(comments).toHaveLength(11);
        expect(comments).toBeInstanceOf(Array);
        comments.forEach((comment) => {
          expect(comment.hasOwnProperty('comment_id'));
          expect(comment.hasOwnProperty('created_at'));
          expect(comment.hasOwnProperty('author'));
          expect(comment.hasOwnProperty('body'));
          expect(comment.hasOwnProperty('votes'));
        });
      });
  });
});

describe('/api/users', () => {
  test('status 200: should respond with an array of objects, each of which should have the a username propery', () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then((response) => {
        expect(response.body.users).toHaveLength(4);
        response.body.users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
            })
          );
        });
      });
  });
});

describe('/api', () => {
  test('status 200: returns an object containing details of all the available endpoints', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.objectContaining({
            'GET /api': expect.any(Object),
            'GET /api/topics': expect.any(Object),
            'GET /api/users': expect.any(Object),
            'GET /api/articles': expect.any(Object),
            'GET /api/articles/:article_id': expect.any(Object),
            'PATCH /api/articles/:article_id': expect.any(Object),
            'GET /api/articles/:article_id/comments': expect.any(Object),
            'POST /api/articles/:article_id/comments': expect.any(Object),
            'DELETE /api/comments/:comment_id': expect.any(Object),
          })
        );
      });
  });
});

describe('DELETE', () => {
  describe('/api/comments/:comment_id', () => {
    test('status 204: should delete the given comment by comment_id and respond with no content', () => {
      return request(app)
        .delete('/api/comments/1')
        .expect(204)
        .then((response) => {
          expect(response.body).toEqual({});
        });
    });
  });
});

describe('GET Error handling', () => {
  describe('GET All', () => {
    test('status: 404 - returns a message for a route that does not exist', () => {
      return request(app)
        .get('/api/notARoute')
        .expect(404)
        .then((response) => {
          expect(response.body.message).toBe('not found');
        });
    });
  });
  describe('GET - api/articles/:article_id', () => {
    test('status: 400 - returns a message for an invalid id', () => {
      return request(app)
        .get('/api/articles/notAnId')
        .expect(400)
        .then((response) => {
          expect(response.body.message).toBe('bad request');
        });
    });
  });

  describe('GET /api/articles/:article_id/comments', () => {
    test('status 200: returns an empty array if the article_id is valid but there are no associated comments', () => {
      return request(app)
        .get('/api/articles/4/comments')
        .expect(200)
        .then((response) => {
          expect(response.body.comments).toEqual([]);
        });
    });
  });

  describe('GET /api/articles queries', () => {
    test('status: 400 returns a message for an invalid sort query', () => {
      return request(app)
        .get('/api/articles?sort_by=bitle')
        .expect(400)
        .then((response) => {
          expect(response.body.message).toBe('Invalid sort query');
        });
    });
  });

  describe('GET /', () => {
    test('status 400: should respond with a message for an invalid order query', () => {
      return request(app)
        .get('/api/articles?order=dsc')
        .expect(400)
        .then((response) => {
          expect(response.body.message).toBe('Invalid order query');
        });
    });
  });

  describe('GET /', () => {
    test('status 400: should respond with a message for an invalid topic query', () => {
      return request(app)
        .get('/api/articles?topic=dogs')
        .expect(400)
        .then((response) => {
          expect(response.body.message).toBe('Invalid topic query');
        });
    });
  });
});

describe('PATCH', () => {
  describe('/api/articles/:article_id', () => {
    test('status: 200 - should respond with the updated article', () => {
      return request(app)
        .patch('/api/articles/1')
        .send({ votes: 1 })
        .expect(200)
        .then((response) => {
          expect(response.body.article).toEqual(
            expect.objectContaining({
              article_id: 1,
              title: 'Living in the shadow of a great man',
              topic: 'mitch',
              author: 'butter_bridge',
              body: 'I find this existence challenging',
              created_at: expect.any(String),
              votes: 101,
            })
          );
        });
    });
  });
  describe('PATCH Error handling', () => {
    test('status: 400 - returns a message if required fields are missing', () => {
      return request(app)
        .patch('/api/articles/1')
        .send({})
        .expect(400)
        .then((response) => {
          expect(response.body.message).toBe('bad request');
        });
    });
    test('status: 400 - incorrect value type sent', () => {
      return request(app)
        .patch('/api/articles/1')
        .send({ votes: 'one' })
        .expect(400)
        .then((response) => {
          expect(response.body.message).toBe('bad request');
        });
    });
  });
});

describe('POST', () => {
  describe(' /api/articles/:article_id/comments', () => {
    test('status: 201 - should post a comment. The request body accepts a username and body and responds with the posted comment.', () => {
      return request(app)
        .post('/api/articles/1/comments')
        .send({ username: 'butter_bridge', body: 'this is it' })
        .expect(201)
        .then(({ body }) => {
          const { comment } = body;
          expect(comment).toEqual(
            expect.objectContaining({
              article_id: 1,
              author: 'butter_bridge',
              body: 'this is it',
              comment_id: 19,
              created_at: expect.any(String),
              votes: 0,
            })
          );
        });
    });
  });
  describe('POST Error handling ', () => {
    test('status: 400 - missing or invalid post body', () => {
      return request(app)
        .post('/api/articles/16/comments')
        .send({ username: 'butter_bridge', body: '' })
        .expect(400)
        .then((response) => {
          expect(response.body.message).toBe('bad request');
        });
    });
  });
});

afterAll(() => db.end());
