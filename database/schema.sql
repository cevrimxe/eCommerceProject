-- 1️⃣ Kullanıcı türleri tablosu
CREATE TABLE IF NOT EXISTS accsess_tbl (
    usercode INT PRIMARY KEY,
    usertype VARCHAR(20)
);

-- Kullanıcılar tablosunu güncelleme
CREATE TABLE IF NOT EXISTS user_tbl (
    user_id SERIAL PRIMARY KEY,
    pass_word VARCHAR(60) NOT NULL,
    email VARCHAR(50) UNIQUE,  -- Email alanına UNIQUE kısıtlaması ekledik
    phone VARCHAR(15) UNIQUE,  -- Phone alanına UNIQUE kısıtlaması ekledik
    usercode INT,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20),
    FOREIGN KEY (usercode) REFERENCES accsess_tbl(usercode)
);

-- 3️⃣ Kullanıcı adresleri
CREATE TABLE IF NOT EXISTS user_address (
    add_id INT PRIMARY KEY,
    user_id INT,  -- user_id'yi INT olarak değiştirdik
    address VARCHAR(100),
    city VARCHAR(50),
    postal_code VARCHAR(20),  -- Postal code'u VARCHAR olarak değiştirdik
    country VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES user_tbl(user_id)
);

-- 4️⃣ Kategoriler
CREATE TABLE IF NOT EXISTS category_table (
    category_id INT PRIMARY KEY,
    category_name VARCHAR(50)
);

-- 5️⃣ Ürünler
CREATE TABLE IF NOT EXISTS product (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(50),
    description TEXT,
    price FLOAT,  -- Fiyatı FLOAT olarak değiştirdik
    category_id INT,
    stock INT,  -- Stok miktarını INT olarak değiştirdik
    FOREIGN KEY (category_id) REFERENCES category_table(category_id)
);

-- 6️⃣ Siparişler
CREATE TABLE IF NOT EXISTS order_tbl (
    order_id INT PRIMARY KEY,
    user_id INT,  -- user_id'yi INT olarak değiştirdik
    order_date DATE,
    total FLOAT,  -- Toplam tutarı FLOAT olarak değiştirdik
    FOREIGN KEY (user_id) REFERENCES user_tbl(user_id)
);

-- 7️⃣ Sipariş detayları
CREATE TABLE IF NOT EXISTS order_detail (
    detail_id INT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    unit_price FLOAT,  -- Birim fiyatı FLOAT olarak değiştirdik
    total FLOAT,  -- Toplam tutarı FLOAT olarak değiştirdik
    FOREIGN KEY (order_id) REFERENCES order_tbl(order_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- 8️⃣ Sepet tablosu
CREATE TABLE IF NOT EXISTS cart_tbl (
    cartt_id INT PRIMARY KEY,
    user_id INT NOT NULL,  -- user_id'yi INT olarak değiştirdik
    product_id INT,
    quantity INT,
    unit_price FLOAT,  -- Birim fiyatı FLOAT olarak değiştirdik
    total FLOAT,  -- Toplam tutarı FLOAT olarak değiştirdik
    FOREIGN KEY (user_id) REFERENCES user_tbl(user_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- 9️⃣ Ürün puanlama
CREATE TABLE IF NOT EXISTS rate_tbl (
    rate_id INT PRIMARY KEY,
    user_id INT NOT NULL,  -- user_id'yi INT olarak değiştirdik
    product_id INT,
    rate FLOAT,  -- Puanlama değeri FLOAT olarak değiştirildi
    FOREIGN KEY (user_id) REFERENCES user_tbl(user_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);
