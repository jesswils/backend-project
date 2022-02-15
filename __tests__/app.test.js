const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const testData = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");

beforeEach(() => seed(testData));

describe("GET", () => {
  describe("/api/topics", () => {
    test("status: 200 - should respond with an array of topic objects, each of which should have a slug and description property", () => {
      return request(app)
        .get("/api/topics")
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

  describe("error handling", () => {
    test("status: 404 - returns a message for a path not found", () => {
      return request(app)
        .get("/api/notARoute")
        .expect(404)
        .then((response) => {
          expect(response.body.message).toBe("path not found");
        });
    });
  });
});

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

describe("PATCH", () => {
  describe("/api/articles/:article_id", () => {
    test("status: 200 - should respond with the updated article", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ votes: 1 })
        .expect(200)
        .then((response) => {
          expect(response.body.article).toEqual(expect.objectContaining(
            {
              article_id: 1,
              title: "Living in the shadow of a great man",
              topic: "mitch",
              author: "butter_bridge",
              body: "I find this existence challenging",
              created_at: expect.any(String),
              votes: 101,
            }
          ))
        });
    });
  });
});
afterAll(() => db.end());
