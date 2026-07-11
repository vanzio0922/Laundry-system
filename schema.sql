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

telepon TEXT,

alamat TEXT,

member TEXT DEFAULT 'Reguler',

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

('laundry_phone','','Nomor WhatsApp Admin'),

('currency','IDR','Mata Uang'),

('use_category','1','Gunakan Kategori'),

('use_estimasi','1','Gunakan Estimasi'),

('use_express','0','Gunakan Layanan Kilat'),

('use_share_location','1','Gunakan Share Lokasi'),

('use_queue_number','1','Gunakan Nomor Antrian'),

('use_whatsapp_notification','1','Kirim WhatsApp Otomatis');
