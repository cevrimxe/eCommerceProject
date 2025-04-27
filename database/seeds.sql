
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
('LANCÔME UV Expert Youth Shield Milky Bright', 'SPF 50+. Geniş spektrumlu koruma sunan, cilt tonunu dengeleyen ve nemlendirici etkisiyle genç görünüm sağlayan güneş koruyucu kremdir.', 2800.00, 3, 10),
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
('Janssen Cosmetics Nemlendirici Krem', '50ml. Kuru ve nemsiz ciltler için özel olarak formüle edilmiş, cildi derinlemesine nemlendirip besleyen, hafif dokulu ve hızlı emilen bir bakım kremidir.', 1460.00, 4, 15),
('THE ORDINARY Hyaluronıc Acid %2 + B5', '30ml. Cildi derinlemesine nemlendirip dolgunlaştırırken, vitamin B5 ile cilt bariyerini güçlendirip su kaybını azaltan, hafif yapılı ve yağsız bir serumdur.', 398.90, 5, 20),
('ESTÉE LAUDER Advanced Night Repair', '30ml. Cildin gece boyunca onarımını destekleyen, hiyalüronik asit ve Chronolux™ Power Signal Teknolojisi içeren, yaşlanma karşıtı etkileriyle bilinen bir gece serumudur.', 3850.00, 5, 20),
('GLOW RECIPE Watermelon Glow Dew Drops', '15ml. Cilde anında ışıltı kazandıran, niasinamid ve su kavunu özü içeren, ışıltılı bir serumdur. Mika, sim veya inci içermez, bu sayede doğal bir parlaklık sağlar.', 1340.00, 5, 20),
('CLINIQUE Moisture Surge Active Glow', '30ml. Cildi derinlemesine nemlendirip aydınlatarak anında ışıltı sağlayan, dermatologlar tarafından hassas ciltler dahil tüm cilt tipleri için test edilmiş, parfümsüz ve alerji testinden geçmiş bir serumdur.',  1990.00, 5, 20),
('DIOR Capture Totale Super Potent Eye Serum', '20ml. Göz çevresindeki 9 yaşlanma belirtisini hedef alarak, özel 360° Cryo-Flex aplikatörüyle uygulandığında anında ışıltı ve sıkılaşma sağlar; 4 haftada göz çevresini 4 yaş daha genç gösterir.', 5110.00, 5, 20),
('LANCÔME Rénergie Triple Serum', '50ml. CLancôme Rénergie H.C.F. Triple Serum, cilt tonunu eşitleyen, kırışıklık görünümünü azaltan ve cilde anında ışıltı sağlayan üçlü etkiye sahip yaşlanma karşıtı bir serumdur.', 7250.00, 5, 20),
('La Roche Posay Hyalu B5', '30ml. İki çeşit hyalüronik asit ve vitamin B5 içeren formülüyle cildi derinlemesine nemlendirir, kırışıklıkların görünümünü azaltarak dolgun ve sıkı bir görünüm sağlar.', 2166.00, 5, 20),
('Clarins Double Serum Light Texture', '50ml. Cildi nemlendirirken ince çizgilerin görünümünü azaltarak daha sıkı ve parlak bir cilt sağlar.', 5480.00, 5, 20),
('Lumene Moisturizing Prebiotic Oil Coctail', '30ml. Cildin nem bariyerini destekleyerek 24 saat boyunca yoğun nem sağlar ve kuru ciltler için özel olarak formüle edilmiştir.', 1100.00, 5, 20),
('Anua Niacinamide 10% + TXA 4%', '30ml. Cilt tonunu eşitleyerek lekelerin görünümünü azaltır, gözenekleri sıkılaştırır ve cilde ışıltı kazandırır.', 1235.20, 5, 20),
('Yves Saint Laurent Loveshine RVS 202', 'Dudaklara 24 saate kadar süren nem ve parlaklık sağlayan, besleyici yağlar içeren ve hafif yapısıyla konforlu bir kullanım sunan bir rujdur.', 1960.00, 6, 15),
('Yves Saint Laurent Loveshine RVS 212', 'Dudaklara 24 saate kadar süren nem ve parlaklık sağlayan, besleyici yağlar içeren ve hafif yapısıyla konforlu bir kullanım sunan bir rujdur.', 1960.00, 6, 15),
('Yves Saint Laurent Loveshine RVS 209', 'Dudaklara 24 saate kadar süren nem ve parlaklık sağlayan, besleyici yağlar içeren ve hafif yapısıyla konforlu bir kullanım sunan bir rujdur.', 1960.00, 6, 15),
('DIOR Rouge Dior 777', 'Çiçek özleriyle zenginleştirilmiş formülü sayesinde dudaklara 24 saate kadar süren nem ve konfor sunar; kadifemsi mat, saten ve yeni "new veil" gibi farklı bitiş seçenekleriyle her zevke hitap eder.', 2215.00, 6, 15),
('DIOR Rouge Dior 028', 'Çiçek özleriyle zenginleştirilmiş formülü sayesinde dudaklara 24 saate kadar süren nem ve konfor sunar; kadifemsi mat, saten ve yeni "new veil" gibi farklı bitiş seçenekleriyle her zevke hitap eder.', 2215.00, 6, 15),
('DIOR Rouge Dior 080', 'Çiçek özleriyle zenginleştirilmiş formülü sayesinde dudaklara 24 saate kadar süren nem ve konfor sunar; kadifemsi mat, saten ve yeni "new veil" gibi farklı bitiş seçenekleriyle her zevke hitap eder.', 2215.00, 6, 15),
('FENTY BEAUTY Fenty Icon 01', 'Zengin pigmentasyonu, nemlendirici formülü ve şık tasarımıyla dudaklara uzun süre kalıcı, canlı renkler sunar.', 1269.00, 6, 15),
('FENTY BEAUTY Fenty Icon 02', 'Zengin pigmentasyonu, nemlendirici formülü ve şık tasarımıyla dudaklara uzun süre kalıcı, canlı renkler sunar.', 1269.00, 6, 15),
('FENTY BEAUTY Fenty Icon 03', 'Zengin pigmentasyonu, nemlendirici formülü ve şık tasarımıyla dudaklara uzun süre kalıcı, canlı renkler sunar.', 1269.00, 6, 15),
('GUERLAIN ROUGE G 968', '%89 cilt bakımı bazlı formülüyle dudakları nemlendirir ve dolgunlaştırırken, lüks tasarımı ve zengin renk seçenekleriyle zarif bir makyaj deneyimi sunar.', 2405.00, 6, 150),
('GUERLAIN ROUGE G 879', '%89 cilt bakımı bazlı formülüyle dudakları nemlendirir ve dolgunlaştırırken, lüks tasarımı ve zengin renk seçenekleriyle zarif bir makyaj deneyimi sunar.', 2405.00, 6, 150),
('GUERLAIN ROUGE G 880', '%89 cilt bakımı bazlı formülüyle dudakları nemlendirir ve dolgunlaştırırken, lüks tasarımı ve zengin renk seçenekleriyle zarif bir makyaj deneyimi sunar.', 2405.00, 6, 150),
('CHARLOTTE TILBURY Look of Love Mrs Kisses', 'Ruj koleksiyonu, dudaklara uzun süre kalıcı nem ve canlı renkler sunarak doğal, ışıltılı bir görünüm sağlar.', 2089.00, 6, 15),
('CHARLOTTE TILBURY Look of Love Wedding Belles', 'Ruj koleksiyonu, dudaklara uzun süre kalıcı nem ve canlı renkler sunarak doğal, ışıltılı bir görünüm sağlar.', 2089.00, 6, 15),
('CHARLOTTE TILBURY Look of Love First Dance', 'Ruj koleksiyonu, dudaklara uzun süre kalıcı nem ve canlı renkler sunarak doğal, ışıltılı bir görünüm sağlar.', 2089.00, 6, 15),
('VALENTINO Spike Valentino 111A', '10 saate kadar konforlu ve kalıcı mat renk sunan, pamuk yağı içeren nemlendirici formülüyle dudakları besler ve ikonik altın pirinç ambalajıyla lüks bir deneyim sunar.', 2579.00, 6, 15),
('VALENTINO Spike Valentino 508R', '10 saate kadar konforlu ve kalıcı mat renk sunan, pamuk yağı içeren nemlendirici formülüyle dudakları besler ve ikonik altın pirinç ambalajıyla lüks bir deneyim sunar.', 2579.00, 6, 15),
('VALENTINO Spike Valentino 77A', '10 saate kadar konforlu ve kalıcı mat renk sunan, pamuk yağı içeren nemlendirici formülüyle dudakları besler ve ikonik altın pirinç ambalajıyla lüks bir deneyim sunar.', 2579.00, 6, 15),
('ARMANI Luminous Silk 6', '30ml. İpeksi dokusu ve orta kapatıcılığıyla cilde doğal bir ışıltı kazandırarak gün boyu kalıcı, kusursuz bir görünüm sağlar.', 3070.00, 7, 10),
('ARMANI Luminous Silk 8', '30ml. İpeksi dokusu ve orta kapatıcılığıyla cilde doğal bir ışıltı kazandırarak gün boyu kalıcı, kusursuz bir görünüm sağlar.', 3070.00, 7, 10),
('ARMANI Luminous Silk 1.5', '30ml. İpeksi dokusu ve orta kapatıcılığıyla cilde doğal bir ışıltı kazandırarak gün boyu kalıcı, kusursuz bir görünüm sağlar.', 3070.00, 7, 10),
('DIOR BACKSTAGE Face & Body Foundation 2N', 'Ultra ince dokusu ve %94 doğal kökenli içerikleriyle cilde doğal, ışıltılı bir görünüm kazandıran, suya ve tere dayanıklı, uzun süre kalıcı bir fondötendir.', 2080.00, 7, 10),
('DIOR BACKSTAGE Face & Body Foundation 10N', 'Ultra ince dokusu ve %94 doğal kökenli içerikleriyle cilde doğal, ışıltılı bir görünüm kazandıran, suya ve tere dayanıklı, uzun süre kalıcı bir fondötendir.', 2080.00, 7, 10),
('DIOR BACKSTAGE Face & Body Foundation 2CR', 'Ultra ince dokusu ve %94 doğal kökenli içerikleriyle cilde doğal, ışıltılı bir görünüm kazandıran, suya ve tere dayanıklı, uzun süre kalıcı bir fondötendir.', 2080.00, 7, 10),
('MAKEUP BY MARIO SurrealSkin™ Foundation 4C', '30ml. Cilde nefes aldıran yapısı ve ışıltılı bitişiyle doğal bir görünüm sunan, orta kapatıcılığa sahip ve uzun süre kalıcı bir fondötendir. Nemlendirici içerikleriyle cildi beslerken, hafif yapısıyla gün boyu konforlu bir kullanım sağlar.', 2649.00, 7, 10),
('MAKEUP BY MARIO SurrealSkin™ Foundation 11N', '30ml. Cilde nefes aldıran yapısı ve ışıltılı bitişiyle doğal bir görünüm sunan, orta kapatıcılığa sahip ve uzun süre kalıcı bir fondötendir. Nemlendirici içerikleriyle cildi beslerken, hafif yapısıyla gün boyu konforlu bir kullanım sağlar.', 2649.00, 7, 10),
('MAKEUP BY MARIO SurrealSkin™ Foundation 30W', '30ml. Cilde nefes aldıran yapısı ve ışıltılı bitişiyle doğal bir görünüm sunan, orta kapatıcılığa sahip ve uzun süre kalıcı bir fondötendir. Nemlendirici içerikleriyle cildi beslerken, hafif yapısıyla gün boyu konforlu bir kullanım sağlar.', 2649.00, 7, 10),
('NARS Light Reflecting Foundation Oslo', '30ml. Makyaj ve cilt bakımını bir araya getiren hibrit formülüyle, orta düzeyde artırılabilir kapatıcılık ve doğal, ışıltılı bir bitiş sunar; cilt kusurlarını anında bulanıklaştırırken, düzenli kullanımda cilt berraklığını zamanla gözle görülür şekilde iyileştirir.', 2485.00, 7, 10),
('NARS Light Reflecting Foundation Macao', '30ml. Makyaj ve cilt bakımını bir araya getiren hibrit formülüyle, orta düzeyde artırılabilir kapatıcılık ve doğal, ışıltılı bir bitiş sunar; cilt kusurlarını anında bulanıklaştırırken, düzenli kullanımda cilt berraklığını zamanla gözle görülür şekilde iyileştirir.', 2485.00, 7, 10),
('NARS Light Reflecting Foundation Lima', '30ml. Makyaj ve cilt bakımını bir araya getiren hibrit formülüyle, orta düzeyde artırılabilir kapatıcılık ve doğal, ışıltılı bir bitiş sunar; cilt kusurlarını anında bulanıklaştırırken, düzenli kullanımda cilt berraklığını zamanla gözle görülür şekilde iyileştirir.', 2485.00, 7, 10),
('CHANEL LES BEIGES WATER FRESH TINT B80', '30ml. %75 su içeriği ve mikro damlacık teknolojisiyle cilde taze, nemli ve doğal bir ışıltı kazandıran ultra hafif bir ten ürünüdür.', 2800.00, 7, 10),
('CHANEL LES BEIGES WATER FRESH TINT B10', '30ml. %75 su içeriği ve mikro damlacık teknolojisiyle cilde taze, nemli ve doğal bir ışıltı kazandıran ultra hafif bir ten ürünüdür.', 2800.00, 7, 10),
('CHANEL LES BEIGES WATER FRESH TINT B20', '30ml. %75 su içeriği ve mikro damlacık teknolojisiyle cilde taze, nemli ve doğal bir ışıltı kazandıran ultra hafif bir ten ürünüdür.', 2800.00, 7, 10),
('LANCÔME Teint Idole Ultra Wear 315C', '24 saat kalıcılık sunan, mat bitişli ve hafif yapısıyla ciltte doğal bir görünüm sağlayan yüksek kapatıcılığa sahip bir fondötendir.', 2695.00, 7, 10),
('LANCÔME Teint Idole Ultra Wear 425C', '24 saat kalıcılık sunan, mat bitişli ve hafif yapısıyla ciltte doğal bir görünüm sağlayan yüksek kapatıcılığa sahip bir fondötendir.', 2695.00, 7, 10),
('LANCÔME Teint Idole Ultra Wear 105W', '24 saat kalıcılık sunan, mat bitişli ve hafif yapısıyla ciltte doğal bir görünüm sağlayan yüksek kapatıcılığa sahip bir fondötendir.', 2695.00, 7, 10),
('Charlotte Tilbury Pillow Talk Push Up Lashes Dream Pop', 'Kirpikleri anında hacimlendirip uzatarak 24 saat boyunca dikey kaldırma etkisi sunan, göz rengini vurgulayan mürdüm kahverengi tonunda bir maskaradır.', 1919.00, 8, 15),
('Charlotte Tilbury Pillow Talk Push Up Lashes Super Black', 'Kirpiklere anında hacim, uzunluk ve 24 saatlik dikey kaldırma etkisi sağlayan yoğun siyah tonlu bir maskaradır.', 1919.00, 8, 15),
('Yves Saint Laurent Lash Clash', 'Kirpiklere ekstra hacim ve yoğun siyah renk kazandırarak çarpıcı ve cesur bir görünüm sunan uzun süre kalıcı bir maskaradır.', 2200.00, 8, 15),
('Yves Saint Laurent Mascara Lash Clash 02 Brown', 'Kirpiklere anında maksimum %200 hacim kazandıran, 24 saat kalıcı, yoğun kahverengi tonlu bir maskaradır.', 2200.0, 8, 15),
('BENEFIT COSMETICS BADgal Bounce', 'Kirpikleri kökten uca yoğun hacimle yükselten ve esnek yapısıyla gün boyu çarpıcı bir görünüm sağlayan maskaradır.', 1809.00, 8, 15),
('LANCÔME Cils Booster Lash Serum', 'Amino asitlerle zenginleştirilmiş formülüyle kirpikleri kökten uca besleyerek güçlendirir ve makyaj temizliği sırasında dökülmeleri azaltır.', 2550.00, 8, 15),
('LANCÔME Lash Idôle', 'Kirpiklere anında hacim, uzunluk ve kalkıklık sağlayarak 24 saate kadar kalıcı, topaklanmayan ve hafif bir görünüm sunar.', 1750.00, 8, 15),
('FENTY BEAUTY Hella Thicc Volumizing Mascara', 'Ultra kremsi formülü ve dar uçlu fırçasıyla kirpiklere yoğun hacim, uzunluk ve kalkıklık kazandırarak dramatik bir görünüm sunar; ter, nem ve bulaşmaya karşı dayanıklıdır.', 599.00, 8, 15),
('ARMANI Vertigo Lift', 'Kirpiklere yoğun hacim ve dramatik uzunluk kazandırarak etkileyici, kalkık ve hacimli kirpikler yaratır; 24 saat boyunca akma ve topaklanma yapmaz.', 2250.00, 8, 15),
('ESTÉE LAUDER Sumptuous Extreme', 'Kirpiklere dramatik hacim, kalkıklık ve uzunluk kazandırarak takma kirpik etkisi yaratır; özel formülüyle gün boyu kalıcıdır.', 1890.00, 8, 15),
('NARS Climax Extreme', 'Tek katta uygulamada bile dramatik hacim ve derin siyah pigment sunarak kirpiklere çarpıcı bir görünüm kazandırır.', 1490.00, 8, 15),
('TARTE Tartelette™ Tubing', 'Kirpiklere hacim, uzunluk ve kalkıklık kazandıran, 24 saat boyunca topaklanma ve akma yapmayan, sıcak suyla kolayca temizlenen bir maskaradır.', 899.00, 8, 15),
('RARE BEAUTY Perfect Strokes Universal', 'Kirpikleri kökten uca besleyerek hacimlendirir, uzatır ve kıvırırken topaklanma yapmadan doğal bir görünüm sunar; formülünde bulunan hint yağı sayesinde kirpikleri yumuşak tutar ve gün boyu kalıcılık sağlar.', 1379.00, 8, 15);
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
