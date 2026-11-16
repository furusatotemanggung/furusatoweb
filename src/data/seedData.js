// Data awal hasil snapshot situs live (3 Nov 2026), URL gambar sudah
// dimigrasi ke Cloudinary. Untuk impor sekali jalan dari dashboard admin
// saat Firestore masih kosong.
const seedData = {
  "collections": {
    "news": [],
    "gallery": [
      {
        "id": "gallery-1780930610088",
        "title": "Selamat mendarat di jepang",
        "description": "Diki san dan Fauzan san selamat data di aichi ken jepang",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813753/furusato/rnlyqb5lzg6otyacknfx.jpg"
      },
      {
        "id": "gallery-1780930512733",
        "title": "Selamat mendarat di jepang",
        "description": "Jajan san dan Choirul san memijakan kaki pertama di Jepang",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813752/furusato/v0chzcyxgf9fospvlg0n.jpg"
      },
      {
        "id": "gallery-1780927032072",
        "title": "ASRAMA SISWA",
        "description": "foto asrama bawah untuk laki laki",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813740/furusato/voqzv9ru5xiczpbx8fjf.jpg"
      },
      {
        "id": "gallery-1780926955953",
        "title": "ASRAMA SISWA",
        "description": "ini adalah asrama siswa",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813738/furusato/xk06bmidrbtpexqx2ujd.jpg"
      },
      {
        "id": "gallery-1780926729257",
        "title": "TEMPAT PARKIR",
        "description": "tempat parkir luas mencakup seluruh siswa",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813737/furusato/m6u2atd3lhqqlugfgsj6.jpg"
      },
      {
        "id": "gallery-1780926543067",
        "title": "KELAS TOKYO",
        "description": "ini adalah kelas siswa baru",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813735/furusato/hncy8s4nq9llarqdwlq4.jpg"
      },
      {
        "id": "gallery-1780924478704",
        "title": "KELAS NAGOYA",
        "description": "ini adalah kelas persiapan JFT",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813733/furusato/y6rapo9wgdtw0iqac9uj.jpg"
      },
      {
        "id": "gallery-1780924425794",
        "title": "KELAS OSAKA",
        "description": "ini adalah kelas n4",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813732/furusato/ass4zccrqj2dvxh5ofi6.jpg"
      },
      {
        "id": "gallery-1780924347030",
        "title": "KANTOR FURUSATO",
        "description": "ini adalah bagian kantor furusato",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813731/furusato/f8slsncasbifz67zdste.jpg"
      },
      {
        "id": "gallery-1780894600820",
        "title": "LPK FURUSATO TEMANGGUNG",
        "description": "BAGIAN DEPAN LPK FURUSATO",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813730/furusato/apntlvuxyivarhr6aw7p.jpg"
      },
      {
        "id": "gallery-1780149613401",
        "title": "Kegiatan Outing Class",
        "description": "Outing Class bersama keluarga furusato di pabrik Crutu",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813725/furusato/djscffetwqbq4ssfqu1p.jpg"
      },
      {
        "id": "gallery-1779117435545",
        "title": "FOTO BUKA BERSAMA",
        "description": "FOTO BUKA BERSAMA SAAT RAMADHAN",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813715/furusato/gjesfytrbhbslnkh015c.jpg"
      },
      {
        "id": "gallery-1779116980062",
        "title": "foto bersama",
        "description": "DENGAN ANGGOTA BARU FURUSATO",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813714/furusato/qt3us8trb6r8odltvwcv.jpg",
        "action": "update"
      }
    ],
    "lulusJobs": [
      {
        "id": "lulus-job-1780931216223",
        "name": "Nurkholis",
        "origin": "Indramayu",
        "quote": "watashi wa saigo no hito jya arimasen, kouhai matteruzo !",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813756/furusato/ntxcem2pqowpwwjtqa4k.jpg"
      },
      {
        "id": "lulus-job-1780931129372",
        "name": "Deva Wisam Muqorrobien",
        "origin": "Temanggung",
        "quote": "kekkon shiki no okagede, yatto nihon ni kitta !",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813756/furusato/f5ts1js7fq79nszjt0hs.jpg"
      },
      {
        "id": "lulus-job-1780931049359",
        "name": "Indar Fathoni",
        "origin": "Cilacap",
        "quote": "mai nichi shikararete yokatta",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813755/furusato/zvqg7jtmgu7hzp9mcptz.jpg"
      },
      {
        "id": "lulus-job-1780930917785",
        "name": "Monica Dizyiana",
        "origin": "Salatiga",
        "quote": "sensei, uchi ni irashatteitadaite arigatou !",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813754/furusato/ztzwrh05o7kcof3tzgly.jpg"
      },
      {
        "id": "lulus-job-1780929758158",
        "name": "Annisa Diva Kharismadani",
        "origin": "Salatiga",
        "quote": "sensei, kohai no koto wo yoroshiku",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813751/furusato/poxz9mduep5mtge9g67s.jpg"
      },
      {
        "id": "lulus-job-1780929613284",
        "name": "Ipunk Indra Tirta",
        "origin": "Cepu",
        "quote": "iroiro to arigatougozaimasu, osewa ni narimashita",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813750/furusato/h3gz94czxmyuksyfuudt.jpg"
      },
      {
        "id": "lulus-job-1780929522870",
        "name": "Tabita Happy Shifani",
        "origin": "Temanggung",
        "quote": "dadar gulung douzo !",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813749/furusato/kkg3fx3b5eiqfbuoebhr.jpg"
      },
      {
        "id": "lulus-job-1780929452381",
        "name": "Gladiola Natania Ashari",
        "origin": "Temanggung",
        "quote": "Toufu uriba kara sekai e",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813748/furusato/sekea2klbmby7iixfiwv.jpg"
      },
      {
        "id": "lulus-job-1780929335277",
        "name": "Karim Fauzan Zulfa",
        "origin": "Sragen",
        "quote": "Shinazuni kaerimasu kara !",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813747/furusato/qokjlnugggoimw425wvm.jpg"
      },
      {
        "id": "lulus-job-1780929067043",
        "name": "Tri Diki Kurniawan",
        "origin": "Magetan",
        "quote": "Ganbarimasu!",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813746/furusato/znrxgwlc7r4ibltodvek.jpg"
      },
      {
        "id": "lulus-job-1780929003043",
        "name": "Luki Ferdinan",
        "origin": "Kec.Wonoboyo Temanggung",
        "quote": "Furusato ni deaette yokatta",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813745/furusato/x5ezgpvuiriyfdfxrwst.jpg"
      },
      {
        "id": "lulus-job-1780928756493",
        "name": "Dio Fajar Bastian",
        "origin": "Kec.Wonoboyo Temanggung",
        "quote": "Sensei ogenki de",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813744/furusato/lilgh1vg9vigvnaea4xg.jpg"
      },
      {
        "id": "lulus-job-1780928539186",
        "name": "Muhammad Choirul Muntaha",
        "origin": "Blora",
        "quote": "Ittekimasu!",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813742/furusato/gdjlazvobscjzn9mc01t.jpg"
      },
      {
        "id": "lulus-job-1780927640172",
        "name": "Jajang Noer Jaman",
        "origin": "Jakarta",
        "quote": "Terima Kasih Furusato, Sebagai siswa tertua Furusato saya akan membimbing adik adik mengharumkan nama indonesia.",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813741/furusato/gvucqinjzqk8papplqia.jpg"
      }
    ]
  },
  "docs": {
    "site/main": {
      "brandName": "FURUSATO",
      "brandSubtitle": "LPK FURUSATO TEMANGGUNG",
      "logoUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813708/furusato/auqmvuuiuqemxh93hhuq.png",
      "backgrounds": {
        "homeHeroUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813710/furusato/ylactlnaheyeunin71ug.png",
        "homeAboutUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813713/furusato/vzmslblibkk9wfgvgzhp.jpg",
        "homeNewsUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813722/furusato/kvcebhjqrrmfkpcnrbdv.jpg",
        "galleryPageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813711/furusato/bht1wnzumfbqrfin28lc.jpg",
        "aboutPageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813712/furusato/jdtpj2hrw1uze7i4nyjf.jpg",
        "lulusJobPageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813724/furusato/ip9hxjcca8ivrqhoqzkh.png",
        "contactPageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813728/furusato/yqiyjpvxmplfdzzirmzg.jpg"
      },
      "address": "Jl. Hayam Wuruk No. 1 RT 02 RW 03 Brajan, Sidorejo, Kec.Temanggung, Kab.Temanggung, Jawa Tengah 56221, Indonesia",
      "phone": "08122709708",
      "email": "sabdo.furusato@gmail.com",
      "whatsapp": "https://wa.me/628122709708",
      "socials": {
        "instagram": "https://www.instagram.com/furusato.tmg/",
        "facebook": "",
        "youtube": "",
        "tiktok": ""
      }
    },
    "content/home": {
      "heroBackgroundUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813706/furusato/di300dftw7qsbk3ufjh0.png",
      "jobInfo": {
        "label": "JEPANG 2026",
        "title": "ADA JALAN KARIR BANYAK KE JEPANG !",
        "description": "SUSAH CARI KERJA DI INDONESIA AYO KE JEPANG !",
        "linkUrl": "/berita",
        "newsId": "news-1778848889102"
      },
      "jobBanner": {
        "label": "JEPANG 2026",
        "title": "ADA JALAN KARIR BANYAK KE JEPANG !",
        "description": "SUSAH CARI KERJA DI INDONESIA AYO KE JEPANG !",
        "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813727/furusato/ldccbmo97ykoyhdaxabw.png",
        "linkUrl": "/berita",
        "newsId": "news-1778848889102"
      },
      "partners": []
    },
    "content/about": {
      "aboutContent": {
        "profile": {
          "eyebrow": "Tentang Furusato",
          "title": "LPK Furusato",
          "body": "Furusato adalah lembaga pelatihan kerja yang ikut berperan mengembangkan potensi sumber daya manusia Indonesia agar siap memasuki dunia kerja profesional, khususnya peluang kerja ke Jepang."
        },
        "chairman": {
          "eyebrow": "Sambutan Ketua",
          "name": "Sabdo Widodo",
          "body": "Kami berkomitmen memberikan pelatihan bahasa Jepang, dan pembinaan karakter terbaik agar peserta tidak hanya siap bekerja, tetapi juga berakhlak baik yang mampu membawa sikap disiplin, tangguh, dan bertanggung jawab, tidak hanya untuk diri siswa sendiri tetapi juga membawa nama baik keluarga dan negara di dunia internasional.",
          "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813757/furusato/y4bosa8f6dzsc05a5wz9.jpg"
        },
        "visionMission": {
          "visionTitle": "VISI",
          "vision": "Menjadi lembaga pelatihan kerja yang mencetak tenaga kerja kompeten, berakhlak mulia, dan berdaya saing global demi kesejahteraan keluarga dan kemajuan bangsa.",
          "missionTitle": "MISI",
          "mission": "Pelatihan Profesional :\nMenyelenggarakan pelatihan Bahasa Jepang dan keterampilan kerja yang disiplin dan berkualitas sesuai standar kebutuhan mitra industri di Jepang.\n\nPembentukan Karakter :\nMembentuk pribadi yang berakhlak, jujur, dan bertanggung jawab sebagai fondasi utama dalam bekerja.\n\nAdaptasi Budaya :\nMenyiapkan peserta agar memiliki mentalitas tangguh dan mampu beradaptasi dengan budaya kerja serta lingkungan internasional.\n\nKemandirian & Kesejahteraan :\nMembekali peserta agar menjadi pribadi mandiri yang mampu memberikan manfaat bagi keluarga dan masyarakat.\n\nKemitraan Terpercaya :\nMenjaga dan mengembangkan kerja sama strategis yang transparan dan berkelanjutan dengan perusahaan mitra di Jepang."
        },
        "programs": [
          {
            "id": "program-001",
            "title": "Program Bahasa Jepang",
            "description": "Pembelajaran bahasa Jepang terarah untuk membantu peserta membangun kemampuan komunikasi dasar.",
            "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813717/furusato/jjrqimyt3oqzfcwj8o6q.png"
          },
          {
            "id": "program-002",
            "title": "Pembinaan Budaya Kerja",
            "description": "Pembinaan kedisiplinan, etika kerja, dan kesiapan mental untuk memasuki lingkungan kerja profesional.",
            "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813719/furusato/c3qzdme5n61yqy0zm0ne.png"
          },
          {
            "id": "program-003",
            "title": "Persiapan Kerja Secara Ril",
            "description": "Sebelum berangkat berkerja ke jepang, dari furusato terdapat pelatihan dalam bidang kerja tersebut agar siswa terbiasa dengan apa yang akan di hadapi di jepang nanti.",
            "imageUrl": "https://res.cloudinary.com/ti2gkv2r/image/upload/v1794813721/furusato/kdv56wc1n0aj9llm9gtn.png"
          }
        ],
        "slogan": {
          "eyebrow": "Langkah Kecilmu Hari Ini untuk Masa Depan",
          "title": "古里から世界へ",
          "buttonText": "Hubungi Kami",
          "buttonUrl": "/kontak"
        }
      }
    }
  }
};

export default seedData;
