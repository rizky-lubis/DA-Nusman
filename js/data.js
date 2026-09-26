/* =========================================================================
   DHINAKARA ADVENTURE — Pusat Data Konten (publik)
   AD/ART & SK dipakai sebagai acuan internal saja — tidak ditampilkan di situs.
   ========================================================================= */

var DATA = {
  site: {
    name: "Dhinakara Adventure",
    shortName: "DA",
    meaning: "Matahari (bahasa Sansekerta)",
    university: "Universitas Nusa Mandiri",
    campus: "Kampus Jatiwaringin (sekretariat)",
    campuses: [
      {
        name: "Jatiwaringin",
        role: "Sekretariat UKM",
        address: "Jl. Raya Jatiwaringin No. 2, Cipinang Melayu, Kec. Makasar, Jakarta Timur 13620",
      },
      {
        name: "Margonda",
        role: "Kampus UNM",
        address: "Kampus Margonda · Universitas Nusa Mandiri",
      },
      {
        name: "Rawamangun",
        role: "Kampus UNM",
        address: "Kampus Rawamangun · Universitas Nusa Mandiri",
      },
    ],
    tagline: "Bermanfaat. Bertanggung jawab. Berjiwa sosial.",
    description:
      "Unit Kegiatan Mahasiswa Pencinta Alam Universitas Nusa Mandiri (kampus Jatiwaringin, Margonda, dan Rawamangun). Wadah mahasiswa yang gemar berkegiatan di alam bebas dan peduli kelestarian lingkungan.",
    foundedDate: "10 Oktober 2016",
    foundedYear: 2016,
    email: "",
    phone: "",
    whatsapp: "",
    addressLine1: "UKM Dhinakara Adventure — Universitas Nusa Mandiri",
    addressLine2: "Sekretariat: Kampus Jatiwaringin",
    addressLine3: "Jl. Raya Jatiwaringin No. 2, Cipinang Melayu, Jakarta Timur 13620",
    mapsUrl: "https://maps.google.com/?q=Jl.+Raya+Jatiwaringin+No.2+Jakarta+Timur",
    socials: {
      instagram: "https://instagram.com/dhinakara.adventure",
      instagramLabel: "@dhinakara.adventure",
      tiktok: "",
      tiktokLabel: "",
      youtube: "",
      youtubeLabel: "",
    },
  },

  identity: {
    bentuk: "Unit Kegiatan Mahasiswa (UKM) tingkat perguruan tinggi",
    sifat: "Demokratis, terbuka, bebas, mandiri, dan bertanggung jawab",
    azas: "Pancasila dan Undang-Undang Dasar 1945",
    ruangLingkup: "Universitas Nusa Mandiri (Jatiwaringin, Margonda, Rawamangun)",
    lambang: "Lingkaran dengan gambar matahari, gunung, dan arah mata angin",
  },

  lambangArti: [
    { title: "Lingkaran", desc: "Satu kesatuan, satu misi, satu visi, dan satu tujuan." },
    { title: "Matahari", desc: "Kesetiaan anggota kepada Dhinakara Adventure." },
    { title: "8 sinar", desc: "Mengartikan delapan orang pendiri." },
    { title: "Arah mata angin", desc: "Petunjuk di alam bebas dan arah kemajuan organisasi." },
    { title: "3 puncak gunung", desc: "Komitmen pada etika pencinta alam." },
  ],

  keanggotaan: {
    jenis: [
      { title: "Calon anggota", desc: "Sudah mendaftar dan mengikuti materi sebelum Pendidikan Dasar." },
      { title: "Anggota Muda", desc: "Lulus Diksar; memiliki nama lapangan, slayer, dan logo DA." },
      { title: "Anggota Tetap", desc: "Lulus Dikjut; atribut keanggotaan lengkap." },
      { title: "Anggota Luar Biasa", desc: "Tidak lagi terikat struktural, atau sudah menyelesaikan kuliah." },
    ],
  },

  prinsip: [
    "Kebersamaan dan kekeluargaan dalam berorganisasi.",
    "Tanggung jawab pada keselamatan diri, rekan, dan alam.",
    "Terbuka bagi mahasiswa UNM di seluruh kampus.",
    "Aktif berkegiatan lapangan dan pengabdian masyarakat.",
  ],

  visi:
    "Menjadi wadah untuk terciptanya individu yang bermanfaat, bertanggung jawab dan berjiwa sosial. Serta berkomitmen untuk senantiasa menanam rasa cinta dan bertanggung jawab pada Dhinakara Adventure dan Universitas Nusa Mandiri.",

  misi: [
    "Meningkatkan peran aktif dalam menanggapi masalah lingkungan, menjaga kelestarian alam, serta menghasilkan prestasi non akademik.",
    "Menjalin kebersamaan dan kekeluargaan dalam berorganisasi.",
    "Menyelenggarakan kegiatan pengabdian masyarakat yang berkualitas dan bermanfaat bagi lingkungan sekitar.",
    "Melaksanakan kerja sama dengan UKM atau organisasi lain di tingkat nasional maupun internasional.",
    "Berkomitmen menjadi UKM yang berkualitas dan bermanfaat bagi Universitas Nusa Mandiri.",
  ],

  tujuan: [
    "Menumbuhkan minat mahasiswa UNM dalam berorganisasi dan mencintai kampus.",
    "Membangun kesadaran menjaga kelestarian alam.",
    "Mempererat persaudaraan antar anggota, mahasiswa, dan masyarakat.",
    "Menjadi pribadi yang berguna bagi lingkungan sekitar.",
    "Berkontribusi pada semangat Universitas Nusa Mandiri.",
  ],

  /* Digabung di profil sebagai “Apa yang kami lakukan” */
  fungsi: [
    "Wadah mahasiswa UNM yang gemar berkegiatan di alam bebas.",
    "Sarana menumbuhkan cinta dan kepedulian pada kelestarian alam.",
    "Meningkatkan pengetahuan dan keterampilan lapangan anggota.",
    "Melatih kemampuan berorganisasi dan kepemimpinan.",
    "Ikut menjaga lingkungan melalui kegiatan dan pengabdian.",
  ],

  peran: [],

  stats: [
    { value: 10, suffix: "+", label: "Tahun berdiri" },
    { value: 8, suffix: "", label: "Pendiri" },
    { value: 7, suffix: "", label: "Pengurus" },
    { value: 3, suffix: "", label: "Kampus UNM" },
  ],

  divisions: [
    {
      name: "Gunung Hutan",
      desc: "Pendakian, navigasi darat, survival, dan ekspedisi medan gunung-hutan.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80&auto=format&fit=crop",
    },
    {
      name: "Panjat Tebing",
      desc: "Teknik climbing, belaying, dan keselamatan di jalur tebing.",
      image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=900&q=80&auto=format&fit=crop",
    },
    {
      name: "Arung Jeram",
      desc: "Kegiatan air: arung jeram, keselamatan sungai, dan kerja tim di arus.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80&auto=format&fit=crop",
    },
  ],

  news: [
    {
      id: 1,
      title: "Diksar Dhinakara Adventure dibuka",
      category: "Diksar",
      date: "12 September 2026",
      location: "UNM (Jatiwaringin · Margonda · Rawamangun)",
      image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=900&q=80&auto=format&fit=crop",
      excerpt:
        "Pendaftaran Pendidikan Dasar dibuka bagi mahasiswa aktif Universitas Nusa Mandiri. Orientasi dan seleksi awal menyusul.",
      link: "diksar.html",
    },
    {
      id: 2,
      title: "Ekspedisi Gunung Hutan",
      category: "Gunung Hutan",
      date: "28 Agustus 2026",
      location: "Jawa Barat",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80&auto=format&fit=crop",
      excerpt:
        "Divisi Gunung Hutan menempuh jalur pendakian dengan penerapan Leave No Trace dan prosedur keselamatan lapangan.",
      link: "kegiatan.html",
    },
    {
      id: 3,
      title: "Latihan panjat tebing rutin",
      category: "Panjat Tebing",
      date: "10 Agustus 2026",
      location: "Area latihan lapangan",
      image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=900&q=80&auto=format&fit=crop",
      excerpt:
        "Divisi Panjat Tebing mengasah teknik climbing, belaying, dan prosedur keamanan.",
      link: "kegiatan.html",
    },
    {
      id: 4,
      title: "Latihan arung jeram",
      category: "Arung Jeram",
      date: "2 Agustus 2026",
      location: "Sungai latihan",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80&auto=format&fit=crop",
      excerpt:
        "Divisi Arung Jeram berlatih teknik dayung, keselamatan sungai, dan koordinasi tim di arus.",
      link: "kegiatan.html",
    },
    {
      id: 5,
      title: "Dikjut: Pendidikan Lanjut dibuka",
      category: "Dikjut",
      date: "18 Juli 2026",
      location: "UNM Jatiwaringin",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=900&q=80&auto=format&fit=crop",
      excerpt:
        "Anggota Muda yang telah menyelesaikan Diksar dapat mendaftar Pendidikan Lanjut menuju Anggota Tetap.",
      link: "dikjut.html",
    },
    {
      id: 6,
      title: "Hiking bersama Divisi Gunung Hutan",
      category: "Gunung Hutan",
      date: "5 Juli 2026",
      location: "Jawa Barat",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80&auto=format&fit=crop",
      excerpt:
        "Kegiatan lapangan rutin untuk memperkuat navigasi, kerja sama, dan ketahanan jasmani.",
      link: "kegiatan.html",
    },
  ],

  events: [
    {
      date: "24-25 Okt 2026",
      title: "Hiking & camp Divisi Gunung Hutan",
      category: "Gunung Hutan",
      location: "Jawa Barat",
      status: "terbuka",
    },
    {
      date: "14-15 Nov 2026",
      title: "Latihan panjat tebing lanjutan",
      category: "Panjat Tebing",
      location: "Area latihan",
      status: "mendaftar",
    },
    {
      date: "28-29 Nov 2026",
      title: "Latihan arung jeram",
      category: "Arung Jeram",
      location: "Sungai latihan",
      status: "terbuka",
    },
    {
      date: "12-13 Des 2026",
      title: "Materi persiapan Dikjut",
      category: "Dikjut",
      location: "Sekretariat Jatiwaringin",
      status: "mendaftar",
    },
    {
      date: "9-11 Jan 2027",
      title: "Pelatihan survival Diksar",
      category: "Diksar",
      location: "Basecamp Diksar",
      status: "mendaftar",
    },
  ],

  testimonials: [],

  /* Badan Pengurus Harian — contoh nama (ganti lewat Admin) */
  struktur: {
    periode: "2025 / 2026",
    catatan: "Badan Pengurus Harian (BPH) · masa jabatan 1 tahun",
    roles: [
      {
        id: "ketua",
        role: "Ketua Umum",
        name: "Ahmad Fauzan",
        level: 1,
        desc: "Memimpin UKM dan mewakili organisasi.",
      },
      {
        id: "sekretaris",
        role: "Sekretaris Umum",
        name: "Siti Rahmawati",
        level: 2,
        desc: "Administrasi, surat-menyurat, dan dokumentasi.",
      },
      {
        id: "bendahara",
        role: "Bendahara",
        name: "Rizky Pratama",
        level: 2,
        desc: "Pengelolaan keuangan organisasi.",
      },
      {
        id: "kordiv",
        role: "Koordinator Divisi",
        name: "Dewi Lestari",
        level: 3,
        desc: "Koordinasi Gunung Hutan, Panjat Tebing, dan Arung Jeram.",
      },
      {
        id: "peralatan",
        role: "Peralatan",
        name: "Budi Santoso",
        level: 3,
        desc: "Perawatan dan inventaris peralatan UKM.",
      },
      {
        id: "medis",
        role: "Medis",
        name: "Nadia Putri",
        level: 3,
        desc: "Kesiapan medis dan kesehatan di lapangan.",
      },
      {
        id: "humas",
        role: "Humas",
        name: "Andi Wijaya",
        level: 3,
        desc: "Komunikasi publik dan media resmi.",
      },
    ],
  },

  pengurus: [],

  gallery: [
    {
      src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&q=80&auto=format&fit=crop",
      category: "Gunung Hutan",
      caption: "Ekspedisi gunung",
    },
    {
      src: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=1000&q=80&auto=format&fit=crop",
      category: "Panjat Tebing",
      caption: "Latihan panjat tebing",
    },
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=80&auto=format&fit=crop",
      category: "Arung Jeram",
      caption: "Kegiatan arung jeram",
    },
    {
      src: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=1000&q=80&auto=format&fit=crop",
      category: "Diksar",
      caption: "Perkemahan Diksar",
    },
    {
      src: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1000&q=80&auto=format&fit=crop",
      category: "Dikjut",
      caption: "Pendidikan Lanjut",
    },
    {
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1000&q=80&auto=format&fit=crop",
      category: "Gunung Hutan",
      caption: "Jalur hutan",
    },
  ],

  /* Hero slideshow beranda — ganti dengan foto asli kegiatan DA */
  heroSlides: [
    {
      src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1800&q=80&auto=format&fit=crop",
      alt: "Pegunungan di bawah langit terbuka",
      label: "Gunung Hutan",
    },
    {
      src: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=1800&q=80&auto=format&fit=crop",
      alt: "Aktivitas panjat tebing",
      label: "Panjat Tebing",
    },
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=80&auto=format&fit=crop",
      alt: "Perairan dan medan petualangan",
      label: "Arung Jeram",
    },
    {
      src: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=1800&q=80&auto=format&fit=crop",
      alt: "Suasana perkemahan",
      label: "Diksar",
    },
  ],

  timeline: [
    {
      year: 2016,
      text: "Dhinakara Adventure didirikan pada 10 Oktober 2016. Nama diambil dari bahasa Sansekerta yang berarti Matahari.",
    },
    {
      year: 2017,
      text: "Berjalan sebagai UKM pencinta alam Universitas Nusa Mandiri — terbuka, mandiri, dan bertanggung jawab.",
    },
    {
      year: 2021,
      text: "Kelembagaan UKM semakin kuat di lingkungan kampus UNM, dengan komitmen pada Tridarma dan etika pencinta alam.",
    },
    {
      year: 2024,
      text: "Pedoman organisasi diperbarui bersama anggota sebagai acuan internal UKM.",
    },
    {
      year: 2026,
      text: "Kegiatan menjangkau tiga kampus UNM: Jatiwaringin, Margonda, dan Rawamangun. Sekretariat di Kampus Jatiwaringin.",
    },
  ],

  values: [
    {
      title: "Satu kesatuan",
      desc: "Satu misi, satu visi, dan satu tujuan bersama.",
    },
    {
      title: "Terbuka",
      desc: "Ruang bagi mahasiswa UNM dari seluruh kampus untuk tumbuh bersama.",
    },
    {
      title: "Kesetiaan",
      desc: "Komitmen anggota pada UKM, rekan, dan kampus.",
    },
    {
      title: "Hormat pada alam",
      desc: "Keselamatan dan etika lapangan jadi fondasi setiap kegiatan.",
    },
  ],

  skills: [
    { label: "Gunung Hutan — navigasi & survival", pct: 90 },
    { label: "Panjat Tebing — teknik & keselamatan", pct: 85 },
    { label: "Arung Jeram — teknik air & keselamatan", pct: 82 },
    { label: "Organisasi & kepemimpinan", pct: 88 },
  ],

  diksar: {
    title: "Pendidikan Dasar (Diksar)",
    shortDesc:
      "Gerbang resmi menjadi Anggota Muda UKM Dhinakara Adventure. Setelah Diksar, anggota dapat menempuh Dikjut (Pendidikan Lanjut) menuju Anggota Tetap.",
    syarat: [
      "Mahasiswa aktif Universitas Nusa Mandiri (Jatiwaringin, Margonda, atau Rawamangun)",
      "Mengisi formulir pendaftaran",
      "Mengikuti materi sebelum pelaksanaan Pendidikan Dasar",
      "Sehat jasmani dan rohani",
      "Komitmen mengikuti seluruh rangkaian pelatihan",
    ],
    alur: [
      {
        step: "01",
        title: "Pendaftaran",
        desc: "Hubungi sekretariat atau Instagram resmi UKM untuk informasi pendaftaran.",
      },
      {
        step: "02",
        title: "Calon anggota",
        desc: "Mengikuti materi persiapan sebelum Pendidikan Dasar.",
      },
      {
        step: "03",
        title: "Pendidikan Dasar",
        desc: "Pelatihan teori, fisik, navigasi, survival, dan etika lapangan.",
      },
      {
        step: "04",
        title: "Anggota Muda",
        desc: "Memiliki nama rimba/lapangan, slayer, dan logo DA.",
      },
      {
        step: "05",
        title: "Siap Dikjut",
        desc: "Lanjut ke Pendidikan Lanjut (Dikjut) menuju Anggota Tetap.",
      },
    ],
    benefit: [
      "Status Anggota Muda Dhinakara Adventure",
      "Dasar keterampilan tiga divisi: Gunung Hutan, Panjat Tebing, Arung Jeram",
      "Terlibat dalam kegiatan dan keputusan organisasi",
      "Siap menempuh Dikjut menuju Anggota Tetap",
    ],
  },

  dikjut: {
    title: "Pendidikan Lanjut (Dikjut)",
    shortDesc:
      "Jenjang lanjutan setelah Diksar. Mengantar Anggota Muda menjadi Anggota Tetap dengan atribut lengkap dan nomor anggota.",
    syarat: [
      "Sudah menjadi Anggota Muda (lulus Diksar)",
      "Mahasiswa aktif Universitas Nusa Mandiri",
      "Memiliki nama lapangan, slayer, dan logo",
      "Komitmen mengikuti seluruh rangkaian Pendidikan Lanjut",
    ],
    alur: [
      {
        step: "01",
        title: "Pendaftaran Dikjut",
        desc: "Anggota Muda mendaftar melalui sekretariat atau Instagram resmi UKM.",
      },
      {
        step: "02",
        title: "Pembekalan",
        desc: "Materi lanjutan organisasi, lapangan, dan tanggung jawab anggota tetap.",
      },
      {
        step: "03",
        title: "Pendidikan Lanjut",
        desc: "Rangkaian pelatihan dan evaluasi di lapangan serta organisasi.",
      },
      {
        step: "04",
        title: "Atribut lengkap",
        desc: "Melengkapi atribut keanggotaan Dhinakara Adventure.",
      },
      {
        step: "05",
        title: "Anggota Tetap",
        desc: "Menerima nomor anggota resmi DA.",
      },
    ],
    benefit: [
      "Status Anggota Tetap Dhinakara Adventure",
      "Nomor anggota resmi",
      "Atribut lengkap dan peran penuh dalam organisasi",
      "Siap aktif di tiga divisi dan kepengurusan",
    ],
  },
};
