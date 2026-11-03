import { stageAssets, getAssetUrl } from '../config/assets';

export interface StageData {
  id: string;
  stepNumber: number;
  name: string;
  shortDesc: string;
  definition: string;
  purpose: string;
  procedures: string[];
  keyPoints: string[];
  prohibitions?: string[];
  arabicText?: string;
  latinText?: string;
  translation?: string;
  audioUrl?: string;
  image: string;
  sceneIndex: number;
  reflection: string;
}

export const STAGES_DATA: StageData[] = [
  {
    id: "ihram",
    stepNumber: 1,
    name: "Niat & Ihram",
    shortDesc: "Berniat memulai ibadah haji dengan mengenakan pakaian ihram dari miqat yang ditentukan.",
    definition: "Ihram secara bahasa berarti mengharamkan atau mencegah. Menurut syariat Islam, Ihram adalah niat masuk ke dalam rangkaian ibadah haji dengan mengenakan pakaian khusus tanpa jahitan bagi laki-laki dan pakaian yang menutup seluruh aurat bagi perempuan, disertai meninggalkan hal-hal yang diharamkan selama berihram.",
    purpose: "Ihram mengajarkan kesetaraan mutlak di hadapan Allah Swt. Tanpa memandang status sosial, kekayaan, atau jabatan, seluruh umat mengenakan kain putih sederhana sebagai pengingat akan kain kafan dan kepasrahan hamba kepada Sang Pencipta.",
    procedures: [
      "Membersihkan diri, memotong kuku, mencukur bulu ketiak/kemaluan, dan merapikan kumis sebelum berniat.",
      "Mandi sunnah ihram dan berwudhu secara sempurna.",
      "Mengenakan pakaian ihram: dua lembar kain putih tanpa jahitan untuk laki-laki (izar dan rida'), serta pakaian syar'i menutup aurat (kecuali wajah dan telapak tangan) untuk perempuan.",
      "Melaksanakan salat sunnah ihram dua rakaat di lokasi miqat.",
      "Mengucapkan lafaz niat haji tepat sebelum melintasi garis batas miqat.",
      "Melantunkan kalimat Talbiyah secara berkesinambungan hingga tiba di Masjidil Haram."
    ],
    keyPoints: [
      "Niat harus diucapkan di miqat makani yang telah ditetapkan (misalnya Bir Ali bagi jemaah dari Madinah, atau Yalamlam/Qarnul Manazil).",
      "Pakaian laki-laki tidak boleh memiliki jahitan berbentuk pakaian tubuh (tidak boleh berkaos/bercelana).",
      "Perempuan tidak boleh memakai cadar yang menutupi muka secara langsung menempel atau sarung tangan yang menutup jari.",
      "Wajib menjaga larangan ihram sejak niat terucap."
    ],
    prohibitions: [
      "Memakai wewangian di badan atau pakaian setelah berihram.",
      "Memotong kuku atau mencukur/mencabut rambut dan bulu badan.",
      "Membunuh atau memburu binatang darat.",
      "Menikah, menikahkan, atau melamar.",
      "Melakukan hubungan suami istri dan perbuatan fasik (rafats, fusuq, jidal)."
    ],
    arabicText: "لَبَّيْكَ اللَّهُمَّ حَجًّا",
    latinText: "Labbaikallaahumma hajjan.",
    translation: "Aku penuhi panggilan-Mu ya Allah untuk berhaji.",
    audioUrl: getAssetUrl("assets/audio/rukun-1-ihram.mp3"),
    image: stageAssets.ihram,
    sceneIndex: 0,
    reflection: "Menanggalkan kemewahan duniawi, melatih kesederhanaan, dan menyadari bahwa di hadapan Allah semua manusia setara."
  },
  {
    id: "arafah",
    stepNumber: 2,
    name: "Wukuf di Arafah",
    shortDesc: "Berdiam diri di Padang Arafah pada waktu mustajab dari tergelincir matahari 9 Zulhijah.",
    definition: "Wukuf adalah berdiam diri, hadir, dan berkontemplasi di bumi Padang Arafah pada waktu yang ditentukan syariat, yaitu mulai tergelincirnya matahari (waktu Zuhur) pada tanggal 9 Zulhijah hingga fajar menyingsing pada tanggal 10 Zulhijah (Hari Nahar).",
    purpose: "Wukuf adalah inti dari ibadah haji ('Al-Hajju Arafah'). Wukuf merefleksikan peristiwa berkumpulnya seluruh umat manusia di Padang Mahsyar kelak, menjadi sarana muhasabah diri, pengakuan dosa, dan permohonan ampunan paling agung kepada Allah Swt.",
    procedures: [
      "Tiba di Padang Arafah pada tanggal 9 Zulhijah sebelum waktu Zuhur.",
      "Mendengarkan Khutbah Wukuf yang disampaikan oleh imam/pembimbing ibadah.",
      "Melaksanakan salat jamak taqdim qasar Zuhur dan Asar (masing-masing dua rakaat dikerjakan berurutan pada waktu Zuhur).",
      "Memperbanyak doa, istighfar, membaca Al-Qur'an, zikir, dan tahlil dengan khusyuk menghadap kiblat.",
      "Berdiam diri hingga matahari terbenam (waktu Maghrib), lalu bertolak menuju Muzdalifah (ifadhah)."
    ],
    keyPoints: [
      "Haji seseorang TIDAK SAH jika tidak hadir di Arafah pada rentang waktu wukuf walau hanya sejenak.",
      "Boleh dilakukan dalam keadaan duduk, berdiri, berbaring, suci maupun berhadas (termasuk wanita haid/nifas).",
      "Waktu paling mustajab untuk berdoa adalah menjelang terbenamnya matahari (waktu asar hingga maghrib).",
      "Tidak diperbolehkan berpuasa bagi jemaah haji yang sedang berwukuf di Arafah."
    ],
    arabicText: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    latinText: "Laa ilaaha illallaahu wahdahu laa syariika lah, lahul mulku wa lahul hamdu, wa huwa 'alaa kulli syai-in qadiir.",
    translation: "Tidak ada Tuhan selain Allah, Yang Maha Esa, tiada sekutu bagi-Nya. Bagi-Nya kerajaan dan segala puji, dan Dia Maha Kuasa atas segala sesuatu.",
    audioUrl: getAssetUrl("assets/audio/rukun-2-arafah.mp3"),
    image: stageAssets.arafah,
    sceneIndex: 1,
    reflection: "Puncak kerendahan hati manusia, memohon ampunan tulus atas segala kekhilafan, dan memperbarui tekad menjadi pribadi yang lebih bertakwa."
  },
  {
    id: "tawaf",
    stepNumber: 3,
    name: "Thawaf Ifadah",
    shortDesc: "Mengelilingi Ka'bah 7 kali putaran dengan Ka'bah berada di sisi kiri setelah wukuf di Arafah.",
    definition: "Tawaf Ifadah (atau Tawaf Ziyarah) adalah rukun haji berupa mengelilingi Ka'bah sebanyak 7 (tujuh) kali putaran sempurna, dengan posisi Ka'bah selalu berada di sebelah kiri jemaah, diawali dan diakhiri sejajar dengan garis Hajar Aswad.",
    purpose: "Thawaf melambangkan pusat perputaran alam semesta yang tunduk pada ketetapan Allah Swt (Tawhid). Menjadikan Allah sebagai sentral kehidupan, meneladani ketaatan para malaikat yang bertawaf di Baitul Ma'mur.",
    procedures: [
      "Memastikan suci dari hadas kecil dan besar serta aurat tertutup rapat.",
      "Menuju sudut Hajar Aswad dan menyelaraskan bahu dengan lampu hijau penanda garis Hajar Aswad.",
      "Berniat Thawaf Ifadah di dalam hati, menghadap ke arah Hajar Aswad lalu mengangkat tangan kanan sambil bertakbir: 'Bismillahi Allahu Akbar'.",
      "Berjalan mengitari Ka'bah berlawanan arah jarum jam (Ka'bah berada di sebelah kiri badan).",
      "Pada putaran 1-3 disunnahkan jalan cepat (raml) bagi pria, dan putaran 4-7 berjalan biasa.",
      "Membaca doa sapu jagat saat berada di antara Rukun Yamani dan Hajar Aswad.",
      "Menyelesaikan 7 putaran penuh, lalu mendirikan salat sunnah thawaf dua rakaat di belakang Maqam Ibrahim jika memungkinkan, serta meminum air zamzam."
    ],
    keyPoints: [
      "Wajib suci dari hadas (berwudhu). Jika batal di tengah putaran, harus berwudhu kembali lalu melanjutkan sisa putaran.",
      "Seluruh badan harus berada di luar Hijir Ismail dan pondasi Syadzarwan saat berputar.",
      "Waktu pelaksanaan dimulai sejak lewat tengah malam Hari Raya Idul Adha (10 Zulhijah) setelah mabit di Muzdalifah.",
      "Tawaf Ifadah merupakan rukun haji penentu keabsahan haji."
    ],
    arabicText: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    latinText: "Rabbanaa aatinaa fid-dunyaa hasanatan wa fil aakhirati hasanatan wa qinaa 'adzaaban-naar.",
    translation: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari siksa api neraka.",
    audioUrl: getAssetUrl("assets/audio/rukun-3-thawaf.mp3"),
    image: stageAssets.tawaf,
    sceneIndex: 2,
    reflection: "Menjadikan ketaatan kepada Allah sebagai orbit utama dalam seluruh aspek kehidupan, menjauhkan diri dari ego sentrisme."
  },
  {
    id: "sai",
    stepNumber: 4,
    name: "Sa'i",
    shortDesc: "Berjalan atau berlari-lari kecil 7 kali bolak-balik antara Bukit Safa dan Bukit Marwah.",
    definition: "Sa'i adalah rukun haji dengan berjalan dan berlari-lari kecil sebanyak 7 (tujuh) kali perjalanan dari Bukit Safa ke Bukit Marwah. Perjalanan dari Safa ke Marwah dihitung 1 kali, dan dari Marwah ke Safa dihitung 1 kali, sehingga genap berakhir di Bukit Marwah.",
    purpose: "Napak tilas perjuangan gigih Sayyidah Hajar saat mencari air untuk putranya Nabi Ismail a.s. di tengah padang pasir gersang. Mengajarkan ikhtiar maksimal, keteguhan hati, dan kepasrahan mutlak (tawakal) bahwa pertolongan Allah selalu hadir bagi hamba yang bersungguh-sungguh.",
    procedures: [
      "Dikerjakan setelah melaksanakan Thawaf Ifadah.",
      "Menuju Bukit Safa, menghadap Ka'bah, bertakbir dan bertahlil 3 kali sambil memanjatkan doa.",
      "Mulai berjalan menuju Bukit Marwah.",
      "Bagi laki-laki, disunnahkan berlari-lari kecil di antara dua pilar lampu hijau (Bathnul Wadi).",
      "Setibanya di Bukit Marwah, menghadap ke arah Ka'bah dan berdoa (ini terhitung 1 putaran).",
      "Melanjutkan perjalanan kembali ke Bukit Safa (putaran ke-2).",
      "Mengulang proses hingga selesai putaran ke-7 di Bukit Marwah."
    ],
    keyPoints: [
      "Harus dimulai dari Bukit Safa dan berakhir di Bukit Marwah.",
      "Harus genap 7 kali perjalanan (Safa->Marwah (1), Marwah->Safa (2), Safa->Marwah (3), Marwah->Safa (4), Safa->Marwah (5), Marwah->Safa (6), Safa->Marwah (7)).",
      "Suci dari hadas hukumnya sunnah (tidak membatalkan sa'i bagi yang berhadas kecil maupun wanita haid).",
      "Dilakukan di jalur mas'a yang telah ditentukan."
    ],
    arabicText: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ ۖ أَبْدَأُ بِمَا بَدَأَ اللَّهُ بِهِ",
    latinText: "Innash-shafaa wal marwata min sya'aa-irillaah. Abda-u bimaa bada-allaahu bih.",
    translation: "Sesungguhnya Safa dan Marwah adalah sebagian dari syiar-syiar Allah. Aku memulai dengan apa yang dimulai oleh Allah.",
    audioUrl: getAssetUrl("assets/audio/rukun-4-sai.mp3"),
    image: stageAssets.sai,
    sceneIndex: 3,
    reflection: "Pengingat bahwa dalam hidup kita wajib berikhtiar tanpa putus asa, dan Allah adalah sumber solusi dari arah yang tak disangka-sangka."
  },
  {
    id: "tahallul",
    stepNumber: 5,
    name: "Tahallul (Bercukur)",
    shortDesc: "Mencukur gundul atau memotong sebagian rambut kepala sebagai tanda selesainya larangan ihram.",
    definition: "Tahallul adalah mencukur (halq) atau memotong pendek (taqshir) minimal 3 helai rambut kepala sebagai penanda bahwa jemaah telah terbebas dari larangan-larangan ihram, sesuai dengan tahapan tahallul yang telah dicapai (Tahallul Awwal atau Tahallul Tsani).",
    purpose: "Mencukur rambut adalah simbol penyucian diri, menanggalkan mahkota kesombongan duniawi, serta tanda kelahiran kembali menjadi jiwa yang bersih dari dosa-dosa masa lalu laksana bayi yang baru dilahirkan.",
    procedures: [
      "Bagi laki-laki: Dianjurkan mencukur habis (gundul/halq) karena Rasulullah mendoakan ampunan tiga kali untuk yang mencukur gundul, atau memotong pendek secara merata (taqshir).",
      "Bagi perempuan: Cukup mengumpulkan ujung rambut lalu memotong sepanjang satu ruas jari (sekitar 2-3 cm).",
      "Membaca basmalah dan doa saat rambut dipotong.",
      "Mengenali jenis tahallul:",
      "Tahallul Awwal (Pertama): Terjadi setelah menyelesaikan dua dari tiga amalan (Lontar Jumrah Aqabah, Thawaf Ifadah + Sa'i, atau Bercukur). Membolehkan semua larangan ihram kecuali hubungan suami istri.",
      "Tahallul Tsani (Kedua/Sempurna): Terjadi setelah ketiga amalan tersebut tuntas. Seluruh larangan ihram menjadi halal kembali."
    ],
    keyPoints: [
      "Minimal memotong 3 helai rambut kepala.",
      "Tidak boleh memotong rambut orang lain jika dirinya sendiri belum bertahallul.",
      "Bagi yang botak/tidak memiliki rambut, sunnah menggoreskan pisau cukur di atas kulit kepala sebagai bentuk kepatuhan syiar."
    ],
    arabicText: "اللَّهُمَّ اغْفِرْ لِلْمُحَلِّقِينَ، اللَّهُمَّ اغْفِرْ لِلْمُحَلِّقِينَ، اللَّهُمَّ اغْفِرْ لِلْمُقَصِّرِينَ",
    latinText: "Allaahummaghfir lil-muhalliqiin, Allaahummaghfir lil-muhalliqiin, Allaahummaghfir lil-muqashshiriin.",
    translation: "Ya Allah, ampunilah mereka yang mencukur gundul rambutnya (2x), dan ampunilah mereka yang memendekkan rambutnya.",
    audioUrl: getAssetUrl("assets/audio/rukun-5-tahallul.mp3"),
    image: stageAssets.tahallul,
    sceneIndex: 4,
    reflection: "Simbol pengorbanan dan peremajaan jiwa. Membuang keangkuhan dan memulai lembaran hidup baru dengan akhlak yang mulia."
  },
  {
    id: "tertib",
    stepNumber: 6,
    name: "Tertib",
    shortDesc: "Melaksanakan seluruh rukun haji secara berurutan sesuai syariat yang telah ditentukan.",
    definition: "Tertib adalah melaksanakan rukun-rukun haji secara berurutan dan teratur sebagaimana yang dicontohkan oleh Rasulullah saw: mendahulukan Niat & Ihram, kemudian Wukuf di Arafah, dilanjutkan Thawaf Ifadah, Sa'i, dan Tahallul.",
    purpose: "Tertib mencerminkan nilai disiplin, kepatuhan sistemik pada aturan ilahi, dan keteraturan hidup. Mengajarkan bahwa setiap ibadah dan amal perbuatan manusia memiliki tahapan dan waktu yang harus dihormati agar mencapai kesempurnaan.",
    procedures: [
      "Memastikan rukun 1 (Niat & Ihram) telah sah di miqat sebelum rukun lainnya.",
      "Melaksanakan rukun 2 (Wukuf di Arafah) pada tanggal 9 Zulhijah.",
      "Melaksanakan rukun 3 (Thawaf Ifadah) setelah wukuf di Arafah.",
      "Melaksanakan rukun 4 (Sa'i) setelah pelaksanaan Thawaf.",
      "Melaksanakan rukun 5 (Tahallul) pada waktu yang dibenarkan syariat.",
      "Menjaga agar tidak ada satu pun rukun yang terlewat atau tertukar urutannya yang dapat membatalkan ibadah haji."
    ],
    keyPoints: [
      "Rukun haji tidak dapat diganti dengan membayar denda (dam). Jika salah satu rukun ditinggalkan, ibadah haji menjadi tidak sah.",
      "Urutan Niat -> Wukuf -> Thawaf -> Sa'i -> Tahallul harus dipenuhi dengan seksama.",
      "Catatan ulama: Ada kelonggaran dalam urutan antara Thawaf Ifadah, Sa'i, Lontar Jumrah, dan Bercukur pada hari Nahar (10 Zulhijah) sebagaimana sabda Nabi 'If'al wa laa haraj' (lakukan dan tidak berdosa)."
    ],
    arabicText: "خُذُوا عَنِّي مَنَاسِكَكُمْ، اللَّهُمَّ اجْعَلْهُ حَجًّا مَبْرُورًا وَسَعْيًا مَشْكُورًا وَذَنْبًا مَغْفُورًا",
    latinText: "Khudzuu 'annii manaasikakum. Allaahummaj'alhu hajjan mabruuraa wa sa'yan masjkuuraa wa dzanban maghfuuraa.",
    translation: "Ambillah dariku tata cara manasik haji kalian. Ya Allah, jadikanlah haji ini mabrur, sa'i yang disyukuri, dan dosa yang diampuni.",
    audioUrl: getAssetUrl("assets/audio/rukun-6-tertib.mp3"),
    image: stageAssets.tertib,
    sceneIndex: 5,
    reflection: "Kunci keberhasilan dan keberkahan adalah ketaatan, disiplin, dan menghormati proses rukun demi rukun dengan penuh keikhlasan."
  }
];
