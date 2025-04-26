
-- 2️⃣ Kullanıcılar
INSERT INTO user_tbl (pass_word, email, phone, usercode, first_name, last_name) VALUES
('hashedpassword1', 'john@example.com', '1234567890', 1, 'John', 'Doe'),
('hashedpassword2', 'admin@example.com', '0987654321', 2, 'Admin', 'User');

-- 3️⃣ Kullanıcı adresleri
INSERT INTO user_address (user_id, address, city, postal_code, country) VALUES
(1, '123 Main St', 'Anytown', '12345', 'USA'),
(2, '456 Admin Ave', 'Admin City', '67890', 'USA');

-- 4️⃣ Kategoriler
INSERT INTO category_table (category_name) VALUES
('Parfüm'),
('Oda Kokusu ve Mum'),
('Güneş Kremi'),
('Nemlendirici'),
('Bakım Serumu'),
('Ruj'),
('Fondöten'),
('Maskara'),
('Kapatıcı'),
('Far'),
('Allık'),
('Oje'),
('Şampuan'),
('Saç Kremi'),
('Duş Jeli');

-- 5️⃣ Ürünler
INSERT INTO product ( product_name, description, price, category_id, stock) VALUES
('BLEU DE CHANEL', '50ml. Odunsu ve aromatik yapısıyla maskülen zarafeti yansıtan, modern ve kendine güvenen erkeklerin imza kokusu olmaya aday, ferah ama derinlikli bir parfümdür.', 4400.00, 1, 20),
('Frédéric Malle Portrait of a Lady', '100ml. Yoğun gül ve paçuli notalarıyla zarif ama baş döndürücü bir tutkunun kokusal ifadesidir.', 16950.00, 1, 20),
('Byredo Mojave Ghost', '100ml. Çölün gizemli ve narin ruhunu yansıtan, hafif odunsu ve çiçeksi yapısıyla hem kadınlar hem de erkekler tarafından kullanılabilen zarif ve sakin bir unisex parfümdür.', 12840.00, 1, 10),
('Maison Francis Kurkdjian Baccarat Rouge', '75ml. Amber, yasemin ve safran notalarıyla sıcak, şekerli ve kristal gibi parlayan bir iz bırakan, hem kadınlar hem de erkekler için büyüleyici ve çarpıcı bir unisex parfümdür.', 13230.00, 1, 20),
('Creed Aventus for Her', '75ml. Ananas, yeşil elma ve miskle açılan, güçlü ama zarif duruşuyla özgüvenli kadınları yansıtan, ferah ve meyvemsi bir kadın parfümüdür.', 6750.00, 1, 20),
('Diptyque Philosykos', '100ml. Taze incir, incir yaprağı ve odunsu notalarla Akdeniz ruhunu taşıyan, doğal ve sakin havasıyla hem kadınlar hem de erkekler için ferahlatıcı bir unisex parfümdür.', 7450.00, 1, 10),
('Parfums de Marly Delina', '75ml. TTürk gülü, liçi ve miskin başrolde olduğu, feminenliği zarafetle harmanlayan, tatlı, çiçeksi ve aynı zamanda ferah bir kadın parfümüdür.', 13110.00, 1, 10),
('Yves Saint Laurent Libre', '90ml. Lavanta ve portakal çiçeğinin güçlü birleşimiyle özgür ruhlu kadınları simgeleyen, ferah ama derin, modern ve cesur bir kadın parfümüdür.', 7600.00, 1, 30),
('Killian Paris Rolling In Love', '50ml. Badem, vanilya ve iris notalarıyla sıcak, tatlı ve romantik bir iz bırakan, lüks ve yoğun bir kadın parfümüdür.', 10500.00, 1, 10),
('Tom Ford Tobacco Vanille', '100ml. Zengin tütün ve vanilya notalarının sıcak, tatlı ve baharatlı bir birleşimiyle derin, lüks ve maskülen bir etki yaratan, kış ayları için mükemmel bir parfümdür.', 14870.00, 1, 10),
('Jo Malone London Velvet Rose & Oud', '165ml. Zengin gül ve yoğun odunsu oud notalarıyla bulunduğu ortama sıcaklık, lüks ve gizemli bir atmosfer katan, özellikle şık ve sofistike alanlar için ideal bir oda kokusu etkisi yaratır.', 4920.00, 2, 15),
('Atelier Rebul İstanbul Xl Scented Candle', '950gr. Bergamot, baharatlar ve odunsu notalarla İstanbulun mistik ruhunu yansıtarak ortama sıcak ve lüks bir atmosfer katan büyük boy bir kokulu mumdur.', 5200.00, 2, 15),
('FEU DE CIEL Kalp Çakra', '130gr. Gül notalarıyla kalp çakrasını dengelemeyi hedefleyen, duygusal blokajlardan arınmaya ve içsel huzura katkı sağlayan, doğal içerikli ve el yapımı bir mumdur.', 949.90, 2, 15),
('Charya Maison Mystic Amber', '230gr. Amber ve sandal ağacının sıcak tonlarıyla derin ve sofistike bir atmosfer yaratan doğal ve vegan bir kokulu mumdur.', 750.00, 2, 15),
('Atelier Rebul Saffron Oud', '200ml. Havuç ve tarçınla açılıp safran, tütsü ve deriyle zenginleşen, paçuli ve sandal ağacıyla derinleşen, sofistike ve baharatlı bir atmosfer yaratan lüks bir oda kokusudur.', 1700.00, 2, 15),
('Jo Malone London English Pear & Freesia', '200gr. Olgun armut ve beyaz frezya notalarının amber ve paçuliyle harmanlandığı, ferah, zarif ve sofistike bir kadın parfümüdür.', 2720.00, 2, 15),
('Yankee Candle Amber & Sandalwood', '567gr. Odunsu sandal ağacı ve sıcak amberin birleşimiyle sofistike ve rahatlatıcı bir atmosfer yaratan, tatlı ve baharatlı notalara sahip bir kokulu mumdur.', 1799.00, 2, 1),
('Shiseido Clear Suncare Stick', 'SPF 50+. Ciltte beyaz iz bırakmadan yüksek koruma sağlayan, hafif ve suya dayanıklı güneş koruyucu stikttir.', 2790.00, 3, 10),
('Beauty Of Joseon Matte Mugwort + Camelia', 'SPF 50+ PA++++ ile yüksek koruma sağlarken, mat bir bitiş ve hafif, yağsız bir görünüm sunan, cilt dostu ve pratik bir güneş koruyucu sticktir.', 1019.00, 3, 10),
('La Roche Posay Anthelios İnvisible Fluid', 'Spf 50+. Yüksek UV koruması sağlayan, ciltte iz bırakmayan, hafif ve suya dayanıklı güneş koruyucu fluidtir.', 687.06, 3, 10),
('Lancome UV Expert Youth Shield Milky Bright', 'SPF 50+. Geniş spektrumlu koruma sunan, cilt tonunu dengeleyen ve nemlendirici etkisiyle genç görünüm sağlayan güneş koruyucu kremdir.', 2800.00, 3, 10),
('SISLEY Super Soin Solitaire Youth', 'SPF 30. Cildi UV ışınlarından korurken, anti-aging etkisiyle cildin genç ve sağlıklı kalmasını sağlayan güneş koruyucu bakım ürünüdür.', 7780.0, 3, 10),
('CLINIQUE Moisture Surge Sheertint Hydrator', 'SPF 25. Hafif renkli dokusu ve nemlendirici formülüyle cilde doğal bir ışıltı verirken UV koruması sunan cilt bakım ürünüdür.', 1600.00, 3, 10),
('LANCASTER Sun Perfect Unifying Serum', 'SPF 50. Cilt tonunu dengeleyip lekeleri azaltırken yüksek UV koruması sağlayan, hafif ve nemlendirici özellikte bir serumdur.', 2560.00, 3, 10),
('SUPERGOOP! Glowscreen', 'SPF 30 PA+++ ile cilde güneş koruması sağlarken, hyaluronic asit ve niacinamide içeriğiyle nemlendirir, aydınlık bir ışıltı kazandırır', 2899.00, 3, 10),
('LA MER The Radiant Skintint', 'SPF 30. Cilt tonunu eşitleyip doğal bir ışıltı sağlarken güneş koruması sunan hafif ve nemlendirici özellikte bir renkli nemlendiricidir.', 4510.0, 3, 10),
('DIOR Dreamskin Moist & Perfect Cushion', 'SPF 50 - PA+++, Cilt tonunu eşitleyip gözenek görünümünü azaltarak doğal, mat ve ışıltılı bir görünüm sunan, yüksek UV koruması sağlayan, yaşlanma karşıtı etki gösteren ve anında nemlendirici özellik sunan bir makyaj ve cilt bakım ürünüdür.', 3795.00, 3, 10),
('GLOW RECIPE Plum Plump', '20ml. Kakadu eriği ve çok moleküllü hyaluronik asit içeriğiyle cildi yoğun şekilde nemlendirip dolgunlaştıran, hafif yapılı ve yağsız bir jel kremdir.', 1420.00, 4, 15),
('THE ORDINARY Natural Moisturizing Factors', '30ml. Cildin doğal nem bariyerini destekleyen amino asitler, hyaluronik asit ve seramidler içeren, hafif yapılı ve yağsız bir nemlendiricidir.', 295.00, 4, 15),
('CLINIQUE Moisture Surge™', '30ml. Aloe bioferment ve hyaluronik asit içeriğiyle cildi 3 saniyede nemlendirip 100 saate kadar nemi hapseden, yağsız ve hafif yapılı bir jel kremdir.', 1025.00, 4, 15),
('BYOMA Moisturizing Gel Cream', '50ml. Tri-Ceramide Kompleksi, niacinamide ve yeşil çay özleriyle cilt bariyerini güçlendirip nemlendiren, hafif yapılı ve yağsız bir jel kremdir.', 1089.00, 4, 15),
('LA MER Moisturizing Cream', '30ml. Deniz kaynaklı Miracle Broth™ içeriğiyle cildi derinlemesine nemlendirip yatıştıran, ince çizgi ve kırışıklık görünümünü azaltarak cilde genç ve sağlıklı bir ışıltı kazandıran lüks bir nemlendiricidir.',9260.00, 4, 15),
('Bioderma Atoderm Ultra', '500ml. Gliserin, niasinamid ve omega 3-6-9 içeriğiyle cildi 24 saat boyunca nemlendirip besleyen, kuru ve hassas ciltler için yüz ve vücutta kullanılabilen, bebek, çocuk ve yetişkinlere uygun, hafif dokulu ve gözenekleri tıkamayan bir nemlendirici kremdir.', 845.00, 4, 15),
('cream co. Moisturizer', '50ml. Beş çeşit hyalronik asit, niasinamid ve panthenol içeriğiyle cildi derinlemesine nemlendirip aydınlatan, su bazlı ve hafif yapılı bir yüz nemlendiricisidir.', 291.00, 4, 15),
('IS Clinical Youth Intensive Creme', '50g. Hyaluronik asit, C vitamini ve bakır tripeptit gibi güçlü içerikleriyle cildi 24 saat boyunca derinlemesine nemlendirip ince çizgi ve kırışıklık görünümünü azaltan, yaşlanma karşıtı lüks bir bakım kremidir.', 15988.50, 4, 15),
('Aveda Stress Fix Body Lotion', '200ml. Organik lavanta ve adaçayı özleriyle formüle edilerek cildi nemlendirirken, stres hissini azaltmaya yardımcı olan rahatlatıcı bir vücut losyonudur.', 2810.00, 4, 15),
('Janssen Cosmetics Nemlendirici Krem', '50ml. Kuru ve nemsiz ciltler için özel olarak formüle edilmiş, cildi derinlemesine nemlendirip besleyen, hafif dokulu ve hızlı emilen bir bakım kremidir.', 1460.00, 4, 15);
-- 6️⃣ Siparişler
INSERT INTO order_tbl (user_id, order_date, total) VALUES
(1, '2025-04-08', 1020.00),
(2, '2025-04-07', 40.00);

-- 7️⃣ Sipariş detayları
INSERT INTO order_detail (order_id, product_id, quantity, unit_price, total) VALUES
(1, 1, 1000.00, 1000.00),
(2, 1, 20.00, 20.00),
(2, 2, 20.00, 40.00);

-- 8️⃣ Sepet tablosu
INSERT INTO cart_tbl (user_id, product_id, quantity, unit_price, total) VALUES
(1, 1, 1000.00, 1000.00),
(3, 2, 15.00, 30.00);

-- 9️⃣ Ürün puanlama
INSERT INTO rate_tbl (user_id, product_id, rate) VALUES
(1, 4.5),
(2, 4.0);
