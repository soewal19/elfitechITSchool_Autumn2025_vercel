import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import swaggerUi from 'swagger-ui-express';
import { randomUUID } from 'node:crypto';

// ======================
// Database initialization
// ======================
const db = new Database('server/data.db');
db.pragma('journal_mode = WAL');

function hasColumn(table, column) {
  const rows = db.prepare(`PRAGMA table_info(${table})`).all();
  return rows.some((r) => r.name === column);
}

// Create base tables
db.exec(`
CREATE TABLE IF NOT EXISTS shops (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS flowers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  shop_id TEXT REFERENCES shops(id),
  is_favorite INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS coupons (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  discount REAL NOT NULL,
  description TEXT
);
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT,
  address TEXT,
  total REAL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
  flower_id TEXT REFERENCES flowers(id),
  quantity INTEGER NOT NULL,
  price REAL NOT NULL
);
`);

// Ensure new columns exist to match frontend types
if (!hasColumn('shops', 'category')) {
  db.exec('ALTER TABLE shops ADD COLUMN category TEXT DEFAULT \"General\"');
}
if (!hasColumn('flowers', 'image')) {
  db.exec('ALTER TABLE flowers ADD COLUMN image TEXT');
}
if (!hasColumn('flowers', 'description')) {
  db.exec('ALTER TABLE flowers ADD COLUMN description TEXT');
}
if (!hasColumn('flowers', 'date_added')) {
  db.exec('ALTER TABLE flowers ADD COLUMN date_added TEXT');
}
if (!hasColumn('coupons', 'name')) {
  db.exec('ALTER TABLE coupons ADD COLUMN name TEXT');
}
if (!hasColumn('coupons', 'is_active')) {
  db.exec('ALTER TABLE coupons ADD COLUMN is_active INTEGER DEFAULT 1');
}
if (!hasColumn('coupons', 'expiry_date')) {
  db.exec('ALTER TABLE coupons ADD COLUMN expiry_date TEXT');
}
if (!hasColumn('coupons', 'min_order_amount')) {
  db.exec('ALTER TABLE coupons ADD COLUMN min_order_amount REAL');
}

// ======================
// Seed data (idempotent)
// ======================
const seedShops = [
  { id: '1', name: 'Flowery Fragrant', category: 'Premium' },
  { id: '2', name: 'Bloomwell', category: 'Budget' },
  { id: '3', name: 'Garden Paradise', category: 'Luxury' },
  { id: '4', name: 'Spring Blossoms', category: 'Seasonal' },
];

