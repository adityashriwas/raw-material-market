const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  category: {
    type: String,
    enum: ['Vegetables', 'Fruits', 'Grains', 'Dairy', 'Meat', 'Seafood', 'Beverages', 'Snacks', 'Condiments', 'Spices'],
    required: [true, 'Category is required']
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Supplier is required']
  },
  images: [{
    type: String,
    required: true
  }],
  specifications: {
    purity: String,
    grade: String,
    chemicalFormula: String,
    appearance: String,
    packaging: String,
    shelfLife: String,
    storageConditions: String,
    origin: String,
    certifications: [String]
  },
  pricing: {
    basePrice: {
      type: Number,
      required: [true, 'Base price is required'],
      min: [0, 'Price cannot be negative']
    },
    currency: {
      type: String,
      default: 'USD',
      enum: ['USD', 'EUR', 'GBP', 'INR', 'CNY']
    },
    unit: {
      type: String,
      required: [true, 'Unit is required'],
      enum: ['kg', 'ton', 'pound', 'gram', 'liter', 'gallon', 'piece', 'cubic_meter']
    },
    minimumOrderQuantity: {
      type: Number,
      required: [true, 'Minimum order quantity is required'],
      min: [1, 'Minimum order quantity must be at least 1']
    },
    maximumOrderQuantity: {
      type: Number,
      default: null
    },
    bulkPricing: [{
      minQuantity: Number,
      price: Number
    }]
  },
  inventory: {
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative']
    },
    location: {
      warehouse: String,
      address: String
    },
    leadTime: {
      type: Number, // in days
      default: 7
    }
  },
  shipping: {
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    shippingClass: {
      type: String,
      enum: ['standard', 'hazardous', 'fragile', 'perishable'],
      default: 'standard'
    },
    restrictions: [String]
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'out_of_stock', 'discontinued'],
    default: 'active'
  },
  tags: [String],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationDocuments: [String]
}, {
  timestamps: true
});

// Index for search
productSchema.index({
  name: 'text',
  description: 'text',
  tags: 'text',
  'specifications.grade': 'text'
});

// Index for filtering
productSchema.index({ category: 1, status: 1 });
productSchema.index({ supplier: 1 });
productSchema.index({ 'pricing.basePrice': 1 });

module.exports = mongoose.model('Product', productSchema);
