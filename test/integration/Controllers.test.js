'use strict';

const request = require('supertest');
const _ = require('lodash');
const assert = require('assert');
const socketIOClient = require('socket.io-client');
const sailsIOClient = require('sails.io.js');

describe('Controllers', function () {

  let token = '';
  let io = {};

  before('connect websocket', function () {
    io = sailsIOClient(socketIOClient);
    io.sails.url = 'http://localhost:1337';
  });

  describe('AuthController', function () {

    const defaultUser = {
      username: 'someusername',
      password: 'somepassword',
    };

    before('create default user', (done) => {
      User.create(defaultUser).exec(done);
    });

    after('destroy default user', (done) => {
      User.destroy().exec(done);
    });

    describe('#login()', function () {

      it('should login user', function (done) {
        request(sails.hooks.http.app)
          .post('/login')
          .send(defaultUser)
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, response) => {
            if (err) {
              return done(err);
            }

            token = response.body.token;

            return done();
          });
      });

      it('should return 404 (user not found)', function (done) {
        request(sails.hooks.http.app)
          .post('/login')
          .send({
            username: 'nouser',
            password: 'nopassword',
          })
          .expect(404)
          .end(done);
      });

      it('should return 403 (forbidden)', function (done) {
        request(sails.hooks.http.app)
          .post('/login')
          .send({
            username: 'someusername',
            password: 'wrongpassword',
          })
          .expect(403)
          .end(done);
      });
    });
  });

  describe('ClientController', function () {

    let client = {};
    let clientSocket = {};

    it('should fail to create client', function (done) {
      request(sails.hooks.http.app)
        .post('/client')
        .send({})
        .expect(401)
        .end(done);
    });

    it('should create client', function (done) {
      request(sails.hooks.http.app)
        .post('/client')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'somename',
        })
        .expect(201)
        .end((err, response) => {
          if (err) {
            return done(err);
          }

          client = response.body;

          return done();
        });
    });

    it('should create client using websockets', function (done) {
      io.socket.request({
        method: 'post',
        url: '/client',
        data: { name: 'anothername' },
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }, (body, jwr) => {
        clientSocket = body;

        return done();
      });
    });

    it('should update client', function (done) {
      request(sails.hooks.http.app)
        .put(`/client/${client.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'nameupdated',
        })
        .expect(200)
        .end((err, response) => {
          if (err) {
            return done(err);
          }

          assert.equal(response.body.name, 'nameupdated');

          return done();
        });
    });

    it('should update client using websockets', function (done) {
      io.socket.request({
        method: 'put',
        url: `/client/${clientSocket.id}`,
        data: { name: 'anothernameupdated' },
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }, (body, jwr) => {
        assert.equal(body.name, 'anothernameupdated');

        return done();
      });
    });

    it('should delete client', function (done) {
      request(sails.hooks.http.app)
        .delete(`/client/${client.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end(done);
    });

    it('should delete client using websockets', function (done) {
      io.socket.request({
        method: 'delete',
        url: `/client/${clientSocket.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }, (body, jwr) => {
        return done();
      });
    });
  });

  describe('ProductController', function () {

    let product = {};
    let productSocket = {};

    it('should fail to create product', function (done) {
      request(sails.hooks.http.app)
        .post('/product')
        .send({})
        .expect(401)
        .end(done);
    });

    it('should create product', function (done) {
      request(sails.hooks.http.app)
        .post('/product')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'somename',
          description: 'somedescription',
          price: 5.5,
        })
        .expect(201)
        .end((err, response) => {
          if (err) {
            return done(err);
          }

          product = response.body;

          return done();
        });
    });

    it('should create product using websockets', function (done) {
      io.socket.request({
        method: 'post',
        url: '/product',
        data: {
          name: 'anothername',
          description: 'anotherdescription',
          price: 15.5,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }, (body, jwr) => {
        productSocket = body;

        return done();
      });
    });

    it('should update product', function (done) {
      request(sails.hooks.http.app)
        .put(`/product/${product.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          price: 10,
        })
        .expect(200)
        .end((err, response) => {
          if (err) {
            return done(err);
          }

          assert.equal(response.body.price, 10);

          return done();
        });
    });

    it('should update product using websockets', function (done) {
      io.socket.request({
        method: 'put',
        url: `/product/${productSocket.id}`,
        data: { price: 20 },
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }, (body, jwr) => {
        assert.equal(body.price, 20);

        return done();
      });
    });

    it('should delete product', function (done) {
      request(sails.hooks.http.app)
        .delete(`/product/${product.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end(done);
    });

    it('should delete product using websockets', function (done) {
      io.socket.request({
        method: 'delete',
        url: `/product/${productSocket.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }, (body, jwr) => {
        return done();
      });
    });
  });

  describe('InvoiceController', function () {

    let product = {
      name: 'somename',
      description: 'somedescription',
      price: 10,
    };

    let client = {
      name: 'somename',
    };

    before('create default product', function () {
      return Product
        .create(product)
        .then((result) => {
          Object.assign(product, result);

          return result;
        });
    });

    before('create default client', function () {
      return Client
        .create(client)
        .then((result) => {
          Object.assign(client, result);

          return result;
        });
    });

    it('should fail to create invoice', function (done) {
      request(sails.hooks.http.app)
        .post('/invoice')
        .send({})
        .expect(401)
        .end(done);
    });

    it('should create invoice', function (done) {
      request(sails.hooks.http.app)
        .post('/invoice')
        .set('Authorization', `Bearer ${token}`)
        .send({
          clientId: client.id,
          productId: product.id,
          quantity: 1,
        })
        .expect(201)
        .end(done);
    });

    it('should create invoice using websockets', function (done) {
      io.socket.request({
        method: 'post',
        url: '/invoice',
        data: {
          clientId: client.id,
          productId: product.id,
          quantity: 5,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }, (body, jwr) => {
        return done();
      });
    });
  });

  describe('Logout User', function () {
    it('should log user out', function (done) {
      request(sails.hooks.http.app)
        .get('/logout')
        .query({ token })
        .expect(200)
        .end(done);
    })
  });
});
