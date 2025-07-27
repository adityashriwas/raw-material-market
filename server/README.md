# Raw Material Marketplace - Backend API

A robust Node.js backend API for the Raw Material Marketplace e-commerce platform.

## 🔧 Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation and sanitization
- **Multer** - File upload handling
- **Cloudinary** - Image storage (optional)


## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your configuration.

4. **Start MongoDB** (if using local installation)
   ```bash
   mongod
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```


## 📁 Project Structure

```
server/
├── middleware/             # Express middleware
│   └── auth.js            # Authentication middleware
├── models/                # Mongoose models
│   ├── User.js            # User model
│   ├── Product.js         # Product model
│   ├── Category.js        # Category model
│   └── Order.js           # Order model
├── routes/                # API routes
│   ├── auth.js            # Authentication routes
│   ├── products.js        # Product routes
│   ├── categories.js      # Category routes
│   ├── orders.js          # Order routes
│   ├── users.js           # User routes
│   └── suppliers.js       # Supplier routes
├── .env.example           # Environment variables template
├── index.js               # Main server file
└── package.json           # Dependencies and scripts
```

## 🔧 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon


## 🌐 API Endpoints

### Authentication Routes (`/api/auth`)
```
POST   /register          # User registration
POST   /login             # User login
GET    /me                # Get current user profile
PUT    /profile           # Update user profile
```

### Product Routes (`/api/products`)
```
GET    /                  # Get all products (with filtering)
GET    /:id               # Get product by ID
POST   /                  # Create new product (suppliers only)
PUT    /:id               # Update product (owner/admin only)
DELETE /:id               # Delete product (owner/admin only)
POST   /:id/reviews       # Add product review (buyers only)
```

### Category Routes (`/api/categories`)
```
GET    /                  # Get all categories
GET    /:id               # Get category by ID
POST   /                  # Create category (admin only)
```

### Order Routes (`/api/orders`)
```
POST   /                  # Create new order (buyers only)
GET    /                  # Get user orders
GET    /:id               # Get order details
PUT    /:id/status        # Update order status
```

### User Routes (`/api/users`)
```
GET    /                  # Get all users (admin only)
GET    /suppliers         # Get all verified suppliers
```

### Supplier Routes (`/api/suppliers`)
```
GET    /                  # Get all suppliers
GET    /:id/products      # Get products by supplier
GET    /dashboard         # Get supplier dashboard data
```

## 🔒 Authentication & Authorization

### JWT Authentication
- Tokens are generated on login/register
- Tokens expire in 7 days (configurable)
- Include token in Authorization header: `Bearer <token>`

### User Roles
- **buyer** - Can browse, purchase, and review products
- **supplier** - Can add/manage products + all buyer features
- **admin** - Full platform access + all other features

### Protected Routes
Routes are protected using middleware:
```javascript
// Authentication required
router.get('/protected', auth, handler);

// Role-based authorization
router.post('/admin-only', [auth, authorize('admin')], handler);
router.post('/supplier-only', [auth, authorize('supplier', 'admin')], handler);
```

## 🗄️ Database Models

### User Model
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  role: String (buyer|supplier|admin),
  phone: String,
  address: Object,
  company: Object,
  isVerified: Boolean,
  isActive: Boolean
}
```

### Product Model
```javascript
{
  name: String,
  description: String,
  category: ObjectId (ref: Category),
  supplier: ObjectId (ref: User),
  images: [String],
  specifications: Object,
  pricing: {
    basePrice: Number,
    currency: String,
    unit: String,
    minimumOrderQuantity: Number
  },
  inventory: Object,
  status: String,
  rating: Object,
  reviews: [Object]
}
```

### Order Model
```javascript
{
  orderNumber: String (auto-generated),
  buyer: ObjectId (ref: User),
  items: [Object],
  pricing: Object,
  shipping: Object,
  payment: Object,
  status: String,
  statusHistory: [Object]
}
```
## 🔍 API Features

### Advanced Product Filtering
```
GET /api/products?category=<id>&minPrice=100&maxPrice=1000&search=aluminum&sortBy=price&sortOrder=asc
```

### Pagination
```
GET /api/products?page=2&limit=20
```

## 🛡️ Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Input validation and sanitization
- Role-based access control
- CORS configuration
- Request rate limiting (planned)
- SQL injection prevention (MongoDB)

## 📈 Performance Features

- Database indexing for search optimization
- Pagination for large datasets
- Efficient MongoDB queries
- Error handling and logging
- Request/response compression (planned)

## 🚀 Deployment

### Environment Setup
1. Set NODE_ENV=production
2. Configure production MongoDB URI
3. Set secure JWT secret
4. Configure external services (Cloudinary, email, etc.)

### Deployment Platforms
- **Heroku** - Easy deployment with MongoDB Atlas
- **AWS EC2** - Full control with custom configuration
- **DigitalOcean** - Simple VPS deployment
- **Railway** - Modern deployment platform

### Production Checklist
- [ ] Environment variables configured
- [ ] Database secured and backed up
- [ ] HTTPS enabled
- [ ] Error logging configured
- [ ] Performance monitoring setup
- [ ] Rate limiting enabled

## 🔮 Future Enhancements

- [ ] File upload handling (Cloudinary integration)
- [ ] Email notifications (order updates, etc.)
- [ ] Payment processing (Stripe integration)
- [ ] Real-time features (WebSocket)
- [ ] Advanced analytics
- [ ] API documentation (Swagger)
- [ ] Rate limiting and caching
- [ ] Background job processing

## 🤝 Contributing

1. Follow RESTful API conventions
2. Add proper error handling
3. Include input validation
4. Write meaningful commit messages
5. Update documentation for new endpoints

## 📝 License

This project is licensed under the MIT License.
