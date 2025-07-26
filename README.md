# Raw Material Marketplace

A comprehensive e-commerce platform for trading industrial raw materials, connecting suppliers and buyers worldwide.

## Project Structure

This repository contains two separate applications:

```
raw-material-market/
├── client/                 # React Frontend Application
│   ├── README.md          # Frontend-specific documentation
│   ├── package.json       # Frontend dependencies
│   └── src/               # React application source code
├── server/                 # Node.js Backend Application  
│   ├── README.md          # Backend-specific documentation
│   ├── package.json       # Backend dependencies
│   └── routes/            # API routes and logic
└── README.md              # This file - Project overview
```

## Applications

### 🎨 Frontend Application (client/)
- **Technology**: React 18 with Material-UI
- **Features**: Modern e-commerce interface with product catalog, shopping cart, user authentication
- **Port**: http://localhost:3000

### 🔧 Backend Application (server/)
- **Technology**: Node.js with Express.js
- **Features**: REST API with authentication, product management, order processing
- **Port**: http://localhost:5000

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/adityashriwas/raw-material-market.git
   cd raw-material-market
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   
   # Create .env file with your configuration
   cp .env.example .env
   
   # Seed database with sample data
   npm run seed
   
   # Start backend server
   npm run dev
   ```

3. **Setup Frontend** (in a new terminal)
   ```bash
   cd client
   npm install
   
   # Start frontend application
   npm start
   ```

### Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api

## Test Accounts

After running the seed script:

```
Admin: admin@example.com / admin123
Supplier: supplier1@example.com / supplier123
Buyer: buyer@example.com / buyer123
```

## Key Features

- ✅ **User Authentication** - Role-based access (Buyers, Suppliers, Admins)
- ✅ **Product Management** - Complete product catalog with specifications
- ✅ **Shopping Cart** - Full e-commerce functionality
- ✅ **Order Management** - Order tracking and status updates
- ✅ **Search & Filter** - Advanced product search capabilities
- ✅ **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

**Frontend**: React 18, Material-UI, Redux Toolkit, React Router  
**Backend**: Node.js, Express.js, MongoDB, Mongoose  
**Authentication**: JWT with role-based authorization

## Documentation

For detailed setup and usage instructions:
- See `client/README.md` for frontend documentation
- See `server/README.md` for backend API documentation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.