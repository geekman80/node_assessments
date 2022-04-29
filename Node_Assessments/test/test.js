const assert = require('assert');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
describe('Unit testing page routes', function()
{
    it('should return OK status /', function()
    {
        return request(app).get('/')
        .then(function(res)
        {
            assert.equal(res.status, 200);
        });
    });
    it('should return OK status /authors', function()
    {
        return request(app).get('/authors')
        .then(function(res)
        {
            assert.equal(res.status, 200);
        });
    });
    it('should return OK status /books', function()
    {
        return request(app).get('/books')
        .then(function(res)
        {
            assert.equal(res.status, 200);
        });
    });
    it('should return OK status /magazines', function()
    {
        return request(app).get('/magazines')
        .then(function(res)
        {
            assert.equal(res.status, 200);
        });
    });
    it('should return 404 status /search as get request is not defined for /search', function()
    {
        return request(app).get('/search')
        .then(function(res)
        {
            assert.equal(res.status, 404);
        });
    });
});









