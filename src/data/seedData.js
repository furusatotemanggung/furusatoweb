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
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727483/furusato/y8u5dtfbplczx5yidrhb.jpg"
      },
      {
        "id": "gallery-1780930512733",
        "title": "Selamat mendarat di jepang",
        "description": "Jajan san dan Choirul san memijakan kaki pertama di Jepang",
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727482/furusato/musrwz74dkatz4h3rcdf.jpg"
      },
      {
        "id": "gallery-1780927032072",
        "title": "ASRAMA SISWA",
        "description": "foto asrama bawah untuk laki laki",
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727463/furusato/tluodtrtmagde5cdg7ax.jpg"
      },
      {
        "id": "gallery-1780926955953",
        "title": "ASRAMA SISWA",
        "description": "ini adalah asrama siswa",
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727462/furusato/qkwhqsvfbukoaemjtwba.jpg"
      },
      {
        "id": "gallery-1780926729257",
        "title": "TEMPAT PARKIR",
        "description": "tempat parkir luas mencakup seluruh siswa",
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727461/furusato/v0xo3c5paxiqlb8beqrx.jpg"
      },
      {
        "id": "gallery-1780926543067",
        "title": "KELAS TOKYO",
        "description": "ini adalah kelas siswa baru",
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727459/furusato/espjj6btw7t21qb6jclz.jpg"
      },
      {
        "id": "gallery-1780924478704",
        "title": "KELAS NAGOYA",
        "description": "ini adalah kelas persiapan JFT",
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727457/furusato/ujr0yof7b2t5pijvt7nt.jpg"
      },
      {
        "id": "gallery-1780924425794",
        "title": "KELAS OSAKA",
        "description": "ini adalah kelas n4",
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727456/furusato/kymhgny9ifxw70sqvbv3.jpg"
      },
      {
        "id": "gallery-1780924347030",
        "title": "KANTOR FURUSATO",
        "description": "ini adalah bagian kantor furusato",
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727455/furusato/ctju4hcostak2bbq6wva.jpg"
      },
      {
        "id": "gallery-1780894600820",
        "title": "LPK FURUSATO TEMANGGUNG",
        "description": "BAGIAN DEPAN LPK FURUSATO",
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727453/furusato/ijvssnnkl7vchzdrocey.jpg"
      },
      {
        "id": "gallery-1780149613401",
        "title": "Kegiatan Outing Class",
        "description": "Outing Class bersama keluarga furusato di pabrik Crutu",
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727450/furusato/fvrzanybe0uvxe9tmvzn.jpg"
      },
      {
        "id": "gallery-1779117435545",
        "title": "FOTO BUKA BERSAMA",
        "description": "FOTO BUKA BERSAMA SAAT RAMADHAN",
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727443/furusato/kmsnvdepngshmsfdiim2.jpg"
      },
      {
        "id": "gallery-1779116980062",
        "title": "foto bersama",
        "description": "DENGAN ANGGOTA BARU FURUSATO",
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727442/furusato/dob6wqslt3og6yuflxm1.jpg",
        "action": "update"
      }
    ],
    "lulusJobs": [
      {
        "id": "lulus-job-1780931216223",
        "name": "Nurkholis",
        "origin": "Indramayu",
        "quote": "watashi wa saigo no hito jya arimasen, kouhai matteruzo !",
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727487/furusato/f9tvsg1c6zjy5wdgzmd8.jpg"
      },
      {
        "id": "lulus-job-1780931129372",
        "name": "Deva Wisam Muqorrobien",
        "origin": "Temanggung",
        "quote": "kekkon shiki no okagede, yatto nihon ni kitta !",
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727486/furusato/k1yfajyep47w7uazcohf.jpg"
      },
      {
        "id": "lulus-job-1780931049359",
        "name": "Indar Fathoni",
        "origin": "Cilacap",
        "quote": "mai nichi shikararete yokatta",
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727485/furusato/c057rhns677t7q6x0ztz.jpg"
      },
      {
        "id": "lulus-job-1780930917785",
        "name": "Monica Dizyiana",
        "origin": "Salatiga",
        "quote": "sensei, uchi ni irashatteitadaite arigatou !",
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727484/furusato/pyzfcunshtttybmn0cf0.jpg"
      },
      {
        "id": "lulus-job-1780929758158",
        "name": "Annisa Diva Kharismadani",
        "origin": "Salatiga",
        "quote": "sensei, kohai no koto wo yoroshiku",
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727481/furusato/lb2mfv09xube9f0djjqn.jpg"
      },
      {
        "id": "lulus-job-1780929613284",
        "name": "Ipunk Indra Tirta",
        "origin": "Cepu",
        "quote": "iroiro to arigatougozaimasu, osewa ni narimashita",
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727480/furusato/bbiapddwf3piyrnwolbr.jpg"
      },
      {
        "id": "lulus-job-1780929522870",
        "name": "Tabita Happy Shifani",
        "origin": "Temanggung",
        "quote": "dadar gulung douzo !",
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727472/furusato/fm8kdnxhd5onjbchiz16.jpg"
      },
      {
        "id": "lulus-job-1780929452381",
        "name": "Gladiola Natania Ashari",
        "origin": "Temanggung",
        "quote": "Toufu uriba kara sekai e",
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727470/furusato/cy370gbwtvwysnb1bhcv.jpg"
      },
      {
        "id": "lulus-job-1780929335277",
        "name": "Karim Fauzan Zulfa",
        "origin": "Sragen",
        "quote": "Shinazuni kaerimasu kara !",
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727470/furusato/hhahdmzf5ale7zmigcz0.jpg"
      },
      {
        "id": "lulus-job-1780929067043",
        "name": "Tri Diki Kurniawan",
        "origin": "Magetan",
        "quote": "Ganbarimasu!",
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727469/furusato/lfezfnvv8twz3c3ivfjf.jpg"
      },
      {
        "id": "lulus-job-1780929003043",
        "name": "Luki Ferdinan",
        "origin": "Kec.Wonoboyo Temanggung",
        "quote": "Furusato ni deaette yokatta",
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727468/furusato/sa4apmiogygtvsxxe0wr.jpg"
      },
      {
        "id": "lulus-job-1780928756493",
        "name": "Dio Fajar Bastian",
        "origin": "Kec.Wonoboyo Temanggung",
        "quote": "Sensei ogenki de",
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727467/furusato/moqcddphjokgxy5xmwed.jpg"
      },
      {
        "id": "lulus-job-1780928539186",
        "name": "Muhammad Choirul Muntaha",
        "origin": "Blora",
        "quote": "Ittekimasu!",
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727465/furusato/nuvnuyi4snyr870z0bms.jpg"
      },
      {
        "id": "lulus-job-1780927640172",
        "name": "Jajang Noer Jaman",
        "origin": "Jakarta",
        "quote": "Terima Kasih Furusato, Sebagai siswa tertua Furusato saya akan membimbing adik adik mengharumkan nama indonesia.",
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727465/furusato/ajbco3h8nddkryqxmrbn.jpg"
      }
    ]
  },
  "docs": {
    "site/main": {
      "brandName": "FURUSATO",
      "brandSubtitle": "LPK FURUSATO TEMANGGUNG",
      "logoUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727436/furusato/x1cm4jwf4bobandoatt5.png",
      "backgrounds": {
        "homeHeroUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727437/furusato/mwxh3wtke8zg8vdmijp5.png",
        "homeAboutUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727441/furusato/cbjqy9tcicdvrcbprtes.jpg",
        "homeNewsUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727448/furusato/prdkrn63y5p5dd3rtlnb.jpg",
        "galleryPageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727439/furusato/hughutokonputvjxahw4.jpg",
        "aboutPageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727439/furusato/lxdqzcr3etn5oy0c4i0t.jpg",
        "lulusJobPageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727449/furusato/rkf14thkxdfbfyiqh3t1.png",
        "contactPageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727452/furusato/kov0kbd9pu1ais7v92mz.jpg"
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
      "heroBackgroundUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727435/furusato/i8kclvxmn5ujypyybbjs.png",
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
        "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727451/furusato/g2feu0ub8iea1bkuvwwp.png",
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
          "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727488/furusato/dmshwhkhtlm0jxaedeqr.jpg"
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
            "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727444/furusato/akdfemt9bkaaqgjviaud.png"
          },
          {
            "id": "program-002",
            "title": "Pembinaan Budaya Kerja",
            "description": "Pembinaan kedisiplinan, etika kerja, dan kesiapan mental untuk memasuki lingkungan kerja profesional.",
            "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727445/furusato/e10ls2fc8ipuubgujndm.png"
          },
          {
            "id": "program-003",
            "title": "Persiapan Kerja Secara Ril",
            "description": "Sebelum berangkat berkerja ke jepang, dari furusato terdapat pelatihan dalam bidang kerja tersebut agar siswa terbiasa dengan apa yang akan di hadapi di jepang nanti.",
            "imageUrl": "https://res.cloudinary.com/dlmpca80t/image/upload/v1793727446/furusato/syy0oqw7fx9l8jyft2d0.png"
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
