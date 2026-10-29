// MongoDB initialization script for Dream Bazar
// Real product catalog seeded from Flipkart (https://www.flipkart.com/)
const dbName = 'dream-bazar';
print('Initializing database: ' + dbName);
const dbInstance = db.getSiblingDB(dbName);

// Drop old data to ensure clean initialization
['products', 'product_descriptions', 'categories', 'brands', 'shops', 'users'].forEach(function(c) {
    try { dbInstance[c].drop(); } catch(e) {}
});

// Create indexes
dbInstance.users.createIndex({ email: 1 }, { unique: true, sparse: true });
dbInstance.products.createIndex({ slug: 1 }, { unique: true });
dbInstance.products.createIndex({ title: 'text' });
dbInstance.products.createIndex({ categoryId: 1 });
dbInstance.products.createIndex({ brandId: 1 });
dbInstance.products.createIndex({ sellerId: 1 });
dbInstance.products.createIndex({ sold: -1 });
dbInstance.products.createIndex({ views: -1 });
dbInstance.products.createIndex({ discount: -1 });
dbInstance.product_descriptions.createIndex({ productId: 1 }, { unique: true });
dbInstance.categories.createIndex({ name: 1 }, { unique: true });
dbInstance.brands.createIndex({ name: 1 });

// Seed Admin User
dbInstance.users.insertOne({
  "_id": ObjectId("401e9969e47a57558eb6638b"),
  "username": "admin",
  "email": "admin@dreambazar.com",
  "firstName": "Admin",
  "lastName": "User",
  "password": "$2a$10$w850c/0tH6h9bH7vQjX2yeM5zE5/yvH67p.qK93hL/zWpD81v5yC2",
  "roles": [
    "ADMIN",
    "SELLER",
    "CUSTOMER"
  ],
  "accountStatus": true,
  "avatar": "https://rukminim2.flixcart.com/image/100/100/xif0q/user/avatar.png",
  "createdAt": new Date("2024-01-01T00:00:00.000Z")
});

// Seed Flipkart Verified Store
dbInstance.shops.insertOne({
  "_id": ObjectId("24705285eed31fe38c9b9b24"),
  "shopName": "Flipkart Assured Official Store",
  "sellerId": ObjectId("401e9969e47a57558eb6638b"),
  "shopLogo": "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_9e47c1.png",
  "isApproved": true,
  "isActive": true,
  "createdAt": new Date("2024-01-01T00:00:00.000Z")
});

// Seed Categories
dbInstance.categories.insertMany([
  {
    "_id": ObjectId("eb184b74f6d84f8b9fb3067b"),
    "name": "Mobiles & Tablets",
    "parentId": null,
    "isProductLevel": true,
    "logo": "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/h/d/9/-original-imagtc2qzgnnuhxh.jpeg",
    "filterAttributes": [
      "brand",
      "ram",
      "storage",
      "color"
    ],
    "defaultExpand": [
      "brand",
      "ram",
      "storage"
    ],
    "renderProductAttr": [
      "ram",
      "storage",
      "color"
    ],
    "productDescriptionSection": {
      "General": [
        "brand",
        "color",
        "storage"
      ],
      "Display": [
        "screen_size",
        "resolution"
      ]
    },
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("2573a246286edfc584874dcc"),
    "name": "Laptops & Computers",
    "parentId": null,
    "isProductLevel": true,
    "logo": "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/m/b/n/-original-imagfdf4xnbyyxpa.jpeg",
    "filterAttributes": [
      "brand",
      "processor",
      "ram",
      "ssd_capacity",
      "graphic"
    ],
    "defaultExpand": [
      "brand",
      "processor",
      "ram"
    ],
    "renderProductAttr": [
      "processor",
      "ram",
      "ssd_capacity"
    ],
    "productDescriptionSection": {
      "General": [
        "brand",
        "processor"
      ],
      "Memory & Storage": [
        "ram",
        "ssd_capacity"
      ]
    },
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("df046199293c6db0957a75b7"),
    "name": "Audio & Headphones",
    "parentId": null,
    "isProductLevel": true,
    "logo": "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/e/0/c/wh-ch510-sony-enriched-transparent-original-imagz5rcxcudrdnz.png",
    "filterAttributes": [
      "brand",
      "connectivity",
      "color",
      "battery_life"
    ],
    "defaultExpand": [
      "brand",
      "connectivity"
    ],
    "renderProductAttr": [
      "connectivity",
      "battery_life",
      "color"
    ],
    "productDescriptionSection": {
      "General": [
        "brand",
        "color"
      ],
      "Sound Features": [
        "connectivity",
        "battery_life"
      ]
    },
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("38f1d5470d4fd78df0a1e886"),
    "name": "Smartwatches & Wearables",
    "parentId": null,
    "isProductLevel": true,
    "logo": "https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/y/b/w/-original-imagtvd6jkhyqfvh.jpeg",
    "filterAttributes": [
      "brand",
      "dial_shape",
      "strap_color",
      "display_size"
    ],
    "defaultExpand": [
      "brand",
      "dial_shape"
    ],
    "renderProductAttr": [
      "dial_shape",
      "strap_color",
      "display_size"
    ],
    "productDescriptionSection": {
      "General": [
        "brand",
        "dial_shape"
      ],
      "Display": [
        "display_size"
      ]
    },
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("4cd2f04c86fb7aa81fa105b3"),
    "name": "TVs & Home Appliances",
    "parentId": null,
    "isProductLevel": true,
    "logo": "https://rukminim2.flixcart.com/image/612/612/xif0q/television/j/2/j/-original-imaghgphz7h8v9hy.jpeg",
    "filterAttributes": [
      "brand",
      "screen_size",
      "resolution",
      "smart_tv"
    ],
    "defaultExpand": [
      "brand",
      "screen_size"
    ],
    "renderProductAttr": [
      "screen_size",
      "resolution",
      "smart_tv"
    ],
    "productDescriptionSection": {
      "General": [
        "brand",
        "resolution"
      ],
      "Display": [
        "screen_size"
      ]
    },
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("7b8c1f6fdc02ec2a273c400a"),
    "name": "Fashion & Footwear",
    "parentId": null,
    "isProductLevel": true,
    "logo": "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/7/2/m/6-revolution-6-nike-black-white-iron-grey-original-imagg9k8a2fghgzu.jpeg",
    "filterAttributes": [
      "brand",
      "size",
      "color",
      "ideal_for"
    ],
    "defaultExpand": [
      "brand",
      "size"
    ],
    "renderProductAttr": [
      "size",
      "color",
      "ideal_for"
    ],
    "productDescriptionSection": {
      "General": [
        "brand",
        "color"
      ],
      "Size": [
        "size"
      ]
    },
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  }
]);

