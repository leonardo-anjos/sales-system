const express = require('express');
const httpProxy = require('express-http-proxy');
const cors = require('cors')

const app = express();
app.use(cors())

const port = 8080;

const {
  CUSTOMERS_API_URL,
  ORDERS_API_URL,
} = require('./external-service');

const customersServiceProxy = httpProxy(CUSTOMERS_API_URL);
const ordersServiceProxy = httpProxy(ORDERS_API_URL);

app.get('/customers', (req, res, next) => {
  console.log(new Date(), 'GET customers')
  customersServiceProxy(req, res, next)
});

app.post('/customers', (req, res, next) => {
  console.log(new Date(), 'POST customers')
  customersServiceProxy(req, res, next)
});

app.put('/customers/:id', (req, res, next) => {
  console.log(new Date(), 'PUT customers')
  customersServiceProxy(req, res, next)
});

app.delete('/customers/:id', (req, res, next) => {
  console.log(new Date(), 'DELETE customers')
  customersServiceProxy(req, res, next)
});

app.get('/orders', (req, res, next) => {
  console.log(new Date(), 'GET orders')
  ordersServiceProxy(req, res, next)
});

app.post('/orders', (req, res, next) => {
  console.log(new Date(), 'POST orders')
  ordersServiceProxy(req, res, next)
});

app.put('/orders/:id', (req, res, next) => {
  console.log(new Date(), 'PUT orders')
  ordersServiceProxy(req, res, next)
});

app.delete('/orders/:id', (req, res, next) => {
  console.log(new Date(), 'DELETE orders')
  ordersServiceProxy(req, res, next)
});

app.listen(port, () => console.log(`API-GATEWAY listening on port ${port}!`));

