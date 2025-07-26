const express = require('express');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/suppliers
// @desc    Get supplier routes (alias for users/suppliers)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const User = require('../models/User');
    const suppliers = await User.find({ 
      role: 'supplier', 
      isActive: true 
    }).select('firstName lastName company email phone address');

    res.json({ suppliers });
  } catch (error) {
    console.error('Get suppliers error:', error);
    res.status(500).json({ message: 'Server error while fetching suppliers' });
  }
});

// @route   GET /api/suppliers/:id/products
// @desc    Get products by supplier
// @access  Public
router.get('/:id/products', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find({ 
      supplier: req.params.id,
      status: 'active'
    })
    .populate('category', 'name slug')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

    const total = await Product.countDocuments({ 
      supplier: req.params.id,
      status: 'active'
    });

    res.json({
      products,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get supplier products error:', error);
    res.status(500).json({ message: 'Server error while fetching supplier products' });
  }
});

// @route   GET /api/suppliers/dashboard
// @desc    Get supplier dashboard data
// @access  Private (Suppliers only)
router.get('/dashboard', [auth, authorize('supplier')], async (req, res) => {
  try {
    const supplierId = req.user.id;

    // Get product statistics
    const totalProducts = await Product.countDocuments({ supplier: supplierId });
    const activeProducts = await Product.countDocuments({ 
      supplier: supplierId, 
      status: 'active' 
    });

    // Get order statistics
    const totalOrders = await Order.countDocuments({ 
      'items.supplier': supplierId 
    });
    const pendingOrders = await Order.countDocuments({ 
      'items.supplier': supplierId,
      status: { $in: ['pending', 'confirmed'] }
    });

    // Get recent orders
    const recentOrders = await Order.find({ 
      'items.supplier': supplierId 
    })
    .populate('buyer', 'firstName lastName company')
    .sort({ createdAt: -1 })
    .limit(5);

    // Calculate revenue (this month)
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlyRevenue = await Order.aggregate([
      {
        $match: {
          'items.supplier': req.user._id,
          status: 'delivered',
          createdAt: { $gte: startOfMonth }
        }
      },
      {
        $unwind: '$items'
      },
      {
        $match: {
          'items.supplier': req.user._id
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$items.total' }
        }
      }
    ]);

    res.json({
      statistics: {
        totalProducts,
        activeProducts,
        totalOrders,
        pendingOrders,
        monthlyRevenue: monthlyRevenue[0]?.total || 0
      },
      recentOrders
    });
  } catch (error) {
    console.error('Get supplier dashboard error:', error);
    res.status(500).json({ message: 'Server error while fetching dashboard data' });
  }
});

module.exports = router;