// Seed Brands
dbInstance.brands.insertMany([
  {
    "_id": ObjectId("a5fa0cf731f49381c5357196"),
    "name": "Apple",
    "logo": "https://rukminim2.flixcart.com/image/100/100/xif0q/brand/apple.png",
    "forCategory": [
      ObjectId("eb184b74f6d84f8b9fb3067b"),
      ObjectId("2573a246286edfc584874dcc"),
      ObjectId("df046199293c6db0957a75b7"),
      ObjectId("38f1d5470d4fd78df0a1e886")
    ],
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("8e240627f84eaf87c547c1a0"),
    "name": "Samsung",
    "logo": "https://rukminim2.flixcart.com/image/100/100/xif0q/brand/samsung.png",
    "forCategory": [
      ObjectId("eb184b74f6d84f8b9fb3067b"),
      ObjectId("38f1d5470d4fd78df0a1e886"),
      ObjectId("4cd2f04c86fb7aa81fa105b3")
    ],
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("e9b802151d7e24ef151e24b4"),
    "name": "OnePlus",
    "logo": "https://rukminim2.flixcart.com/image/100/100/xif0q/brand/oneplus.png",
    "forCategory": [
      ObjectId("eb184b74f6d84f8b9fb3067b"),
      ObjectId("df046199293c6db0957a75b7")
    ],
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("b538f52bdbce10966e4e63f5"),
    "name": "Google",
    "logo": "https://rukminim2.flixcart.com/image/100/100/xif0q/brand/google.png",
    "forCategory": [
      ObjectId("eb184b74f6d84f8b9fb3067b")
    ],
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("3315f15f49dc05fdba858ca6"),
    "name": "Sony",
    "logo": "https://rukminim2.flixcart.com/image/100/100/xif0q/brand/sony.png",
    "forCategory": [
      ObjectId("df046199293c6db0957a75b7"),
      ObjectId("4cd2f04c86fb7aa81fa105b3")
    ],
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("27704516f043d21f2f14244a"),
    "name": "boAt",
    "logo": "https://rukminim2.flixcart.com/image/100/100/xif0q/brand/boat.png",
    "forCategory": [
      ObjectId("df046199293c6db0957a75b7"),
      ObjectId("38f1d5470d4fd78df0a1e886")
    ],
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("789a89598fadbb10d2351141"),
    "name": "JBL",
    "logo": "https://rukminim2.flixcart.com/image/100/100/xif0q/brand/jbl.png",
    "forCategory": [
      ObjectId("df046199293c6db0957a75b7")
    ],
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("7a2f1770fdca3e35abbce19d"),
    "name": "ASUS",
    "logo": "https://rukminim2.flixcart.com/image/100/100/xif0q/brand/asus.png",
    "forCategory": [
      ObjectId("2573a246286edfc584874dcc")
    ],
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("484455e9c1ae8931874d897f"),
    "name": "HP",
    "logo": "https://rukminim2.flixcart.com/image/100/100/xif0q/brand/hp.png",
    "forCategory": [
      ObjectId("2573a246286edfc584874dcc")
    ],
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("698ed352c4f2e93eb2acb785"),
    "name": "Lenovo",
    "logo": "https://rukminim2.flixcart.com/image/100/100/xif0q/brand/lenovo.png",
    "forCategory": [
      ObjectId("2573a246286edfc584874dcc")
    ],
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("d180304d855c761e4294755b"),
    "name": "LG",
    "logo": "https://rukminim2.flixcart.com/image/100/100/xif0q/brand/lg.png",
    "forCategory": [
      ObjectId("4cd2f04c86fb7aa81fa105b3")
    ],
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("eb5ea735ec844a75ca8aebea"),
    "name": "Philips",
    "logo": "https://rukminim2.flixcart.com/image/100/100/xif0q/brand/philips.png",
    "forCategory": [
      ObjectId("4cd2f04c86fb7aa81fa105b3")
    ],
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("39937c17b07cb51354e4b38f"),
    "name": "Dyson",
    "logo": "https://rukminim2.flixcart.com/image/100/100/xif0q/brand/dyson.png",
    "forCategory": [
      ObjectId("4cd2f04c86fb7aa81fa105b3")
    ],
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("9054efc34d624d2ebc04b261"),
    "name": "Noise",
    "logo": "https://rukminim2.flixcart.com/image/100/100/xif0q/brand/noise.png",
    "forCategory": [
      ObjectId("38f1d5470d4fd78df0a1e886")
    ],
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("1bba2b50753f32ce6c517473"),
    "name": "Fastrack",
    "logo": "https://rukminim2.flixcart.com/image/100/100/xif0q/brand/fastrack.png",
    "forCategory": [
      ObjectId("38f1d5470d4fd78df0a1e886")
    ],
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("3fdfae7d58e98c2672604d53"),
    "name": "Nike",
    "logo": "https://rukminim2.flixcart.com/image/100/100/xif0q/brand/nike.png",
    "forCategory": [
      ObjectId("7b8c1f6fdc02ec2a273c400a")
    ],
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("f8017e11178db1ca8f73526b"),
    "name": "Puma",
    "logo": "https://rukminim2.flixcart.com/image/100/100/xif0q/brand/puma.png",
    "forCategory": [
      ObjectId("7b8c1f6fdc02ec2a273c400a")
    ],
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("19a442adfe843a0d9d561774"),
    "name": "Adidas",
    "logo": "https://rukminim2.flixcart.com/image/100/100/xif0q/brand/adidas.png",
    "forCategory": [
      ObjectId("7b8c1f6fdc02ec2a273c400a")
    ],
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  }
]);

