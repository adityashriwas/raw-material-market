const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/raw-material-marketplace');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = new User({
      firstName: 'Admin',
      lastName: 'User', 
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin',
      isEmailVerified: true,
      isActive: true
    });
    await adminUser.save();

    // Create supplier users
    const supplier1 = new User({
      firstName: 'John',
      lastName: 'Smith',
      email: 'supplier1@example.com', 
      password: await bcrypt.hash('supplier123', 10),
      role: 'supplier',
      company: {
        name: 'ChemCorp Industries',
        type: 'Chemical Manufacturer',
        website: 'https://chemcorp.com',
      },
      address: {
        country: 'United States',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        street: '123 Main St',
      },
      isEmailVerified: true,
      isActive: true,
      phone: '1234567890'
    });
    await supplier1.save();

    const supplier2 = new User({
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'supplier2@example.com',
      password: await bcrypt.hash('supplier123', 10),
      role: 'supplier',
      company: {
        name: 'MetalWorks Ltd',
        type: 'Metal Supplier',
        website: 'https://metalworks.com',
      },
      isEmailVerified: true,
      isActive: true,
      phone: '0987654321'
    });
    await supplier2.save();

    // Create buyer user
    const buyer = new User({
      firstName: 'Mike',
      lastName: 'Wilson',
      email: 'buyer@example.com',
      password: await bcrypt.hash('buyer123', 10),
      role: 'buyer',
      company: {
        name: 'Manufacturing Co',
        type: 'Manufacturer',
      },
      isEmailVerified: true,
      isActive: true,
      phone: '5555555555'
    });
    await buyer.save();

    // Create categories
    const chemicalsCategory = new Category({
      name: 'Chemicals',
      description: 'Industrial chemicals and compounds',
    });
    await chemicalsCategory.save();

    const metalsCategory = new Category({
      name: 'Metals',
      description: 'Raw metals and alloys',
    });
    await metalsCategory.save();

    const polymersCategory = new Category({
      name: 'Polymers',
      description: 'Plastic resins and polymers',
    });
    await polymersCategory.save();

    const mineralCategory = new Category({
      name: 'Minerals',
      description: 'Industrial minerals and ores',
    });
    await mineralCategory.save();

    // Create sample products
    const products = [
      {
        name: 'Sodium Hydroxide (Caustic Soda)',
        description: 'High-purity sodium hydroxide for industrial applications. Used in chemical processing, paper manufacturing, and water treatment.',
        category: chemicalsCategory._id,
        supplier: supplier1._id,
        images: ['/api/placeholder/400/300'],
        specifications: {
          purity: '99.5%',
          grade: 'Industrial Grade',
          chemicalFormula: 'NaOH',
          appearance: 'White flakes',
          packaging: '25kg bags',
          shelfLife: '2 years',
          storageConditions: 'Store in dry place'
        },
        pricing: {
          basePrice: 450,
          currency: 'USD',
          unit: 'ton',
          minimumOrderQuantity: 1
        },
        inventory: {
          quantity: 100,
          location: {
            warehouse: 'ChemCorp Warehouse A',
            address: 'Industrial District, City'
          }
        }
      },
      {
        name: 'Aluminum Ingots',
        description: 'High-grade aluminum ingots suitable for various manufacturing applications.',
        category: metalsCategory._id,
        supplier: supplier2._id,
        images: ['/api/placeholder/400/300'],
        specifications: {
          purity: '99.7%',
          grade: 'A7',
          appearance: 'Silver metallic ingots',
          packaging: 'Bundled',
          shelfLife: 'Indefinite',
          storageConditions: 'Store in dry environment'
        },
        pricing: {
          basePrice: 1850,
          currency: 'USD',
          unit: 'ton',
          minimumOrderQuantity: 5
        },
        inventory: {
          quantity: 50,
          location: {
            warehouse: 'MetalWorks Storage',
            address: 'Port Industrial Zone'
          }
        }
      },
      {
        name: 'Sulfuric Acid',
        description: 'Concentrated sulfuric acid for industrial processes and manufacturing.',
        category: chemicalsCategory._id,
        supplier: supplier1._id,
        images: ['/api/placeholder/400/300'],
        specifications: {
          purity: '98%',
          grade: 'Technical Grade',
          chemicalFormula: 'H2SO4',
          appearance: 'Clear liquid',
          packaging: 'IBC containers',
          shelfLife: '1 year',
          storageConditions: 'Store in chemical-resistant containers'
        },
        pricing: {
          basePrice: 120,
          currency: 'USD',
          unit: 'ton',
          minimumOrderQuantity: 10
        },
        inventory: {
          quantity: 200,
          location: {
            warehouse: 'ChemCorp Warehouse B',
            address: 'Chemical Industrial Park'
          }
        }
      },
      {
        name: 'Copper Wire Rods',
        description: 'High-conductivity copper wire rods for electrical applications.',
        category: metalsCategory._id,
        supplier: supplier2._id,
        images: ['/api/placeholder/400/300'],
        specifications: {
          purity: '99.9%',
          grade: 'C11000',
          appearance: 'Bright copper rods',
          packaging: 'Coiled bundles',
          shelfLife: 'Indefinite',
          storageConditions: 'Store in dry environment'
        },
        pricing: {
          basePrice: 6500,
          currency: 'USD',
          unit: 'ton',
          minimumOrderQuantity: 2
        },
        inventory: {
          quantity: 25,
          location: {
            warehouse: 'MetalWorks Wire Division',
            address: 'Electrical Components District'
          }
        }
      },
      {
        name: 'Polyethylene Resin (HDPE)',
        description: 'High-density polyethylene resin for plastic manufacturing.',
        category: polymersCategory._id,
        supplier: supplier1._id,
        images: ['/api/placeholder/400/300'],
        specifications: {
          grade: 'HDPE Grade',
          appearance: 'White pellets',
          packaging: '25kg bags',
          shelfLife: '2 years',
          storageConditions: 'Store in cool, dry place'
        },
        pricing: {
          basePrice: 1200,
          currency: 'USD',
          unit: 'ton',
          minimumOrderQuantity: 5
        },
        inventory: {
          quantity: 80,
          location: {
            warehouse: 'Polymer Storage Facility',
            address: 'Plastics Industrial Zone'
          }
        }
      }
    ];

    for (const productData of products) {
      const product = new Product(productData);
      await product.save();
    }

    console.log('Seed data created successfully!');
    console.log('\nTest accounts:');
    console.log('Admin: admin@example.com / admin123');
    console.log('Supplier 1: supplier1@example.com / supplier123');
    console.log('Supplier 2: supplier2@example.com / supplier123');
    console.log('Buyer: buyer@example.com / buyer123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