const seedFlowers = [
  { id: '1', name: 'Red Rose Bouquet', price: 45, image: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=300&h=300', description: 'Beautiful red roses perfect for romantic occasions. Hand-picked premium quality roses arranged in an elegant bouquet.', shop_id: '1', is_favorite: 0, date_added: '2024-01-15' },
  { id: '2', name: 'White Tulips', price: 32, image: 'https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg?auto=compress&cs=tinysrgb&w=300&h=300', description: 'Elegant white tulips for special celebrations. Fresh spring tulips that symbolize new beginnings.', shop_id: '1', is_favorite: 0, date_added: '2024-01-10' },
  { id: '3', name: 'Pink Lily Arrangement', price: 38, image: 'https://images.pexels.com/photos/1463295/pexels-photo-1463295.jpeg?auto=compress&cs=tinysrgb&w=300&h=300', description: 'Delicate pink lilies in a beautiful arrangement. Perfect for expressing grace and admiration.', shop_id: '2', is_favorite: 0, date_added: '2024-01-12' },
  { id: '4', name: 'Sunflower Bouquet', price: 28, image: 'https://images.pexels.com/photos/1428449/pexels-photo-1428449.jpeg?auto=compress&cs=tinysrgb&w=300&h=300', description: 'Bright sunflowers to bring joy and warmth. These cheerful flowers are perfect for brightening any day.', shop_id: '2', is_favorite: 0, date_added: '2024-01-08' },
  { id: '5', name: 'Purple Orchids', price: 65, image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=300&h=300', description: 'Exotic purple orchids for sophisticated taste. These rare beauties represent luxury and strength.', shop_id: '3', is_favorite: 0, date_added: '2024-01-20' },
  { id: '6', name: 'Mixed Spring Flowers', price: 42, image: 'https://images.pexels.com/photos/1438227/pexels-photo-1438227.jpeg?auto=compress&cs=tinysrgb&w=300&h=300', description: 'Colorful mix of seasonal spring flowers. A vibrant arrangement celebrating the beauty of spring.', shop_id: '4', is_favorite: 0, date_added: '2024-01-18' },
  { id: '7', name: 'White Roses', price: 48, image: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=300&h=300', description: 'Pure white roses symbolizing peace and elegance. Perfect for weddings and special ceremonies.', shop_id: '1', is_favorite: 0, date_added: '2024-01-14' },
  { id: '8', name: 'Lavender Bouquet', price: 35, image: 'https://images.pexels.com/photos/1421919/pexels-photo-1421919.jpeg?auto=compress&cs=tinysrgb&w=300&h=300', description: 'Aromatic lavender flowers for relaxation. Known for their calming properties and beautiful fragrance.', shop_id: '4', is_favorite: 0, date_added: '2024-01-16' },
  { id: '9', name: 'Yellow Daisies', price: 25, image: 'https://images.pexels.com/photos/1462636/pexels-photo-1462636.jpeg?auto=compress&cs=tinysrgb&w=300&h=300', description: 'Cheerful yellow daisies that bring sunshine to any room. Simple yet beautiful flowers for everyday joy.', shop_id: '2', is_favorite: 0, date_added: '2024-01-22' },
  { id: '10', name: 'Pink Peonies', price: 55, image: 'https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=300&h=300', description: 'Luxurious pink peonies with full, ruffled blooms. These flowers represent honor and wealth.', shop_id: '3', is_favorite: 0, date_added: '2024-01-25' },
  { id: '11', name: 'Blue Hydrangeas', price: 40, image: 'https://images.pexels.com/photos/1408978/pexels-photo-1408978.jpeg?auto=compress&cs=tinysrgb&w=300&h=300', description: 'Beautiful blue hydrangeas with full, round blooms. Perfect for expressing gratitude and understanding.', shop_id: '1', is_favorite: 0, date_added: '2024-01-28' },
  { id: '12', name: 'Orange Marigolds', price: 22, image: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=300&h=300', description: 'Vibrant orange marigolds that symbolize passion and creativity. Perfect for autumn celebrations.', shop_id: '4', is_favorite: 0, date_added: '2024-01-30' },
  { id: '13', name: 'White Carnations', price: 30, image: 'https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg?auto=compress&cs=tinysrgb&w=300&h=300', description: 'Classic white carnations representing pure love and good luck. Long-lasting and fragrant flowers.', shop_id: '2', is_favorite: 0, date_added: '2024-02-02' },
  { id: '14', name: 'Red Gerberas', price: 33, image: 'https://images.pexels.com/photos/1407346/pexels-photo-1407346.jpeg?auto=compress&cs=tinysrgb&w=300&h=300', description: 'Bold red gerbera daisies that radiate happiness and positive energy. Perfect for celebrations.', shop_id: '3', is_favorite: 0, date_added: '2024-02-05' },
  { id: '15', name: 'Purple Irises', price: 37, image: 'https://images.pexels.com/photos/1407331/pexels-photo-1407331.jpeg?auto=compress&cs=tinysrgb&w=300&h=300', description: 'Elegant purple irises symbolizing wisdom and valor. These striking flowers make a bold statement.', shop_id: '1', is_favorite: 0, date_added: '2024-02-08' },
  { id: '16', name: 'Pink Roses', price: 43, image: 'https://images.pexels.com/photos/1407349/pexels-photo-1407349.jpeg?auto=compress&cs=tinysrgb&w=300&h=300', description: 'Soft pink roses expressing gratitude and appreciation. Perfect for showing someone you care.', shop_id: '4', is_favorite: 0, date_added: '2024-02-10' },
  { id: '17', name: 'Yellow Chrysanthemums', price: 29, image: 'https://images.pexels.com/photos/1407340/pexels-photo-1407340.jpeg?auto=compress&cs=tinysrgb&w=300&h=300', description: 'Bright yellow chrysanthemums representing joy and optimism. These flowers bring warmth to any space.', shop_id: '2', is_favorite: 0, date_added: '2024-02-12' },
  { id: '18', name: 'White Lilies', price: 50, image: 'https://images.pexels.com/photos/1407358/pexels-photo-1407358.jpeg?auto=compress&cs=tinysrgb&w=300&h=300', description: 'Pure white lilies symbolizing rebirth and purity. These elegant flowers are perfect for special occasions.', shop_id: '3', is_favorite: 0, date_added: '2024-02-15' },
  { id: '19', name: 'Mixed Wildflowers', price: 26, image: 'https://images.pexels.com/photos/1407364/pexels-photo-1407364.jpeg?auto=compress&cs=tinysrgb&w=300&h=300', description: 'A natural mix of wildflowers bringing the beauty of meadows indoors. Perfect for rustic arrangements.', shop_id: '4', is_favorite: 0, date_added: '2024-02-18' },
  { id: '20', name: 'Red Carnations', price: 31, image: 'https://images.pexels.com/photos/1407367/pexels-photo-1407367.jpeg?auto=compress&cs=tinysrgb&w=300&h=300', description: 'Classic red carnations expressing deep love and admiration. These long-lasting flowers are perfect for any occasion.', shop_id: '1', is_favorite: 0, date_added: '2024-02-20' },
];

const seedCoupons = [
  { id: '1', code: 'SPRING20', name: 'Spring Special', description: 'Get 20% off on all spring flowers', discount: 20, is_active: 1, expiry_date: '2024-06-30', min_order_amount: 30 },
  { id: '2', code: 'WELCOME10', name: 'Welcome Discount', description: 'First-time customer discount', discount: 10, is_active: 1, expiry_date: '2024-12-31', min_order_amount: 25 },
  { id: '3', code: 'LOVE15', name: 'Love Special', description: 'Perfect for romantic occasions', discount: 15, is_active: 1, expiry_date: '2024-12-31', min_order_amount: 40 },
  { id: '4', code: 'SUMMER25', name: 'Summer Sale', description: 'Beat the heat with fresh flowers', discount: 25, is_active: 1, expiry_date: '2024-08-31', min_order_amount: 50 },
  { id: '5', code: 'BIRTHDAY12', name: 'Birthday Special', description: 'Make birthdays more special', discount: 12, is_active: 1, expiry_date: '2024-12-31', min_order_amount: 35 },
  { id: '6', code: 'BULK30', name: 'Bulk Order Discount', description: 'For large orders and events', discount: 30, is_active: 1, expiry_date: '2024-12-31', min_order_amount: 100 },
  { id: '7', code: 'SAVE50', name: 'Mega Savings', description: 'Huge discount for premium customers', discount: 50, is_active: 1, expiry_date: '2025-03-31', min_order_amount: 150 },
  { id: '8', code: 'FLOWERS30', name: 'Flower Power', description: 'Special discount on all flower arrangements', discount: 30, is_active: 1, expiry_date: '2025-02-28', min_order_amount: 75 },
  { id: '9', code: 'VALENTINE20', name: 'Valentine Special', description: 'Perfect for your loved ones', discount: 20, is_active: 1, expiry_date: '2025-02-14', min_order_amount: 60 },
  { id: '10', code: 'NEWUSER25', name: 'New Customer Bonus', description: 'Welcome bonus for new customers', discount: 25, is_active: 1, expiry_date: '2025-12-31', min_order_amount: 40 },
];

const insertShop = db.prepare('INSERT OR IGNORE INTO shops (id, name, category) VALUES (?, ?, ?)');
for (const s of seedShops) insertShop.run(s.id, s.name, s.category);

const insertFlower = db.prepare(
  'INSERT OR IGNORE INTO flowers (id, name, price, image, description, shop_id, is_favorite, date_added) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
);
for (const f of seedFlowers) insertFlower.run(f.id, f.name, f.price, f.image, f.description, f.shop_id, f.is_favorite, f.date_added);

const insertCoupon = db.prepare(
  'INSERT OR IGNORE INTO coupons (id, code, discount, description, name, is_active, expiry_date, min_order_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
);
for (const c of seedCoupons) insertCoupon.run(c.id, c.code, c.discount, c.description, c.name, c.is_active, c.expiry_date, c.min_order_amount);

// ======================
// App + middleware
// ======================
const app = express();
app.use(cors());
app.use(express.json());

// ======================
// Swagger (OpenAPI)
// ======================
const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    title: 'Flower Shop API',
    version: '1.1.0',
    description: 'API для бэкенда магазина цветов (SQLite + Express).',
  },
  servers: [{ url: 'http://localhost:4000' }],
  tags: [
    { name: 'Shops', description: 'Магазины' },
    { name: 'Flowers', description: 'Цветы' },
    { name: 'Coupons', description: 'Купоны' },
    { name: 'Orders', description: 'Заказы' },
  ],
  components: {
    schemas: {
      Shop: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          category: { type: 'string' },
        },
      },
      Flower: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          price: { type: 'number' },
          image: { type: 'string' },
          description: { type: 'string' },
          shopId: { type: 'string' },
          isFavorite: { type: 'boolean' },
          dateAdded: { type: 'string', format: 'date-time' },
        },
      },
      Coupon: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          code: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          discount: { type: 'number' },
          isActive: { type: 'boolean' },
          expiryDate: { type: 'string', format: 'date' },
          minOrderAmount: { type: 'number' },
        },
      },
      OrderItem: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          order_id: { type: 'string' },
          flower_id: { type: 'string' },
          quantity: { type: 'integer' },
          price: { type: 'number' },
        },
      },
      Order: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          customer_name: { type: 'string' },
          address: { type: 'string' },
          total: { type: 'number' },
          created_at: { type: 'string' },
          items: { type: 'array', items: { $ref: '#/components/schemas/OrderItem' } },
        },
      },
      NewOrder: {
        type: 'object',
        required: ['customer_name', 'address', 'items'],
        properties: {
          customer_name: { type: 'string' },
          address: { type: 'string' },
          items: {
            type: 'array',
            items: {
              type: 'object',
              required: ['flower_id', 'quantity'],
              properties: {
                flower_id: { type: 'string' },
                quantity: { type: 'integer', minimum: 1 },
              },
            },
          },
        },
      },
    },
  },
  paths: {
    '/api/shops': {
      get: {
        tags: ['Shops'],
        summary: 'Список магазинов',
        responses: {
          200: { description: 'OK', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Shop' } } } } },
        },
      },
    },
    '/api/flowers': {
      get: {
        tags: ['Flowers'],
        summary: 'Список цветов',
        parameters: [
          { name: 'shop_id', in: 'query', schema: { type: 'string' } },
        ],
        responses: {
          200: { description: 'OK', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Flower' } } } } },
        },
      },
    },
    '/api/flowers/{id}/favorite': {
      patch: {
        tags: ['Flowers'],
        summary: 'Переключить избранное у цветка',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          200: { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Flower' } } } },
          404: { description: 'Not Found' },
        },
      },
    },
    '/api/coupons': {
      get: {
        tags: ['Coupons'],
        summary: 'Список купонов',
        responses: {
          200: { description: 'OK', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Coupon' } } } } },
        },
      },
    },
    '/api/orders': {
      get: {
        tags: ['Orders'],
        summary: 'Список заказов',
        responses: {
          200: { description: 'OK', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Order' } } } } },
        },
      },
      post: {
        tags: ['Orders'],
        summary: 'Создать заказ',
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/NewOrder' } },
          },
        },
        responses: {
          201: { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Order' } } } },
          400: { description: 'Bad Request' },
        },
      },
    },
  },
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ======================
// API routes
// ======================
app.get('/api/shops', (req, res) => {
  const rows = db.prepare('SELECT id, name, category FROM shops ORDER BY name').all();
  res.json(rows);
});

app.get('/api/flowers', (req, res) => {
  const { shop_id } = req.query;
  let rows;
  if (shop_id) {
    rows = db
      .prepare('SELECT id, name, price, image, description, shop_id, is_favorite, date_added FROM flowers WHERE shop_id = ? ORDER BY name')
      .all(String(shop_id));
  } else {
    rows = db.prepare('SELECT id, name, price, image, description, shop_id, is_favorite, date_added FROM flowers ORDER BY name').all();
  }
  const mapped = rows.map((f) => ({
    id: f.id,
    name: f.name,
    price: f.price,
    image: f.image,
    description: f.description,
    shopId: f.shop_id,
    isFavorite: !!f.is_favorite,
    dateAdded: f.date_added ? new Date(f.date_added).toISOString() : new Date().toISOString(),
  }));
  res.json(mapped);
});

app.patch('/api/flowers/:id/favorite', (req, res) => {
  const { id } = req.params;
  const row = db.prepare('SELECT is_favorite FROM flowers WHERE id = ?').get(id);
  if (!row) return res.status(404).json({ message: 'Flower not found' });
  const newVal = row.is_favorite ? 0 : 1;
  db.prepare('UPDATE flowers SET is_favorite = ? WHERE id = ?').run(newVal, id);
  const updated = db.prepare('SELECT id, name, price, image, description, shop_id, is_favorite, date_added FROM flowers WHERE id = ?').get(id);
  res.json({
    id: updated.id,
    name: updated.name,
    price: updated.price,
    image: updated.image,
    description: updated.description,
    shopId: updated.shop_id,
    isFavorite: !!updated.is_favorite,
    dateAdded: updated.date_added ? new Date(updated.date_added).toISOString() : new Date().toISOString(),
  });
});

app.get('/api/coupons', (req, res) => {
  const rows = db.prepare('SELECT id, code, discount, description, name, is_active, expiry_date, min_order_amount FROM coupons ORDER BY code').all();
  const mapped = rows.map((c) => ({
    id: c.id,
    code: c.code,
    name: c.name,
    description: c.description,
    discount: c.discount,
    isActive: !!c.is_active,
    expiryDate: c.expiry_date ? new Date(c.expiry_date).toISOString() : null,
    minOrderAmount: c.min_order_amount ?? null,
  }));
  res.json(mapped);
});

function getOrderWithItems(orderId) {
  const order = db
    .prepare('SELECT id, customer_name, address, total, created_at FROM orders WHERE id = ?')
    .get(orderId);
  const items = db
    .prepare('SELECT id, order_id, flower_id, quantity, price FROM order_items WHERE order_id = ? ORDER BY id')
    .all(orderId);
  return { ...order, items };
}

app.get('/api/orders', (req, res) => {
  const orders = db.prepare('SELECT id FROM orders ORDER BY datetime(created_at) DESC').all();
  const result = orders.map((o) => getOrderWithItems(o.id));
  res.json(result);
});

app.post('/api/orders', (req, res) => {
  const { customer_name, address, items } = req.body || {};
  if (!customer_name || !address || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Invalid payload' });
  }

  // Validate items and compute total
  let total = 0;
  const detailedItems = [];
  for (const it of items) {
    if (!it.flower_id || !Number.isInteger(it.quantity) || it.quantity <= 0) {
      return res.status(400).json({ message: 'Invalid item in payload' });
    }
    const f = db.prepare('SELECT id, price FROM flowers WHERE id = ?').get(it.flower_id);
    if (!f) return res.status(400).json({ message: `Flower not found: ${it.flower_id}` });
    const line = { flower_id: f.id, quantity: it.quantity, price: f.price };
    total += f.price * it.quantity;
    detailedItems.push(line);
  }

  const orderId = randomUUID();
  const insertOrder = db.prepare(
    'INSERT INTO orders (id, customer_name, address, total) VALUES (?, ?, ?, ?)'
  );
  const insertItem = db.prepare(
    'INSERT INTO order_items (order_id, flower_id, quantity, price) VALUES (?, ?, ?, ?)'
  );

  const trx = db.transaction(() => {
    insertOrder.run(orderId, customer_name, address, total);
    for (const di of detailedItems) insertItem.run(orderId, di.flower_id, di.quantity, di.price);
  });

  trx();
  const created = getOrderWithItems(orderId);
  res.status(201).json(created);
});

// ======================
// Start server
// ======================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API server is running on http://localhost:${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
});
