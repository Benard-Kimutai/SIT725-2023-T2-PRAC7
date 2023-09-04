import { assert, expect } from "chai";
import { describe, it } from "mocha"
import request from "request";
describe("Add Two Numbers", function () {
    var url = "http://localhost:3000/addTwoNumbers/3/5";
    it("returns status 200 to check if api works", function (done) {
        request(url, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
        });
    });
    it("returns statusCode key in body to check if api give right result should be 200", function (done) {
        request(url, function (error, response, body) {
            body = JSON.parse(body)
            expect(body.statusCode).to.equal(200);
            done()
        });
    });
    it("returns the result as number", function (done) {
        request(url, function (error, response, body) {
            body = JSON.parse(body)
            expect(body.result).to.be.a('number');
            done()
        });
    });
    it("returns the result equal to 8", function (done) {
        request(url, function (error, response, body) {
            body = JSON.parse(body)
            expect(body.result).to.equal(8);
            done()
        });
    });
    it("returns the result not equal to 15", function (done) {
        request(url, function (error, response, body) {
            body = JSON.parse(body)
            expect(body.result).to.not.equal(15);
            done()
        });
    });
});

describe("Cats API", function () {
    describe("GET Cats", function () {
        it("responds with array of cats", function (done) {
            request("http://localhost:3000/api/cats", function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            })
        });
        it("should respond with message get all calls sucessful", function (done) {
            request("http://localhost:3000/api/cats", function (error, response, body) {
                var body = JSON.parse(body);

                expect(body.message).to.equal("get all calls sucessful");
                done();
            })
        })
    });

    describe("POST cat", function () {
        it("responds with status code 201", function (done) {
            request.post("http://localhost:3000/api/cat", {
                form: {
                    title: "test cat",
                    subTitle: "test subtitle",
                    path: "images/amazedkitten.jpg",
                    description: "test decription"
                }
            }, function (error, response, body) {
                expect(response.statusCode).to.equal(201)
                done();
            })
        });
        it("responds with message success", function (done) {
            request.post("http://localhost:3000/api/cat", {
                form: {
                    title: "test cat",
                    subTitle: "test subtitle",
                    path: "images/amazedkitten.jpg",
                    description: "test decription"
                }
            }, function (error, response, body) {
                var body = JSON.parse(body)
                expect(body.message).to.equal("success")
                done();
            })

        })
    })
})

