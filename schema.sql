-- MASTER HARGA
CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    satuan TEXT NOT NULL,
    harga INTEGER NOT NULL,
    aktif INTEGER DEFAULT 1
);

-- PELANGGAN
CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    hp TEXT,
    alamat TEXT
);

-- ORDER
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,
    tanggal TEXT,
    layanan TEXT,
    berat REAL,
    total INTEGER,
    status TEXT DEFAULT 'Masuk'
);

-- DATA AWAL HARGA
INSERT INTO services (nama,satuan,harga) VALUES
('Cuci Kering','Kg',5000),
('Cuci Setrika','Kg',6000),
('Setrika','Kg',4000),
('Bed Cover','Pcs',35000);

CREATE TABLE IF NOT EXISTS admin(
id INTEGER PRIMARY KEY AUTOINCREMENT,
username TEXT UNIQUE,
password TEXT
);

INSERT INTO admin(username,password)
VALUES
('admin','123456');