// Seed Products from Flipkart
dbInstance.products.insertMany([
  {
    "_id": ObjectId("39e19fbc0c1ba393a085d314"),
    "title": "Apple iPhone 15 (Black, 128 GB)",
    "slug": "apple-iphone-15-black-128-gb",
    "price": 69999,
    "discount": 12,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/h/d/9/-original-imagtc2qzgnnuhxh.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/h/d/9/-original-imagtc2qzgnnuhxh.jpeg",
      "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/y/p/f/-original-imagtc2q5hhghg9x.jpeg",
      "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/8/e/z/-original-imagtc2quhszjff7.jpeg"
    ],
    "attributes": {
      "brand": "Apple",
      "color": "Black",
      "storage": "128 GB",
      "ram": "6 GB"
    },
    "qty": 20,
    "sold": 50,
    "views": 500,
    "brandId": ObjectId("a5fa0cf731f49381c5357196"),
    "categoryId": ObjectId("eb184b74f6d84f8b9fb3067b"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100000,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("db307350419cf88dd9652498"),
    "title": "Apple iPhone 15 (Blue, 256 GB)",
    "slug": "apple-iphone-15-blue-256-gb",
    "price": 79999,
    "discount": 11,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/k/l/l/-original-imagtc5fz9spysyk.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/k/l/l/-original-imagtc5fz9spysyk.jpeg",
      "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/6/x/j/-original-imagtc5fqghvgt2u.jpeg"
    ],
    "attributes": {
      "brand": "Apple",
      "color": "Blue",
      "storage": "256 GB",
      "ram": "6 GB"
    },
    "qty": 27,
    "sold": 67,
    "views": 623,
    "brandId": ObjectId("a5fa0cf731f49381c5357196"),
    "categoryId": ObjectId("eb184b74f6d84f8b9fb3067b"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100001,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("2d197f288b3eaf3882eea9ac"),
    "title": "Samsung Galaxy S24 5G (Onyx Black, 256 GB)",
    "slug": "samsung-galaxy-s24-5g-onyx-black-256-gb",
    "price": 74999,
    "discount": 16,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/4/x/0/-original-imagx9eg4eagstda.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/4/x/0/-original-imagx9eg4eagstda.jpeg"
    ],
    "attributes": {
      "brand": "Samsung",
      "color": "Onyx Black",
      "storage": "256 GB",
      "ram": "8 GB"
    },
    "qty": 34,
    "sold": 84,
    "views": 746,
    "brandId": ObjectId("8e240627f84eaf87c547c1a0"),
    "categoryId": ObjectId("eb184b74f6d84f8b9fb3067b"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100002,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("4d2fc7d82bf271b0569977dc"),
    "title": "Samsung Galaxy S24 Ultra 5G (Titanium Gray, 512 GB)",
    "slug": "samsung-galaxy-s24-ultra-5g-titanium-gray-512-gb",
    "price": 139999,
    "discount": 10,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/5/i/7/-original-imagx9egmdupgjzn.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/5/i/7/-original-imagx9egmdupgjzn.jpeg"
    ],
    "attributes": {
      "brand": "Samsung",
      "color": "Titanium Gray",
      "storage": "512 GB",
      "ram": "12 GB"
    },
    "qty": 41,
    "sold": 101,
    "views": 869,
    "brandId": ObjectId("8e240627f84eaf87c547c1a0"),
    "categoryId": ObjectId("eb184b74f6d84f8b9fb3067b"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100003,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("2d25a2be239230b1b6076236"),
    "title": "Samsung Galaxy S23 FE 5G (Mint, 128 GB)",
    "slug": "samsung-galaxy-s23-fe-5g-mint-128-gb",
    "price": 38999,
    "discount": 35,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/m/h/9/-original-imagtyv9v45kkhz8.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/m/h/9/-original-imagtyv9v45kkhz8.jpeg"
    ],
    "attributes": {
      "brand": "Samsung",
      "color": "Mint",
      "storage": "128 GB",
      "ram": "8 GB"
    },
    "qty": 48,
    "sold": 118,
    "views": 992,
    "brandId": ObjectId("8e240627f84eaf87c547c1a0"),
    "categoryId": ObjectId("eb184b74f6d84f8b9fb3067b"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100004,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("35cb39c158d8c678b7eac2eb"),
    "title": "OnePlus 12 (Silky Black, 256 GB)",
    "slug": "oneplus-12-silky-black-256-gb",
    "price": 64999,
    "discount": 8,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/f/k/4/-original-imahf398yhegzphw.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/f/k/4/-original-imahf398yhegzphw.jpeg"
    ],
    "attributes": {
      "brand": "OnePlus",
      "color": "Silky Black",
      "storage": "256 GB",
      "ram": "12 GB"
    },
    "qty": 55,
    "sold": 135,
    "views": 1115,
    "brandId": ObjectId("e9b802151d7e24ef151e24b4"),
    "categoryId": ObjectId("eb184b74f6d84f8b9fb3067b"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100005,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("bef1873a3b91c6be9871a514"),
    "title": "OnePlus Nord CE4 (Celadon Marble, 128 GB)",
    "slug": "oneplus-nord-ce4-celadon-marble-128-gb",
    "price": 24999,
    "discount": 15,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/p/t/y/-original-imahs3pdarcqgyzf.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/p/t/y/-original-imahs3pdarcqgyzf.jpeg"
    ],
    "attributes": {
      "brand": "OnePlus",
      "color": "Celadon Marble",
      "storage": "128 GB",
      "ram": "8 GB"
    },
    "qty": 62,
    "sold": 152,
    "views": 1238,
    "brandId": ObjectId("e9b802151d7e24ef151e24b4"),
    "categoryId": ObjectId("eb184b74f6d84f8b9fb3067b"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100006,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("0b73146d05537edf8f603434"),
    "title": "Google Pixel 8 Pro (Bay, 128 GB)",
    "slug": "google-pixel-8-pro-bay-128-gb",
    "price": 86999,
    "discount": 18,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/3/q/s/-original-imagugptwzqfgrxz.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/3/q/s/-original-imagugptwzqfgrxz.jpeg"
    ],
    "attributes": {
      "brand": "Google",
      "color": "Bay",
      "storage": "128 GB",
      "ram": "12 GB"
    },
    "qty": 69,
    "sold": 169,
    "views": 1361,
    "brandId": ObjectId("b538f52bdbce10966e4e63f5"),
    "categoryId": ObjectId("eb184b74f6d84f8b9fb3067b"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100007,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("a285a5a7fcbb88fbed07af0a"),
    "title": "Apple MacBook Air M2 (Midnight, 8 GB / 256 GB SSD)",
    "slug": "apple-macbook-air-m2-midnight-8gb-256gb",
    "price": 89990,
    "discount": 18,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/m/b/n/-original-imagfdf4xnbyyxpa.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/m/b/n/-original-imagfdf4xnbyyxpa.jpeg",
      "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/4/q/u/-original-imagfdf4tzbhtv6x.jpeg"
    ],
    "attributes": {
      "brand": "Apple",
      "processor": "Apple M2",
      "ram": "8 GB",
      "ssd_capacity": "256 GB"
    },
    "qty": 76,
    "sold": 186,
    "views": 1484,
    "brandId": ObjectId("a5fa0cf731f49381c5357196"),
    "categoryId": ObjectId("2573a246286edfc584874dcc"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100008,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("d5f462a0c4368ba56e29bcdf"),
    "title": "Apple MacBook Air M3 (Starlight, 16 GB / 512 GB SSD)",
    "slug": "apple-macbook-air-m3-starlight-16gb-512gb",
    "price": 134990,
    "discount": 10,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/2/v/v/-original-imagfdf43hgwgzyq.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/2/v/v/-original-imagfdf43hgwgzyq.jpeg"
    ],
    "attributes": {
      "brand": "Apple",
      "processor": "Apple M3",
      "ram": "16 GB",
      "ssd_capacity": "512 GB"
    },
    "qty": 83,
    "sold": 203,
    "views": 1607,
    "brandId": ObjectId("a5fa0cf731f49381c5357196"),
    "categoryId": ObjectId("2573a246286edfc584874dcc"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100009,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("854572bea6221116a51a4275"),
    "title": "ASUS TUF Gaming F15 Core i7 12th Gen (16 GB / 512 GB SSD / RTX 4050)",
    "slug": "asus-tuf-gaming-f15-core-i7-12th-gen-rtx-4050",
    "price": 77990,
    "discount": 25,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/v/y/z/-original-imagt557eghgqygy.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/v/y/z/-original-imagt557eghgqygy.jpeg"
    ],
    "attributes": {
      "brand": "ASUS",
      "processor": "Core i7",
      "ram": "16 GB",
      "ssd_capacity": "512 GB",
      "graphic": "RTX 4050"
    },
    "qty": 90,
    "sold": 220,
    "views": 1730,
    "brandId": ObjectId("7a2f1770fdca3e35abbce19d"),
    "categoryId": ObjectId("2573a246286edfc584874dcc"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100010,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("33e00544bd3fb3566b915aef"),
    "title": "HP Victus Gaming AMD Ryzen 7 (16 GB / 512 GB SSD / RTX 3050)",
    "slug": "hp-victus-gaming-ryzen-7-rtx-3050",
    "price": 68990,
    "discount": 22,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/r/6/e/-original-imagwhr8f7hz3w4x.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/r/6/e/-original-imagwhr8f7hz3w4x.jpeg"
    ],
    "attributes": {
      "brand": "HP",
      "processor": "Ryzen 7",
      "ram": "16 GB",
      "ssd_capacity": "512 GB",
      "graphic": "RTX 3050"
    },
    "qty": 97,
    "sold": 237,
    "views": 1853,
    "brandId": ObjectId("484455e9c1ae8931874d897f"),
    "categoryId": ObjectId("2573a246286edfc584874dcc"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100011,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("951ed6392fe1b11716b14930"),
    "title": "Lenovo IdeaPad Gaming 3 Intel Core i5 11th Gen (16 GB / 512 GB SSD / RTX 3050)",
    "slug": "lenovo-ideapad-gaming-3-core-i5-11th-gen-rtx-3050",
    "price": 54990,
    "discount": 30,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/0/a/x/-original-imagykgqzhf9hgff.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/0/a/x/-original-imagykgqzhf9hgff.jpeg"
    ],
    "attributes": {
      "brand": "Lenovo",
      "processor": "Core i5",
      "ram": "16 GB",
      "ssd_capacity": "512 GB",
      "graphic": "RTX 3050"
    },
    "qty": 24,
    "sold": 254,
    "views": 1976,
    "brandId": ObjectId("698ed352c4f2e93eb2acb785"),
    "categoryId": ObjectId("2573a246286edfc584874dcc"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100012,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("9e36dc36b4fa5bfde67e4f9f"),
    "title": "Sony WH-1000XM5 Wireless Active Noise Cancelling Headphones",
    "slug": "sony-wh-1000xm5-wireless-anc-headphones",
    "price": 26990,
    "discount": 23,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/headphone/d/r/r/-original-imaghyfvdf8f2yg2.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/headphone/d/r/r/-original-imaghyfvdf8f2yg2.jpeg"
    ],
    "attributes": {
      "brand": "Sony",
      "connectivity": "Bluetooth",
      "color": "Black",
      "battery_life": "30 Hours"
    },
    "qty": 31,
    "sold": 271,
    "views": 2099,
    "brandId": ObjectId("3315f15f49dc05fdba858ca6"),
    "categoryId": ObjectId("df046199293c6db0957a75b7"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100013,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("4ef04033b16866b85bc06fe8"),
    "title": "Sony WH-CH520 Wireless with 50 Hours Battery Bluetooth Headphone",
    "slug": "sony-wh-ch520-wireless-50h-battery",
    "price": 2990,
    "discount": 50,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/headphone/e/0/c/wh-ch510-sony-enriched-transparent-original-imagz5rcxcudrdnz.png",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/headphone/e/0/c/wh-ch510-sony-enriched-transparent-original-imagz5rcxcudrdnz.png"
    ],
    "attributes": {
      "brand": "Sony",
      "connectivity": "Bluetooth",
      "color": "Black",
      "battery_life": "50 Hours"
    },
    "qty": 38,
    "sold": 288,
    "views": 2222,
    "brandId": ObjectId("3315f15f49dc05fdba858ca6"),
    "categoryId": ObjectId("df046199293c6db0957a75b7"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100014,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("ae506e176e9f632cf2412380"),
    "title": "Apple AirPods Pro (2nd Generation) with MagSafe Case (USB-C)",
    "slug": "apple-airpods-pro-2nd-generation-usb-c",
    "price": 20999,
    "discount": 16,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/headphone/e/a/f/-original-imagtc44nk4b3h4q.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/headphone/e/a/f/-original-imagtc44nk4b3h4q.jpeg"
    ],
    "attributes": {
      "brand": "Apple",
      "connectivity": "True Wireless",
      "color": "White",
      "battery_life": "30 Hours"
    },
    "qty": 45,
    "sold": 305,
    "views": 2345,
    "brandId": ObjectId("a5fa0cf731f49381c5357196"),
    "categoryId": ObjectId("df046199293c6db0957a75b7"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100015,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("c3df065b04b3f71de207e238"),
    "title": "boAt Airdopes 141 True Wireless Earbuds with 42H Playtime",
    "slug": "boat-airdopes-141-tws-earbuds",
    "price": 1099,
    "discount": 75,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/headphone/p/r/z/airdopes-141-boat-original-imagj54fsfgqvhsz.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/headphone/p/r/z/airdopes-141-boat-original-imagj54fsfgqvhsz.jpeg"
    ],
    "attributes": {
      "brand": "boAt",
      "connectivity": "True Wireless",
      "color": "Bold Black",
      "battery_life": "42 Hours"
    },
    "qty": 52,
    "sold": 322,
    "views": 2468,
    "brandId": ObjectId("27704516f043d21f2f14244a"),
    "categoryId": ObjectId("df046199293c6db0957a75b7"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100016,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("65b909b80c834c9cc594811a"),
    "title": "boAt Rockerz 450 Bluetooth On-Ear Headphone with 15H Playback",
    "slug": "boat-rockerz-450-bluetooth-headphone",
    "price": 1299,
    "discount": 67,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/k5lcvbk0/headphone/d/z/v/boat-rockerz-450-original-imafz8wbzghg5hzx.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/k5lcvbk0/headphone/d/z/v/boat-rockerz-450-original-imafz8wbzghg5hzx.jpeg"
    ],
    "attributes": {
      "brand": "boAt",
      "connectivity": "Bluetooth",
      "color": "Luscious Black",
      "battery_life": "15 Hours"
    },
    "qty": 59,
    "sold": 339,
    "views": 2591,
    "brandId": ObjectId("27704516f043d21f2f14244a"),
    "categoryId": ObjectId("df046199293c6db0957a75b7"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100017,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("c5dd03d92da13ab36943cd75"),
    "title": "JBL Flip 6 Portable Waterproof Bluetooth Speaker",
    "slug": "jbl-flip-6-portable-waterproof-speaker",
    "price": 9999,
    "discount": 28,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/l05lx8w0/speaker/mobile-tablet-speaker/r/o/r/flip-6-jbl-original-imagcy835kfqghhf.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/l05lx8w0/speaker/mobile-tablet-speaker/r/o/r/flip-6-jbl-original-imagcy835kfqghhf.jpeg"
    ],
    "attributes": {
      "brand": "JBL",
      "connectivity": "Bluetooth",
      "color": "Ocean Blue",
      "battery_life": "12 Hours"
    },
    "qty": 66,
    "sold": 356,
    "views": 2714,
    "brandId": ObjectId("789a89598fadbb10d2351141"),
    "categoryId": ObjectId("df046199293c6db0957a75b7"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100018,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("221fe41434e86b9855693f83"),
    "title": "Apple Watch Series 9 GPS 45mm Midnight Aluminium Case",
    "slug": "apple-watch-series-9-gps-45mm-midnight",
    "price": 41999,
    "discount": 12,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/y/b/w/-original-imagtvd6jkhyqfvh.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/y/b/w/-original-imagtvd6jkhyqfvh.jpeg"
    ],
    "attributes": {
      "brand": "Apple",
      "dial_shape": "Square",
      "strap_color": "Midnight",
      "display_size": "45mm"
    },
    "qty": 73,
    "sold": 373,
    "views": 2837,
    "brandId": ObjectId("a5fa0cf731f49381c5357196"),
    "categoryId": ObjectId("38f1d5470d4fd78df0a1e886"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100019,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("060704d26f92f59b3d98be67"),
    "title": "Samsung Galaxy Watch 6 Bluetooth 44mm (Graphite)",
    "slug": "samsung-galaxy-watch-6-bluetooth-44mm-graphite",
    "price": 21999,
    "discount": 35,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/k/v/h/-original-imagrh7ggfhdf93q.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/k/v/h/-original-imagrh7ggfhdf93q.jpeg"
    ],
    "attributes": {
      "brand": "Samsung",
      "dial_shape": "Round",
      "strap_color": "Graphite",
      "display_size": "44mm"
    },
    "qty": 80,
    "sold": 390,
    "views": 2960,
    "brandId": ObjectId("8e240627f84eaf87c547c1a0"),
    "categoryId": ObjectId("38f1d5470d4fd78df0a1e886"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100020,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("3f8f954937a5651e9f855ef5"),
    "title": "Noise ColorFit Pulse 2 Max 1.85\" Display Smartwatch",
    "slug": "noise-colorfit-pulse-2-max-smartwatch",
    "price": 1499,
    "discount": 70,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/u/9/s/-original-imaghd7mhzqhg8df.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/u/9/s/-original-imaghd7mhzqhg8df.jpeg"
    ],
    "attributes": {
      "brand": "Noise",
      "dial_shape": "Square",
      "strap_color": "Jet Black",
      "display_size": "1.85 inch"
    },
    "qty": 87,
    "sold": 407,
    "views": 3083,
    "brandId": ObjectId("9054efc34d624d2ebc04b261"),
    "categoryId": ObjectId("38f1d5470d4fd78df0a1e886"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100021,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("5202cc32a2110ac944a495c0"),
    "title": "Fastrack Limitless FS1 Pro 1.96\" Super AMOLED Display",
    "slug": "fastrack-limitless-fs1-pro-smartwatch",
    "price": 2499,
    "discount": 68,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/j/w/t/-original-imagny5hhzhg98sz.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/j/w/t/-original-imagny5hhzhg98sz.jpeg"
    ],
    "attributes": {
      "brand": "Fastrack",
      "dial_shape": "Curved Rectangle",
      "strap_color": "Black",
      "display_size": "1.96 inch"
    },
    "qty": 94,
    "sold": 424,
    "views": 3206,
    "brandId": ObjectId("1bba2b50753f32ce6c517473"),
    "categoryId": ObjectId("38f1d5470d4fd78df0a1e886"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100022,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("b2490c0b80c9294583e9e7bf"),
    "title": "LG 55 inch Ultra HD (4K) OLED Smart WebOS TV",
    "slug": "lg-55-inch-4k-oled-smart-tv",
    "price": 114990,
    "discount": 45,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/television/j/2/j/-original-imaghgphz7h8v9hy.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/television/j/2/j/-original-imaghgphz7h8v9hy.jpeg"
    ],
    "attributes": {
      "brand": "LG",
      "screen_size": "55 inch",
      "resolution": "4K Ultra HD",
      "smart_tv": "Yes"
    },
    "qty": 21,
    "sold": 441,
    "views": 3329,
    "brandId": ObjectId("d180304d855c761e4294755b"),
    "categoryId": ObjectId("4cd2f04c86fb7aa81fa105b3"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100023,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("6814215cf47a49a8957b6c4e"),
    "title": "Samsung Crystal 4K Vivid Pro 55 inch Ultra HD Smart TV",
    "slug": "samsung-crystal-4k-vivid-pro-55-inch-smart-tv",
    "price": 42990,
    "discount": 38,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/television/k/s/u/-original-imahf22b7fhgb9hz.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/television/k/s/u/-original-imahf22b7fhgb9hz.jpeg"
    ],
    "attributes": {
      "brand": "Samsung",
      "screen_size": "55 inch",
      "resolution": "4K Ultra HD",
      "smart_tv": "Yes"
    },
    "qty": 28,
    "sold": 458,
    "views": 3452,
    "brandId": ObjectId("8e240627f84eaf87c547c1a0"),
    "categoryId": ObjectId("4cd2f04c86fb7aa81fa105b3"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100024,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("6db2f9247b1811129ea4cbdb"),
    "title": "Philips HD9252/90 Digital Air Fryer (4.1 Litre)",
    "slug": "philips-hd9252-digital-air-fryer",
    "price": 7499,
    "discount": 40,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/air-fryer/t/7/x/hd9252-90-philips-original-imaghh8zsf8r7ghb.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/air-fryer/t/7/x/hd9252-90-philips-original-imaghh8zsf8r7ghb.jpeg"
    ],
    "attributes": {
      "brand": "Philips",
      "screen_size": "N/A",
      "resolution": "N/A",
      "smart_tv": "No"
    },
    "qty": 35,
    "sold": 475,
    "views": 3575,
    "brandId": ObjectId("eb5ea735ec844a75ca8aebea"),
    "categoryId": ObjectId("4cd2f04c86fb7aa81fa105b3"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100025,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("a39dbe50bb3c4e01b7247a41"),
    "title": "Dyson V12 Detect Slim Total Clean Cordless Vacuum",
    "slug": "dyson-v12-detect-slim-cordless-vacuum",
    "price": 44900,
    "discount": 20,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/vacuum-cleaner/l/z/t/v12-detect-slim-total-clean-dyson-original-imagg2dfyh89zgfq.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/vacuum-cleaner/l/z/t/v12-detect-slim-total-clean-dyson-original-imagg2dfyh89zgfq.jpeg"
    ],
    "attributes": {
      "brand": "Dyson",
      "power": "150 AW",
      "battery_life": "60 mins"
    },
    "qty": 42,
    "sold": 492,
    "views": 3698,
    "brandId": ObjectId("39937c17b07cb51354e4b38f"),
    "categoryId": ObjectId("4cd2f04c86fb7aa81fa105b3"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100026,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("e21cf7c957600ea3f7f60a6f"),
    "title": "Nike Revolution 6 Next Nature Running Shoes For Men",
    "slug": "nike-revolution-6-running-shoes-men",
    "price": 2795,
    "discount": 25,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/7/2/m/6-revolution-6-nike-black-white-iron-grey-original-imagg9k8a2fghgzu.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/7/2/m/6-revolution-6-nike-black-white-iron-grey-original-imagg9k8a2fghgzu.jpeg"
    ],
    "attributes": {
      "brand": "Nike",
      "size": "UK 8",
      "color": "Black/White",
      "ideal_for": "Men"
    },
    "qty": 49,
    "sold": 59,
    "views": 3821,
    "brandId": ObjectId("3fdfae7d58e98c2672604d53"),
    "categoryId": ObjectId("7b8c1f6fdc02ec2a273c400a"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100027,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("bed8253a617a67d12b914c65"),
    "title": "Puma Flyer Runner Mesh Running Shoes For Men",
    "slug": "puma-flyer-runner-mesh-running-shoes",
    "price": 1799,
    "discount": 55,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/s/b/g/9-192257-puma-peacoat-white-original-imagggq6mzhfgh9y.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/s/b/g/9-192257-puma-peacoat-white-original-imagggq6mzhfgh9y.jpeg"
    ],
    "attributes": {
      "brand": "Puma",
      "size": "UK 9",
      "color": "Peacoat/White",
      "ideal_for": "Men"
    },
    "qty": 56,
    "sold": 76,
    "views": 3944,
    "brandId": ObjectId("f8017e11178db1ca8f73526b"),
    "categoryId": ObjectId("7b8c1f6fdc02ec2a273c400a"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100028,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  },
  {
    "_id": ObjectId("99d2338296d24d3397e1709b"),
    "title": "Adidas Coreracer Men's Running Shoes (Core Black)",
    "slug": "adidas-coreracer-mens-running-shoes",
    "price": 2499,
    "discount": 45,
    "coverPhoto": "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/y/7/f/8-fx3581-adidas-cblack-ftwwht-cblack-original-imafvf77zhb5kghz.jpeg",
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/y/7/f/8-fx3581-adidas-cblack-ftwwht-cblack-original-imafvf77zhb5kghz.jpeg"
    ],
    "attributes": {
      "brand": "Adidas",
      "size": "UK 8",
      "color": "Core Black",
      "ideal_for": "Men"
    },
    "qty": 63,
    "sold": 93,
    "views": 4067,
    "brandId": ObjectId("19a442adfe843a0d9d561774"),
    "categoryId": ObjectId("7b8c1f6fdc02ec2a273c400a"),
    "sellerId": ObjectId("a55c29b83178c5e3b8c2cc20"),
    "sku": 100029,
    "isMall": true,
    "productType": "Physical",
    "approveStatus": "accepted",
    "isActive": true,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z")
  }
]);

