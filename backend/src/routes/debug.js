const express = require('express');
const router = express.Router();
const { User, Restaurant, MenuItem, Order, OrderItem } = require('../models');

// Returns counts and sample rows for quick inspection. Does NOT return password hashes.
router.get('/', async (req, res) => {
  try {
    const usersCount = await User.count();
    const restaurantsCount = await Restaurant.count();
    const menuCount = await MenuItem.count();
    const ordersCount = await Order.count();

    // Include passwordHash so you can inspect login credentials (sensitive)
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role', 'passwordHash'],
      limit: 50,
    });

    const restaurants = await Restaurant.findAll({
      attributes: ['id', 'name', 'cuisine', 'rating', 'location'],
      limit: 50,
    });

    const menuItems = await MenuItem.findAll({
      attributes: ['id', 'name', 'price', 'description', 'RestaurantId'],
      limit: 100,
    });

    const orders = await Order.findAll({
      attributes: ['id', 'status', 'total', 'UserId', 'createdAt'],
      include: [
        {
          model: OrderItem,
          attributes: ['id', 'quantity', 'price', 'MenuItemId'],
          include: [
            {
              model: MenuItem,
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
      order: [['id', 'DESC']],
      limit: 50,
    });

    res.json({
      counts: { users: usersCount, restaurants: restaurantsCount, menuItems: menuCount, orders: ordersCount },
      users,
      restaurants,
      menuItems,
      orders,
    });
  } catch (err) {
    console.error('Debug route error', err);
    res.status(500).json({ error: 'Debug failed', details: err.message });
  }
});

module.exports = router;
