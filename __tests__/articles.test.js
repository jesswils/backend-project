const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const testData = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");

beforeEach(() => seed(testData));

describe("GET", () => {
  describe("/api/articles/:article_id", () => {
    test("status: 200 - should respond with an article object which should have the following properties: author, title, article_id, body, topic, created_at and votes.", () => {
      return request(app)
        .get("/api/articles/:article_id")
        .expect(200)
        .then((response) => {
          expect(response.body.article).toHaveLength(12);
          response.body.article.forEach((story) => {
            expect(story).toEqual(
              expect.objectContaining({
                article_id: expect.any(Number),
                author: expect.any(String), // author is the username from the users table
                body: expect.any(String),
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

afterAll(() => db.end());
