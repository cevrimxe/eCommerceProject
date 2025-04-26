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
INSERT INTO product (product_id, product_name, description, price, category_id, stock,) VALUES
(1, 'BLEU DE CHANEL', '50ml. Odunsu ve aromatik yapısıyla maskülen zarafeti yansıtan, modern ve kendine güvenen erkeklerin imza kokusu olmaya aday, ferah ama derinlikli bir parfümdür.', 4400.00, 1, 20),
(2, 'Frédéric Malle Portrait of a Lady', '100ml. Yoğun gül ve paçuli notalarıyla zarif ama baş döndürücü bir tutkunun kokusal ifadesidir.', 16950.00, 1, 20),
(3, 'Byredo Mojave Ghost', '100ml. Çölün gizemli ve narin ruhunu yansıtan, hafif odunsu ve çiçeksi yapısıyla hem kadınlar hem de erkekler tarafından kullanılabilen zarif ve sakin bir unisex parfümdür.', 12840.00, 1, 10),
(4, 'Maison Francis Kurkdjian Baccarat Rouge', '75ml. Amber, yasemin ve safran notalarıyla sıcak, şekerli ve kristal gibi parlayan bir iz bırakan, hem kadınlar hem de erkekler için büyüleyici ve çarpıcı bir unisex parfümdür.', 13230.00, 1, 20),
(5, 'Creed Aventus for Her', '75ml. Ananas, yeşil elma ve miskle açılan, güçlü ama zarif duruşuyla özgüvenli kadınları yansıtan, ferah ve meyvemsi bir kadın parfümüdür.', 6750.00, 1, 20),
(6, 'Diptyque Philosykos', '100ml. Taze incir, incir yaprağı ve odunsu notalarla Akdeniz ruhunu taşıyan, doğal ve sakin havasıyla hem kadınlar hem de erkekler için ferahlatıcı bir unisex parfümdür.', 7450.00, 1, 10),
(7, 'Parfums de Marly Delina', '75ml. TTürk gülü, liçi ve miskin başrolde olduğu, feminenliği zarafetle harmanlayan, tatlı, çiçeksi ve aynı zamanda ferah bir kadın parfümüdür.', 13110.00, 1, 10),
(8, 'Yves Saint Laurent Libre', '90ml. Lavanta ve portakal çiçeğinin güçlü birleşimiyle özgür ruhlu kadınları simgeleyen, ferah ama derin, modern ve cesur bir kadın parfümüdür.', 7600.00, 1, 30),
(9, 'Killian Paris Rolling In Love', '50ml. Badem, vanilya ve iris notalarıyla sıcak, tatlı ve romantik bir iz bırakan, lüks ve yoğun bir kadın parfümüdür.', 10500.00, 1, 10),
(10, 'Tom Ford Tobacco Vanille', '100ml. Zengin tütün ve vanilya notalarının sıcak, tatlı ve baharatlı bir birleşimiyle derin, lüks ve maskülen bir etki yaratan, kış ayları için mükemmel bir parfümdür.', 14870.00, 1, 10)
;

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
