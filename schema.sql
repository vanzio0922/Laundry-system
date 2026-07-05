-- =========================================
-- VANZIO LAUNDRY
-- DATABASE VERSION : 1.0
-- =========================================

-- MASTER LAYANAN
-- =========================================

CREATE TABLE IF NOT EXISTS services (

id INTEGER PRIMARY KEY AUTOINCREMENT,

nama TEXT NOT NULL,

satuan TEXT NOT NULL DEFAULT 'Kg',

harga INTEGER NOT NULL,

kategori TEXT DEFAULT 'Reguler',

estimasi INTEGER DEFAULT 2,

estimasi_satuan TEXT DEFAULT 'Hari',

aktif INTEGER DEFAULT 1,

created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

updated_at DATETIME DEFAULT CURRENT_TIMESTAMP

);

-- =========================================
-- PELANGGAN
-- =========================================

CREATE TABLE IF NOT EXISTS customers (

id INTEGER PRIMARY KEY AUTOINCREMENT,

nama TEXT NOT NULL,

hp TEXT,

alamat TEXT,

created_at DATETIME DEFAULT CURRENT_TIMESTAMP

);

-- =========================================
-- ORDER
-- =========================================

CREATE TABLE IF NOT EXISTS orders (

id INTEGER PRIMARY KEY AUTOINCREMENT,

customer_id INTEGER,

service_id INTEGER,

tanggal TEXT,

berat REAL,

total INTEGER,

status TEXT DEFAULT 'Masuk',

created_at DATETIME DEFAULT CURRENT_TIMESTAMP

);

-- =========================================
-- ADMIN
-- =========================================

CREATE TABLE IF NOT EXISTS admin(

id INTEGER PRIMARY KEY AUTOINCREMENT,

username TEXT UNIQUE,

password TEXT

);

INSERT OR IGNORE INTO admin(username,password)

VALUES

('admin','123456');

-- =========================================
-- DATA AWAL MASTER LAYANAN
-- =========================================

INSERT INTO services
(nama,satuan,harga,kategori,estimasi,estimasi_satuan,aktif)

VALUES

('Cuci Kering','Kg',5000,'Reguler',2,'Hari',1),

('Cuci Setrika','Kg',6000,'Reguler',2,'Hari',1),

('Setrika','Kg',4000,'Reguler',1,'Hari',1),

('Bed Cover','Pcs',35000,'Special',3,'Hari',1);
