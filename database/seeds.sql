-- 1️⃣ Kullanıcı türleri
INSERT INTO accsess_tbl (usercode, usertype) VALUES
(1, 'normal'),
(2, 'admin');

-- 2️⃣ Kullanıcılar
INSERT INTO user_tbl (user_id, pass_word, email, phone, usercode, first_name, last_name) VALUES
(1, 'hashedpassword1', 'john@example.com', '1234567890', 1, 'John', 'Doe'),
(2,'hashedpassword2', 'admin@example.com', '0987654321', 2, 'Admin', 'User');

-- 3️⃣ Kullanıcı adresleri
INSERT INTO user_address (add_id, user_id, address, city, postal_code, country) VALUES
(1, 1, '123 Main St', 'Anytown', '12345', 'USA'),
(2, 2, '456 Admin Ave', 'Admin City', '67890', 'USA');

-- 4️⃣ Kategoriler
INSERT INTO category_table (category_id, category_name) VALUES
(1, 'Electronics'),
(2, 'Clothing'),
(3, 'Books');

-- 5️⃣ Ürünler
INSERT INTO product (product_id, product_name, description, price, category_id, stock) VALUES
(1, 'Laptop', 'A high-performance laptop', 1000.00, 1, 20),
(2, 'T-Shirt', 'A stylish t-shirt', 20.00, 2, 100),
(3, 'Novel Book', 'An interesting novel', 15.00, 3, 50);

-- 6️⃣ Siparişler
INSERT INTO order_tbl (order_id, user_id, order_date, total) VALUES
(1, 1, '2025-04-08', 1020.00),
(2, 2, '2025-04-07', 40.00);

-- 7️⃣ Sipariş detayları
INSERT INTO order_detail (detail_id, order_id, product_id, quantity, unit_price, total) VALUES
(1, 1, 1, 1, 1000.00, 1000.00),
(2, 1, 2, 1, 20.00, 20.00),
(3, 2, 2, 2, 20.00, 40.00);

-- 8️⃣ Sepet tablosu
INSERT INTO cart_tbl (cartt_id, user_id, product_id, quantity, unit_price, total) VALUES
(1, 1, 1, 1, 1000.00, 1000.00),
(2, 2, 3, 2, 15.00, 30.00);

-- 9️⃣ Ürün puanlama
INSERT INTO rate_tbl (rate_id, user_id, product_id, rate) VALUES
(1, 1, 1, 4.5),
(2, 2, 2, 4.0);
