// MongoDB initialization script for Dream Bazar
const dbName = 'dream-bazar';

print('Initializing database: ' + dbName);

const dbInstance = db.getSiblingDB(dbName);

// Create collections if they do not exist
const collections = [
    'users',
    'products',
    'categories',
    'brands',
    'attributes',
    'shops',
    'orders',
    'reviews',
    'roles',
    'shippingaddresses',
    'productdescriptions'
];

collections.forEach(function (col) {
    if (!dbInstance.getCollectionNames().includes(col)) {
        dbInstance.createCollection(col);
        print('Created collection: ' + col);
    }
});

// Ensure basic indexes
dbInstance.users.createIndex({ email: 1 }, { unique: true, sparse: true });
dbInstance.products.createIndex({ title: "text" });

print('MongoDB initialization completed successfully for ' + dbName);
