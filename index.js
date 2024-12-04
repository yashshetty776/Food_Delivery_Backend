const express = require('express');
const cron = require('node-cron');
const app = express();

app.use(express.json()); 

let menu = [];
let orders = [];

app.get('/', (req, res) => {
  res.send('Welcome to Food Delivery App! Your One Stop Solution for Faster & Efficient Food Delivery');
});

app.post('/menu', (req, res) => {
  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    return res.status(400).send('Name, price, and category are required');
  }

  menu.push({ name, price, category });
  res.status(201).send('Menu item added');
});

app.get('/menu', (req, res) => {
  res.json(menu);
});

app.post('/orders', (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).send('Order must contain at least one item');
  }

  const orderItems = items.map(item => menu.find(menuItem => menuItem.name === item));
  if (orderItems.includes(undefined)) {
    return res.status(400).send('Some items are not available in the menu');
  }

  const newOrder = {
    orderId: orders.length + 1,
    items: orderItems,
    status: 'Preparing', 
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.get('/orders/:id', (req, res) => {
  const orderId = parseInt(req.params.id, 10);
  const order = orders.find(o => o.orderId === orderId);

  if (!order) {
    return res.status(404).send('Order not found');
  }

  res.json(order);
});

cron.schedule('*/1 * * * *', () => {
  orders.forEach(order => {
    if (order.status === 'Preparing') {
      order.status = 'Out for Delivery';
    } else if (order.status === 'Out for Delivery') {
      order.status = 'Delivered';
    }
  });

  console.log('Order statuses updated');
});

app.listen(3000, () => {
  console.log('Food delivery backend running on port 3000');
});
