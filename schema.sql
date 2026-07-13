-- =========================================
-- VANZIO LAUNDRY
-- DATABASE FINAL V1
-- =========================================

-- =========================================
-- MASTER LAYANAN
-- =========================================

CREATE TABLE IF NOT EXISTS services (

id INTEGER PRIMARY KEY AUTOINCREMENT,

nama TEXT NOT NULL,

deskripsi TEXT,

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
-- MASTER PELANGGAN
-- =========================================

CREATE TABLE IF NOT EXISTS customers (

id INTEGER PRIMARY KEY AUTOINCREMENT,

nama TEXT NOT NULL,

telepon TEXT NOT NULL,

alamat TEXT,

member TEXT DEFAULT 'Reguler',

poin INTEGER DEFAULT 0,

catatan TEXT,

aktif INTEGER DEFAULT 1,

created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

updated_at DATETIME DEFAULT CURRENT_TIMESTAMP

);

-- =========================================
-- ORDER
-- =========================================

CREATE TABLE IF NOT EXISTS orders (

id INTEGER PRIMARY KEY AUTOINCREMENT,

invoice TEXT UNIQUE,

customer_id INTEGER NOT NULL,

tanggal TEXT,

subtotal INTEGER DEFAULT 0,

diskon INTEGER DEFAULT 0,

ongkir INTEGER DEFAULT 0,

total INTEGER DEFAULT 0,

dibayar INTEGER DEFAULT 0,

sisa INTEGER DEFAULT 0,

status TEXT DEFAULT 'Masuk',

catatan TEXT,

created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

updated_at DATETIME DEFAULT CURRENT_TIMESTAMP

);

-- =========================================
-- DETAIL ORDER
-- =========================================

CREATE TABLE IF NOT EXISTS order_items (

id INTEGER PRIMARY KEY AUTOINCREMENT,

order_id INTEGER NOT NULL,

service_id INTEGER NOT NULL,

qty REAL DEFAULT 1,

harga INTEGER,

subtotal INTEGER

);

-- =========================================
-- PEMBAYARAN
-- =========================================

CREATE TABLE IF NOT EXISTS payments (

id INTEGER PRIMARY KEY AUTOINCREMENT,

order_id INTEGER NOT NULL,

tanggal TEXT,

jumlah INTEGER,

metode TEXT,

catatan TEXT,

created_at DATETIME DEFAULT CURRENT_TIMESTAMP

);

-- =========================================
-- SETTINGS
-- =========================================

CREATE TABLE IF NOT EXISTS settings (

id INTEGER PRIMARY KEY AUTOINCREMENT,

setting_key TEXT UNIQUE,

setting_value TEXT,

keterangan TEXT,

created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

updated_at DATETIME DEFAULT CURRENT_TIMESTAMP

);

INSERT OR IGNORE INTO settings
(setting_key,setting_value,keterangan)
VALUES

('laundry_name','Vanzio Laundry','Nama Laundry'),
('laundry_address','','Alamat Laundry'),
('laundry_phone','','Nomor WhatsApp'),
('currency','IDR','Mata Uang'),
('use_category','1','Kategori'),
('use_estimasi','1','Estimasi'),
('use_express','0','Express'),
('use_share_location','1','Share Lokasi'),
('use_queue_number','1','Nomor Antrian'),
('use_whatsapp_notification','1','WA Otomatis');

-- =========================================
-- ADMIN
-- =========================================

CREATE TABLE IF NOT EXISTS admin (

id INTEGER PRIMARY KEY AUTOINCREMENT,

username TEXT UNIQUE,

password TEXT,

nama TEXT,

role TEXT DEFAULT 'Administrator',

created_at DATETIME DEFAULT CURRENT_TIMESTAMP

);

INSERT OR IGNORE INTO admin
(username,password,nama)
VALUES
('admin','123456','Administrator');

-- =========================================
-- DATA AWAL MASTER LAYANAN
-- =========================================

INSERT OR IGNORE INTO services
(id,nama,satuan,harga,kategori,estimasi,estimasi_satuan,aktif)

VALUES

(1,'Cuci Kering','Kg',5000,'Reguler',2,'Hari',1),

(2,'Cuci Setrika','Kg',6000,'Reguler',2,'Hari',1),

(3,'Setrika','Kg',4000,'Reguler',1,'Hari',1),

(4,'Bed Cover','Pcs',35000,'Special',3,'Hari',1);