// Seed Product Descriptions
dbInstance.product_descriptions.insertMany([
  {
    "_id": ObjectId("7dc955fda5ea3f402c794e14"),
    "productId": ObjectId("39e19fbc0c1ba393a085d314"),
    "summary": "Experience the iPhone 15 with Dynamic Island, 48MP Main camera, and USB-C in a durable color-infused glass and aluminum design.",
    "highlight": [
      "128 GB ROM",
      "15.49 cm (6.1 inch) Super Retina XDR Display",
      "48MP + 12MP | 12MP Front Camera",
      "A16 Bionic Chip, 6 Core Processor",
      "Dynamic Island & USB-C Connectivity"
    ],
    "specification": {
      "General": {
        "Model Name": "iPhone 15",
        "Color": "Black",
        "SIM Type": "Dual Sim (Nano + eSIM)"
      },
      "Display": {
        "Display Size": "6.1 inch",
        "Resolution": "2556 x 1179 Pixels"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/h/d/9/-original-imagtc2qzgnnuhxh.jpeg",
      "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/y/p/f/-original-imagtc2q5hhghg9x.jpeg",
      "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/8/e/z/-original-imagtc2quhszjff7.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("978834c904de0f281593ff18"),
    "productId": ObjectId("db307350419cf88dd9652498"),
    "summary": "iPhone 15 brings you Dynamic Island, a 48 MP Main camera, and USB-C all in a durable color-infused glass and aluminum design.",
    "highlight": [
      "256 GB ROM",
      "15.49 cm (6.1 inch) Super Retina XDR Display",
      "48MP + 12MP | 12MP Front Camera",
      "A16 Bionic Chip with 5-core GPU"
    ],
    "specification": {
      "General": {
        "Model Name": "iPhone 15",
        "Color": "Blue"
      },
      "Display": {
        "Display Size": "6.1 inch"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/k/l/l/-original-imagtc5fz9spysyk.jpeg",
      "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/6/x/j/-original-imagtc5fqghvgt2u.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("406c07be00e70277459be4be"),
    "productId": ObjectId("2d197f288b3eaf3882eea9ac"),
    "summary": "Meet the Galaxy S24 with cutting-edge Galaxy AI, brilliant Dynamic AMOLED 2X display, and pro-grade triple camera system.",
    "highlight": [
      "8 GB RAM | 256 GB ROM",
      "15.75 cm (6.2 inch) Full HD+ Dynamic AMOLED 2X Display",
      "50MP + 12MP + 10MP | 12MP Front Camera",
      "4000 mAh Battery with Fast Wireless Charging",
      "Galaxy AI with Circle to Search & Live Translate"
    ],
    "specification": {
      "General": {
        "Model Name": "Galaxy S24",
        "Color": "Onyx Black"
      },
      "Processor": {
        "Chipset": "Exynos 2400 Deca-Core"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/4/x/0/-original-imagx9eg4eagstda.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("4b992ee6d6e9bb7f7dba8301"),
    "productId": ObjectId("4d2fc7d82bf271b0569977dc"),
    "summary": "Galaxy S24 Ultra features a titanium frame, flat 6.8 inch display, 200MP camera with 5x optical zoom, and integrated S Pen.",
    "highlight": [
      "12 GB RAM | 512 GB ROM",
      "17.27 cm (6.8 inch) Quad HD+ Dynamic AMOLED 2X Display",
      "200MP + 50MP + 12MP + 10MP Quad Camera | 12MP Front",
      "5000 mAh Battery | S-Pen Included",
      "Snapdragon 8 Gen 3 for Galaxy"
    ],
    "specification": {
      "General": {
        "Model Name": "Galaxy S24 Ultra"
      },
      "Display": {
        "Resolution": "3120 x 1440 Pixels"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/5/i/7/-original-imagx9egmdupgjzn.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("41c14e3ce25640f24aa16300"),
    "productId": ObjectId("2d25a2be239230b1b6076236"),
    "summary": "Galaxy S23 FE opens the door for more people to experience the extraordinary with pro-grade cameras and epic gaming power.",
    "highlight": [
      "8 GB RAM | 128 GB ROM",
      "16.26 cm (6.4 inch) Full HD+ Dynamic AMOLED 2X Display",
      "50MP + 12MP + 8MP | 10MP Front Camera",
      "4500 mAh Battery"
    ],
    "specification": {
      "General": {
        "Model Name": "Galaxy S23 FE"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/m/h/9/-original-imagtyv9v45kkhz8.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("f7b216df3dfa51ffcb01fbe7"),
    "productId": ObjectId("35cb39c158d8c678b7eac2eb"),
    "summary": "OnePlus 12 redefines smooth performance with Snapdragon 8 Gen 3, 2K 120Hz display, and 4th Gen Hasselblad camera system.",
    "highlight": [
      "12 GB RAM | 256 GB ROM",
      "17.32 cm (6.82 inch) 2K 120Hz ProXDR Display",
      "50MP Sony LYT-808 with Hasselblad Camera for Mobile",
      "5400 mAh Battery with 100W SUPERVOOC"
    ],
    "specification": {
      "General": {
        "Model Name": "OnePlus 12"
      },
      "Battery": {
        "Capacity": "5400 mAh"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/f/k/4/-original-imahf398yhegzphw.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("3a14ba1fbf7288bb41cb7175"),
    "productId": ObjectId("bef1873a3b91c6be9871a514"),
    "summary": "Nord CE4 features Qualcomm Snapdragon 7 Gen 3, ultra-fast 100W charging, and expansive 5500 mAh battery.",
    "highlight": [
      "8 GB RAM | 128 GB ROM",
      "17.02 cm (6.7 inch) Full HD+ AMOLED 120Hz Display",
      "50MP Sony LYT-600 OIS Camera",
      "5500 mAh Battery with 100W SuperVOOC Fast Charging"
    ],
    "specification": {
      "General": {
        "Model Name": "Nord CE4"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/p/t/y/-original-imahs3pdarcqgyzf.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("2fbde3e3a594dbbbbf4a4365"),
    "productId": ObjectId("0b73146d05537edf8f603434"),
    "summary": "Google Pixel 8 Pro has upgraded cameras, Google Tensor G3, and Google AI features for photography and everyday tasks.",
    "highlight": [
      "12 GB RAM | 128 GB ROM",
      "17.02 cm (6.7 inch) Super Actua Display",
      "50MP + 48MP + 48MP | 10.5MP Front Camera",
      "Google Tensor G3 Processor with Best Take & Magic Editor"
    ],
    "specification": {
      "General": {
        "Model Name": "Pixel 8 Pro"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/3/q/s/-original-imagugptwzqfgrxz.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("22ce41ef9b10c98af2e5fa33"),
    "productId": ObjectId("a285a5a7fcbb88fbed07af0a"),
    "summary": "Redesigned around the next-generation M2 chip, MacBook Air is strikingly thin and brings exceptional speed and power efficiency.",
    "highlight": [
      "Apple M2 Processor with 8-Core CPU and 8-Core GPU",
      "8 GB Unified Memory | 256 GB SSD",
      "34.54 cm (13.6 inch) Liquid Retina Display with True Tone",
      "Up to 18 Hours Battery Life | MagSafe 3 Charging",
      "Weight: 1.24 kg"
    ],
    "specification": {
      "Processor": {
        "Processor": "Apple M2"
      },
      "Storage": {
        "SSD Capacity": "256 GB"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/m/b/n/-original-imagfdf4xnbyyxpa.jpeg",
      "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/4/q/u/-original-imagfdf4tzbhtv6x.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("565c400f10a9ace60bd63e1d"),
    "productId": ObjectId("d5f462a0c4368ba56e29bcdf"),
    "summary": "The 15-inch MacBook Air with M3 chip delivers blazing-fast performance and portability in an impossibly thin aluminum enclosure.",
    "highlight": [
      "Apple M3 Chip with 8-core CPU and 10-core GPU",
      "16 GB Unified Memory | 512 GB SSD Storage",
      "38.91 cm (15.3 inch) Liquid Retina Display with 500 nits",
      "Support for up to Two External Displays"
    ],
    "specification": {
      "Processor": {
        "Processor": "Apple M3"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/2/v/v/-original-imagfdf43hgwgzyq.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("c45c17d8ab3536bf65838fb4"),
    "productId": ObjectId("854572bea6221116a51a4275"),
    "summary": "Armed for combat, ASUS TUF Gaming F15 is a high-performance gaming laptop with up to 140W max TGP RTX 4050 graphics.",
    "highlight": [
      "Intel Core i7 12th Gen 12700H Processor",
      "16 GB DDR4 RAM | 512 GB NVMe SSD",
      "6 GB NVIDIA GeForce RTX 4050 Graphics",
      "39.62 cm (15.6 inch) Full HD 144Hz IPS Display",
      "Military-Grade Durability (MIL-STD-810H)"
    ],
    "specification": {
      "Graphic": {
        "Graphics": "NVIDIA GeForce RTX 4050 6GB GDDR6"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/v/y/z/-original-imagt557eghgqygy.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("6a930b920e414a29847ea780"),
    "productId": ObjectId("33e00544bd3fb3566b915aef"),
    "summary": "HP Victus 15 gaming laptop provides crisp FHD gaming with AMD Ryzen 7 processing power and NVIDIA RTX graphics.",
    "highlight": [
      "AMD Ryzen 7 7840HS Octa-Core Processor",
      "16 GB DDR5 RAM | 512 GB PCIe Gen4 SSD",
      "4 GB NVIDIA GeForce RTX 3050 Graphics",
      "39.62 cm (15.6 inch) FHD 144Hz IPS Display"
    ],
    "specification": {
      "Processor": {
        "Processor": "AMD Ryzen 7 7840HS"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/r/6/e/-original-imagwhr8f7hz3w4x.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("52b0bfea71a25a5ab54fd343"),
    "productId": ObjectId("951ed6392fe1b11716b14930"),
    "summary": "Slingshot your gaming visuals with Lenovo IdeaPad Gaming 3 with 120Hz FHD IPS display and military-grade durability.",
    "highlight": [
      "Intel Core i5 11th Gen 11300H Processor",
      "16 GB DDR4 RAM | 512 GB SSD",
      "4 GB NVIDIA GeForce RTX 3050 Graphics",
      "39.62 cm (15.6 inch) Full HD IPS 120Hz Display"
    ],
    "specification": {
      "Graphic": {
        "Graphics": "NVIDIA GeForce RTX 3050 4GB"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/0/a/x/-original-imagykgqzhf9hgff.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("e300369b9b89181f55859154"),
    "productId": ObjectId("9e36dc36b4fa5bfde67e4f9f"),
    "summary": "Sony WH-1000XM5 rewrites the rules for distraction-free listening with two processors controlling eight microphones for unprecedented noise cancelling.",
    "highlight": [
      "Industry-leading Noise Cancellation with Auto NC Optimizer",
      "Up to 30 Hours Battery Life (3 min charge = 3 hrs)",
      "Crystal-clear Hands-free Calling with 4 Beamforming Mics",
      "Multipoint Connection: Pair with 2 devices simultaneously"
    ],
    "specification": {
      "Connectivity": {
        "Bluetooth Version": "5.2"
      },
      "Battery": {
        "Battery Life": "30 hrs with NC ON"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/headphone/d/r/r/-original-imaghyfvdf8f2yg2.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("74894aa53eba9964280ec150"),
    "productId": ObjectId("4ef04033b16866b85bc06fe8"),
    "summary": "Enjoy high sound quality all day long. The Sony WH-CH520 headphones provide up to 50 hours of battery life and stable connectivity.",
    "highlight": [
      "Up to 50 Hours Battery Life",
      "DSEE Sound Enhancement Technology",
      "Dual Pairing & Fast Pair Support",
      "Built-in Mic for Clear Hands-Free Calls"
    ],
    "specification": {
      "Battery": {
        "Playback Time": "50 Hours"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/headphone/e/0/c/wh-ch510-sony-enriched-transparent-original-imagz5rcxcudrdnz.png"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("7ab5024d088a4b61384b6d64"),
    "productId": ObjectId("ae506e176e9f632cf2412380"),
    "summary": "AirPods Pro (2nd generation) with USB-C deliver up to 2x more Active Noise Cancellation, with Transparency mode and Adaptive Audio.",
    "highlight": [
      "H2 Apple Chip with Up to 2x more Active Noise Cancellation",
      "Adaptive Audio dynamically tailors noise control to environment",
      "Personalized Spatial Audio with Dynamic Head Tracking",
      "MagSafe Charging Case (USB-C) with Precision Finding Speaker"
    ],
    "specification": {
      "Audio": {
        "Chip": "Apple H2 Headphone Chip"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/headphone/e/a/f/-original-imagtc44nk4b3h4q.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("5e2924fb59143fb171964c71"),
    "productId": ObjectId("c3df065b04b3f71de207e238"),
    "summary": "Get ready to immerse yourself in pure musical bliss with boAt Airdopes 141 True Wireless earbuds.",
    "highlight": [
      "Up to 42 Hours Total Playback Time",
      "ENx Technology for Clear Voice Calls",
      "BEAST Mode for Low Latency Gaming (80ms)",
      "ASAP Charge: 5 mins charge = 75 mins playtime"
    ],
    "specification": {
      "General": {
        "Wireless Type": "Bluetooth 5.1"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/headphone/p/r/z/airdopes-141-boat-original-imagj54fsfgqvhsz.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("d794bc1d8dfa82729ecbc9d0"),
    "productId": ObjectId("65b909b80c834c9cc594811a"),
    "summary": "boAt Rockerz 450 delivers rhythmic bliss with punchy bass, lightweight ergonomics, and extended battery life.",
    "highlight": [
      "Up to 15 Hours of Playback Time",
      "40mm Dynamic Drivers for Deep HD Sound",
      "Adaptive Earcups and Soft Padded Headband",
      "Dual Modes: Bluetooth and AUX Cable Support"
    ],
    "specification": {
      "General": {
        "Driver Size": "40 mm"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/k5lcvbk0/headphone/d/z/v/boat-rockerz-450-original-imafz8wbzghg5hzx.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("6dd47ecb2ca3192eb613e535"),
    "productId": ObjectId("c5dd03d92da13ab36943cd75"),
    "summary": "Your adventure, your soundtrack. The bold JBL Flip 6 delivers powerful JBL Original Pro Sound with exceptional clarity.",
    "highlight": [
      "IP67 Waterproof and Dustproof Design",
      "2-Way Speaker System with Powerful Deep Bass",
      "Up to 12 Hours of Playtime on a Single Charge",
      "PartyBoost Compatible for Stereo Sound"
    ],
    "specification": {
      "Audio": {
        "Power Output": "30 W"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/l05lx8w0/speaker/mobile-tablet-speaker/r/o/r/flip-6-jbl-original-imagcy835kfqghhf.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("19d806a540e14ea45f6804cb"),
    "productId": ObjectId("221fe41434e86b9855693f83"),
    "summary": "Apple Watch Series 9 helps you stay connected, active, healthy, and safe with the powerful S9 chip.",
    "highlight": [
      "S9 SiP with 64-bit Dual-core Processor",
      "Magic Double Tap Gesture Control without touching screen",
      "Brighter Always-On Retina Display (up to 2000 nits)",
      "ECG & Blood Oxygen Monitoring Apps"
    ],
    "specification": {
      "Display": {
        "Size": "45mm OLED"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/y/b/w/-original-imagtvd6jkhyqfvh.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("71c0f0eb21593477e8ec666d"),
    "productId": ObjectId("060704d26f92f59b3d98be67"),
    "summary": "Samsung Galaxy Watch 6 starts your everyday wellness journey with customized heart rate zones and in-depth sleep analysis.",
    "highlight": [
      "Sapphire Crystal Glass Display",
      "Advanced Sleep Coaching & ECG Monitoring",
      "BioActive Sensor for Body Composition Analysis",
      "Wear OS Powered by Samsung with Google Apps"
    ],
    "specification": {
      "Display": {
        "Size": "1.5 inch Super AMOLED"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/k/v/h/-original-imagrh7ggfhdf93q.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("e35d7c8b1d192ab98d127be4"),
    "productId": ObjectId("3f8f954937a5651e9f855ef5"),
    "summary": "Noise ColorFit Pulse 2 Max delivers crisp calls, clear fitness stats, and vibrant 1.85 inch visuals on your wrist.",
    "highlight": [
      "1.85 inch TFT LCD 550 nits Bright Display",
      "Bluetooth Calling with Inbuilt Mic & Speaker",
      "100 Sports Modes with Smart Auto Detection",
      "Up to 10 Days Battery Life"
    ],
    "specification": {
      "Display": {
        "Screen": "1.85 inch TFT"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/u/9/s/-original-imaghd7mhzqhg8df.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("0bdab1c4f43228134106a49b"),
    "productId": ObjectId("5202cc32a2110ac944a495c0"),
    "summary": "Elevate your tech style with the Fastrack Limitless FS1 Pro featuring high-resolution arched AMOLED display.",
    "highlight": [
      "1.96 inch Super AMOLED Arched Display (410x502 Pixels)",
      "SingleSync BT Calling with Advanced Chipset",
      "NitroFast Charging (10 mins = 1 full day)",
      "110+ Multisport Modes"
    ],
    "specification": {
      "Display": {
        "Type": "Super AMOLED"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/j/w/t/-original-imagny5hhzhg98sz.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("7502f2f1e74cf7945b295f64"),
    "productId": ObjectId("b2490c0b80c9294583e9e7bf"),
    "summary": "Step into the future of television with LG OLED, featuring deep blacks, infinite contrast, and cutting-edge gaming performance.",
    "highlight": [
      "Ultra HD (4K) 3840 x 2160 Pixels",
      "Self-lit OLED Pixels with Infinite Contrast",
      "a9 AI Processor Gen6 with AI Super Upscaling",
      "120Hz Refresh Rate with NVIDIA G-Sync & FreeSync",
      "40W Dolby Atmos Sound Output"
    ],
    "specification": {
      "Display": {
        "Resolution": "3840 x 2160 Pixels",
        "Refresh Rate": "120 Hz"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/television/j/2/j/-original-imaghgphz7h8v9hy.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("379d7cb66b3e57c776c3d36f"),
    "productId": ObjectId("6814215cf47a49a8957b6c4e"),
    "summary": "Samsung Crystal 4K Vivid Pro brings billions of true-to-life shades of color into your living room.",
    "highlight": [
      "Crystal Processor 4K with PurColor Technology",
      "HDR 10+ Support with Motion Xcelerator",
      "Q-Symphony Sound with Object Tracking Sound Lite",
      "SolarCell Remote with Voice Assistant Integration"
    ],
    "specification": {
      "Display": {
        "Resolution": "3840 x 2160 Pixels"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/television/k/s/u/-original-imahf22b7fhgb9hz.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("49d52974263f2253c031df2b"),
    "productId": ObjectId("6db2f9247b1811129ea4cbdb"),
    "summary": "Philips brings the world's leading Air Fryer to your home. Enjoy healthy food with up to 90% less fat thanks to Rapid Air technology.",
    "highlight": [
      "Rapid Air Technology cooks with up to 90% Less Fat",
      "Touch Screen with 7 Pre-set Cooking Menus",
      "Keep Warm Function up to 30 mins",
      "QuickClean Basket Dishwasher Safe"
    ],
    "specification": {
      "Capacity": {
        "Volume": "4.1 Litres"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/air-fryer/t/7/x/hd9252-90-philips-original-imaghh8zsf8r7ghb.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("53350cfbe76f18e1c5627c82"),
    "productId": ObjectId("a39dbe50bb3c4e01b7247a41"),
    "summary": "Dyson V12 Detect Slim is engineered for powerful, lightweight whole-home deep cleaning with laser illumination.",
    "highlight": [
      "Laser reveals microscopic dust on hard floors",
      "Piezo sensor continuously sizes and counts dust particles",
      "Up to 60 minutes of run time with click-in battery",
      "Hyperdymium motor spins up to 125,000 rpm"
    ],
    "specification": {
      "Battery": {
        "Run Time": "60 mins"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/vacuum-cleaner/l/z/t/v12-detect-slim-total-clean-dyson-original-imagg2dfyh89zgfq.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("206754ccdc23df1f358c0307"),
    "productId": ObjectId("e21cf7c957600ea3f7f60a6f"),
    "summary": "Here's to fresh starts between you and the pavement. Lace up the 100% recycled laces and set the pace with the plush feel of Nike Revolution 6.",
    "highlight": [
      "Soft Foam Midsole delivers a Smooth, Stable Ride",
      "Lightweight Breathable Mesh Upper",
      "Computer-generated Outsole Design creates Natural Piston Effect",
      "Made with at least 20% recycled material by weight"
    ],
    "specification": {
      "General": {
        "Brand": "Nike",
        "Ideal For": "Men"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/7/2/m/6-revolution-6-nike-black-white-iron-grey-original-imagg9k8a2fghgzu.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("322dbd692ba32b29bb75d7a9"),
    "productId": ObjectId("bed8253a617a67d12b914c65"),
    "summary": "The Flyer Runner is all about style and comfort. Breathable mesh upper with EVA midsole gives optimal performance on every run.",
    "highlight": [
      "SoftFoam+ Sockliner for Step-in Comfort and Plush Cushioning",
      "EVA Midsole provides Lightweight Cushioning",
      "Rubber Outsole for Durability and Superior Traction"
    ],
    "specification": {
      "General": {
        "Brand": "Puma",
        "Ideal For": "Men"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/s/b/g/9-192257-puma-peacoat-white-original-imagggq6mzhfgh9y.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  },
  {
    "_id": ObjectId("f88e6674823e36a93db5b851"),
    "productId": ObjectId("99d2338296d24d3397e1709b"),
    "summary": "Adidas Coreracer strikes the ideal balance between running comfort and clean street-ready aesthetics.",
    "highlight": [
      "Breathable Mesh Upper with Lightweight Feel",
      "EVA Midsole with Textile Lining",
      "Durable Rubber Outsole for Superior Grip"
    ],
    "specification": {
      "General": {
        "Brand": "Adidas",
        "Ideal For": "Men"
      }
    },
    "images": [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/y/7/f/8-fx3581-adidas-cblack-ftwwht-cblack-original-imafvf77zhb5kghz.jpeg"
    ],
    "shippingCost": 0,
    "tax": 18,
    "minOrder": 1,
    "sellerRules": [
      "7 Days Replacement Policy",
      "Free Delivery across India on Flipkart Assured orders",
      "Cash on Delivery available",
      "100% Genuine and Authentic Product guaranteed",
      "GST invoice available"
    ]
  }
]);

print('MongoDB initialization with Flipkart products completed successfully for ' + dbName);
