-- Kullanıcılar
INSERT INTO users (name, email, password) VALUES 
('Ali Veli', 'ali@example.com', '123456'),
('Ayşe Yılmaz', 'ayse@example.com', 'password');

-- Ürünler
INSERT INTO products (name, description, price, stock) VALUES 
('Laptop', 'Güçlü bir dizüstü bilgisayar', 15000.00, 5),
('Mouse', 'Kablosuz gaming mouse', 500.00, 20),
('Klavye', 'Mekanik RGB klavye', 750.00, 15);

-- Siparişler
INSERT INTO orders (user_id, total_price, status) VALUES 
(1, 15500.00, 'completed'),
(2, 1250.00, 'pending');

-- Sipariş Ürünleri
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES 
(1, 1, 1, 15000.00),
(2, 2, 1, 500.00),
(2, 3, 1, 750.00);
