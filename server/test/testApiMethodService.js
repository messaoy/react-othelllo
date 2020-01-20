const express = require('express');
const request = require('supertest');

const app = express();

module.exports = {
  get: (url) => {
    const httpRequest = request(app).get(url);
    httpRequest.set('Origin', 'http://localhost:4001');
    return httpRequest;
  },

  post: (url, body) => {
    const httpRequest = request(app).post(url);
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://localhost:4001');
    return httpRequest;
  },

  put: (url, body) => {
    const httpRequest = request(app).put(url);
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://localhost:4000');
    return httpRequest;
  },

  delete: (url) => {
    const httpRequest = request(app).delete(url);
    httpRequest.set('Origin', 'http://localhost:4000');
    return httpRequest;
  },

};
