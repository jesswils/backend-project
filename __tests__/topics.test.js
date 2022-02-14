const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const testData = require('../db/data/test-data/index')
const seed = require('../db/seeds/seed')

beforeEach(() => seed(testData))

describe('GET', () => {
  describe('/api/topics', () => {
    test('status: 200 - should respond with an array of topic objects, each of which should have a slug and description property', () => {
        return request(app).get('/api/topics').expect(200).then((response)=> {
            expect(response.body.topic).toHaveLength(3);
            response.body.topic.forEach((topic) => {
                expect(topic).toEqual(
                    expect.objectContaining({
                        description: expect.any(String),
                        slug: expect.any(String)
                    })
                )
            })
        })
    });
  });

  describe('error handling', () => {
    test('status: 404 - returns a message for a path not found', () => {
      return request(app)
        .get('/api/notARoute')
        .expect(404)
        .then((response) => {
          expect(response.body.message).toBe('path not found');
        });
    });
  });
});


afterAll(() => db.end());