const express = require('express');
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private (Buyers only)
router.post('/', [
  auth,
  authorize('buyer'),
  body('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
  body('items.*.product').isMongoId().withMessage('Valid product ID is required'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('shipping.address').notEmpty().withMessage('Shipping address is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { items, shipping, payment } = req.body;

    // Validate products and calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product).populate('supplier');
      
      if (!product) {
        return res.status(400).json({ message: `Product ${item.product} not found` });
      }

      if (product.status !== 'active') {
        return res.status(400).json({ message: `Product ${product.name} is not available` });
      }

      if (item.quantity > product.inventory.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name}. Available: ${product.inventory.quantity}` 
        });
      }

      if (item.quantity < product.pricing.minimumOrderQuantity) {
        return res.status(400).json({ 
          message: `Minimum order quantity for ${product.name} is ${product.pricing.minimumOrderQuantity}` 
        });
      }

      const itemTotal = product.pricing.basePrice * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        product: product._id,
        supplier: product.supplier._id,
        quantity: item.quantity,
        price: product.pricing.basePrice,
        total: itemTotal
      });

      // Update product inventory
      product.inventory.quantity -= item.quantity;
      await product.save();
    }

    // Calculate final pricing
    const shippingCost = shipping.method === 'express' ? 50 : 20;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shippingCost + tax;

    // Create order
    const order = new Order({
      buyer: req.user.id,
      items: orderItems,
      pricing: {
        subtotal,
        shipping: shippingCost,
        tax,
        total
      },
      shipping,
      payment: {
        method: payment.method,
        status: 'pending'
      },
      status: 'pending'
    });

    await order.save();

    const populatedOrder = await Order.findById(order._id)
      .populate('buyer', 'firstName lastName email')
      .populate('items.product', 'name images')
      .populate('items.supplier', 'firstName lastName company');

    res.status(201).json({
      message: 'Order created successfully',
      order: populatedOrder
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error while creating order' });
  }
});

// @route   GET /api/orders
// @desc    Get user's orders
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const filter = {};
    
    if (req.user.role === 'buyer') {
      filter.buyer = req.user.id;
    } else if (req.user.role === 'supplier') {
      filter['items.supplier'] = req.user.id;
    }

    if (status) {
      filter.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const orders = await Order.find(filter)
      .populate('buyer', 'firstName lastName email')
      .populate('items.product', 'name images')
      .populate('items.supplier', 'firstName lastName company')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments(filter);

    res.json({
      orders,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error while fetching orders' });
  }
});

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('buyer', 'firstName lastName email phone')
      .populate('items.product', 'name images specifications')
      .populate('items.supplier', 'firstName lastName company phone email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user has access to this order
    const hasAccess = 
      req.user.role === 'admin' ||
      order.buyer._id.toString() === req.user.id ||
      order.items.some(item => item.supplier._id.toString() === req.user.id);

    if (!hasAccess) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json({ order });
  } catch (error) {
    console.error('Get order error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(500).json({ message: 'Server error while fetching order' });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private
router.put('/:id/status', [
  auth,
  body('status').isIn(['confirmed', 'processing', 'shipped', 'delivered', 'cancelled']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status, note } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check authorization based on status change
    const canUpdate = 
      req.user.role === 'admin' ||
      (req.user.role === 'supplier' && order.items.some(item => item.supplier.toString() === req.user.id)) ||
      (req.user.role === 'buyer' && order.buyer.toString() === req.user.id && status === 'cancelled');

    if (!canUpdate) {
      return res.status(403).json({ message: 'Not authorized to update this order' });
    }

    // Update status
    order.status = status;
    order.statusHistory.push({
      status,
      note,
      timestamp: new Date()
    });

    if (status === 'delivered') {
      order.shipping.actualDelivery = new Date();
    }

    await order.save();

    res.json({
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error while updating order status' });
  }
});

module.exports = router;
