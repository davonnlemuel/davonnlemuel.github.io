(() => {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     Language
  ------------------------------------------------------------------ */
  let lang = 'en';
  try { if (localStorage.getItem('dl-lang') === 'id') lang = 'id'; } catch (e) {}

  const ID = {
    'nav.exp': 'Pengalaman', 'nav.work': 'Proyek', 'nav.skills': 'Keahlian', 'nav.cert': 'Sertifikasi', 'nav.contact': 'Kontak',
    'h.sub': 'Matematika · Data Analyst · Ilmu Aktuaria',
    'nav.home': 'Portofolio Davonn', 'm.phone': 'Telepon', 'e.db': 'Data Analytics dan Business Intelligence', 'd.db': 'Jul 2026 - sekarang', 'e.sma': 'SMA, jurusan IPA', 'e.smaw': 'Jakarta Barat', 'd.sma': 'Jul 2018 - Jul 2021',
    'm.loc': 'Domisili', 'm.now': 'Sekarang', 'm.nowv': 'Underwriting Intern di Asuransi Asei', 'm.open': 'Terbuka untuk', 'm.openv': 'Posisi Data Analyst, Business Intelligence, dan Data Scientist',
    'h.lead': 'Saya mengubah dataset mentah menjadi dashboard dan tool yang dipakai orang untuk mengambil keputusan. Bagian yang paling saya nikmati adalah saat tabel yang berantakan akhirnya mulai masuk akal. Belakangan saya juga mendalami data science, membangun model untuk memprediksi churn, klaim, dan premi, dan saya ingin membawa itu ke sebuah tim sebagai analis. Di bawah ini karya saya sejauh ini, dari magang, kuliah, dan proyek pribadi.',
    's.7': 'Cara kerja',
    's.7v': 'Kerja sama tim dan kolaborasi, problem solving, interpretasi data, mempresentasikan temuan ke manajemen',
    'c.cap': 'Ringkasan', 'c.h1': 'Yang saya kerjakan', 'c.h2': 'Contohnya',
    'c.r1': 'Dashboard Manajemen', 'c.r1e': '<a href="#exA">Company dashboard ASEI</a> · <a href="#work-oil">Penjualan minyak goreng (Power BI)</a> · <a href="#work-tableau">Data story Olist (Tableau)</a>',
    'c.r2': 'Persiapan Data Mentah', 'c.r2e': '<a href="#experience">Laporan produksi, klaim, dan renewal yang ditindaklanjuti tim</a>',
    'c.r3': 'Pemodelan Prediktif', 'c.r3e': '<a href="#work-churn">Churn pelanggan, model klasifikasi machine learning</a>',
    'c.r5': 'Pricing Aktuaria', 'c.r5e': '<a href="#work-calc">Kalkulator premi asuransi jiwa online, tabel TMI IV</a>',
    'd.uni': 'Sep 2021 - Feb 2026', 'd.nur': 'Jul 2024 - Sep 2024', 'd.ssb': 'Jan 2022 - Agu 2023',
    'a.mail': 'Kirim email',
    'c1.t': 'Tentang saya',
    'c1.a': 'Saya lulusan Matematika dengan pengalaman langsung di industri asuransi. Saya membangun dashboard dan laporan untuk manajemen senior dari data mentah sistem, dan memakai Excel serta Python untuk analisis eksploratif dan machine learning.',
    'c1.b': 'Saya mencari posisi Data Analyst yang fokus mengubah data operasional menjadi keputusan bisnis.',
    'c1.cof': 'Semasa kuliah saya ikut mendirikan usaha kopi mahasiswa yang menjual 150 gelas per hari lewat event kampus, pre-order, dan retailer lokal.',
    'c1.edu': 'Pendidikan', 'c1.e1': 'Universitas', 'c1.e2': 'Gelar', 'c1.e2v': 'Sarjana Matematika, peminatan ilmu aktuaria', 'c1.e3': 'Periode',
    'c1.th': 'Skripsi',
    'c1.thv': 'Penentuan Premi Asuransi Kendaraan Bermotor Menggunakan Sistem Bonus-Malus dengan Frekuensi Klaim Berdistribusi Geometrik dan Tingkat Keparahan Klaim Berdistribusi Lomax',
    'e.smaw': 'Jakarta Barat',
    'e.sma': 'SMA, jurusan IPA',
    'e.ach': 'Prestasi',
    'e.achv': 'Juara 2 Gitar Solo FLS2N Jakarta Barat',
    'd.sma': 'Jul 2018 - Jul 2021',
    'c1.e4': 'Mata kuliah', 'c1.e4v': 'Data Modeling with Python, Machine Learning with Python, Statistika Matematika, Analisis Runtun Waktu, Teori Risiko',
    'c1.e5': 'Bahasa', 'c1.e5v': 'Indonesia (asli), Inggris (EF SET C1 Advanced)',
    'c2.t': 'Pengalaman', 'c2.role': 'Underwriting Intern', 'c2.date': 'Agu 2026 - sekarang',
    'c2.d1': 'Membangun dashboard monitoring portofolio untuk 40 produk, mencakup premi, klaim, loss ratio, kinerja cabang, dan sebaran risiko polis, lalu mempresentasikan insight-nya ke CTO dan para kepala divisi.',
    'c2.d2': 'Mengembangkan kalkulator rate premi dan alat klasifikasi risiko untuk mendukung penilaian risiko dan keputusan penempatan reasuransi treaty/fakultatif.',
    'c2.d3': 'Membangun sistem monitoring pending matters untuk melacak pekerjaan underwriting yang belum selesai serta menilai beban kerja dan kinerja staf.',
    'c2.d4': 'Menyusun laporan fakultatif mingguan untuk kepala divisi, memantau retensi premi dan alokasi premi ke reasuransi treaty dan fakultatif.',
    'c2.d5': 'Melakukan pemodelan data klaim untuk menemukan faktor signifikan yang berkaitan dengan terjadinya klaim dan mendukung analisis risiko.',
    'c2.d6': 'Menyusun laporan produksi, klaim, dan pipeline renewal dari 200.000+ baris data mentah sistem, serta mengonsolidasikan data produksi, reasuransi, aktuaria, dan klaim untuk permintaan konsultan eksternal.',
    'ex.at': 'Dashboard perusahaan (replika)', 'ex.illus': 'Data dummy',
    'ta.1': 'Monitor portofolio', 'ta.2': 'Persebaran risiko', 'ta.3': 'Pending matters', 'ta.4': 'Fakultatif mingguan', 'ta.5': 'Profil klaim',
    'pa1.i': 'Premi, klaim, dan loss ratio per produk dan cabang, plus profil risiko portofolio. Filter per tahun dan lini bisnis.',
    'f.year': 'Tahun', 'f.line': 'Lini bisnis',
    'ch.lr': 'Produk mana yang paling rugi?', 'ch.lrs': 'loss ratio, 10 teratas, merah di atas 60%',
    'ch.br': 'Premi dan klaim per cabang', 'lg.prem': 'Premi', 'lg.claim': 'Klaim',
    'ch.si': 'Seberapa besar risiko yang kita pegang?', 'ch.sis': 'jumlah polis per kelompok nilai pertanggungan',
    'pa2.i': 'Untuk melihat portofolio yang dipegang setiap kelas bisnis (COB) di tiap cabang, dari risiko low, medium, high, sampai very high. Saya memakainya di rapat dengan kantor cabang: saya mempresentasikan profil risiko tiap cabang per kelas bisnis, lalu menindaklanjuti arahan atasan dari rapat itu.',
    'f.cob': 'Kelas bisnis (COB)', 'f.occ': 'Okupasi / risiko', 'f.si': 'Nilai pertanggungan', 'f.ded': 'Deductible',
    'ch.split': 'Penempatan nilai pertanggungan', 'lg.own': 'Retensi sendiri', 'lg.treaty': 'Treaty', 'lg.fac': 'Fakultatif',
    'pa3.i': 'Untuk melihat underwriter di tiap cabang yang masih punya pengajuan pending, dan sudah berapa lama pengajuan itu menunggu.',
    'ch.pend': 'Kasus pending per underwriter, menurut lama menunggu (hari)', 'ch.br2': 'Kasus pending per cabang',
    'pa4.i': 'Pembagian premi tertulis tiap minggu antara retensi sendiri, treaty, dan reasuransi fakultatif, seperti di laporan mingguan untuk kepala divisi.',
    'ch.fac': 'Alokasi premi per minggu',
    'pa5.i': 'Klaim yang sudah settled: apa penyebab kerugiannya, tertanggung mana yang klaimnya paling besar, dan kapan kerugian terjadi dalam periode polis.',
    'ch.odds': 'Odds ratio klaim per faktor', 'ch.freq': 'Klaim per 100 polis, per kelompok nilai pertanggungan',
    'ex.note': '<b>Catatan:</b> dashboard aslinya berjalan dengan data perusahaan dan tetap berada di dalam perusahaan. Replika ini mempertahankan struktur dan pertanyaan yang dijawabnya; semua angka, tertanggung, dan underwriter di sini adalah data dummy. Yang ditampilkan di sini hanya sebagian; dashboard aslinya punya jauh lebih banyak halaman.',
    'c3.r1': 'Actuarial Intern',
    'c3.d1': 'Memvalidasi dan membersihkan data demografi dan gaji karyawan di Excel agar siap untuk valuasi Defined Benefit Obligation.',
    'c3.d2': 'Mengerjakan latihan valuasi PSAK 24 berbasis kasus dengan supervisi, memakai metode Projected Unit Credit dengan berbagai asumsi aktuaria.',
    'c3.r2': 'Part-time Administrative &amp; Finance Assistant',
    'c3.d3': 'Memantau sekitar 2.200 transaksi harian (penjualan, biaya operasional, dan pembelian aset) di Excel untuk distributor unggas dengan 97 klien aktif.',
    'c3.d4': 'Mengelola piutang: melacak saldo yang belum dibayar dan mengoordinasikan penagihan ke seluruh klien.',
    'c3.d5': 'Merapikan catatan keuangan untuk monitoring arus kas dan pelaporan internal.',
    'ex.bt': 'Dashboard penjualan &amp; piutang (replika)',
    'tb.1': 'Penjualan &amp; margin', 'tb.2': 'Piutang', 'tb.3': 'Peta pelanggan',
    'pb1.i': 'Penjualan bulanan, laba kotor, dan selisih harga jual terhadap HPP per kilogram, dibangun dari buku penjualan.',
    'ch.sales': 'Penjualan per bulan, HPP dan laba kotor', 'lg.sales': 'Penjualan', 'lg.gp': 'Laba kotor',
    'ch.price': 'Harga jual vs HPP', 'lg.sell': 'Harga jual', 'lg.cost': 'HPP',
    'pb2.i': 'Utang baru pelanggan dibandingkan pembayaran yang masuk tiap bulan, dan umur saldo yang masih terbuka.',
    'ch.debt': 'Utang baru vs pembayaran', 'lg.new': 'Utang baru', 'lg.paid': 'Pembayaran', 'ch.age': 'Piutang terbuka per umur',
    'pb3.i': 'Setiap pelanggan dipetakan berdasarkan kecepatan bayar dan seberapa banyak utangnya dilunasi, sehingga penagihan dimulai dari kelompok paling bawah.',
    'ch.map': 'Siapa yang perlu ditagih duluan?', 'lg.q1': 'Bayar tepat waktu', 'lg.q2': 'Lambat tapi melunasi', 'lg.q3': 'Prioritas penagihan',
    'ex.noteb': 'Nama pelanggan dan nominal diganti dengan nilai acak. Halaman-halamannya mengikuti dashboard aslinya.',
    'c4.t': 'Proyek',
    'w.tools': 'Tools', 'w.data': 'Data', 'w.ctx': 'Konteks', 'w.method': 'Metode', 'w.host': 'Hosting', 'w.type': 'Jenis',
    'w1.data': 'Tiga dataset churn: Telco Customer Churn (Kaggle, 7.032 pelanggan), penerbangan berulang (135.944 data penerbangan), dan penumpang pesawat (1.333 penumpang)',
    'w1.ctx': 'Kelompok 4 orang, proyek akhir Pemodelan Matematika, UNPAR',
    'w1.t': 'Prediksi Churn Pelanggan pada Data Telekomunikasi dan Maskapai',
    'w1.p': 'Perusahaan jasa kehilangan pendapatan berulang setiap kali pelanggan berhenti. Kalau pelanggan yang paling mungkin berhenti bisa dikenali, perusahaan bisa menawarkan sesuatu lebih dulu. Kami membandingkan model klasifikasi pada tiga dataset churn dan melihat variabel apa yang mendorong churn.',
    
    'w1.s1': 'Siapkan', 'w1.s1p': 'Bersihkan data, encode variabel kategori, standarisasi numerik.',
    'w1.s2': 'Seimbangkan', 'w1.s2p': 'Oversampling kelas churn supaya model tidak cuma menebak "bertahan".',
    'w1.s3': 'Modelkan', 'w1.s3p': 'Tuning SVM, LightGBM, AdaBoost, dan hybrid AdaBoost-SVM. Di data telekomunikasi kami menambahkan AdaBoost-Naive Bayes buatan kami sendiri.',
    'w1.s4': 'Evaluasi', 'w1.s4p': 'Accuracy, F1, precision, recall, ROC-AUC, PR-AUC, dan runtime pada data uji.',
    'w1.ds': 'Dataset',
    'w1.ds1': 'Telekomunikasi',
    'w1.ds2': 'Penerbangan berulang',
    'w1.ds3': 'Penumpang pesawat',
    'w1.evh': 'Evaluasi model',
    'w1.drh': 'Variabel terpenting',
    'w1.open': 'Baca laporan (Google Drive)',
    'w1.m': 'Model', 'w1.tnote': 'Nilai terbaik per kolom berwarna hijau. Model terbaik secara keseluruhan disorot.',
    'w2.ch': 'Dari setiap 100 pengunjung',
    'w3.data': '2.000 data penjualan level toko, 2022-2024, 12 kota, 10 merek, 5 jenis minyak',
    'w3.t': 'Dashboard Penjualan Satu Halaman untuk Retailer Minyak Goreng',
    'w3.p': 'Bisa difilter per tahun, bulan, kota, dan merek, dengan kartu KPI untuk penjualan, volume, dan toko aktif, serta measure DAX yang memilih merek dan kota terlaris.',
    'w3.k1': 'Total penjualan', 'w3.k2': 'Volume terjual', 'w3.k3': 'Bulan terlemah', 'w3.k3v': 'Mei, 22% di bawah rata-rata bulanan', 'w3.k4': 'Kota teratas', 'w3.k4v': 'Al Baha, 11,7% penjualan dan $721 per toko',
    'w3.reco': '<b>Yang perlu dilakukan:</b> siapkan promo sebelum penurunan Mei, tambah stok untuk Juli dan puncak November-Desember, dan pelajari apa yang membuat Al Baha unggul untuk diterapkan di kota lain.',
    'w4.t': 'Kalkulator Premi Asuransi Jiwa Berbasis Web',
    'w4.p': 'Mengubah perhitungan premi netto asuransi jiwa menjadi beberapa input saja, jadi hasilnya keluar dalam hitungan detik tanpa menyusun nilai kini aktuaria secara manual.',
    'w4.k1': 'Produk',
    'w4.v1': 'Whole life, term insurance, endowment, pure endowment (dwiguna)',
    'w4.k2': 'Jumlah tertanggung',
    'w4.v2': 'Single life, joint life, last survivor',
    'w4.k3': 'Input',
    'w4.v3': 'Usia, tingkat bunga, masa pertanggungan, masa pembayaran premi, uang pertanggungan',
    'w4.k4': 'Dasar',
    'w4.v4': 'Premi netto, manfaat dibayar di akhir tahun kematian, Tabel Mortalita Indonesia IV (2019)',
    'w4.src': 'Rumus mengacu pada',
    'w4.ctx': 'Dibuat bersama Fidellya Sitorus',
    'w4.open': 'Buka kalkulator',
    'w5.t': 'Premi Asuransi Kendaraan Bermotor dengan Sistem Bonus-Malus',
    'w5.free': 'Tahun tanpa klaim', 'w5.claim': 'Ajukan klaim', 
    'w5.note': 'Skema cara skala bonus-malus menggerakkan pengemudi: 10 kelas, turun satu kelas per tahun tanpa klaim, naik tiga per klaim. Skripsinya mencocokkan skala sendiri dengan data.',
    'e.formal': 'Pendidikan formal', 'e.nonformal': 'Pendidikan non-formal', 'e.track': 'Materi yang sudah saya pelajari',
    'e.dbn': 'Kelas malam bersama mentor, presentasi proyek di sepanjang program, dan live coding test Python dan SQL. Wisuda pada Desember 2026.',
    'tr.next': 'Akan datang',
    'tr.t1': 'Excel dan dashboard', 'tr.t1s': 'Lookup, PivotTable, dashboard interaktif dengan slicer',
    'tr.t2': 'Python', 'tr.t2s': 'Tipe data sampai OOP dan kode modular, di Jupyter dan Colab',
    'tr.t3': 'Statistik untuk data', 'tr.t3s': 'Statistik deskriptif, distribusi, uji t, ANOVA, p-value',
    'tr.t4': 'Data cleaning', 'tr.t4s': 'Missing value, outlier, encoding, join dan group-by di pandas',
    'tr.t5': 'Visualisasi dan EDA', 'tr.t5s': 'Matplotlib, Seaborn, cross-tab, sampling',
    'tr.t6': 'SQL', 'tr.t6s': 'Query, subquery, window function, dan CTE di PostgreSQL',
    'tr.t7': 'Pembuatan dashboard', 'tr.t7s': 'Dashboard interaktif di Tableau, plus data storytelling (<a href="#work-tableau">lihat project Olist</a>)',
    'tr.t8': 'Analitik media sosial dan digital', 'tr.t8s': 'Google Analytics, metrik media sosial, channel marketing',
    'tr.t9': 'Analisis funnel dan cohort', 'tr.t9s': 'Konversi per tahap, retensi per cohort (lihat <a href="#work-ecom">project e-commerce</a> dan <a href="#work-more">analisis edtech dan fintech</a>)',
    'tr.t10': 'A/B testing', 'tr.t10s': 'Desain tes, signifikansi, membaca hasil',
    'tr.t11': 'Segmentasi pelanggan', 'tr.t11s': 'Teknik segmentasi, hasil di Power BI',
    'tr.t12': 'Final project dan wisuda', 'tr.t12s': 'Capstone, take-home test, dan coding test',
    'tw.t1': 'Jul 2026', 'tw.t2': 'Agu 2026', 'tw.t3': 'Agu 2026', 'tw.t4': 'Agu 2026', 'tw.t5': 'Sep 2026', 'tw.t6': 'Sep 2026', 'tw.t7': 'Sep 2026', 'tw.t8': 'Okt 2026', 'tw.t9': 'Okt 2026', 'tw.t10': 'Okt 2026', 'tw.t11': 'Okt 2026', 'tw.t12': 'Nov - Des 2026',
    'v.cap': 'Di tenda kami saat event kampus, bersama co-founder saya. Di depan: kopi botolan untuk pre-order dan retailer.',
    'd.kopi': 'Jan 2024 - Jul 2025',
    'v.h': 'Kewirausahaan', 'v.role': 'Co-Founder', 'v.kind': 'Usaha kopi mahasiswa',
    'v.d1': 'Ikut mendirikan usaha kopi untuk mahasiswa dan mengelola penjualan lewat pre-order dan distribusi langsung.',
    'v.d2': 'Menjalankan tenant di event kampus dengan penjualan sekitar 150 gelas kopi per hari.',
    'v.d3': 'Membangun kerja sama dengan toko retail lokal untuk memperluas distribusi.',
    'v.d4': 'Mengurus catatan keuangan, penentuan harga, promosi, dan koordinasi dengan panitia event kampus.',
    'w5.type': 'Skripsi, Matematika, UNPAR',
    'w5.data': 'Portofolio asuransi tanggung jawab pihak ketiga kendaraan bermotor di Belgia, 1997: 14.505 pemegang polis. Tingkat keparahan klaim disimulasikan dengan Python.',
    'w5.method': 'Premi Bayesian, maximum likelihood, uji Chi-Square, Python dan Excel',
    'w5.f3': 'premi awal dengan frekuensi dan tingkat keparahan',
    'w5.simh': 'Coba sendiri: bagaimana premi bergerak',
    'w5.simp': 'Tabel ini berisi premi tahun berikutnya setelah <i>t</i> tahun dengan total <i>K</i> klaim. Tambahkan tahun di bawah, stabilonya akan mengikuti posisi Anda di tabel.',
    'w5.msev': 'Frekuensi dan keparahan',
    'w5.mfreq': 'Frekuensi saja',
    'w5.tlab': 'Total keparahan klaim (T)',
    'w5.y0': 'Tahun tanpa klaim',
    'w5.y1': 'Tahun dengan 1 klaim',
    'w5.y2': 'Tahun dengan 2 klaim',
    'w5.reset': 'Ulang',
    'w5.findh': 'Temuan skripsi',
    'w5.repo': 'Baca skripsi (repositori UNPAR)',
    'w5.gd': 'Data',
    'w5.f1': 'pemegang polis<br>89,4% tidak mengajukan klaim dalam setahun',
    'w5.gg': 'Geometrik · frekuensi klaim',
    'w5.f2': 'χ² = 1,579, di bawah nilai kritis 7,815 pada α = 5%',
    'w5.gl': 'Lomax · tingkat keparahan klaim',
    'w5.ps': 'parameter bentuk',
    'w5.pm': 'parameter skala',
    'w5.pnote': 'Tanda topi menandakan taksiran dari data. Ketiganya menghasilkan premi awal $246,66.',
    'w5.p': 'Premi kendaraan bermotor di Indonesia masih banyak memakai tarif tetap, jadi pengemudi yang hati-hati membayar sama dengan yang klaim setiap tahun. Sistem Bonus-Malus adalah cara yang lebih adil untuk menentukan premi: premi turun setelah tahun tanpa klaim dan naik setelah ada klaim. Saya memodelkan frekuensi klaim sebagai Poisson dengan parameter eksponensial, yang menghasilkan distribusi geometrik, dan tingkat keparahan klaim sebagai eksponensial dengan parameter inverse gamma, yang menghasilkan distribusi Lomax.',
    'w5.k1': '<b>Model geometrik cocok dengan data jumlah klaim.</b> Dengan <i class="hat hat--tall">θ</i> = 8,3506, statistik Chi-Square sebesar 1,579 terhadap nilai kritis 7,815 (df = 3, α = 5%), sehingga model tidak ditolak.',
    'w5.k2': '<b>Memperhitungkan besar klaim membuat malus lebih adil.</b> Tiga klaim di tahun pertama menaikkan premi 257,22% jika hanya frekuensi yang dihitung (Tabel 4.6), tetapi hanya 76,17% jika tingkat keparahan ikut dihitung (Tabel 4.5).',
    'w5.k3': '<b>Klaim yang lebih besar menaikkan malus; bonus tanpa klaim tidak berubah.</b> Total keparahan T yang lebih tinggi menaikkan malus di setiap kolom K pada Tabel 4.7 sampai 4.9, sementara bonus tanpa klaim tetap sama: 26,43% setelah tiga tahun tanpa klaim.',
    'w5.k4': '<b>Tiap parameter menggeser bonus dan malus ke arah berbeda.</b> θ yang lebih besar menurunkan bonus dan menaikkan malus. Parameter skala m yang lebih besar menurunkan malus, dan parameter bentuk s yang lebih besar menaikkannya; keduanya tidak mengubah bonus.',
    'w.more': 'Analisis lainnya',
    'w7.n': 'Data Story Penjualan Olist',
    'w7.ns': 'Tableau · Bootcamp Dibimbing',
    'w7.data': 'Olist, marketplace online di Brasil: 97.688 pesanan dari 27 provinsi, Jan 2017 sampai Okt 2018',
    'w7.ctx': 'Tugas 8, bootcamp Data Analytics and Business Intelligence Dibimbing',
    'w7.t': 'Penjualan Olist Naik Pesat, Tapi Pengiriman ke Beberapa Provinsi Masih Telat',
    'w7.p': 'Data story Tableau saya untuk Olist, marketplace online di Brasil. Isinya revenue per bulan, kategori yang paling laku, cara pelanggan membayar, dan provinsi yang paling sering menerima pesanan telat.',
    'w7.f2': 'dari kesehatan dan kecantikan, kategori teratas',
    'w7.f3': 'pengiriman telat ke Alagoas (São Paulo: 4,5%)',
    'w7.note': '<b>Contoh tampilan.</b> Dibangun ulang dari data workbook-nya, jadi angkanya sama dengan Tableau. Klik provinsi di peta untuk memfilter.',
    'w7.reco': '<b>Rekomendasi:</b> benahi pengiriman di Alagoas, Maranhão, dan Rio de Janeiro dulu, siapkan stok kategori teratas sebelum puncak November, dan buat promo kartu kredit, karena sekitar 3 dari 4 pembayaran memakai kartu kredit.',
    'w7.open': 'Buka di Tableau Public',
    'w3.drive': 'Buka file Power BI (Google Drive)',
    'w3.note': 'Dibangun ulang di browser dari data model laporannya sendiri: layout sama, measure sama, seluruh 2.000 data. Pakai slicer dan dropdown-nya seperti di Power BI.',
    'pj.hint': 'Pilih proyek untuk membukanya.',
    'w1.n': 'Prediksi Churn Pelanggan', 'w1.ns': 'Python · Machine Learning',
    'w3.n': 'Dashboard Penjualan Minyak Goreng', 'w3.ns': 'Power BI · DAX',
    'w4.n': 'Kalkulator Premi Jiwa', 'w4.ns': 'Python · Aplikasi Web',
    'w5.n': 'Skripsi: Pricing Bonus-Malus', 'w5.ns': 'Pemodelan Aktuaria',
    'w6.n': 'Analisis Lainnya', 'w6.ns': '3 Karya Singkat',
    'm3.link': 'Buka file',
    'w2.n': 'Customer Journey E-commerce',
    'w2.ns': 'Python · Funnel dan Cohort',
    'ec.per': 'FY2025 = tahun penuh 2025 (Jan sampai Des), dibandingkan dengan 2024. Data mencakup Jan 2023 sampai Des 2025.',
    'ec.ht': 'M0 = bulan daftar. Nilainya tidak mulai dari 100% karena mendaftar belum tentu membeli.',
    'ec.data': 'Dataset latihan toko online, Jan 2023 sampai Des 2025: 56.894 event funnel, 5 persona pembeli, data transaksi',
    'ec.ctx': 'Hands-on project, bootcamp Data Analytics and Business Intelligence Dibimbing',
    'ec.t': 'Pengunjung Turun, Pembeli Naik: Customer Journey E-commerce, FY2025',
    'ec.p': 'Traffic toko turun di 2025. Saya cek apakah penjualan ikut turun, lalu apakah pelanggan yang daftar di 2024 terus membeli. Kedua bagian memakai data dari toko yang sama.',
    'ec.f1': 'pengunjung, 2024 → 2025: 14.228 → 11.179',
    'ec.f2': 'pembeli, 2024 → 2025: 630 → 712',
    'ec.f3': 'cart ke purchase di 2025, naik dari 30,3% di 2024',
    'ec.h1': '1 · Funnel: pengunjung turun, pembeli naik',
    'ec.c1': 'Pelanggan unik di tiap tahap, 2024 (terang) dan 2025 (gelap).',
    'ec.c2': 'Persentase pelanggan yang lanjut ke tahap berikutnya, 2023 sampai 2025. Cart ke purchase naik paling besar di 2025: +7,3 poin persentase.',
    'ec.h2': '2 · Penurunan terbesar: halaman produk',
    'ec.k1': '<b>68,4% pelanggan yang melihat produk di 2025 tidak menambahkannya ke keranjang.</b> Itu sekitar 4.100 orang. Angkanya 78,9% di 2023 dan 71,5% di 2024. Pelanggan ini sudah membuka halaman produk, jadi halaman itu yang pertama perlu diperbaiki.',
    'ec.h3': '3 · Cart ke purchase per persona pembeli',
    'ec.c3': 'Cart ke purchase, 2024 (terang) dan 2025 (gelap), dengan pengunjung dan pembeli 2025 per persona.',
    'ec.k2': '<b>Empat dari lima persona lebih sering checkout di 2025.</b> Everyday Shopper, 40% dari pengunjung, naik paling besar: dari 26,6% ke 39,0%. Gift Shopper turun dari 37,4% ke 31,3%, tetapi itu hanya 30 pembeli dari 96 keranjang, terlalu sedikit untuk disebut tren.',
    'ec.h4': '4 · Cohort: pendaftar 2024 mana yang membeli, per bulan',
    'ec.c4': 'Persentase tiap cohort pendaftar 2024 yang membeli, per bulan sejak daftar.',
    'ec.g1': 'membeli di bulan daftar (M0)',
    'ec.g2': 'membeli di bulan ke-2',
    'ec.g3': 'masih membeli di bulan ke-12, dari 599 pelanggan',
    'ec.k3': '<b>Pelanggan yang daftar mulai Juli 2024 membeli lebih cepat.</b> Di baris di bawah garis, sekitar 17% membeli di bulan daftarnya, dibanding sekitar 6% untuk Januari sampai Juni. Jumlahnya juga mengecil: 336 pendaftar di semester pertama, 263 di semester kedua.',
    'ec.h5': 'Yang akan saya cek berikutnya',
    'ec.n1': 'Cari ke mana traffic pergi',
    'ec.n1p': 'Pengunjung turun 20 sampai 25% di setiap persona, jadi penurunannya tidak terkait satu kelompok pelanggan. Langkah berikutnya: pecah sesi per campaign.',
    'ec.n2': 'Perbaiki halaman produk',
    'ec.n2p': '68% yang melihat produk tidak menambahkan ke keranjang. Checkout sudah mengubah 37,6% keranjang jadi pembelian, jadi lebih banyak keranjang berarti lebih banyak pesanan.',
    'ec.n3': 'Cek ulang checkout Gift Shopper',
    'ec.n3p': 'Satu-satunya persona yang cart ke purchase-nya turun, dari 37,4% ke 31,3%. Dengan 30 pembeli, pastikan dulu dengan data yang lebih banyak.',
    'ec.n4': 'Buat pendaftar baru membeli di bulan pertama',
    'ec.n4p': '11% pendaftar 2024 membeli di bulan mereka daftar. Kelompok Juli sampai Desember mencapai 17%.',
    'ec.lim': '<b>Batasan:</b> saya menghitung pelanggan unik per tahun, bukan sesi. Data ini menunjukkan apa yang berubah, bukan alasannya. Kelompok kecil, seperti Gift Shopper dan cohort akhir 2025, bisa berubah banyak hanya karena beberapa pelanggan.',
    'ec.open1': 'Buka slide (Google Drive)',
    'ec.open2': 'Buka notebook Colab',
    'm7.t': 'Analisis funnel dan cohort<small>Python · funnel edtech, cohort aplikasi fintech</small>',
    'm7.p': 'Dua kasus dari tugas Funnel and Cohort di Dibimbing. Di funnel edtech, Booking ke Trial adalah tahap terlemah (62,7%). Di aplikasi fintech, 9 akun dengan transaksi identik menjatuhkan retensi bulan pertama cohort Februari ke 27%; tanpa akun itu angkanya 67%.',
    'm7.l1': 'Slide dan kode',
    'm7.l2': 'Buka notebook',
    'm2.t': 'Engagement media sosial<small>Python · 89 konten, 4 platform</small>',
    'm2.p': 'Menunjukkan bagaimana satu metrik bisa menyesatkan: konten dengan engagement rate tertinggi (27,1%) hanya punya interaksi per reach 3,8%. Format lebih berpengaruh daripada platform: Thread unggul di interaksi, Shorts unggul di klik.',
    'm3.t': 'Actuarial analyst job simulation<small>AIG di Forage</small>',
    'm3.p': 'Menghitung harga kasus marine liability dari data klaim.',
    'c5.t': 'Keahlian',
    's.1': 'Pemrograman', 's.2': 'BI dan pelaporan',
    's.3v': 'Pivot table, XLOOKUP, VLOOKUP, SUMIFS, membersihkan ekspor sistem berukuran besar',
    's.4v': 'HTML, CSS, dan JavaScript untuk dashboard dan tool yang dibuka di browser',
    's.5': 'Metode', 's.5v': 'Analisis data eksploratif, data cleaning, visualisasi data, pembuatan dashboard, analisis statistik, pemodelan prediktif, machine learning, analisis funnel dan cohort, A/B testing, web analytics, analisis media sosial',
    's.6': 'Asuransi', 's.6v': 'Data underwriting, loss ratio, reasuransi treaty dan fakultatif, pricing premi jiwa, valuasi PSAK 24',
    'e.t': 'Sertifikasi', 'e.h1': 'Sertifikasi', 'e.h2': 'Penerbit', 'e.h3': 'Tanggal', 'e.h4': 'Kredensial',
    'e1': 'Certified International Specialist in Data Modelling', 'e1d': 'Agu 2025, berlaku sampai Agu 2028',
    'e2': 'Ujian matematika aktuaria', 'e2d': 'Feb 2026',
    'e3': '70/100; speaking C2', 'e3d': 'Jul 2026',
    'e5': 'Studi kasus marine liability', 'e5d': 'Agu 2026',
    'e6': 'Analisis data, forensic technology', 'e6d': 'Agu 2026',
    'e7': 'Nilai A (Outstanding), skor 9,75', 'e7d': 'Jun 2024, berlaku sampai Jun 2027', 'e8d': 'Jul 2026', 'e9d': 'Jul 2026',
    'e8t': 'Data Analyst, persiapan sertifikasi BNSP', 'e9t': 'Microsoft Excel untuk administrasi perkantoran',
    'k.t': 'Kontak', 'k.big': 'Sedang mencari Data Analyst di Jakarta? Kirim email ke saya.', 'k.top': 'Kembali ke atas'
  };

  // short labels used inside charts and generated UI
  const L = {
    en: {
      gp: 'Gross premium', cl: 'Claims paid', lr: 'Loss ratio', pol: 'Policies', all: 'All lines',
      pend: 'Pending cases', over30: 'Over 30 days', med: 'Median wait', old: 'Oldest case', days: 'days',
      wprem: 'Written premium', ret: 'Own retention', tre: 'Treaty', fac: 'Facultative', week: 'Wk',
      sales: 'Sales', gprof: 'Gross profit', margin: 'Margin', vol: 'Volume sold', ton: 't',
      rate: 'Indicative rate', prem: 'Indicative premium', cls: 'Risk class', place: 'Placement',
      facNeed: 'Facultative support needed', treatyOk: 'Fits within treaty', refer: 'Refer to head office',
      dpay: 'Average days to pay', settle: 'Share of credit settled', cust: 'Customer',
      std: 'Standard', hi1: 'Higher (−8%)', hi2: 'High (−15%)', base: 'base level',
      claims: 'claims per 100 policies', st: ['Visit site', 'View product', 'Add to cart', 'Purchase'],
      leave: 'leave here', bms: (c, p) => `Class <b>${c}</b> · pays <b>${p}%</b> of the base premium`,
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      lines: { Property: 'Property', Engineering: 'Engineering', 'Marine Cargo': 'Marine Cargo', 'Marine Hull': 'Marine Hull', Liability: 'Liability', Motor: 'Motor', 'Personal Accident': 'Personal Accident', Credit: 'Credit', Surety: 'Surety', Miscellaneous: 'Miscellaneous' },
      branch: 'Branch'
    },
    id: {
      gp: 'Premi bruto', cl: 'Klaim dibayar', lr: 'Loss ratio', pol: 'Polis', all: 'Semua lini',
      pend: 'Kasus pending', over30: 'Lebih dari 30 hari', med: 'Median tunggu', old: 'Kasus terlama', days: 'hari',
      wprem: 'Premi tertulis', ret: 'Retensi sendiri', tre: 'Treaty', fac: 'Fakultatif', week: 'Mg',
      sales: 'Penjualan', gprof: 'Laba kotor', margin: 'Margin', vol: 'Volume terjual', ton: 't',
      rate: 'Rate indikatif', prem: 'Premi indikatif', cls: 'Kelas risiko', place: 'Penempatan',
      facNeed: 'Perlu dukungan fakultatif', treatyOk: 'Masuk kapasitas treaty', refer: 'Rujuk ke kantor pusat',
      dpay: 'Rata-rata hari sampai bayar', settle: 'Porsi utang yang dilunasi', cust: 'Pelanggan',
      std: 'Standar', hi1: 'Lebih tinggi (−8%)', hi2: 'Tinggi (−15%)', base: 'level dasar',
      claims: 'klaim per 100 polis', st: ['Kunjungi situs', 'Lihat produk', 'Masuk keranjang', 'Beli'],
      leave: 'berhenti di sini', bms: (c, p) => `Kelas <b>${c}</b> · membayar <b>${p}%</b> dari premi dasar`,
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
      lines: { Property: 'Properti', Engineering: 'Engineering', 'Marine Cargo': 'Marine Cargo', 'Marine Hull': 'Marine Hull', Liability: 'Tanggung gugat', Motor: 'Kendaraan', 'Personal Accident': 'Kecelakaan diri', Credit: 'Kredit', Surety: 'Suretyship', Miscellaneous: 'Aneka' },
      branch: 'Cabang'
    }
  };
  const t = k => L[lang][k];
  const nf = (v, d = 0) => new Intl.NumberFormat(lang === 'id' ? 'id-ID' : 'en-US', { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
  const pct = (v, d = 1) => nf(v, d) + '%';

  const i18nEls = $$('[data-i18n]');
  i18nEls.forEach(el => { el.dataset.en = el.innerHTML; });
  function applyLang() {
    document.documentElement.lang = lang;
    i18nEls.forEach(el => {
      const k = el.dataset.i18n;
      el.innerHTML = lang === 'id' && ID[k] != null ? ID[k] : el.dataset.en;
    });
    $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    buildSelects();
    renderAll();
  }
  $$('.lang button').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.lang === lang) return;
    lang = b.dataset.lang;
    try { localStorage.setItem('dl-lang', lang); } catch (e) {}
    applyLang();
  }));

  /* ------------------------------------------------------------------
     Security-print line work (guilloche), generated once
  ------------------------------------------------------------------ */
  function waveTile(w, h, lines, amp, periods, color, sw, vertical) {
    let d = '';
    for (let k = 0; k < lines; k++) {
      const ph = (k / lines) * Math.PI * 2;
      let p = '';
      for (let i = 0; i <= 120; i++) {
        const u = (i / 120) * (vertical ? h : w);
        const v = (vertical ? w : h) / 2 + amp * Math.sin((u / (vertical ? h : w)) * Math.PI * 2 * periods + ph) * Math.cos(ph * 0.5 + (u / (vertical ? h : w)) * Math.PI * 2);
        p += (i ? 'L' : 'M') + (vertical ? `${v.toFixed(2)} ${u.toFixed(2)}` : `${u.toFixed(2)} ${v.toFixed(2)}`);
      }
      d += `<path d="${p}"/>`;
    }
    const svg = `<svg xmlns="${NS}" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><g fill="none" stroke="${color}" stroke-width="${sw}">${d}</g></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }
  const rootStyle = document.documentElement.style;
  rootStyle.setProperty('--g-h', waveTile(96, 16, 7, 6.4, 3, '#2E7A6B', .55, false));
  rootStyle.setProperty('--g-v', waveTile(16, 96, 7, 6.4, 3, '#2E7A6B', .55, true));
  rootStyle.setProperty('--g-band', waveTile(420, 100, 9, 40, 2, '#F6F7F2', .6, false));

  (function rosette() {
    const svg = $('#rosette');
    if (!svg) return;
    const rings = [
      { base: 250, amp: 18, n: 36, k: 14, c: '#2E7A6B', o: .55 },
      { base: 190, amp: 26, n: 24, k: 12, c: '#13264A', o: .28 },
      { base: 120, amp: 22, n: 18, k: 10, c: '#2E7A6B', o: .45 }
    ];
    let out = '';
    rings.forEach(r => {
      for (let j = 0; j < r.k; j++) {
        const ph = (j / r.k) * Math.PI * 2 / r.n;
        let p = '';
        for (let i = 0; i <= 900; i++) {
          const a = (i / 900) * Math.PI * 2;
          const rad = r.base + r.amp * Math.sin(r.n * a + ph * r.n) * Math.cos(3 * a + j * .2);
          p += (i ? 'L' : 'M') + (rad * Math.cos(a)).toFixed(1) + ' ' + (rad * Math.sin(a)).toFixed(1);
        }
        out += `<path d="${p}Z" stroke="${r.c}" stroke-opacity="${r.o}"/>`;
      }
    });
    svg.innerHTML = `<g fill="none" stroke-width=".5">${out}</g>`;
  })();

  /* ------------------------------------------------------------------
     Tabs (WAI-ARIA, arrow keys)
  ------------------------------------------------------------------ */
  $$('[role="tablist"]').forEach(list => {
    const tabs = $$('[role="tab"]', list);
    const select = tab => {
      tabs.forEach(tb => {
        const on = tb === tab;
        tb.setAttribute('aria-selected', String(on));
        tb.tabIndex = on ? 0 : -1;
        const p = document.getElementById(tb.getAttribute('aria-controls'));
        if (p) p.hidden = !on;
      });
      renderAll();
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', e => {
        let j = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = (i + 1) % tabs.length;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = (i - 1 + tabs.length) % tabs.length;
        if (e.key === 'Home') j = 0;
        if (e.key === 'End') j = tabs.length - 1;
        if (j != null) { e.preventDefault(); tabs[j].focus(); select(tabs[j]); }
      });
    });
  });

  /* ------------------------------------------------------------------
     Tooltip
  ------------------------------------------------------------------ */
  const tip = $('#tip');
  // touch screens have no hover, so a tap on a mark shows its value instead
  document.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse') return;
    const tg = e.target.closest && e.target.closest('[data-tip]');
    if (!tg) { tip.classList.remove('on'); return; }
    tip.innerHTML = tg.getAttribute('data-tip');
    const w = tip.offsetWidth, h = tip.offsetHeight;
    tip.style.left = Math.max(8, Math.min(innerWidth - w - 8, e.clientX - w / 2)) + 'px';
    tip.style.top = (e.clientY - h - 18 < 8 ? e.clientY + 22 : e.clientY - h - 18) + 'px';
    tip.classList.add('on');
  }, { passive: true });
  document.addEventListener('pointermove', e => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    const tg = e.target.closest && e.target.closest('[data-tip]');
    if (!tg) { tip.classList.remove('on'); return; }
    tip.innerHTML = tg.getAttribute('data-tip');
    const w = tip.offsetWidth, h = tip.offsetHeight;
    let x = e.clientX + 14, y = e.clientY - h - 12;
    if (x + w > innerWidth - 8) x = e.clientX - w - 14;
    if (y < 8) y = e.clientY + 18;
    tip.style.left = x + 'px'; tip.style.top = y + 'px';
    tip.classList.add('on');
  }, { passive: true });
  document.addEventListener('scroll', () => tip.classList.remove('on'), { passive: true });

  /* ------------------------------------------------------------------
     Shared helpers (also used by the project charts below)
  ------------------------------------------------------------------ */
  const C = { ink: '#13264A', ink3: '#5B6782', teal: '#2E7A6B', teal2: '#4F8E7F', red: '#C3382C', gold: '#9A6F22', rule: '#DCE1E6' };
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const W = el => Math.max(260, Math.floor(el.clientWidth || el.parentNode.clientWidth || 300));
  const niceMax = v => { const p = Math.pow(10, Math.floor(Math.log10(v || 1))); const m = v / p; return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * p; };
  const svgWrap = (w, h, body, label) => `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label || '')}">${body}</svg>`;
  function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const hash = s => [...String(s)].reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) | 0, 7);

  /* ------------------------------------------------------------------
     Dashboard replicas. They copy the visual language of the original
     underwriting dashboard (cards, rounded bars, pies with side legends,
     KPI tiles with status chips, chart/table toggles); every number is
     generated.
  ------------------------------------------------------------------ */
  const D = {
    surface: '#FCFCFB', ink: '#0B0B0B', ink2: '#52514E', ink3: '#6B6964', rule: '#E1E0D9', axis: '#C3C2B7',
    s1: '#2A78D6', s2: '#EB6834', s3: '#1BAF7A', good: '#0CA30C', warn: '#E09A00', crit: '#D03B3B',
    o1: '#86B6EF', o2: '#5598E7', o3: '#2A78D6', o4: '#184F95', brand: '#0D366B'
  };
  const MONO = '"IBM Plex Mono", ui-monospace, monospace';
  const DL = {
    en: {
      allCob: 'All classes', cobN: { Property: 'Property', Engineering: 'Engineering', Marine: 'Marine hull and cargo', Liability: 'Liability' },
      lvls: ['Low', 'Medium', 'High', 'Very high'], allBr: 'All branches', pols: 'policies', polIn: 'Policies in view', hiVh: 'High or very high risk', vhOnly: 'Very high risk',
      riskT: 'Risk profile of each branch', riskS: 'Share of each branch’s policies at each risk level, largest branches first',
      totCase: 'Pending cases', newB: 'new', renewB: 'renewal', nUw: 'Underwriters with pending cases', pbrT: 'Pending cases in each branch', pbrS: 'Requests still waiting for an underwriting decision',
      topUwT: 'Top 10 underwriters by pending cases', lapUwT: 'How long requests wait, per underwriter', lapUwS: 'Average lapse days since the request came in, longest first', avgLap: 'Average lapse',
      lapCT: 'Pending cases by days waiting', lapCS: 'Grouped by how many days each request has been open', tocT: 'Types of cover with the most pending cases', tocS: 'Top 10 types of cover (TOC) by pending requests',
      tocs: ['Industrial all risks', 'Fire', 'Contractors all risk', 'Marine cargo', 'Heavy equipment', 'Machinery breakdown', 'Hull', 'Money insurance', 'Public liability', 'Earthquake', 'Erection all risk', 'Property all risks'],
      nClaims: 'Claims settled', shareP: 'Company share of settled claims', topCause: 'Top cause of loss', ofClaims: 'of claims',
      causes: ['Fire', 'Flood', 'Theft', 'Collision', 'Machinery breakdown', 'Short circuit', 'Earthquake', 'Water damage', 'Riot', 'Other'],
      causeT: 'What caused the losses', causeS: 'Settled claims counted by cause of loss', cause: 'Cause', claimsN: 'Claims',
      insured: 'Insured', insT: 'Top 10 insureds by claims paid', insS: 'Company share of settled claims, in Rp billion', yrT: 'Settled claims per year', yrS: 'Number of claims settled each year',
      cobCT: 'Claims by class of business', cobCS: 'Share of settled claims in each class', sevT: 'How large the claims are', sevS: 'Settled claims counted by claim size, in Rp',
      dolT: 'When in the policy the loss happened', dolS: 'Days between the policy start date and the date of loss', dayOf: 'Policy day',
      topUwS: 'Pending requests per underwriter in',
      chart: 'Chart', table: 'Table', year: 'Year', line: 'Line', all: 'All lines', vsPrev: 'vs prior year', none: 'No data for this filter.',
      gp: 'Gross premium', cl: 'Claims paid', lr: 'Loss ratio', pol: 'Policies', prod: 'Products', br: 'Branches', avgp: 'Avg premium / policy',
      healthy: 'Healthy', watch: 'Watch', above: 'Above 60%',
      lrProd: 'Products with the highest loss ratio', lrProdS: 'The 10 worst products this year. The red line marks a 60% loss ratio.', mix: 'Where the gross premium comes from', mixS: 'Each line of business as a share of gross premium',
      brT: 'Gross premium and claims paid per branch', brS: 'In Rp billion', siT: 'Policies by sum insured', siS: 'How many policies fall in each sum-insured band, in Rp billion',
      product: 'Product', lob: 'Line', premium: 'Premium', claims: 'Claims', branch: 'Branch', band: 'Band', share: 'Share', others: 'Others',
      cob: 'Class of business', occ: 'Occupancy', si: 'Sum insured', ded: 'Deductible', std: 'Standard', hi1: 'Higher (-8%)', hi2: 'High (-15%)',
      cls: 'Risk class', clsN: 'class', rate: 'Indicative rate', prem: 'Indicative premium', place: 'Placement',
      facNeed: 'Facultative support needed', treatyOk: 'Fits within own retention and treaty', refer: 'Refer to head office',
      own: 'Own retention', tre: 'Treaty', fac: 'Facultative', placeT: 'Placement of the sum insured', placeS: 'Rp bn',
      capT: 'Capacity used per layer', capS: 'placed vs layer limit, Rp bn', layer: 'Layer', placed: 'Placed', limit: 'Limit',
      pend: 'Pending cases', over30: 'Over 30 days', med: 'Median wait', days: 'days', uwT: 'Pending cases per underwriter', uwS: 'by days waiting',
      brPT: 'Pending cases per branch', lapT: 'Pending cases by days waiting', uw: 'Underwriter', cases: 'Cases', bucket: 'Days waiting',
      wprem: 'Written premium, 8 weeks', retP: 'Kept as own retention', facP: 'Placed facultative', wk: 'Wk', week: 'Week',
      wkT: 'Where each week’s premium goes', wkS: 'Written premium split into own retention, treaty and facultative, in Rp billion', retT: 'Premium kept as own retention', retS: 'Share of each week’s written premium the company keeps', splitT: 'Premium split over the last 8 weeks', splitS: 'Own retention, treaty and facultative as a share of written premium',
      polA: 'Policies analysed', crate: 'Claim rate', ftest: 'Factors tested', orT: 'Odds ratio of a claim, by factor', orS: 'base level = 1.0',
      fqT: 'Claims per 100 policies', fqS: 'by sum-insured band', factor: 'Factor', or: 'Odds ratio',
      sales: 'Sales', gprof: 'Gross profit', margin: 'Margin', vol: 'Volume sold', cust: 'Active customers', price: 'Avg selling price',
      salesT: 'Sales per month', salesS: 'Split into cost of goods and gross profit, in Rp million', priceT: 'Selling price against cost', priceS: 'Average per kilogram, in Rp thousand', sell: 'Selling price', cost: 'Cost of goods', month: 'Month',
      openR: 'Open receivables', newC: 'New credit, 12 months', payR: 'Payment ratio', flowT: 'New credit against payments received', flowS: 'Per month, in Rp million',
      newc: 'New credit', paid: 'Payments', ageT: 'How long unpaid balances have been open', ageS: 'Open receivables by age, in Rp million', balT: 'What customers owe at month end', balS: 'Total open receivables, in Rp million', age: 'Age',
      q1: 'Pays on time', q2: 'Slow but settles', q3: 'Collection priority', mapT: 'Who pays on time and who needs a call', mapS: 'Each dot is a customer; bigger dots buy more',
      dpay: 'Average days to pay', settle: 'Share of credit settled', customer: 'Customer', topQ: 'Customers to collect from first', topQS: 'Lowest share of credit settled first',
      lines: { Property: 'Property', Engineering: 'Engineering', 'Marine Cargo': 'Marine Cargo', 'Marine Hull': 'Marine Hull', Liability: 'Liability', Motor: 'Motor', 'Personal Accident': 'Personal Accident', Credit: 'Credit', Surety: 'Surety', Miscellaneous: 'Miscellaneous' },
      F: ['Industrial occupancy', 'Sum insured > Rp 100 bn', 'Coastal location', 'New business (< 1 yr)', 'Building > 20 years', 'Broker channel', 'High deductible'],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    id: {
      allCob: 'Semua kelas', cobN: { Property: 'Properti', Engineering: 'Engineering', Marine: 'Marine hull dan cargo', Liability: 'Tanggung gugat' },
      lvls: ['Low', 'Medium', 'High', 'Very high'], allBr: 'Semua cabang', pols: 'polis', polIn: 'Polis ditampilkan', hiVh: 'Risiko high atau very high', vhOnly: 'Risiko very high',
      riskT: 'Profil risiko tiap cabang', riskS: 'Porsi polis tiap cabang di setiap tingkat risiko, cabang terbesar di atas',
      totCase: 'Kasus pending', newB: 'baru', renewB: 'renewal', nUw: 'Underwriter dengan kasus pending', pbrT: 'Kasus pending di tiap cabang', pbrS: 'Pengajuan yang masih menunggu keputusan underwriting',
      topUwT: 'Top 10 underwriter dengan kasus pending terbanyak', lapUwT: 'Lama pengajuan menunggu, per underwriter', lapUwS: 'Rata-rata lapse day sejak pengajuan masuk, terlama di atas', avgLap: 'Rata-rata lapse',
      lapCT: 'Kasus pending menurut lama menunggu', lapCS: 'Dikelompokkan dari berapa hari pengajuan sudah terbuka', tocT: 'Jenis pertanggungan dengan kasus pending terbanyak', tocS: '10 TOC teratas menurut jumlah pengajuan pending',
      tocs: ['Industrial all risks', 'Kebakaran', 'Contractors all risk', 'Marine cargo', 'Alat berat', 'Machinery breakdown', 'Hull', 'Asuransi uang', 'Tanggung gugat publik', 'Gempa bumi', 'Erection all risk', 'Property all risks'],
      nClaims: 'Klaim settled', shareP: 'Share perusahaan atas klaim settled', topCause: 'Penyebab klaim teratas', ofClaims: 'dari klaim',
      causes: ['Kebakaran', 'Banjir', 'Pencurian', 'Tabrakan', 'Kerusakan mesin', 'Korsleting', 'Gempa bumi', 'Kerusakan air', 'Kerusuhan', 'Lainnya'],
      causeT: 'Penyebab kerugian', causeS: 'Klaim settled dihitung per penyebab kerugian', cause: 'Penyebab', claimsN: 'Klaim',
      insured: 'Tertanggung', insT: 'Top 10 tertanggung menurut klaim dibayar', insS: 'Share perusahaan atas klaim settled, dalam miliar rupiah', yrT: 'Klaim settled per tahun', yrS: 'Jumlah klaim yang selesai tiap tahun',
      cobCT: 'Klaim per kelas bisnis', cobCS: 'Porsi klaim settled di tiap kelas', sevT: 'Seberapa besar klaimnya', sevS: 'Klaim settled dihitung per besar klaim, dalam rupiah',
      dolT: 'Kapan kerugian terjadi dalam periode polis', dolS: 'Jarak hari dari tanggal mulai polis sampai tanggal kerugian', dayOf: 'Hari ke-',
      topUwS: 'Pengajuan pending per underwriter di',
      chart: 'Grafik', table: 'Tabel', year: 'Tahun', line: 'Lini', all: 'Semua lini', vsPrev: 'vs tahun lalu', none: 'Tidak ada data pada filter ini.',
      gp: 'Premi bruto', cl: 'Klaim dibayar', lr: 'Loss ratio', pol: 'Polis', prod: 'Produk', br: 'Cabang', avgp: 'Rata-rata premi / polis',
      healthy: 'Sehat', watch: 'Pantau', above: 'Di atas 60%',
      lrProd: 'Produk dengan loss ratio tertinggi', lrProdS: '10 produk terburuk tahun ini. Garis merah menandai loss ratio 60%.', mix: 'Asal premi bruto', mixS: 'Porsi tiap lini bisnis terhadap premi bruto',
      brT: 'Premi bruto dan klaim dibayar per cabang', brS: 'Dalam miliar rupiah', siT: 'Polis menurut nilai pertanggungan', siS: 'Jumlah polis di tiap kelompok nilai pertanggungan, dalam miliar rupiah',
      product: 'Produk', lob: 'Lini', premium: 'Premi', claims: 'Klaim', branch: 'Cabang', band: 'Kelompok', share: 'Porsi', others: 'Lainnya',
      cob: 'Kelas bisnis', occ: 'Okupasi', si: 'Nilai pertanggungan', ded: 'Deductible', std: 'Standar', hi1: 'Lebih tinggi (-8%)', hi2: 'Tinggi (-15%)',
      cls: 'Kelas risiko', clsN: 'kelas', rate: 'Rate indikatif', prem: 'Premi indikatif', place: 'Penempatan',
      facNeed: 'Perlu dukungan fakultatif', treatyOk: 'Masuk retensi sendiri dan treaty', refer: 'Rujuk ke kantor pusat',
      own: 'Retensi sendiri', tre: 'Treaty', fac: 'Fakultatif', placeT: 'Penempatan nilai pertanggungan', placeS: 'Rp miliar',
      capT: 'Kapasitas terpakai per layer', capS: 'ditempatkan vs batas layer, Rp miliar', layer: 'Layer', placed: 'Ditempatkan', limit: 'Batas',
      pend: 'Kasus pending', over30: 'Lebih dari 30 hari', med: 'Median tunggu', days: 'hari', uwT: 'Kasus pending per underwriter', uwS: 'menurut lama menunggu',
      brPT: 'Kasus pending per cabang', lapT: 'Kasus pending menurut lama menunggu', uw: 'Underwriter', cases: 'Kasus', bucket: 'Lama menunggu',
      wprem: 'Premi tertulis, 8 minggu', retP: 'Ditahan sebagai retensi', facP: 'Ditempatkan fakultatif', wk: 'Mg', week: 'Minggu',
      wkT: 'Ke mana premi tiap minggu dialokasikan', wkS: 'Premi tertulis dibagi ke retensi sendiri, treaty, dan fakultatif, dalam miliar rupiah', retT: 'Premi yang ditahan sebagai retensi sendiri', retS: 'Porsi premi tertulis tiap minggu yang ditahan perusahaan', splitT: 'Pembagian premi 8 minggu terakhir', splitS: 'Retensi sendiri, treaty, dan fakultatif terhadap premi tertulis',
      polA: 'Polis dianalisis', crate: 'Tingkat klaim', ftest: 'Faktor diuji', orT: 'Odds ratio klaim per faktor', orS: 'level dasar = 1,0',
      fqT: 'Klaim per 100 polis', fqS: 'per kelompok nilai pertanggungan', factor: 'Faktor', or: 'Odds ratio',
      sales: 'Penjualan', gprof: 'Laba kotor', margin: 'Margin', vol: 'Volume terjual', cust: 'Pelanggan aktif', price: 'Rata-rata harga jual',
      salesT: 'Penjualan per bulan', salesS: 'Dibagi ke HPP dan laba kotor, dalam juta rupiah', priceT: 'Harga jual dibanding HPP', priceS: 'Rata-rata per kilogram, dalam ribu rupiah', sell: 'Harga jual', cost: 'HPP', month: 'Bulan',
      openR: 'Piutang terbuka', newC: 'Utang baru, 12 bulan', payR: 'Rasio pembayaran', flowT: 'Utang baru dibanding pembayaran yang masuk', flowS: 'Per bulan, dalam juta rupiah',
      newc: 'Utang baru', paid: 'Pembayaran', ageT: 'Sudah berapa lama piutang belum dibayar', ageS: 'Piutang terbuka per umur, dalam juta rupiah', balT: 'Utang pelanggan di akhir bulan', balS: 'Total piutang terbuka, dalam juta rupiah', age: 'Umur',
      q1: 'Bayar tepat waktu', q2: 'Lambat tapi melunasi', q3: 'Prioritas penagihan', mapT: 'Siapa yang bayar tepat waktu dan siapa yang perlu ditagih', mapS: 'Tiap titik adalah satu pelanggan; makin besar titiknya, makin besar belanjanya',
      dpay: 'Rata-rata hari sampai bayar', settle: 'Porsi utang yang dilunasi', customer: 'Pelanggan', topQ: 'Pelanggan yang ditagih lebih dulu', topQS: 'Porsi utang terlunasi paling rendah di atas',
      lines: { Property: 'Properti', Engineering: 'Engineering', 'Marine Cargo': 'Marine Cargo', 'Marine Hull': 'Marine Hull', Liability: 'Tanggung gugat', Motor: 'Kendaraan', 'Personal Accident': 'Kecelakaan diri', Credit: 'Kredit', Surety: 'Suretyship', Miscellaneous: 'Aneka' },
      F: ['Okupasi industri', 'Nilai pertanggungan > Rp 100 M', 'Lokasi pesisir', 'Bisnis baru (< 1 th)', 'Bangunan > 20 tahun', 'Melalui broker', 'Deductible tinggi'],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
    }
  };
  const d = k => (DL[lang][k] != null ? DL[lang][k] : DL.en[k]);
  const bn = v => (lang === 'id' ? 'Rp ' + nf(v, 1) + ' M' : 'Rp ' + nf(v, 1) + ' bn');
  const mn = v => (lang === 'id' ? 'Rp ' + nf(v) + ' jt' : 'Rp ' + nf(v) + ' m');

  // rounded-top bar, the shape the original dashboard draws
  function barPath(x, y, w, h, r) {
    r = Math.max(0, Math.min(r, w / 2, h));
    if (h <= .6) return `M${x},${y + h}h${w}`;
    return `M${x},${y + h}V${y + r}a${r},${r} 0 0 1 ${r},-${r}h${w - 2 * r}a${r},${r} 0 0 1 ${r},${r}V${y + h}Z`;
  }
  // 5 gridlines when the axis top starts with 25 or 5 (so ticks land on whole steps), 4 otherwise
  const tickN = m => (/^(25|5)/.test(String(m)) ? 5 : 4);
  const mt = (x, y, s, o = '') => `<text x="${x}" y="${y}" ${o}>${esc(s)}</text>`;
  // phones get the same charts with type a step larger, so labels stay readable at arm's length
  const PHONE = () => matchMedia('(max-width: 639px)').matches;
  const PHONE_FS = { '11.5': '12.5', '11': '12', '10.5': '12', '10': '11' };
  const dsvg = (w, h, b, label) => svgWrap(w, h, PHONE() ? b.replace(/font-size="(11\.5|11|10\.5|10)"/g, (m, v) => `font-size="${PHONE_FS[v]}"`) : b, label);

  function dHbar(w, items, o = {}) {
    if (!items.length) return `<p class="dash__empty">${d('none')}</p>`;
    if (PHONE()) return dHbarPhone(w, items, o);
    const rowH = 25, top = o.ref != null ? 22 : 8, bot = 24, H = top + items.length * rowH + bot;
    const padR = w < 420 ? 50 : 72, labW = Math.min(o.labW || 150, Math.max(100, w - 120 - padR));
    const max = niceMax(Math.max(...items.map(i => i.value), o.ref || 0, o.min || 0));
    const x = v => labW + Math.max(0, v) / max * (w - labW - padR);
    let b = '';
    const nT = tickN(max);
    for (let i = 0; i <= nT; i++) { const v = max * i / nT, gx = x(v); b += `<line x1="${gx}" x2="${gx}" y1="${top}" y2="${top + items.length * rowH}" stroke="${D.rule}"/>` + mt(gx, H - 8, o.tick ? o.tick(v) : nf(v), `text-anchor="middle" font-size="10.5" fill="${D.ink3}" font-family='${MONO}'`); }
    if (o.ref != null) { const rx = x(o.ref); b += `<line x1="${rx}" x2="${rx}" y1="${top - 2}" y2="${top + items.length * rowH + 2}" stroke="${D.crit}" stroke-width="1.5"/>` + mt(rx, top - 8, o.refLabel || '', `text-anchor="middle" font-size="10.5" font-weight="600" fill="${D.crit}"`); }
    b += `<line x1="${labW}" x2="${labW}" y1="${top}" y2="${top + items.length * rowH}" stroke="${D.axis}"/>`;
    const mc = Math.max(8, Math.floor((labW - 12) / 6.4));
    items.forEach((it, i) => {
      const y0 = top + i * rowH, nm = it.name.length > mc ? it.name.slice(0, mc - 1) + '…' : it.name;
      b += mt(labW - 9, y0 + rowH / 2 + 3.5, nm, `text-anchor="end" font-size="11.5" fill="${D.ink2}"`);
      b += `<rect x="${labW}" y="${y0 + 4.5}" width="${Math.max(2, x(it.value) - labW)}" height="${rowH - 9}" rx="4" fill="${it.color || D.s1}" data-tip="${esc(it.tip || it.name + ': <b>' + (o.fmt ? o.fmt(it.value) : nf(it.value)) + '</b>')}"/>`;
      b += mt(x(it.value) + 7, y0 + rowH / 2 + 3.5, o.fmt ? o.fmt(it.value) : nf(it.value), `font-size="11" fill="${D.ink2}" font-family='${MONO}'`);
    });
    return dsvg(w, H, b, o.label);
  }

  function dHbarPhone(w, items, o) {
    const rowH = 40, top = o.ref != null ? 22 : 6, bot = 24, padR = 70, H = top + items.length * rowH + bot, pw = w - padR;
    const max = niceMax(Math.max(...items.map(i => i.value), o.ref || 0, o.min || 0)), x = v => Math.max(0, v) / max * pw;
    const nT = tickN(max); let b = '';
    for (let i = 0; i <= nT; i++) { const v = max * i / nT, gx = x(v); b += `<line x1="${gx}" x2="${gx}" y1="${top}" y2="${top + items.length * rowH}" stroke="${D.rule}"/>` + (pw / nT < 52 && i % 2 ? '' : mt(gx, H - 8, o.tick ? o.tick(v) : nf(v), `text-anchor="${i === 0 ? 'start' : i === nT ? 'end' : 'middle'}" font-size="12" fill="${D.ink3}" font-family='${MONO}'`)); }
    if (o.ref != null) { const rx = x(o.ref); b += `<line x1="${rx}" x2="${rx}" y1="${top - 2}" y2="${top + items.length * rowH}" stroke="${D.crit}" stroke-width="1.5"/>` + mt(rx, top - 8, o.refLabel || '', `text-anchor="middle" font-size="12" font-weight="600" fill="${D.crit}"`); }
    items.forEach((it, i) => {
      const y0 = top + i * rowH, val = o.fmt ? o.fmt(it.value) : nf(it.value);
      b += mt(0, y0 + 13, it.name, `font-size="12.5" fill="${D.ink2}"`);
      b += `<rect x="0" y="${y0 + 19}" width="${Math.max(2, x(it.value))}" height="14" rx="4" fill="${it.color || D.s1}" data-tip="${esc(it.tip || it.name + ': <b>' + val + '</b>')}"/>`;
      b += mt(Math.max(2, x(it.value)) + 6, y0 + 30.5, val, `font-size="12" fill="${D.ink2}" font-family='${MONO}'`);
    });
    return svgWrap(w, H, b, o.label);
  }
  // grouped columns with many categories turn into grouped rows on a phone: one row per category, one bar per series
  function dBarsPhone(w, cats, series, o) {
    const bh = 12, gi = 3, rowH = 22 + series.length * (bh + gi) + 6, top = 4, bot = 24, padR = 54, H = top + cats.length * rowH + bot, pw = w - padR;
    const max = niceMax(Math.max(...series.flatMap(se => se.values)) || 1), x = v => Math.max(0, v) / max * pw, nT = tickN(max);
    let b = '';
    for (let i = 0; i <= nT; i++) { const v = max * i / nT, gx = x(v); b += `<line x1="${gx}" x2="${gx}" y1="${top}" y2="${top + cats.length * rowH}" stroke="${D.rule}"/>` + (pw / nT < 52 && i % 2 ? '' : mt(gx, H - 8, o.tick ? o.tick(v) : nf(v), `text-anchor="${i === 0 ? 'start' : i === nT ? 'end' : 'middle'}" font-size="12" fill="${D.ink3}" font-family='${MONO}'`)); }
    cats.forEach((c, i) => {
      const y0 = top + i * rowH;
      b += mt(0, y0 + 14, c, `font-size="12.5" font-weight="600" fill="${D.ink}"`);
      series.forEach((se, k) => {
        const v = se.values[i], y = y0 + 20 + k * (bh + gi), val = o.fmt ? o.fmt(v) : nf(v, 1);
        b += `<rect x="0" y="${y}" width="${Math.max(2, x(v))}" height="${bh}" rx="3" fill="${se.color}" data-tip="${esc(c)} · ${esc(se.name)}: <b>${esc(val)}</b>"/>`;
        b += mt(Math.max(2, x(v)) + 5, y + bh - 1.5, o.short ? o.short(v) : nf(v), `font-size="11.5" fill="${D.ink2}" font-family='${MONO}'`);
      });
    });
    return svgWrap(w, H, b, o.label);
  }

  function dBars(w, cats, series, o = {}) {
    if (PHONE() && !o.stacked && series.length > 1 && cats.length > 7) return dBarsPhone(w, cats, series, o);
    const H = o.h || 230, padL = 52, padR = 10, padT = 18, padB = 30, pw = w - padL - padR, ph = H - padT - padB;
    const tot = cats.map((_, i) => o.stacked ? series.reduce((s, se) => s + se.values[i], 0) : Math.max(...series.map(se => se.values[i])));
    const max = niceMax(Math.max(...tot) || 1), Y = v => padT + ph - v / max * ph;
    let b = '';
    const nT = tickN(max);
    for (let i = 0; i <= nT; i++) { const v = max * i / nT, yy = Y(v); b += `<line x1="${padL}" x2="${padL + pw}" y1="${yy}" y2="${yy}" stroke="${i ? D.rule : D.axis}"/>` + mt(padL - 8, yy + 3.5, o.tick ? o.tick(v) : nf(v), `text-anchor="end" font-size="10.5" fill="${D.ink3}" font-family='${MONO}'`); }
    const step = pw / cats.length, gap = Math.min(18, step * .26), inner = Math.max(6, step - gap);
    const bw = o.stacked ? inner : inner / series.length;
    const lbl = o.labels !== false && cats.length * (o.stacked ? 1 : series.length) <= 16 && bw >= 18;
    const every = Math.ceil(cats.length / Math.max(1, Math.floor(pw / (PHONE() ? 32 : 40))));
    cats.forEach((c, i) => {
      const cx = padL + step * i + gap / 2;
      if (o.stacked) {
        let acc = 0;
        series.forEach((se, k) => {
          const v = se.values[i], y = Y(acc + v), h = Y(acc) - Y(acc + v);
          const top = k === series.length - 1;
          b += `<path d="${top ? barPath(cx + 1, y, bw - 2, h, 4) : `M${cx + 1},${y}h${bw - 2}v${h}h-${bw - 2}Z`}" fill="${se.color}" stroke="${D.surface}" stroke-width="1" data-tip="${esc(c)} · ${esc(se.name)}: <b>${esc(o.fmt ? o.fmt(v) : nf(v, 1))}</b>"/>`;
          acc += v;
        });
        if (lbl) b += mt(cx + bw / 2, Y(acc) - 6, o.short ? o.short(acc) : nf(acc), `text-anchor="middle" font-size="10" fill="${D.ink2}" font-family='${MONO}'`);
      } else {
        series.forEach((se, k) => {
          const v = se.values[i], x = cx + bw * k, y = Y(v), h = Y(0) - Y(v);
          b += `<path d="${barPath(x + 1, y, Math.max(2, bw - 2), h, 4)}" fill="${se.color}" stroke="${D.surface}" stroke-width="1" data-tip="${esc(c)} · ${esc(se.name)}: <b>${esc(o.fmt ? o.fmt(v) : nf(v, 1))}</b>"/>`;
          if (lbl) b += mt(x + bw / 2, y - 6, o.short ? o.short(v) : nf(v), `text-anchor="middle" font-size="10" fill="${D.ink2}" font-family='${MONO}'`);
        });
      }
      if (i % every === 0) b += mt(cx + inner / 2, H - 10, c, `text-anchor="middle" font-size="11.5" fill="${D.ink2}"`);
    });
    return dsvg(w, H, b, o.label);
  }

  function dLine(w, cats, series, o = {}) {
    const H = o.h || 220, padL = w < 430 ? 46 : 54, padR = w < 430 ? 44 : 58, padT = 16, padB = 30, pw = w - padL - padR, ph = H - padT - padB;
    const all = series.flatMap(s => s.values), lo0 = o.min != null ? o.min : 0, hi = Math.max(...all);
    const max = lo0 + niceMax((hi - lo0) * 1.08 || 1), px = i => padL + (cats.length === 1 ? pw / 2 : pw * i / (cats.length - 1)), py = v => padT + ph - (Math.max(lo0, v) - lo0) / (max - lo0) * ph;
    let b = '';
    for (let i = 0; i <= 4; i++) { const v = lo0 + (max - lo0) * i / 4, yy = py(v); b += `<line x1="${padL}" x2="${padL + pw}" y1="${yy}" y2="${yy}" stroke="${D.rule}"/>` + mt(padL - 8, yy + 3.5, o.tick ? o.tick(v) : nf(v), `text-anchor="end" font-size="10.5" fill="${D.ink3}" font-family='${MONO}'`); }
    b += `<line x1="${padL}" x2="${padL}" y1="${padT}" y2="${padT + ph}" stroke="${D.axis}"/>`;
    const every = Math.ceil(cats.length / Math.max(1, Math.floor(pw / (PHONE() ? 32 : 38))));
    cats.forEach((c, i) => { if (i % every === 0) b += mt(px(i), H - 9, c, `text-anchor="middle" font-size="11.5" fill="${D.ink2}"`); });
    series.forEach(s => {
      b += `<polyline points="${s.values.map((v, i) => px(i) + ',' + py(v)).join(' ')}" fill="none" stroke="${s.color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`;
      s.values.forEach((v, i) => { b += `<circle cx="${px(i)}" cy="${py(v)}" r="4.5" fill="${s.color}" stroke="${D.surface}" stroke-width="2" data-tip="${esc(cats[i])} · ${esc(s.name)}: <b>${esc(o.fmt ? o.fmt(v) : nf(v))}</b>"/>`; });
      const l = s.values.length - 1;
      b += mt(px(l) + 9, py(s.values[l]) + 3.5, o.short ? o.short(s.values[l]) : nf(s.values[l]), `font-size="11" fill="${D.ink2}" font-family='${MONO}'`);
    });
    return dsvg(w, H, b, o.label);
  }

  // 100% stacked rows (share of policies by risk level), the layout the original risk profile uses
  function dStack(w, rows, cols, names, o = {}) {
    const rowH = 30, top = 4, labW = Math.min(150, Math.max(84, w * .2)), padR = w < 480 ? 40 : 84, H = top + rows.length * rowH + 36;
    const pw = w - labW - padR, x = v => labW + v * pw;
    let b = '';
    for (let i = 0; i <= 4; i++) { const gx = x(i / 4); b += `<line x1="${gx}" x2="${gx}" y1="${top}" y2="${top + rows.length * rowH + 8}" stroke="${D.rule}"/>` + mt(gx, H - 8, (i * 25) + '%', `text-anchor="middle" font-size="10.5" fill="${D.ink3}" font-family='${MONO}'`); }
    rows.forEach((r, i) => {
      const y = top + i * rowH + (r.total ? 0 : 8), bh = rowH - 9;
      b += mt(labW - 9, y + bh / 2 + 4, r.name, `text-anchor="end" font-size="11.5" fill="${r.total ? D.ink : D.ink2}"${r.total ? ' font-weight="700"' : ''}`);
      let acc = 0;
      r.parts.forEach((v, k) => {
        if (!v) return;
        const f = v / r.n, x0 = x(acc), ww = f * pw;
        b += `<rect x="${x0}" y="${y}" width="${Math.max(.5, ww)}" height="${bh}" fill="${cols[k]}" data-tip="${esc(r.name)} · ${esc(names[k])}: <b>${pct(f * 100, 0)}</b> (${nf(v)})"/>`;
        if (ww > 30) b += mt(x0 + ww / 2, y + bh / 2 + 4, pct(f * 100, 0), `text-anchor="middle" font-size="10" font-weight="600" fill="#fff" font-family='${MONO}'`);
        acc += f;
      });
      b += mt(labW + pw + 8, y + bh / 2 + 4, nf(r.n) + (w < 480 ? '' : ' ' + d('pols')), `font-size="11" fill="${D.ink2}" font-family='${MONO}'${r.total ? ' font-weight="600"' : ''}`);
      if (r.total) b += `<line x1="0" x2="${w}" y1="${y + bh + 4}" y2="${y + bh + 4}" stroke="${D.axis}" stroke-dasharray="3 4"/>`;
    });
    return dsvg(w, H, b, o.label);
  }

  function dPie(w, items, o = {}) {
    const tot = items.reduce((a, i) => a + Math.max(0, i.value), 0);
    if (!tot) return `<p class="dash__empty">${d('none')}</p>`;
    const S = Math.min(220, Math.max(170, w * .42)), r = S / 2 - 6, cx = S / 2, cy = S / 2;
    let a = -Math.PI / 2, b = '';
    items.forEach(it => {
      const f = Math.max(0, it.value) / tot; if (f <= 0) return;
      const a2 = a + f * Math.PI * 2, tip = `${esc(it.name)}: <b>${pct(f * 100)}</b>`;
      if (f > .9999) b += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${it.color}" data-tip="${tip}"/>`;
      else b += `<path d="M${cx},${cy}L${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}A${r},${r} 0 ${a2 - a > Math.PI ? 1 : 0} 1 ${cx + r * Math.cos(a2)},${cy + r * Math.sin(a2)}Z" fill="${it.color}" stroke="${D.surface}" stroke-width="2" stroke-linejoin="round" data-tip="${tip}"/>`;
      if (f >= .09) { const m = a + (a2 - a) / 2; b += mt(cx + r * .63 * Math.cos(m), cy + r * .63 * Math.sin(m) + 4, pct(f * 100, 0), `text-anchor="middle" font-size="12.5" font-weight="600" fill="${it.ink || '#fff'}"`); }
      a = a2;
    });
    const leg = items.map(it => `<div class="pie-row"><i class="sw" style="background:${it.color}"></i><div><div class="nm">${esc(it.name)}</div><div class="dt">${esc(pct(it.value / tot * 100))}${it.detail ? ' · ' + esc(it.detail) : ''}</div></div></div>`).join('');
    return `<div class="pie-wrap"><div class="pie-fig">${dsvg(S, S, b, o.label)}</div><div class="pie-leg">${leg}</div></div>`;
  }

  function dScatter(w, pts, o) {
    const H = Math.max(260, Math.min(360, w * .5)), L0 = 46, R0 = 14, T0 = 14, B0 = 38, pw = w - L0 - R0, ph = H - T0 - B0;
    const x = v => L0 + v / o.xMax * pw, y = v => T0 + ph - (v - o.yMin) / (o.yMax - o.yMin) * ph;
    let b = '';
    for (let g = 0; g <= 5; g++) { const v = o.yMin + (o.yMax - o.yMin) * g / 5; b += `<line x1="${L0}" x2="${w - R0}" y1="${y(v)}" y2="${y(v)}" stroke="${D.rule}"/>` + mt(L0 - 7, y(v) + 3.5, nf(v) + '%', `text-anchor="end" font-size="10.5" fill="${D.ink3}" font-family='${MONO}'`); }
    for (let g = 0; g <= o.xMax; g += 10) b += mt(x(g), T0 + ph + 15, g, `text-anchor="middle" font-size="10.5" fill="${D.ink3}" font-family='${MONO}'`);
    b += `<line x1="${x(o.qx)}" x2="${x(o.qx)}" y1="${T0}" y2="${T0 + ph}" stroke="${D.axis}" stroke-dasharray="4 3"/><line x1="${L0}" x2="${w - R0}" y1="${y(o.qy)}" y2="${y(o.qy)}" stroke="${D.axis}" stroke-dasharray="4 3"/>`;
    b += mt(w - R0, H - 4, o.xLabel + ' →', `text-anchor="end" font-size="11" fill="${D.ink2}"`) + mt(L0 + 4, T0 + 12, '↑ ' + o.yLabel, `font-size="11" fill="${D.ink2}"`);
    pts.forEach(p => { b += `<circle cx="${x(p.x)}" cy="${y(p.y)}" r="${p.r}" fill="${p.color}" fill-opacity=".8" stroke="${D.surface}" stroke-width="1.2" data-tip="${esc(p.tip)}"/>`; });
    return dsvg(w, H, b, o.label);
  }

  /* ---------- illustrative data ---------- */
  const PRODUCTS = [
    ['Property', ['Industrial', 'Commercial', 'Residential', 'Earthquake', 'Business interruption']],
    ['Engineering', ['Contractors all risk', 'Erection all risk', 'Machinery breakdown', 'Electronic equipment', 'Heavy equipment']],
    ['Marine Cargo', ['Import', 'Export', 'Domestic', 'Inland transit']],
    ['Marine Hull', ['Tug & barge', 'Fishing vessel', 'Passenger vessel']],
    ['Liability', ['Public', 'Product', 'Professional', "Employer's"]],
    ['Motor', ['Private car', 'Commercial vehicle', 'Motorcycle']],
    ['Personal Accident', ['Individual', 'Group', 'Travel']],
    ['Credit', ['Trade credit', 'Consumer credit', 'Micro business loan', 'Cash loan']],
    ['Surety', ['Bid bond', 'Performance bond', 'Advance payment bond', 'Maintenance bond', 'Customs bond']],
    ['Miscellaneous', ['Cash in transit', 'Cash in safe', 'Fidelity guarantee', 'Group health']]
  ];
  const BRANCHES = ['Jakarta', 'Bandung', 'Semarang', 'Surabaya', 'Malang', 'Makassar', 'Palembang', 'Pekanbaru', 'Denpasar', 'Samarinda', 'Yogyakarta', 'Tangerang', 'Bekasi'];
  const RISK_COB = ['Property', 'Engineering', 'Marine', 'Liability'];
  function portfolio(year, line) {
    const r = rng(hash('asei' + year + line)), yf = { 2022: .8, 2023: .86, 2024: .95, 2025: 1, 2026: .72 }[year];
    const prods = [];
    PRODUCTS.forEach(([ln, subs]) => {
      if (line !== 'all' && line !== ln) return;
      subs.forEach(s => { const prem = (2 + r() * 48) * yf, lr = 14 + r() * 42 + (r() < .14 ? 22 + r() * 18 : 0); prods.push({ name: s, line: ln, prem, lr, claims: prem * lr / 100 }); });
    });
    const k = line === 'all' ? 1 : .18;
    const branches = BRANCHES.map(b => { const p = (30 + r() * 120) * yf * k; return { b, p, c: p * (.25 + r() * .5) }; });
    const counts = [5200, 3900, 1900, 700, 210, 38].map(v => Math.round(v * (line === 'all' ? 1 : .14) * yf * (.8 + r() * .4)));
    return { prods, branches, counts };
  }
  const BANDS = ['< 1', '1-5', '5-25', '25-100', '100-500', '> 500'];
  const RATE = {
    Property: { base: .85, occ: ['Office, residential', 'Retail, warehouse', 'Light manufacturing', 'Textile, plastics', 'Chemicals, sawmill'] },
    Engineering: { base: 1.55, occ: ['Building works', 'Road and bridge', 'Plant erection', 'Tunnelling', 'Offshore and dam'] },
    'Marine Cargo': { base: .65, occ: ['General goods, container', 'Foodstuffs', 'Electronics', 'Bulk commodities', 'Hazardous goods'] }
  };
  const CLASS_F = [.7, 1, 1.45, 2.15, 3.3], RETAIN = [30, 24, 18, 12, 7], LINES = 8;
  function ssb(year) {
    const r = rng(hash('ssb' + year)), m = d('months');
    const vol = m.map((_, i) => 52 + r() * 16 + (i === 3 || i === 11 ? 12 : 0));
    const sell = m.map((_, i) => 34200 + i * 120 + r() * 1800 + (year === '2023' ? 900 : 0));
    const cost = sell.map(s => s - 1700 - r() * 1500);
    const sales = vol.map((v, i) => v * sell[i] / 1000), gp = vol.map((v, i) => v * (sell[i] - cost[i]) / 1000);
    const newc = sales.map(s => s * (.55 + r() * .15)), paid = newc.map(v => v * (.86 + r() * .2));
    return { m, vol, sell, cost, sales, gp, newc, paid };
  }
  const chip = (cls, text) => `<span class="chip ${cls}">${esc(text)}</span>`;
  const lrChip = v => v > 60 ? chip('crit', d('above')) : v > 50 ? chip('warn', d('watch')) : chip('good', d('healthy'));
  const sum = a => a.reduce((s, v) => s + v, 0);
  const PIE = [D.brand, D.s1, D.o2, D.o1, D.s3, D.s2, D.axis];

  /* ---------- modules ---------- */
  const MODS = {
    a1: {
      state: { year: '2025', line: 'all' },
      filters: s => [
        { key: 'year', label: d('year'), value: s.year, options: [['2023', '2023'], ['2024', '2024'], ['2025', '2025'], ['2026', '2026 YTD']] },
        { key: 'line', label: d('line'), value: s.line, options: [['all', d('all')]].concat(PRODUCTS.map(([n]) => [n, d('lines')[n]])) }
      ],
      build(s) {
        const p = portfolio(s.year, s.line), prev = portfolio(String(+s.year - 1), s.line);
        const prem = sum(p.prods.map(x => x.prem)), cl = sum(p.prods.map(x => x.claims)), lr = cl / prem * 100;
        const pp = sum(prev.prods.map(x => x.prem)), g = (prem / pp - 1) * 100, pol = sum(p.counts);
        const byLine = {}; p.prods.forEach(x => { byLine[x.line] = (byLine[x.line] || 0) + x.prem; });
        const lines = Object.entries(byLine).sort((a, b) => b[1] - a[1]);
        const mix = lines.slice(0, 6).map(([n, v], i) => ({ name: d('lines')[n], value: v, color: PIE[i], detail: bn(v) }));
        if (lines.length > 6) mix.push({ name: d('others'), value: sum(lines.slice(6).map(x => x[1])), color: D.axis, ink: D.ink, detail: bn(sum(lines.slice(6).map(x => x[1]))) });
        const top = p.prods.slice().sort((a, b) => b.lr - a.lr).slice(0, 10);
        return {
          tiles: [
            { k: d('gp'), v: bn(prem), n: d('vsPrev'), chip: s.year === '2026' ? '' : chip(g >= 0 ? 'good' : 'crit', (g >= 0 ? '+' : '') + pct(g)) },
            { k: d('cl'), v: bn(cl), n: (k => lang === 'id' ? `${k} produk di atas 60%` : `${k} product${k === 1 ? '' : 's'} above 60%`)(top.filter(x => x.lr > 60).length) },
            { k: d('lr'), v: pct(lr), chip: lrChip(lr) }
          ],
          stats: [[d('pol'), nf(pol)], [d('prod'), nf(p.prods.length)], [d('br'), nf(BRANCHES.length)]],
          cards: [
            { title: d('lrProd'), sub: d('lrProdS'), chart: w => dHbar(w, top.map(x => ({ name: x.name, value: x.lr, color: x.lr > 60 ? D.crit : x.lr > 50 ? D.warn : D.s1, tip: `${esc(x.name)} (${esc(d('lines')[x.line])})<br>${d('lr')}: <b>${pct(x.lr)}</b>` })), { ref: 60, refLabel: '60%', fmt: v => pct(v, 0), tick: v => nf(v) + '%', label: d('lrProd') }),
              table: [[d('product'), d('lob'), d('premium'), d('claims'), d('lr')], top.map(x => [x.name, d('lines')[x.line], bn(x.prem), bn(x.claims), pct(x.lr)])] },
            { title: d('mix'), sub: d('mixS'), chart: w => dPie(w, mix, { label: d('mix') }), table: [[d('lob'), d('premium'), d('share')], mix.map(x => [x.name, x.detail, pct(x.value / prem * 100)])] },
            { title: d('brT'), sub: d('brS'), chart: w => dBars(w, p.branches.map(b => b.b), [{ name: d('premium'), color: D.s1, values: p.branches.map(b => b.p) }, { name: d('claims'), color: D.s2, values: p.branches.map(b => b.c) }], { fmt: bn, labels: false, label: d('brT') }),
              legend: [[d('premium'), D.s1], [d('claims'), D.s2]], table: [[d('branch'), d('premium'), d('claims'), d('lr')], p.branches.map(b => [b.b, bn(b.p), bn(b.c), pct(b.c / b.p * 100)])] },
            { title: d('siT'), sub: d('siS'), chart: w => dBars(w, BANDS.map(x => x + (lang === 'id' ? ' M' : ' bn')), [{ name: d('pol'), color: D.o3, values: p.counts }], { fmt: v => nf(v), short: v => nf(v), label: d('siT') }),
              table: [[d('band'), d('pol')], BANDS.map((x, i) => ['Rp ' + x + (lang === 'id' ? ' M' : ' bn'), nf(p.counts[i])])] }
          ]
        };
      }
    },
    a2: {
      state: { cob: 'all' },
      filters: s => [{ key: 'cob', label: d('cob'), value: s.cob, options: [['all', d('allCob')]].concat(RISK_COB.map(c => [c, d('cobN')[c]])) }],
      build(s) {
        const r = rng(hash('risk' + s.cob)), lv = d('lvls'), cols = [D.s3, D.s1, '#E3A21A', D.crit];
        const scale = s.cob === 'all' ? 1 : .32;
        const rows = BRANCHES.map(b => {
          const n = Math.max(8, Math.round((14 + r() * 110) * scale));
          const raw = [r() * 4, r() * 3, 1.5 + r() * 5, r() * 2.4].map(v => (r() < .14 ? 0 : v));
          const t = raw.reduce((a, v) => a + v, 0) || 1;
          let parts = raw.map(v => Math.round(v / t * n)); parts[2] += n - parts.reduce((a, v) => a + v, 0);
          parts = parts.map(v => Math.max(0, v));
          return { name: b, parts, n: parts.reduce((a, v) => a + v, 0) };
        }).sort((a, b) => b.n - a.n);
        const tot = [0, 1, 2, 3].map(k => sum(rows.map(x => x.parts[k]))), N = sum(tot), hiShare = (tot[2] + tot[3]) / N * 100;
        return {
          tiles: [
            { k: d('polIn'), v: nf(N), n: s.cob === 'all' ? d('allCob') : d('cobN')[s.cob] },
            { k: d('hiVh'), v: pct(hiShare), chip: hiShare > 60 ? chip('crit', d('watch')) : chip('warn', d('watch')) },
            { k: d('vhOnly'), v: pct(tot[3] / N * 100), n: nf(tot[3]) + ' ' + d('pols') }
          ],
          cards: [
            { title: d('riskT'), sub: d('riskS'), wide: true, legend: lv.map((n, k) => [n, cols[k]]),
              chart: w => dStack(w, [{ name: d('allBr'), parts: tot, n: N, total: true }].concat(rows), cols, lv, { label: d('riskT') }),
              table: [[d('branch')].concat(lv, [d('pol')]), [[d('allBr')].concat(tot.map(nf), [nf(N)])].concat(rows.map(x => [x.name].concat(x.parts.map(nf), [nf(x.n)])))] }
          ]
        };
      }
    },
    a3: {
      state: { br: 'all' },
      filters: s => [{ key: 'br', label: d('branch'), value: s.br, options: [['all', d('allBr')]].concat(BRANCHES.map(b => [b, b])) }],
      build(s) {
        const r = rng(hash('pending2')), uws = Array.from({ length: 16 }, (_, i) => 'UW ' + String.fromCharCode(65 + i));
        const tocs = d('tocs'), cases = [];
        BRANCHES.forEach((b, bi) => {
          const n = 4 + Math.round(r() * 26);
          for (let i = 0; i < n; i++) cases.push({ br: b, uw: uws[(bi * 2 + Math.floor(r() * 3)) % uws.length], toc: tocs[Math.floor(Math.pow(r(), 1.6) * tocs.length)], lapse: Math.round(Math.pow(r(), 1.8) * 48) + 1, renew: r() < .38 });
        });
        const view = s.br === 'all' ? cases : cases.filter(c => c.br === s.br);
        const cnt = (arr, k) => { const m = {}; arr.forEach(c => { m[c[k]] = (m[c[k]] || 0) + 1; }); return Object.entries(m).sort((a, b) => b[1] - a[1]); };
        const byBr = cnt(cases, 'br'), byUw = cnt(view, 'uw').slice(0, 10), byToc = cnt(view, 'toc').slice(0, 10);
        const lapUw = Object.entries(view.reduce((m, c) => { (m[c.uw] = m[c.uw] || []).push(c.lapse); return m; }, {})).map(([u, a]) => [u, sum(a) / a.length]).sort((a, b) => b[1] - a[1]).slice(0, 10);
        const groups = [['<= 7', 0, 7], ['8-14', 8, 14], ['15-30', 15, 30], ['> 30', 31, 999]], gcol = [D.o1, D.o2, D.o4, D.crit];
        const gN = groups.map(([, a, b]) => view.filter(c => c.lapse >= a && c.lapse <= b).length);
        const nUw = new Set(view.map(c => c.uw)).size, renew = view.filter(c => c.renew).length;
        return {
          tiles: [
            { k: d('totCase'), v: nf(view.length), n: `${nf(view.length - renew)} ${d('newB')} · ${nf(renew)} ${d('renewB')}` },
            { k: d('nUw'), v: nf(nUw), n: s.br === 'all' ? d('allBr') : s.br },
            { k: d('over30'), v: nf(gN[3]), chip: chip('crit', pct(gN[3] / (view.length || 1) * 100)) }
          ],
          cards: [
            { title: d('pbrT'), sub: d('pbrS'), chart: w => dHbar(w, byBr.map(([b, n]) => ({ name: b, value: n, color: b === s.br ? D.brand : D.s1 })), { fmt: v => nf(v), labW: 100, label: d('pbrT') }), table: [[d('branch'), d('cases')], byBr.map(([b, n]) => [b, nf(n)])] },
            { title: d('topUwT'), sub: d('topUwS') + ' ' + (s.br === 'all' ? d('allBr').toLowerCase() : s.br), chart: w => dHbar(w, byUw.map(([u, n]) => ({ name: u, value: n, color: D.s1 })), { fmt: v => nf(v), labW: 80, label: d('topUwT') }), table: [[d('uw'), d('cases')], byUw.map(([u, n]) => [u, nf(n)])] },
            { title: d('lapUwT'), sub: d('lapUwS'), chart: w => dHbar(w, lapUw.map(([u, v]) => ({ name: u, value: v, color: v > 30 ? D.crit : v > 14 ? '#E3A21A' : D.s3 })), { fmt: v => nf(v, 1) + ' ' + d('days'), tick: v => nf(v), labW: 80, label: d('lapUwT') }), table: [[d('uw'), d('avgLap')], lapUw.map(([u, v]) => [u, nf(v, 1) + ' ' + d('days')])] },
            { title: d('lapCT'), sub: d('lapCS'), chart: w => dPie(w, groups.map((g, k) => ({ name: g[0] + ' ' + d('days'), value: gN[k], color: gcol[k], ink: k === 0 ? D.ink : '#fff', detail: nf(gN[k]) + ' ' + d('cases').toLowerCase() })), { label: d('lapCT') }), table: [[d('bucket'), d('cases')], groups.map((g, k) => [g[0], nf(gN[k])])] },
            { title: d('tocT'), sub: d('tocS'), wide: true, chart: w => dHbar(w, byToc.map(([t, n]) => ({ name: t, value: n, color: D.o3 })), { fmt: v => nf(v), labW: 190, label: d('tocT') }), table: [['TOC', d('cases')], byToc.map(([t, n]) => [t, nf(n)])] }
          ]
        };
      }
    },
    a4: {
      state: {},
      build() {
        const r = rng(hash('fac')), wk = Array.from({ length: 8 }, (_, i) => d('wk') + ' ' + (i + 1));
        const tot = wk.map(() => 18 + r() * 26), own = tot.map(v => v * (.42 + r() * .12)), fac = tot.map(v => v * (.04 + r() * .1)), tre = tot.map((v, i) => v - own[i] - fac[i]);
        const T = sum(tot), fp = sum(fac) / T * 100;
        return {
          tiles: [{ k: d('wprem'), v: bn(T) }, { k: d('retP'), v: pct(sum(own) / T * 100), n: bn(sum(own)) }, { k: d('facP'), v: pct(fp), chip: fp > 10 ? chip('warn', d('watch')) : chip('good', d('healthy')) }],
          cards: [
            { title: d('wkT'), sub: d('wkS'), wide: true, chart: w => dBars(w, wk, [{ name: d('own'), color: D.s1, values: own }, { name: d('tre'), color: D.s3, values: tre }, { name: d('fac'), color: D.s2, values: fac }], { stacked: true, fmt: bn, short: v => nf(v, 1), label: d('wkT') }),
              legend: [[d('own'), D.s1], [d('tre'), D.s3], [d('fac'), D.s2]], table: [[d('week'), d('own'), d('tre'), d('fac')], wk.map((x, i) => [x, bn(own[i]), bn(tre[i]), bn(fac[i])])] },
            { title: d('retT'), sub: d('retS'), chart: w => dLine(w, wk, [{ name: d('own'), color: D.s1, values: own.map((v, i) => v / tot[i] * 100) }], { min: 30, fmt: v => pct(v), short: v => pct(v, 0), tick: v => nf(v) + '%', label: d('retT') }), table: [[d('week'), d('own')], wk.map((x, i) => [x, pct(own[i] / tot[i] * 100)])] },
            { title: d('splitT'), sub: d('splitS'), chart: w => dPie(w, [{ name: d('own'), value: sum(own), color: D.s1, detail: bn(sum(own)) }, { name: d('tre'), value: sum(tre), color: D.s3, detail: bn(sum(tre)) }, { name: d('fac'), value: sum(fac), color: D.s2, detail: bn(sum(fac)) }], { label: d('splitT') }),
              table: [[d('layer'), d('premium'), d('share')], [[d('own'), own], [d('tre'), tre], [d('fac'), fac]].map(([n, a]) => [n, bn(sum(a)), pct(sum(a) / T * 100)])] }
          ]
        };
      }
    },
    a5: {
      state: { cob: 'all' },
      filters: s => [{ key: 'cob', label: d('cob'), value: s.cob, options: [['all', d('allCob')]].concat(RISK_COB.map(c => [c, d('cobN')[c]])) }],
      build(s) {
        const r = rng(hash('claims' + s.cob)), causes = d('causes'), k = s.cob === 'all' ? 1 : .3;
        const byCause = causes.map((c, i) => [c, Math.max(2, Math.round((60 / (i + 1.4) + r() * 14) * k))]).sort((a, b) => b[1] - a[1]);
        const nClaims = sum(byCause.map(x => x[1]));
        const ins = Array.from({ length: 10 }, (_, i) => [d('insured') + ' ' + String.fromCharCode(65 + i), (6 + r() * 40) * k * (1 - i * .07)]).sort((a, b) => b[1] - a[1]);
        const paid = sum(ins.map(x => x[1])) * 2.1;
        const split = (n, w) => { const t = sum(w), a = w.map(v => Math.floor(v / t * n)); a[a.indexOf(Math.max(...a))] += n - sum(a); return a; };
        const cobW = RISK_COB.map(() => .5 + r()), cobN = split(nClaims, cobW);
        const cobs = RISK_COB.map((c, i) => [d('cobN')[c], cobN[i]]).filter(x => s.cob === 'all' || x[0] === d('cobN')[s.cob]).map(x => s.cob === 'all' ? x : [x[0], nClaims]);
        const yrs = ['2021', '2022', '2023', '2024', '2025', '2026'], yr = split(nClaims, yrs.map((_, i) => (.7 + r() * .6) * (i === 5 ? .7 : 1)));
        const sev = ['< 50 m', '50-250 m', '250 m-1 bn', '1-5 bn', '> 5 bn'], sevN = split(nClaims, [.38, .29, .18, .11, .04].map(v => v * (.85 + r() * .3)));
        const dol = ['0-30', '31-90', '91-180', '181-270', '271-365'], dolN = split(nClaims, [.12, .2, .27, .23, .18].map(v => v * (.85 + r() * .3)));
        const bn2 = v => bn(v);
        return {
          tiles: [
            { k: d('nClaims'), v: nf(nClaims), n: '2021 - 2026' },
            { k: d('cl'), v: bn2(paid), n: d('shareP') },
            { k: d('topCause'), v: byCause[0][0], chip: chip('crit', pct(byCause[0][1] / nClaims * 100, 0) + ' ' + d('ofClaims')) }
          ],
          cards: [
            { title: d('causeT'), sub: d('causeS'), chart: w => dHbar(w, byCause.map(([c, n], i) => ({ name: c, value: n, color: i === 0 ? D.crit : D.s1 })), { fmt: v => nf(v), labW: 130, label: d('causeT') }), table: [[d('cause'), d('claimsN')], byCause.map(([c, n]) => [c, nf(n)])] },
            { title: d('insT'), sub: d('insS'), chart: w => dHbar(w, ins.map(([n, v]) => ({ name: n, value: v, color: D.o3 })), { fmt: bn2, tick: v => nf(v), labW: 100, label: d('insT') }), table: [[d('insured'), d('cl')], ins.map(([n, v]) => [n, bn2(v)])] },
            { title: d('yrT'), sub: d('yrS'), chart: w => dBars(w, yrs, [{ name: d('claimsN'), color: D.s1, values: yr }], { fmt: v => nf(v), short: v => nf(v), label: d('yrT') }), table: [[d('year'), d('claimsN')], yrs.map((y, i) => [y, nf(yr[i])])] },
            { title: d('cobCT'), sub: d('cobCS'), chart: w => dPie(w, cobs.map(([c, n], i) => ({ name: c, value: n, color: PIE[i], detail: nf(n) + ' ' + d('claimsN').toLowerCase() })), { label: d('cobCT') }), table: [[d('cob'), d('claimsN')], cobs.map(([c, n]) => [c, nf(n)])] },
            { title: d('sevT'), sub: d('sevS'), chart: w => dBars(w, sev, [{ name: d('claimsN'), color: D.o4, values: sevN }], { fmt: v => nf(v), short: v => nf(v), label: d('sevT') }), table: [[d('band'), d('claimsN')], sev.map((x, i) => [x, nf(sevN[i])])] },
            { title: d('dolT'), sub: d('dolS'), chart: w => dBars(w, dol, [{ name: d('claimsN'), color: D.o2, values: dolN }], { fmt: v => nf(v), short: v => nf(v), label: d('dolT') }), table: [[d('dayOf'), d('claimsN')], dol.map((x, i) => [x, nf(dolN[i])])] }
          ]
        };
      }
    },
    b1: {
      state: { year: '2023' },
      filters: s => [{ key: 'year', label: d('year'), value: s.year, options: [['2022', '2022'], ['2023', '2023']] }],
      build(s) {
        const x = ssb(s.year), S = sum(x.sales), G = sum(x.gp), m = G / S * 100;
        return {
          tiles: [{ k: d('sales'), v: bn(S / 1000) }, { k: d('gprof'), v: mn(G) }, { k: d('margin'), v: pct(m), chip: m < 6 ? chip('warn', d('watch')) : chip('good', d('healthy')) }],
          stats: [[d('vol'), nf(sum(x.vol)) + ' t'], [d('cust'), '97'], [d('price'), 'Rp ' + nf(sum(x.sell) / 12000, 1) + (lang === 'id' ? ' rb/kg' : 'k/kg')]],
          cards: [
            { title: d('salesT'), sub: d('salesS'), chart: w => dBars(w, x.m, [{ name: d('gprof'), color: D.s3, values: x.gp }, { name: d('cost'), color: D.s1, values: x.sales.map((v, i) => v - x.gp[i]) }], { stacked: true, labels: false, fmt: mn, label: d('salesT') }),
              legend: [[d('gprof'), D.s3], [d('cost'), D.s1]], table: [[d('month'), d('sales'), d('gprof')], x.m.map((mm, i) => [mm, mn(x.sales[i]), mn(x.gp[i])])] },
            { title: d('priceT'), sub: d('priceS'), chart: w => dLine(w, x.m, [{ name: d('sell'), color: D.s1, values: x.sell.map(v => v / 1000) }, { name: d('cost'), color: D.s2, values: x.cost.map(v => v / 1000) }], { min: 30, fmt: v => nf(v, 1), short: v => nf(v, 1), label: d('priceT') }),
              legend: [[d('sell'), D.s1], [d('cost'), D.s2]], table: [[d('month'), d('sell'), d('cost')], x.m.map((mm, i) => [mm, nf(x.sell[i]), nf(x.cost[i])])] }
          ]
        };
      }
    },
    b2: {
      state: {},
      build() {
        const x = ssb('2023'), bal = []; let b = 820; x.newc.forEach((v, i) => { b += v - x.paid[i]; bal.push(Math.max(300, b)); });
        const ages = [['0-7', 640, D.o1], ['8-14', 410, D.o2], ['15-30', 260, D.o4], ['31-60', 120, D.crit], ['> 60', 55, D.crit]], open = sum(ages.map(a => a[1]));
        const pr = sum(x.paid) / sum(x.newc) * 100;
        return {
          tiles: [{ k: d('openR'), v: mn(open), chip: chip('crit', pct(175 / open * 100) + (lang === 'id' ? ' > 30 hari' : ' > 30 days')) }, { k: d('newC'), v: mn(sum(x.newc)) }, { k: d('payR'), v: pct(pr), chip: pr < 98 ? chip('warn', d('watch')) : chip('good', d('healthy')) }],
          cards: [
            { title: d('flowT'), sub: d('flowS'), wide: true, chart: w => dBars(w, x.m, [{ name: d('newc'), color: D.s2, values: x.newc }, { name: d('paid'), color: D.s3, values: x.paid }], { labels: false, fmt: mn, label: d('flowT') }),
              legend: [[d('newc'), D.s2], [d('paid'), D.s3]], table: [[d('month'), d('newc'), d('paid')], x.m.map((mm, i) => [mm, mn(x.newc[i]), mn(x.paid[i])])] },
            { title: d('ageT'), sub: d('ageS'), chart: w => dHbar(w, ages.map(([a, v, c]) => ({ name: a + ' ' + d('days'), value: v, color: c })), { fmt: mn, labW: 90, label: d('ageT') }), table: [[d('age'), d('openR')], ages.map(a => [a[0] + ' ' + d('days'), mn(a[1])])] },
            { title: d('balT'), sub: d('balS'), chart: w => dLine(w, x.m, [{ name: d('balT'), color: D.brand, values: bal }], { fmt: mn, short: v => nf(v), label: d('balT') }), table: [[d('month'), d('balT')], x.m.map((mm, i) => [mm, mn(bal[i])])] }
          ]
        };
      }
    },
    b3: {
      state: {},
      build() {
        const r = rng(hash('map'));
        const pts = Array.from({ length: 97 }, (_, i) => {
          const fast = r() < .55, x = fast ? 2 + r() * 13 : 10 + r() * 34, y = Math.min(100, (fast ? 88 : 70) + r() * 14 - (x > 30 ? r() * 18 : 0)), rev = .4 + Math.pow(r(), 2) * 6;
          const q = y < 85 ? 3 : x <= 14 ? 1 : 2;
          return { id: (lang === 'id' ? 'Pelanggan ' : 'Customer ') + String(i + 1).padStart(2, '0'), x, y, r: 3 + rev, q, color: [0, D.s3, D.s1, D.crit][q] };
        });
        pts.forEach(p => { p.tip = `${esc(p.id)}<br>${esc(d('dpay'))}: <b>${nf(p.x)}</b><br>${esc(d('settle'))}: <b>${pct(p.y, 0)}</b>`; });
        const n = q => pts.filter(p => p.q === q).length, pri = pts.filter(p => p.q === 3).sort((a, b) => a.y - b.y).slice(0, 10);
        return {
          tiles: [{ k: d('q1'), v: nf(n(1)), chip: chip('good', pct(n(1) / 97 * 100, 0)) }, { k: d('q2'), v: nf(n(2)), chip: chip('warn', pct(n(2) / 97 * 100, 0)) }, { k: d('q3'), v: nf(n(3)), chip: chip('crit', pct(n(3) / 97 * 100, 0)) }],
          cards: [
            { title: d('mapT'), sub: d('mapS'), wide: true, chart: w => dScatter(w, pts, { xMax: 50, yMin: 50, yMax: 100, qx: 14, qy: 85, xLabel: d('dpay'), yLabel: d('settle'), label: d('mapT') }),
              legend: [[d('q1'), D.s3], [d('q2'), D.s1], [d('q3'), D.crit]], table: [[d('customer'), d('dpay'), d('settle')], pri.map(p => [p.id, nf(p.x), pct(p.y, 0)])], tableNote: d('topQ') + ' · ' + d('topQS') }
          ]
        };
      }
    }
  };

  const dashViews = {};
  function renderDash(el, keepFilters) {
    const id = el.dataset.mod, mod = MODS[id], s = mod.state, spec = mod.build(s);
    if (!keepFilters || !el.querySelector('.dash__bar')) {
      const fl = mod.filters ? mod.filters(s) : [];
      el.innerHTML = (fl.length ? `<div class="dash__bar">${fl.map(f => f.range
        ? `<label class="fbtn fbtn--range"><span class="lab">${esc(f.label)}</span><input type="range" min="${f.range[0]}" max="${f.range[1]}" value="${esc(f.value)}" data-k="${f.key}"><output class="val">${esc(f.out(f.value))}</output></label>`
        : `<label class="fbtn"><span class="lab">${esc(f.label)}</span><select data-k="${f.key}">${f.options.map(([v, t]) => `<option value="${esc(v)}"${v === f.value ? ' selected' : ''}>${esc(t)}</option>`).join('')}</select></label>`).join('')}</div>` : '') + '<div class="dash__main"></div>';
      $$('[data-k]', el).forEach(inp => inp.addEventListener('input', () => {
        s[inp.dataset.k] = inp.value;
        if (inp.dataset.k === 'cob') { s.occ = '1'; renderDash(el, false); return; }
        if (inp.type === 'range') inp.nextElementSibling.textContent = mod.filters(s).find(f => f.key === inp.dataset.k).out(inp.value);
        renderDash(el, true);
      }));
    }
    const main = $('.dash__main', el);
    main.innerHTML =
      `<div class="htiles">${spec.tiles.map(tl => `<div class="htile"><span class="k">${esc(tl.k)}</span><span class="v">${esc(tl.v)}</span>${tl.n ? `<span class="n">${esc(tl.n)}</span>` : ''}${tl.chip || ''}</div>`).join('')}</div>` +
      (spec.stats ? `<dl class="dstats">${spec.stats.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : '') +
      `<div class="dgrid">${spec.cards.map((c, i) => `<section class="dcard${c.wide ? ' wide' : ''}" data-i="${i}"><div class="chead"><div><h4>${esc(c.title)}</h4>${c.sub ? `<p class="cs">${esc(c.sub)}</p>` : ''}</div><div class="tog" role="group" aria-label="${esc(c.title)}"><button type="button" data-v="chart">${d('chart')}</button><button type="button" data-v="table">${d('table')}</button></div></div>${c.legend ? `<div class="dlegend">${c.legend.map(([n, col]) => `<span><i class="sw" style="background:${col}"></i>${esc(n)}</span>`).join('')}</div>` : ''}<div class="dbody"></div></section>`).join('')}</div>`;
    $$('.dcard', main).forEach(card => {
      const c = spec.cards[+card.dataset.i], key = id + ':' + card.dataset.i, body = $('.dbody', card);
      const paint = () => {
        const v = dashViews[key] || 'chart';
        $$('.tog button', card).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === v)));
        if (v === 'table') {
          const [cols, rows] = c.table;
          body.innerHTML = `<div class="dtable"><table><thead><tr>${cols.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(x => `<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>${c.tableNote ? `<p class="cs">${esc(c.tableNote)}</p>` : ''}`;
        } else body.innerHTML = c.chart(Math.max(260, body.clientWidth || card.clientWidth - 36));
      };
      $$('.tog button', card).forEach(b => b.addEventListener('click', () => { dashViews[key] = b.dataset.v; paint(); }));
      paint();
    });
  }
  function renderDashes() { $$('.dash').forEach(el => { if (!el.closest('[hidden]')) renderDash(el, false); }); }
  function buildSelects() {}

  /* ------------------------------------------------------------------
     E-commerce funnel (real figures from the analysis)
  ------------------------------------------------------------------ */
  const EC = { 2023: [50.6, 21.1, 29.2], 2024: [51.3, 28.5, 30.3], 2025: [53.5, 31.6, 37.6] };
  let ecYear = '2025';
  const ecPrev = [];
  function renderEc() {
    const el = $('#ecFunnel'); if (!el) return;
    const s = EC[ecYear], v = [100]; s.forEach(x => v.push(v[v.length - 1] * x / 100));
    const w = W(el), lh = 46, labW = Math.min(150, w * .36), h = lh * 4;
    let b = '';
    const st = t('st');
    v.forEach((val, i) => {
      const y = i * lh, bw = Math.max(3, (val / 100) * (w - labW - 70));
      b += `<text x="0" y="${y + 21}" font-size="12.5" style="font-weight:600">${st[i]}</text>`;
      const from = ecPrev[i] != null && !reduced ? ecPrev[i] : bw;
      ecPrev[i] = bw;
      b += `<rect class="ecbar" x="${labW}" y="${y + 6}" width="${from}" data-w="${bw}" height="24" fill="${i === 3 ? C.teal : C.ink}" data-tip="${st[i]}: <b>${nf(val, 1)}</b> / 100" style="transition:width .55s var(--out)"/>`;
      b += `<text class="v" x="${labW + bw + 8}" y="${y + 23}" style="font-size:13px;font-weight:600">${nf(val, 1)}</text>`;
      if (i > 0) b += `<text x="${labW}" y="${y + 44}" font-size="11" fill="${C.red}" style="fill:${C.red}">−${pct(100 - s[i - 1])} ${t('leave')}</text>`;
    });
    el.innerHTML = svgWrap(w, h + 4, b, 'Funnel per 100 visitors');
    // bars grow from the previous year's widths, so the year switch shows the change
    requestAnimationFrame(() => requestAnimationFrame(() => $$('.ecbar', el).forEach(r => { r.style.width = r.dataset.w + 'px'; })));
  }
  $$('#ecYear button').forEach(btn => btn.addEventListener('click', () => {
    ecYear = btn.dataset.y;
    $$('#ecYear button').forEach(x => x.setAttribute('aria-pressed', String(x === btn)));
    renderEc();
  }));

  /* ------------------------------------------------------------------
     Bonus-Malus tables, copied cell for cell from the thesis
     rows: years so far t = 0..7, columns: total claims K = 0..5
  ------------------------------------------------------------------ */
  const BM_P0 = 246.66;
  const BM_SEV = {
    1500: [[220.28, 392.33, 419.51, 434.55, 444.11, 450.72], [199.00, 354.43, 378.98, 392.57, 401.21, 407.18], [181.47, 323.20, 345.59, 357.99, 365.86, 371.31], [166.77, 297.03, 317.61, 329.00, 336.24, 341.24], [154.28, 274.78, 293.82, 304.36, 311.05, 315.68], [143.53, 255.64, 273.34, 283.15, 289.38, 293.68], [134.18, 238.98, 255.54, 264.70, 270.53, 274.55]],
    2000: [[220.28, 435.41, 465.57, 482.27, 492.88, 500.22], [199.00, 393.35, 420.59, 435.68, 445.26, 451.89], [181.47, 358.69, 383.54, 397.30, 406.03, 412.08], [166.77, 329.65, 352.48, 365.13, 373.16, 378.71], [154.28, 304.96, 326.08, 337.78, 345.21, 350.35], [143.53, 283.71, 303.36, 314.24, 321.15, 325.93], [134.18, 265.23, 283.60, 293.77, 300.23, 304.70]],
    3000: [[220.28, 521.58, 557.70, 577.71, 590.42, 599.20], [199.00, 471.19, 503.82, 521.89, 533.37, 541.31], [181.47, 429.67, 459.43, 475.91, 486.38, 493.62], [166.77, 394.88, 422.23, 437.38, 447.00, 453.66], [154.28, 365.31, 390.61, 404.62, 413.52, 419.67], [143.53, 339.85, 363.39, 376.42, 384.70, 390.43], [134.18, 317.71, 339.72, 351.90, 359.64, 365.00]],
    5000: [[220.28, 693.90, 741.96, 768.58, 785.49, 797.18], [199.00, 626.86, 670.28, 694.33, 709.60, 720.16], [181.47, 571.64, 611.23, 633.15, 647.08, 656.71], [166.77, 525.35, 561.74, 581.89, 594.69, 603.54], [154.28, 486.00, 519.66, 538.30, 550.15, 558.33], [143.53, 452.13, 483.45, 500.79, 511.81, 519.43], [134.18, 422.68, 451.96, 468.17, 478.47, 485.59]]
  };
  // Table 4.6: frequency only, rescaled to the same starting premium
  const BM_FREQ = [[220.28, 440.56, 660.85, 881.13, 1101.41, 1321.69], [199.00, 398.00, 597.00, 796.00, 995.00, 1194.00], [181.47, 362.94, 544.40, 725.87, 907.34, 1088.81], [166.77, 333.55, 500.32, 667.10, 833.87, 1000.65], [154.28, 308.57, 462.85, 617.13, 771.41, 925.70], [143.53, 287.06, 430.60, 574.13, 717.66, 861.19], [134.18, 268.36, 402.54, 536.73, 670.91, 805.09]];
  const BM_TAB = { 1500: '4.5', 2000: '4.7', 3000: '4.8', 5000: '4.9' };
  const BMT = {
    en: { cap: (m, T) => m === 'freq' ? 'Table 4.6: premium with claim frequency only, scaled to a $246.66 start' : `Table ${BM_TAB[T]}: premium with frequency and severity, total severity T = $${new Intl.NumberFormat('en-US').format(T)}`,
      year: 'Years so far (t)', claims: 'Total claims (K)', start: 'Start: everyone pays $246.66.',
      read: (t, K, p, ch, alt) => `After ${t} year${t === 1 ? '' : 's'} with ${K} claim${K === 1 ? '' : 's'}, next year's premium is <b>$${p}</b>, a ${ch < 0 ? 'bonus' : 'malus'} of <b>${Math.abs(ch).toFixed(2)}%</b> against the $246.66 start.${alt}`,
      alt: (p, ch, m) => m === 'sev' ? ` With frequency only it would be $${p} (${ch >= 0 ? '+' : ''}${ch.toFixed(2)}%).` : ` With severity included (T = $1,500) it would be $${p} (${ch >= 0 ? '+' : ''}${ch.toFixed(2)}%).`,
      end: 'The thesis tables stop at 7 years and 5 claims. Press Reset to start again.', y: n => `Year ${n}`, c: n => n ? `${n} claim${n === 1 ? '' : 's'}` : 'no claim' },
    id: { cap: (m, T) => m === 'freq' ? 'Tabel 4.6: premi dengan frekuensi klaim saja, disesuaikan ke premi awal $246,66' : `Tabel ${BM_TAB[T]}: premi dengan frekuensi dan tingkat keparahan, total keparahan T = $${new Intl.NumberFormat('id-ID').format(T)}`,
      year: 'Tahun berjalan (t)', claims: 'Total klaim (K)', start: 'Awal: semua membayar $246,66.',
      read: (t, K, p, ch, alt) => `Setelah ${t} tahun dengan ${K} klaim, premi tahun berikutnya <b>$${p}</b>, ${ch < 0 ? 'bonus' : 'malus'} <b>${Math.abs(ch).toFixed(2).replace('.', ',')}%</b> terhadap premi awal $246,66.${alt}`,
      alt: (p, ch, m) => m === 'sev' ? ` Kalau hanya frekuensi, preminya $${p} (${ch >= 0 ? '+' : ''}${ch.toFixed(2).replace('.', ',')}%).` : ` Kalau tingkat keparahan ikut dihitung (T = $1.500), preminya $${p} (${ch >= 0 ? '+' : ''}${ch.toFixed(2).replace('.', ',')}%).`,
      end: 'Tabel di skripsi berhenti di 7 tahun dan 5 klaim. Tekan Ulang untuk mulai lagi.', y: n => `Tahun ${n}`, c: n => n ? `${n} klaim` : 'tanpa klaim' }
  };
  const bm = { m: 'sev', T: 1500, t: 0, K: 0, log: [], prev: null };
  const bmFmt = v => new Intl.NumberFormat(lang === 'id' ? 'id-ID' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v);
  const bmCell = (t, K, m = bm.m, T = bm.T) => (t === 0 ? (K === 0 ? BM_P0 : null) : (m === 'freq' ? BM_FREQ : BM_SEV[T])[t - 1][K]);

  function bmPlace(el, td) {
    if (!el || !td) return;
    el.style.width = td.offsetWidth + 'px'; el.style.height = td.offsetHeight + 'px';
    el.style.transform = `translate(${td.offsetLeft}px, ${td.offsetTop}px)`;
  }
  function renderBms() {
    const tbl = $('#bmTable'); if (!tbl) return;
    const L = BMT[lang];
    $('#bmCap').textContent = L.cap(bm.m, bm.T);
    $('#bmTWrap').hidden = bm.m === 'freq';
    $$('#bmModel button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.m === bm.m)));
    $('thead', tbl).innerHTML = `<tr><th rowspan="2" scope="col">${L.year}</th><th colspan="6" scope="colgroup">${L.claims}</th></tr><tr>${[0, 1, 2, 3, 4, 5].map(k => `<th scope="col">${k}</th>`).join('')}</tr>`;
    let rows = '';
    for (let t = 0; t <= 7; t++) {
      rows += `<tr><th scope="row">${t}</th>`;
      for (let K = 0; K <= 5; K++) {
        const v = bmCell(t, K);
        const cls = [v == null ? 'na' : '', K === 0 && t > 0 ? 'bonus' : '', bm.log.some(s => s.t === t && s.K === K) ? 'been' : ''].join(' ').trim();
        rows += `<td data-t="${t}" data-k="${K}"${cls ? ` class="${cls}"` : ''}>${v == null ? '-' : bmFmt(v)}</td>`;
      }
      rows += '</tr>';
    }
    $('tbody', tbl).innerHTML = rows;
    const cur = $(`td[data-t="${bm.t}"][data-k="${bm.K}"]`, tbl);
    cur.classList.add('now');
    const hl = $('#bmHl'), gh = $('#bmGhost');
    // start the highlighter on the previous cell, then slide it to the current one
    const from = bm.prev ? $(`td[data-t="${bm.prev.t}"][data-k="${bm.prev.K}"]`, tbl) : cur;
    hl.style.transition = 'none'; bmPlace(hl, from); void hl.offsetWidth;
    hl.style.transition = reduced ? 'none' : '';
    requestAnimationFrame(() => { bmPlace(hl, cur); const sc = tbl.closest('.bm-scroll'); if (sc && sc.scrollWidth > sc.clientWidth) sc.scrollTo({ left: Math.max(0, cur.offsetLeft + cur.offsetWidth - sc.clientWidth + 8), behavior: reduced ? 'auto' : 'smooth' }); });
    gh.style.opacity = bm.prev ? '1' : '0'; if (bm.prev) bmPlace(gh, from);
    const p = bmCell(bm.t, bm.K), ch = (p - BM_P0) / BM_P0 * 100;
    if (bm.t === 0) $('#bmRead').innerHTML = L.start;
    else {
      const om = bm.m === 'sev' ? 'freq' : 'sev', op = bmCell(bm.t, bm.K, om, 1500), och = (op - BM_P0) / BM_P0 * 100;
      $('#bmRead').innerHTML = L.read(bm.t, bm.K, bmFmt(p), ch, L.alt(bmFmt(op), och, bm.m)) + (bm.t >= 7 ? ' ' + L.end : '');
    }
    $('#bmLog').innerHTML = bm.log.filter(s => s.t > 0).map(s => `<li><b>${L.y(s.t)}</b> ${L.c(s.add)}</li>`).join('');
    $$('[data-bm]').forEach(b => { if (b.dataset.bm !== 'reset') b.disabled = bm.t >= 7 || bm.K + +b.dataset.bm > 5; });
  }
  function bmReset() { bm.t = 0; bm.K = 0; bm.prev = null; bm.log = [{ t: 0, K: 0, add: 0 }]; }
  bmReset();
  $$('[data-bm]').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.bm === 'reset') { bmReset(); renderBms(); return; }
    const add = +b.dataset.bm;
    if (bm.t >= 7 || bm.K + add > 5) return;
    bm.prev = { t: bm.t, K: bm.K }; bm.t += 1; bm.K += add; bm.log.push({ t: bm.t, K: bm.K, add });
    renderBms();
  }));
  $$('#bmModel button').forEach(b => b.addEventListener('click', () => { bm.m = b.dataset.m; bm.prev = null; renderBms(); }));
  const bmTSel = $('#bmT'); if (bmTSel) bmTSel.addEventListener('change', () => { bm.T = +bmTSel.value; bm.prev = null; renderBms(); });

  /* ------------------------------------------------------------------
     Render loop
  ------------------------------------------------------------------ */
  /* ------------------------------------------------------------------
     Edible-oil Power BI rebuild: real rows, same measures as the report
  ------------------------------------------------------------------ */
  const OIL = window.OIL;
  const BRAND_COL = { 'GULF GOLD': '#6A007F', RIMAL: '#1DAE46', RAWABI: '#17727A', LARA: '#7A4AC4', SABAYA: '#13C6F0', NAJMA: '#D4B300', NOUR: '#D8414C', ZAHRA: '#3B8DF0', HILAL: '#DF4AAE', BAYTNA: '#E7733A' };
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const oilState = { years: new Set([2022, 2023, 2024]), months: new Set(MON.map((_, i) => i + 1)), city: '', brand: '' };
  const kfmt = v => v >= 1e6 ? (v / 1e6).toFixed(2) + 'M' : v >= 1e3 ? (v / 1e3).toFixed(2) + 'K' : v.toFixed(0);
  const en = new Intl.NumberFormat('en-US');

  function oilSlicer(box, values, labels, set) {
    const all = `<label><input type="checkbox" data-all checked> Select all</label>`;
    box.innerHTML = all + values.map((v, i) => `<label><input type="checkbox" value="${v}" checked> ${labels[i]}</label>`).join('');
    const boxes = $$('input:not([data-all])', box), allBox = $('[data-all]', box);
    const sync = () => { allBox.checked = boxes.every(b => b.checked); allBox.indeterminate = !allBox.checked && boxes.some(b => b.checked); };
    allBox.addEventListener('change', () => { boxes.forEach(b => { b.checked = allBox.checked; }); set.clear(); if (allBox.checked) values.forEach(v => set.add(v)); renderOil(); });
    boxes.forEach(b => b.addEventListener('change', () => { b.checked ? set.add(+b.value) : set.delete(+b.value); sync(); renderOil(); }));
  }
  function setupOil() {
    if (!OIL || !$('#pbi')) return;
    oilSlicer($('#pbiYear'), [2022, 2023, 2024], ['2022', '2023', '2024'], oilState.years);
    oilSlicer($('#pbiMonth'), MON.map((_, i) => i + 1), MON, oilState.months);
    $('#pbiCity').insertAdjacentHTML('beforeend', OIL.cities.map(c => `<option>${c}</option>`).join(''));
    $('#pbiBrand').insertAdjacentHTML('beforeend', OIL.brands.map(c => `<option>${c}</option>`).join(''));
    $('#pbiCity').addEventListener('change', e => { oilState.city = e.target.value; renderOil(); });
    $('#pbiBrand').addEventListener('change', e => { oilState.brand = e.target.value; renderOil(); });
  }

  function squarify(items, x, y, w, h, out) {
    // items sorted desc, value in area units
    if (!items.length) return;
    if (items.length === 1) { out.push({ ...items[0], x, y, w, h }); return; }
    const total = items.reduce((s, i) => s + i.v, 0), horiz = w >= h, side = horiz ? h : w;
    let row = [], best = Infinity, i = 0;
    for (; i < items.length; i++) { const cand = row.concat(items[i]), wv = worstRatio(cand, side, total, horiz ? w : h); if (wv > best && row.length) break; row = cand; best = wv; }
    const rs = row.reduce((s, r) => s + r.v, 0), thick = rs / total * (horiz ? w : h);
    let off = 0;
    row.forEach(r => { const len = r.v / rs * side; out.push(horiz ? { ...r, x, y: y + off, w: thick, h: len } : { ...r, x: x + off, y, w: len, h: thick }); off += len; });
    const rest = items.slice(i);
    if (horiz) squarify(rest, x + thick, y, w - thick, h, out); else squarify(rest, x, y + thick, w, h - thick, out);
  }
  function worstRatio(row, side, total, span) {
    const s = row.reduce((a, b) => a + b.v, 0), thick = s / total * span;
    return Math.max(...row.map(r => { const len = r.v / s * side; return Math.max(thick / len, len / thick); }));
  }

  const PW = el => Math.max(150, Math.floor(el.getBoundingClientRect().width || 200));
  function pbiRows(el, cats, vals, o) {
    const w = PW(el), rowH = 24, labW = Math.min(108, w * .38), padR = 52, H = cats.length * rowH + 6, max = Math.max(...vals, 1);
    let b = '';
    cats.forEach((c, i) => {
      const y = 3 + i * rowH, bw = Math.max(2, vals[i] / max * (w - labW - padR));
      b += `<text x="${labW - 8}" y="${y + 15}" text-anchor="end" font-size="12">${esc(c)}</text><rect x="${labW}" y="${y + 4}" width="${bw}" height="${rowH - 8}" fill="#C9F3FF" data-tip="${esc(c)}: <b>$${kfmt(vals[i])}</b>"/><text x="${labW + bw + 6}" y="${y + 15}" font-size="12">${kfmt(vals[i])}</text>`;
    });
    el.style.minHeight = '0'; el.innerHTML = svgWrap(w, H, b, o.label);
  }
  function pbiColumns(el, cats, vals, o) {
    if (PHONE()) return pbiRows(el, cats, vals, o);
    el.style.minHeight = '';
    const w = PW(el), h = Math.max(150, el.clientHeight || 170), padL = 40, padB = o.rot ? 46 : 22, padT = 8, pw = w - padL - 6, ph = h - padB - padT;
    const max = niceMax(Math.max(...vals, 1)), Y = v => padT + ph - v / max * ph, step = pw / cats.length, bw = Math.min(step * .72, 60);
    let b = '';
    for (let i = 0; i <= 2; i++) { const v = max * i / 2, yy = Y(v); b += `<line x1="${padL}" x2="${padL + pw}" y1="${yy}" y2="${yy}" stroke="#fff" stroke-opacity=".55" stroke-dasharray="1.5 4"/><text x="${padL - 6}" y="${yy + 4}" text-anchor="end" font-size="11">${(v / 1e6).toFixed(1)}M</text>`; }
    cats.forEach((c, i) => {
      const x = padL + step * i + (step - bw) / 2;
      b += `<rect x="${x}" y="${Y(vals[i])}" width="${bw}" height="${Y(0) - Y(vals[i])}" fill="#C9F3FF" data-tip="${esc(c)}: <b>$${kfmt(vals[i])}</b>"/>`;
      b += o.rot ? `<text transform="translate(${x + bw / 2 + 3},${Y(0) + 10}) rotate(-40)" text-anchor="end" font-size="${step < 26 ? 8.5 : 10.5}">${esc(c)}</text>` : `<text x="${x + bw / 2}" y="${h - 6}" text-anchor="middle" font-size="10.5">${esc(c)}</text>`;
    });
    el.innerHTML = svgWrap(w, h, b, o.label);
  }

  function renderOil() {
    if (!OIL || !$('#pbi') || $('#pbi').closest('[hidden]')) return;
    const s = oilState, ci = s.city ? OIL.cities.indexOf(s.city) : -1, bi = s.brand ? OIL.brands.indexOf(s.brand) : -1;
    const rows = OIL.rows.filter(r => s.years.has(r[0]) && s.months.has(r[1]) && (ci < 0 || r[2] === ci) && (bi < 0 || r[3] === bi));
    const sales = rows.reduce((a, r) => a + r[6], 0), lit = rows.reduce((a, r) => a + r[7], 0), stores = new Set(rows.map(r => r[5])).size;
    const by = (k, n) => { const a = new Array(n).fill(0); rows.forEach(r => { a[r[k]] += r[6]; }); return a; };
    const city = by(2, OIL.cities.length), brand = by(3, OIL.brands.length), cls = by(4, OIL.classes.length);
    const month = new Array(12).fill(0); rows.forEach(r => { month[r[1] - 1] += r[6]; });
    const top = (arr, names) => { let m = -1, k = -1; arr.forEach((v, i) => { if (v > m) { m = v; k = i; } }); return m > 0 ? [names[k], m] : ['-', 0]; };
    const [bb, bbv] = top(brand, OIL.brands), [bc, bcv] = top(city, OIL.cities);
    $('#pbiSales').innerHTML = `$&nbsp;&nbsp;${kfmt(sales)}`;
    // the report's card averages the per-row price per liter (unweighted), so the rebuild does the same
    const avgPrice = rows.length ? rows.reduce((a, r) => a + r[8], 0) / rows.length : 0;
    $('#pbiPrice').innerHTML = `$&nbsp;&nbsp;${avgPrice.toFixed(2)}<small>/ Liter</small>`;
    $('#pbiVol').innerHTML = `${en.format(Math.round(lit))}<small>Liter</small>`;
    $('#pbiStores').textContent = en.format(stores);
    $('#pbiBestBrand').textContent = bb; $('#pbiBestBrandV').textContent = bbv ? kfmt(bbv) : '-';
    $('#pbiBestCity').textContent = bc; $('#pbiBestCityV').textContent = bcv ? kfmt(bcv) : '-';

    const empty = msg => `<p class="pbi__empty">${msg}</p>`, none = !rows.length;
    const noneMsg = lang === 'id' ? 'Tidak ada data untuk filter ini.' : 'No data for this filter.';
    // monthly line
    const le = $('#pbiLine');
    if (none) le.innerHTML = empty(noneMsg); else {
      const w = PW(le), h = Math.max(160, le.clientHeight || 180), padL = 42, padB = 34, padT = 10, pw = w - padL - 10, ph = h - padB - padT;
      const act = month.map((v, i) => s.months.has(i + 1) ? v : null), vals = act.filter(v => v != null);
      const span = Math.max(...vals) - Math.min(...vals), stepK = niceMax(Math.max(span, 1) / 3);
      const lo = Math.max(0, Math.floor(Math.min(...vals) * .9 / stepK) * stepK), hi = Math.ceil(Math.max(...vals) * 1.03 / stepK) * stepK || 1;
      const X = i => padL + pw * i / 11, Y = v => padT + ph - (v - lo) / (hi - lo || 1) * ph;
      let b = '';
      for (let v = lo; v <= hi + 1; v += stepK) { b += `<line x1="${padL}" x2="${padL + pw}" y1="${Y(v)}" y2="${Y(v)}" stroke="#fff" stroke-opacity=".55" stroke-dasharray="1.5 4"/><text x="${padL - 6}" y="${Y(v) + 4}" text-anchor="end" font-size="11">${Math.round(v / 1000)}K</text>`; }
      const mfs = pw / 12 < 26 ? 8.5 : 10.5; MON.forEach((m, i) => { b += PHONE() ? `<text x="${X(i)}" y="${h - 14}" text-anchor="middle" font-size="12">${m[0]}</text>` : `<text transform="translate(${X(i) + 4},${h - 18}) rotate(-40)" text-anchor="end" font-size="${mfs}">${m}</text>`; });
      const pts = act.map((v, i) => v == null ? null : `${X(i)},${Y(v)}`).filter(Boolean).join(' ');
      b += `<polyline points="${pts}" fill="none" stroke="#BFF4FF" stroke-width="2.6" stroke-linejoin="round"/>`;
      act.forEach((v, i) => { if (v != null) b += `<circle cx="${X(i)}" cy="${Y(v)}" r="7" fill="transparent" data-tip="${MON[i]}: <b>$${kfmt(v)}</b>"/>`; });
      le.innerHTML = svgWrap(w, h, b, 'Monthly sales');
    }
    // treemap
    const te = $('#pbiTree');
    if (none) te.innerHTML = empty(noneMsg); else {
      const w = te.clientWidth || 300, h = Math.max(150, te.clientHeight || 180), tot = brand.reduce((a, v) => a + v, 0);
      const items = OIL.brands.map((n, i) => ({ n, v: brand[i] / tot * w * h, s: brand[i] })).filter(i => i.s > 0).sort((a, b) => b.v - a.v), out = [];
      squarify(items, 0, 0, w, h, out);
      te.innerHTML = out.map(r => `<div style="left:${r.x}px;top:${r.y}px;width:${r.w}px;height:${r.h}px;background:${BRAND_COL[r.n] || '#5577ee'}" data-tip="${r.n}: <b>$${kfmt(r.s)}</b>">${r.w > 28 && r.h > 16 ? r.n : ''}</div>`).join('');
    }
    // revenue by city / class, sorted desc like the report
    const sortPair = (arr, names) => names.map((n, i) => [n, arr[i]]).filter(p => p[1] > 0).sort((a, b) => b[1] - a[1]);
    const cp = sortPair(city, OIL.cities), kp = sortPair(cls, OIL.classes);
    if (none) { $('#pbiCityBars').innerHTML = empty(noneMsg); $('#pbiClassBars').innerHTML = empty(noneMsg); }
    else {
      pbiColumns($('#pbiCityBars'), cp.map(p => p[0]), cp.map(p => p[1]), { rot: true, label: 'Revenue by city' });
      pbiColumns($('#pbiClassBars'), kp.map(p => p[0]), kp.map(p => p[1]), { rot: true, label: 'Revenue by class' });
    }
  }
  setupOil();

  /* ------------------------------------------------------------------
     E-commerce cohorts: share of each 2024 sign-up cohort that purchased,
     months M0 to M12 after sign-up (portfolio slide 8)
  ------------------------------------------------------------------ */
  const ECH = [['Jan 2024', 72, [6, 11, 22, 12, 17, 19, 17, 28, 12, 21, 18, 31, 15]], ['Feb 2024', 55, [6, 20, 22, 22, 18, 22, 16, 13, 22, 18, 24, 18, 13]],
    ['Mar 2024', 63, [10, 13, 22, 13, 21, 11, 14, 25, 19, 29, 16, 14, 11]], ['Apr 2024', 47, [4, 13, 26, 17, 13, 15, 30, 13, 28, 21, 17, 38, 26]],
    ['May 2024', 56, [7, 21, 23, 25, 12, 23, 20, 21, 20, 25, 25, 25, 34]], ['Jun 2024', 43, [5, 14, 5, 33, 28, 19, 37, 30, 28, 19, 28, 33, 33]],
    ['Jul 2024', 45, [24, 18, 27, 20, 33, 18, 31, 16, 33, 24, 22, 33, 20]], ['Aug 2024', 49, [10, 26, 20, 16, 22, 12, 29, 26, 37, 29, 35, 29, 22]],
    ['Sep 2024', 31, [13, 6, 19, 19, 23, 19, 26, 23, 36, 23, 36, 26, 23]], ['Oct 2024', 34, [21, 24, 32, 29, 24, 26, 24, 15, 24, 32, 32, 18, 38]],
    ['Nov 2024', 52, [15, 27, 29, 23, 17, 33, 31, 17, 19, 29, 27, 35, 40]], ['Dec 2024', 52, [19, 25, 19, 33, 21, 29, 42, 38, 33, 19, 27, 54, 50]]];
  function renderEcHm() {
    const el = $('#ecHm'); if (!el) return;
    const ramp = k => 'rgb(' + [[238, 31], [243, 90], [239, 78]].map(([a, b]) => Math.round(a + (b - a) * k)).join(',') + ')';
    const of = lang === 'id' ? 'dari' : 'of', cust = lang === 'id' ? 'pelanggan' : 'customers';
    el.innerHTML = `<thead><tr><th scope="col">${lang === 'id' ? 'Daftar' : 'Signed up'}</th>${Array.from({ length: 13 }, (_, i) => `<th scope="col">M${i}</th>`).join('')}</tr></thead><tbody>` +
      ECH.map(([c, n, v]) => `<tr${c === 'Jul 2024' ? ' class="hm__h2"' : ''}><th scope="row">${c} <small>n=${n}</small></th>${v.map((x, i) => { const k = Math.min(1, x / 55); return `<td style="background:${ramp(k)};color:${k > .5 ? '#fff' : '#13264A'}" data-tip="${c}, M${i}: <b>${x}%</b> ${of} ${n} ${cust}">${x}</td>`; }).join('')}</tr>`).join('') + '</tbody>';
  }

  /* ------------------------------------------------------------------
     Churn project: one view per dataset. Every number comes from the
     group report (Tables 11, 13, 22 and 25); the variable ranking is the
     LightGBM gain chart from the telecom run, bar lengths measured off it.
  ------------------------------------------------------------------ */
  const CH = {
    telco: {
      cols: ['Accuracy', 'F1', 'Precision', 'Recall', 'ROC-AUC', 'PR-AUC', 'Runtime'], best: 'LightGBM',
      rows: [['LightGBM', .7644, .6288, .5411, .7504, .8345, .6420, '0.27 s'], ['AdaBoost', .6241, .5630, .4074, .9108, .8079, .5650, '0.84 s'],
             ['AdaBoost-SVM', .7426, .5826, .5121, .6755, .7913, .5419, '37.8 min'], ['SVM', .7284, .6083, .4933, .7932, .8220, .6083, '11.6 s'],
             ['Naive Bayes', .6289, .5598, .4088, .8877, .8109, .5882, '0.01 s'], ['AdaBoost-Naive Bayes', .7061, .5947, .4695, .8110, .8316, .6214, '0.6 s']],
      runtimeBest: 'Naive Bayes',
      figs: { en: [['7,032', 'customers', ''], ['26.6%', 'churned (1,869)', 'down'], ['0.835', 'ROC-AUC, LightGBM', '']],
              id: [['7.032', 'pelanggan', ''], ['26,6%', 'churn (1.869)', 'down'], ['0,835', 'ROC-AUC, LightGBM', '']] },
      concl: {
        en: '<b>LightGBM is the best all-rounder.</b> It has the highest accuracy, F1, precision, ROC-AUC and PR-AUC, and trains in 0.27 seconds. AdaBoost catches the most churners (recall 0.911), but about 6 in 10 of its alerts are false alarms. Our AdaBoost-Naive Bayes comes close to LightGBM on ROC-AUC (0.832 vs 0.835) and runs 3,885 times faster than AdaBoost-SVM (0.6 seconds vs 37.8 minutes).',
        id: '<b>LightGBM paling unggul secara keseluruhan.</b> Accuracy, F1, precision, ROC-AUC, dan PR-AUC-nya tertinggi, dan training-nya cuma 0,27 detik. AdaBoost menangkap pelanggan churn paling banyak (recall 0,911), tetapi sekitar 6 dari 10 peringatannya salah. AdaBoost-Naive Bayes buatan kami mendekati LightGBM di ROC-AUC (0,832 vs 0,835) dan 3.885 kali lebih cepat dari AdaBoost-SVM (0,6 detik vs 37,8 menit).' },
      drivers: [['Contract_Month-to-month', 1], ['tenure', .314], ['MonthlyCharges', .240], ['InternetService_Fiber optic', .160], ['Contract_Two year', .101],
                ['OnlineSecurity_No', .101], ['TotalCharges', .086], ['TechSupport_No', .052], ['PaymentMethod_Electronic check', .032], ['PaperlessBilling', .015]],
      drvCap: { en: 'Top 10 variables by LightGBM gain on the telecom data. AdaBoost also ranks the month-to-month contract first. By split count, MonthlyCharges, tenure and TotalCharges are used most often.', id: '10 variabel teratas berdasarkan gain LightGBM pada data telekomunikasi. AdaBoost juga menempatkan kontrak bulanan di urutan pertama. Berdasarkan jumlah split, MonthlyCharges, tenure, dan TotalCharges paling sering dipakai.' },
      reco: {
        en: '<b>Recommendation:</b> a month-to-month contract is by far the strongest variable, so offer those customers a discount for switching to a one- or two-year plan. Tenure comes second, so put retention effort into the first months. Monthly charges and fiber optic internet come next, so check whether high-bill customers are on the right plan. No online security and no tech support also make the top 10, which makes those add-ons worth offering. Then score every customer each month with LightGBM and give the retention team the highest-risk list first.',
        id: '<b>Rekomendasi:</b> kontrak bulanan adalah variabel terkuat dengan selisih jauh, jadi tawarkan diskon ke pelanggan kontrak bulanan untuk pindah ke paket 1 atau 2 tahun. Tenure ada di urutan kedua, jadi fokuskan upaya retensi di bulan-bulan pertama. Biaya bulanan dan internet fiber optic menyusul, jadi cek apakah pelanggan dengan tagihan tinggi sudah ada di paket yang tepat. Tanpa online security dan tanpa tech support juga masuk 10 besar, jadi layanan tambahan itu layak ditawarkan. Lalu skor semua pelanggan tiap bulan dengan LightGBM dan berikan daftar risiko tertinggi ke tim retensi lebih dulu.' } },
    rflight: {
      cols: ['Accuracy', 'F1', 'Precision', 'Recall', 'ROC-AUC', 'PR-AUC', 'Runtime'], best: 'LightGBM', runtimeBest: 'LightGBM',
      rows: [['LightGBM', .732, .6381, .5912, .6929, '0.81', '0.72', '2.5 s'], ['AdaBoost', .7158, .5712, .5881, .5553, '0.74', '0.59', '21 s'],
             ['AdaBoost-SVM', .5552, .4432, .3865, .5193, '0.57', '0.40', '99.6 h'], ['SVM', .559, .4443, .3894, .5172, '0.54', '0.39', '3 h']],
      figs: { en: [['135,944', 'flight records', ''], ['34.1%', 'churned', 'down'], ['0.638', 'F1, LightGBM', '']],
              id: [['135.944', 'data penerbangan', ''], ['34,1%', 'churn', 'down'], ['0,638', 'F1, LightGBM', '']] },
      concl: {
        en: '<b>LightGBM wins on every metric</b>, including ROC-AUC (0.81), and it is also the fastest at 2.5 seconds. AdaBoost is close on accuracy and precision but misses more churners (recall 0.555 vs 0.693). Both SVM models trail far behind with an F1 around 0.44, close to a random guess on ROC-AUC (0.57 and 0.54), and they took hours to train.',
        id: '<b>LightGBM unggul di semua metrik</b>, termasuk ROC-AUC (0,81), dan paling cepat dengan 2,5 detik. AdaBoost mendekati di accuracy dan precision, tetapi lebih banyak melewatkan pelanggan churn (recall 0,555 vs 0,693). Kedua model SVM tertinggal jauh dengan F1 sekitar 0,44, ROC-AUC-nya mendekati tebakan acak (0,57 dan 0,54), dan training-nya makan waktu berjam-jam.' } },
    pass: {
      cols: ['Accuracy', 'F1', 'Precision', 'Recall', 'ROC-AUC', 'PR-AUC', 'Runtime'], best: 'LightGBM', runtimeBest: 'AdaBoost',
      rows: [['LightGBM', .98, .9827, .966, 1, '0.976', '0.966', '0.06 s'], ['AdaBoost', .98, .9827, .966, 1, '0.976', '0.966', '0.04 s'],
             ['AdaBoost-SVM', .9725, .9762, .9617, .99, '0.998', '0.999', '12.5 s'], ['SVM', .8975, .9175, .8475, 1, '0.997', '0.998', '0.5 s']],
      figs: { en: [['1,333', 'passengers', ''], ['58.6%', 'churned (781)', 'down'], ['0.983', 'F1, LightGBM and AdaBoost', '']],
              id: [['1.333', 'penumpang', ''], ['58,6%', 'churn (781)', 'down'], ['0,983', 'F1, LightGBM dan AdaBoost', '']] },
      concl: {
        en: '<b>LightGBM and AdaBoost tie on every metric.</b> Both catch every churner in the test set (recall 1.000) with precision 0.966, in under 0.1 seconds. The SVM models score highest on ROC-AUC (0.998 and 0.997), but plain SVM raises more false alarms (precision 0.848).',
        id: '<b>LightGBM dan AdaBoost seri di semua metrik.</b> Keduanya menangkap semua pelanggan churn di data uji (recall 1,000) dengan precision 0,966, dalam waktu kurang dari 0,1 detik. Model SVM punya ROC-AUC tertinggi (0,998 dan 0,997), tetapi SVM biasa lebih banyak salah peringatan (precision 0,848).' },
      drivers: [['ticketCount', 1], ['age', 0], ['travel_length', 0], ['flightprice_Total', 0], ['distanceTotal', 0]],
      drvCap: { en: 'LightGBM gain on the flight passenger data: ticketCount carries almost all of it, every other variable is close to zero. AdaBoost also ranks ticketCount first. By split count (how often a variable is used), age leads, then ticketCount and travel_length.',
                id: 'Gain LightGBM pada data penumpang pesawat: hampir seluruhnya ada di ticketCount, variabel lain mendekati nol. AdaBoost juga menempatkan ticketCount di urutan pertama. Berdasarkan jumlah split (seberapa sering variabel dipakai), age paling atas, lalu ticketCount dan travel_length.' },
      reco: {
        en: '<b>Recommendation:</b> ticketCount, the number of tickets a passenger has bought, is the one variable that separates churners from the rest. Track it for every passenger, and send a loyalty or rebooking offer to the passengers the model flags. Age and trip length are the next most used variables, so use them to tailor that offer.',
        id: '<b>Rekomendasi:</b> ticketCount, jumlah tiket yang sudah dibeli penumpang, adalah satu-satunya variabel yang membedakan penumpang churn dari yang lain. Pantau angka ini untuk setiap penumpang, dan kirim penawaran loyalitas atau pemesanan ulang ke penumpang yang ditandai model. Umur dan lama perjalanan adalah variabel yang paling sering dipakai berikutnya, jadi gunakan untuk menyesuaikan penawarannya.' } },
  };
  const CH_NODRV = {
    en: ['The project ranked variables for the flight passenger and telecom data only, so there is no ranking for this dataset.', '<b>Recommendation:</b> use LightGBM to rank customers by churn risk on this data. A variable ranking like the telecom one is the next step before choosing what to offer.'],
    id: ['Project ini hanya membuat peringkat variabel untuk data penumpang pesawat dan telekomunikasi, jadi tidak ada peringkat untuk dataset ini.', '<b>Rekomendasi:</b> pakai LightGBM untuk mengurutkan pelanggan berdasarkan risiko churn di data ini. Peringkat variabel seperti di data telekomunikasi adalah langkah berikutnya sebelum memilih penawaran.'] };
  let chDs = 'telco';
  const chNum = v => { const s = (Math.round(v * 1000 + 1e-9) / 1000).toFixed(3); return lang === 'id' ? s.replace('.', ',') : s; };
  function renderChurn() {
    const box = $('#chTable'); if (!box || box.closest('[hidden]')) return;
    const d = CH[chDs], L = lang === 'id' ? 'id' : 'en';
    $$('#chDs button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.ds === chDs)));
    $('#chFigs').innerHTML = d.figs[L].map(f => `<div><b${f[2] ? ` class="${f[2]}"` : ''}>${f[0]}</b><span>${f[1]}</span></div>`).join('');
    const val = v => typeof v === 'number' ? v : parseFloat(v), max = d.cols.map((c, j) => c === 'Runtime' ? null : Math.max(...d.rows.map(r => val(r[j + 1]))));
    const head = `<tr><th>${lang === 'id' ? 'Model' : 'Model'}</th>${d.cols.map(c => `<th>${c}</th>`).join('')}</tr>`;
    const body = d.rows.map(r => `<tr${r[0] === d.best ? ' class="best"' : ''}><td>${r[0]}</td>${d.cols.map((c, j) => {
      const v = r[j + 1], top = c === 'Runtime' ? r[0] === d.runtimeBest : val(v) === max[j];
      return `<td${top ? ' class="top"' : ''}>${typeof v === 'number' ? chNum(v) : (lang === 'id' ? v.replace('.', ',').replace(' min', ' mnt').replace(' h', ' jam') : v)}</td>`;
    }).join('')}</tr>`).join('');
    box.innerHTML = `<table class="models"><thead>${head}</thead><tbody>${body}</tbody></table>`;
    $('#chConcl').innerHTML = d.concl[L];
    if (d.drivers) {
      $('#chDrv').innerHTML = `<ol class="drv">${d.drivers.map((v, i) => `<li><span class="drv__n">${String(i + 1).padStart(2, '0')}</span><code>${esc(v[0])}</code>${v[1] ? `<i style="--w:${(v[1] * 100).toFixed(1)}%"></i>` : `<em class="drv__z">≈ 0</em>`}</li>`).join('')}</ol><p class="note">${d.drvCap[L]}</p>`;
      $('#chReco').innerHTML = d.reco[L];
    } else {
      $('#chDrv').innerHTML = `<p class="drv-none">${CH_NODRV[L][0]}</p>`;
      $('#chReco').innerHTML = CH_NODRV[L][1];
    }
  }
  $$('#chDs button').forEach(b => b.addEventListener('click', () => { chDs = b.dataset.ds; renderChurn(); }));

  /* ------------------------------------------------------------------
     Olist Tableau rebuild: every order from the workbook's own source,
     same measures (SUM payment_value, COUNTD order_id, COUNTD
     customer_unique_id, late share of delivered orders) and filters
     (Tahun and Kategori Produk on every sheet, the state chart filtering
     the rest). The data file loads the first time the tab opens.
  ------------------------------------------------------------------ */
  const tv = { year: -1, cat: -1, st: -1, loading: false, ready: false };
  const IDM = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const brl = v => v >= 1e6 ? 'R$' + (v / 1e6).toFixed(2) + 'M' : v >= 1e3 ? 'R$' + (v / 1e3).toFixed(2) + 'K' : 'R$' + v.toFixed(2);
  const brlAxis = v => v >= 1e6 ? 'R$' + (v / 1e6).toFixed(v % 1e6 ? 1 : 0) + 'M' : 'R$' + Math.round(v / 1e3) + 'K';
  const mix = (a, b, k) => '#' + [0, 2, 4].map(i => Math.round(parseInt(a.substr(i + 1, 2), 16) * (1 - k) + parseInt(b.substr(i + 1, 2), 16) * k).toString(16).padStart(2, '0')).join('');

  function tvLoad() {
    if (tv.loading) return; tv.loading = true;
    $('#tvLine').innerHTML = '<p class="tv__empty">Memuat data…</p>';
    let left = 2;
    ['assets/olist-data.js?v=1', 'assets/brazil-states.js?v=1'].forEach(src => {
      const sc = document.createElement('script');
      sc.src = src;
      sc.onload = () => { if (--left === 0) { setupTv(); renderTv(); } };
      sc.onerror = () => { tv.loading = false; $('#tvLine').innerHTML = '<p class="tv__empty">Data gagal dimuat. Coba muat ulang halaman.</p>'; };
      document.head.appendChild(sc);
    });
  }
  function setupTv() {
    const O = window.OLIST; if (!O || tv.ready) return; tv.ready = true;
    $('#tvCat').insertAdjacentHTML('beforeend', O.cats.map((c, i) => `<option value="${i}">${esc(c)}</option>`).join(''));
    $('#tvYear').addEventListener('change', e => { tv.year = e.target.value ? +e.target.value - 2017 : -1; renderTv(); });
    $('#tvCat').addEventListener('change', e => { tv.cat = e.target.value === '' ? -1 : +e.target.value; renderTv(); });
    $('#tvState').addEventListener('click', () => { tv.st = -1; renderTv(); const f = $('#tvLate [data-st]'); if (f) f.focus(); });
    const pick = el => {
      tv.st = tv.st === +el.dataset.st ? -1 : +el.dataset.st; renderTv();
      const again = $(`#tvLate [data-st="${el.dataset.st}"]`); if (again) again.focus();
    };
    $('#tvLate').addEventListener('click', e => { const el = e.target.closest('[data-st]'); if (el) pick(el); });
    $('#tvLate').addEventListener('keydown', e => {
      const el = e.target.closest('[data-st]'); if (!el || (e.key !== 'Enter' && e.key !== ' ')) return;
      e.preventDefault(); pick(el);
    });
  }

  function tvBars(el, rows, fmt, col) {
    const max = Math.max(...rows.map(r => r[1]), 1);
    el.innerHTML = rows.map(r => `<div class="tv__bar" data-tip="${esc(r[0])}<br>${fmt(r[1], true)}"><span>${esc(r[0])}</span><i style="--w:${(r[1] / max * 100).toFixed(2)}%;--c:${col}"><b>${fmt(r[1])}</b></i></div>`).join('');
  }

  function tvLine(el, ts, vals) {
    const w = Math.max(260, Math.floor(el.getBoundingClientRect().width || 300)), h = 230, padL = 50, padR = 12, padT = 12, padB = 38, pw = w - padL - padR, ph = h - padT - padB;
    const ma = vals.map((_, i) => { const a = vals.slice(Math.max(0, i - 2), i + 1); return a.reduce((x, y) => x + y, 0) / a.length; });
    const max = niceMax(Math.max(...vals) * 1.04), n = ts.length;
    const X = i => padL + (n === 1 ? pw / 2 : pw * i / (n - 1)), Y = v => padT + ph - v / max * ph;
    let b = '';
    for (let k = 0; k <= 4; k++) { const v = max * k / 4, y = Y(v); b += `<line x1="${padL}" x2="${padL + pw}" y1="${y}" y2="${y}" stroke="#E3EAEE"/><text x="${padL - 8}" y="${y + 4}" text-anchor="end" font-size="11">${k ? brlAxis(v) : '0'}</text>`; }
    const every = pw / n < 30 ? 3 : 1; let lastX = -99;
    ts.forEach((t, i) => {
      const m = t % 12, yr = 2017 + Math.floor(t / 12);
      if ((i % every === 0 || i === n - 1) && (!PHONE() || X(i) - lastX >= 26)) { b += `<text x="${X(i)}" y="${h - 22}" text-anchor="middle" font-size="${PHONE() ? 12 : 10.5}">${IDM[m]}</text>`; lastX = X(i); }
      if (m === 0 || i === 0) b += `<text x="${X(i)}" y="${h - 6}" text-anchor="middle" font-size="10.5" font-weight="600" fill="#111">${yr}</text>`;
    });
    const path = arr => arr.map((v, i) => (i ? 'L' : 'M') + X(i).toFixed(1) + ' ' + Y(v).toFixed(1)).join('');
    b += `<path d="${path(ma)}" fill="none" stroke="#4E79A7" stroke-width="2.2" stroke-linejoin="round"/>`;
    b += `<path d="${path(vals)}" fill="none" stroke="#F28E2B" stroke-width="2.4" stroke-linejoin="round"/>`;
    vals.forEach((v, i) => {
      const t = ts[i], lab = `${IDM[t % 12]} ${2017 + Math.floor(t / 12)}`;
      b += `<circle cx="${X(i)}" cy="${Y(v)}" r="2.6" fill="#F28E2B"/><circle cx="${X(i)}" cy="${Y(v)}" r="9" fill="transparent" data-tip="${lab}<br>Payment Value: <b>R$${en.format(Math.round(v))}</b><br>Average 3 Months: R$${en.format(Math.round(ma[i]))}"/>`;
    });
    el.innerHTML = svgWrap(w, h, b, 'Payment Value dan Average 3 Months per bulan');
  }

  function renderTv() {
    const box = $('#tv'); if (!box || box.closest('[hidden]')) return;
    const O = window.OLIST; if (!O) { tvLoad(); return; }
    if (!tv.ready) setupTv();
    const c = O.cells, W_ = O.w, n = c.length / W_, ns = O.states.length;
    const pass = new Uint8Array(n), month = new Float64Array(24), mHas = new Uint8Array(24), catRev = new Float64Array(O.cats.length);
    const dl = new Float64Array(ns), lt = new Float64Array(ns), pay = [0, 0, 0, 0];
    let rev = 0, ord = 0, paid = 0, s1 = 0;
    for (let i = 0, k = 0; i < n; i++, k += W_) {
      const t = c[k], st = c[k + 2], cat = c[k + 3];
      if (tv.year >= 0 && Math.floor(t / 12) !== tv.year) continue;
      if (tv.cat >= 0 && cat !== tv.cat) continue;
      dl[st] += c[k + 7]; lt[st] += c[k + 8];
      if (tv.st >= 0 && st !== tv.st) continue;
      pass[i] = 1;
      const r = c[k + 4] / 100;
      rev += r; ord += c[k + 5]; paid += c[k + 6]; s1 += c[k + 13];
      pay[0] += c[k + 9]; pay[1] += c[k + 10]; pay[2] += c[k + 11]; pay[3] += c[k + 12];
      catRev[cat] += r;
      if (c[k + 1]) { month[t] += r; mHas[t] = 1; }
    }
    const seen = new Set(); for (let j = 0; j < O.multi.length; j += 2) if (pass[O.multi[j]]) seen.add(O.multi[j + 1]);
    const none = !ord, dash = '–';
    $('#tvRev').textContent = none ? dash : brl(rev);
    $('#tvOrd').textContent = none ? dash : en.format(ord);
    $('#tvCust').textContent = none ? dash : en.format(s1 + seen.size);
    $('#tvAvg').textContent = none || !paid ? dash : 'R$' + (rev / paid).toFixed(2);
    const chip = $('#tvState'); chip.hidden = tv.st < 0; $('#tvHint').hidden = tv.st >= 0;
    if (tv.st >= 0) { chip.innerHTML = `${esc(O.states[tv.st])} <span aria-hidden="true">×</span>`; chip.setAttribute('aria-label', `Hapus filter provinsi ${O.states[tv.st]}`); }

    const emptyMsg = '<p class="tv__empty">Tidak ada data untuk filter ini.</p>';
    const ts = []; for (let t = 0; t < 24; t++) if (mHas[t]) ts.push(t);
    if (!ts.length) $('#tvLine').innerHTML = emptyMsg; else tvLine($('#tvLine'), ts, ts.map(t => month[t]));
    const top = O.cats.map((nm, i) => [nm, catRev[i]]).filter(p => p[1] > 0).sort((a, b) => b[1] - a[1]).slice(0, 10);
    if (none) { $('#tvCats').innerHTML = emptyMsg; $('#tvPay').innerHTML = emptyMsg; }
    else {
      tvBars($('#tvCats'), top, (v, long) => long ? `Revenue: <b>R$${en.format(Math.round(v))}</b>` : brl(v), '#4E79A7');
      const pr = [['credit_card', pay[0]], ['boleto', pay[1]], ['voucher', pay[2]], ['debit_card', pay[3]]].filter(p => p[1] > 0).sort((a, b) => b[1] - a[1]);
      tvBars($('#tvPay'), pr, (v, long) => long ? `Transaksi: <b>${en.format(v)}</b>` : en.format(v), '#4E79A7');
    }
    // filled map, coloured with Tableau's Blue-Teal ramp between the lowest and highest state
    const G = window.BR_STATES, le = $('#tvLate');
    const sv = O.states.map((code, i) => ({ code, i, d: dl[i], v: dl[i] ? lt[i] / dl[i] : null }));
    const vals = sv.filter(x => x.v != null).map(x => x.v), lo = Math.min(...vals), hi = Math.max(...vals);
    $('#tvLegLo').textContent = vals.length ? lo.toFixed(4).replace(/0+$/, '') : '–';
    $('#tvLegHi').textContent = vals.length ? hi.toFixed(4).replace(/0+$/, '') : '–';
    const ramp = ['#BCE4D8', '#7EC1C1', '#4C9AB4', '#2C5985'];
    const col = v => { const k = hi > lo ? (v - lo) / (hi - lo) : 1, p = Math.min(2.999, k * 3), j = Math.floor(p); return mix(ramp[j], ramp[j + 1], p - j); };
    le.classList.toggle('has-sel', tv.st >= 0);
    let m = '';
    sv.forEach(x => {
      const dPath = G.d[x.code]; if (!dPath) return;
      const has = x.v != null, pct = has ? (x.v * 100).toFixed(1) + '%' : 'tidak ada data';
      m += `<path d="${dPath}" fill="${has ? col(x.v) : '#E6EAEC'}" data-st="${x.i}" tabindex="0" role="button" aria-pressed="${x.i === tv.st}" aria-label="${x.code}: ${pct} telat" data-tip="Customer State: <b>${x.code}</b><br>Persen Telat: <b>${has ? x.v.toFixed(3) : '–'}</b> (${pct})${has ? `<br>${en.format(lt[x.i])} dari ${en.format(x.d)} pesanan terkirim` : ''}"/>`;
    });
    // short labels only where the state is big enough to hold them
    const big = ['AM', 'PA', 'MT', 'BA', 'MG', 'GO', 'MS', 'MA', 'PI', 'TO', 'RO', 'RR', 'AC', 'AP', 'SP', 'PR', 'RS', 'CE'];
    big.forEach(code => { const c = G.c[code]; if (c) m += `<text x="${c[0]}" y="${c[1] + 4}" text-anchor="middle" aria-hidden="true">${code}</text>`; });
    le.innerHTML = `<svg viewBox="0 0 ${G.w} ${G.h}" role="group" aria-label="Peta persentase telat per provinsi; pilih provinsi untuk memfilter dashboard">${m}</svg>`;
  }


  /* ------------------------------------------------------------------
     Project picker: links to #work-... open that project
  ------------------------------------------------------------------ */
  function openProject(id, scroll) {
    const tab = document.querySelector(`.pj__list [aria-controls="${id}"]`);
    if (!tab) return false;
    tab.click();
    if (scroll) $('#projects').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    return true;
  }
  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a[href^="#work-"]');
    if (a && openProject(a.getAttribute('href').slice(1), true)) { e.preventDefault(); history.replaceState(null, '', a.getAttribute('href')); }
  });
  if (/^#work-/.test(location.hash)) openProject(location.hash.slice(1), true);

  function renderAll() { renderDashes(); renderOil(); renderTv(); renderChurn(); renderEc(); renderEcHm(); renderBms(); }
  let rz; let lastW = innerWidth;
  addEventListener('resize', () => { if (innerWidth === lastW) return; lastW = innerWidth; clearTimeout(rz); rz = setTimeout(renderAll, 120); });

  buildSelects();
  applyLang();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(renderAll);
})();
