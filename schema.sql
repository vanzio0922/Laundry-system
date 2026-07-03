-- ==========================================
-- CUSTOMERS
-- ==========================================

CREATE TABLE IF NOT EXISTS customers (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    nama TEXT NOT NULL,

    no_hp TEXT UNIQUE,

    alamat TEXT,

    latitude REAL,

    longitude REAL,

    created_at TEXT DEFAULT CURRENT_TIMESTAMP

);

-- ==========================================
-- SERVICES
-- ==========================================

CREATE TABLE IF NOT EXISTS services (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    nama TEXT NOT NULL,

    harga INTEGER NOT NULL,

    aktif INTEGER DEFAULT 1

);

-- ==========================================
-- ORDERS
-- ==========================================

CREATE TABLE IF NOT EXISTS orders (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    no_nota TEXT UNIQUE,

    customer_id INTEGER,

    service_id INTEGER,

    berat REAL,

    harga INTEGER,

    total INTEGER,

    status TEXT DEFAULT 'DITERIMA',

    created_at TEXT DEFAULT CURRENT_TIMESTAMP

);

-- ==========================================
-- SETTINGS
-- ==========================================

CREATE TABLE IF NOT EXISTS settings (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    nama_laundry TEXT,

    alamat TEXT,

    no_wa TEXT,

    catatan_resi TEXT

);

-- ==========================================
-- DATA AWAL LAYANAN
-- ==========================================

INSERT INTO services (nama,harga)
VALUES

('Cuci Kering',6000),

('Cuci Setrika',8000),

('Setrika',5000);
