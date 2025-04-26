
-- Kullanıcılar tablosunu güncelleme
CREATE TABLE IF NOT EXISTS user_tbl (
    user_id SERIAL PRIMARY KEY,
    pass_word VARCHAR(60) NOT NULL,
    email VARCHAR(50) UNIQUE,  -- Email alanına UNIQUE kısıtlaması ekledik
    phone VARCHAR(15) UNIQUE,  -- Phone alanına UNIQUE kısıtlaması ekledik
    usercode INT,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20)
);

-- 3️⃣ Kullanıcı adresleri
CREATE TABLE IF NOT EXISTS user_address (
    add_id SERIAL PRIMARY KEY,
    user_id INT,  -- user_id'yi INT olarak değiştirdik
    address VARCHAR(100),
    city VARCHAR(50),
    postal_code VARCHAR(20),  -- Postal code'u VARCHAR olarak değiştirdik
    country VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES user_tbl(user_id) ON DELETE CASCADE
);

-- 4️⃣ Kategoriler
CREATE TABLE IF NOT EXISTS category_table (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(50)
);

-- 5️⃣ Ürünler
CREATE TABLE IF NOT EXISTS product (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(50),
    description TEXT,
    price FLOAT,
    category_id INT,
    stock INT,
    cover_image_url TEXT, -- 📸 Kapak fotoğrafı
    FOREIGN KEY (category_id) REFERENCES category_table(category_id) ON DELETE CASCADE
);


-- 6️⃣ Siparişler
CREATE TABLE IF NOT EXISTS order_tbl (
    order_id SERIAL PRIMARY KEY,
    user_id INT,  -- user_id'yi INT olarak değiştirdik
    order_date DATE,
    total FLOAT,  -- Toplam tutarı FLOAT olarak değiştirdik
    FOREIGN KEY (user_id) REFERENCES user_tbl(user_id) ON DELETE CASCADE
);

-- 7️⃣ Sipariş detayları
CREATE TABLE IF NOT EXISTS order_detail (
    detail_id SERIAL PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    unit_price FLOAT,  -- Birim fiyatı FLOAT olarak değiştirdik
    total FLOAT,  -- Toplam tutarı FLOAT olarak değiştirdik
    FOREIGN KEY (order_id) REFERENCES order_tbl(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE
);

-- 8️⃣ Sepet tablosu
CREATE TABLE IF NOT EXISTS cart_tbl (
    cartt_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,  -- user_id'yi INT olarak değiştirdik
    product_id INT,
    quantity INT,
    unit_price FLOAT,  -- Birim fiyatı FLOAT olarak değiştirdik
    total FLOAT,  -- Toplam tutarı FLOAT olarak değiştirdik
    FOREIGN KEY (user_id) REFERENCES user_tbl(user_id)  ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE
);

-- 9️⃣ Ürün puanlama
CREATE TABLE IF NOT EXISTS rate_tbl (
    rate_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,  -- user_id'yi INT olarak değiştirdik
    product_id INT,
    rate FLOAT,  -- Puanlama değeri FLOAT olarak değiştirildi
    FOREIGN KEY (user_id) REFERENCES user_tbl(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS product_images (
    image_id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    image_url TEXT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE
);