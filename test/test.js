var expect = require("chai").expect;
var request = require("request");
var controller = require("./controller");
// test the product api
describe("Product api", function() {
    //check for correct api calls
    describe("Get Product Price", function() {
        var url = "http://172.24.144.106:8080/api/price/New Co Ltd/Small wongle";
        it("returns status 200", function(done) {
            request(url, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it("returns the product price", function(done) {
            request(url, function(error, response, body) {
                expect(JSON.parse(body).product.price).to.equal(5);
                done();
            });
        });
        var url_1 = "http://172.24.144.106:8080/api/price/New Co Ltd/Mini wongle";
        it("returns status 200", function(done) {
            request(url_1, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it("returns  empty ", function(done) {
            request(url_1, function(error, response, body) {
                expect(JSON.parse(body).product).to.equal(null);
                done();
            });
        });
    });
    //check for incorrect api calls
    describe("wrong api calls", function() {
        var url = "http://172.24.144.106:8080/api/price/New Co Ltd";
        it("returns status 404", function(done) {
            request(url, function(error, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
        var url_1 = "http://172.24.144.106:8080/api/prices/New Co Ltd/Small wongle";
        it("returns status 404", function(done) {
            request(url_1, function(error, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
    });
});
