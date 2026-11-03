export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed (0=A, 1=B, 2=C, 3=D)
  explanation: string;
  category: "Pengertian" | "Ihram" | "Wukuf" | "Thawaf" | "Sa'i" | "Tahallul" | "Tertib" | "Urutan";
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Apa perbedaan paling mendasar antara 'Rukun Haji' dan 'Wajib Haji'?",
    options: [
      "Rukun haji boleh diganti dengan membayar Dam (denda), sedangkan wajib haji tidak boleh.",
      "Rukun haji menentukan sah atau tidaknya haji dan tidak dapat diganti denda, sedangkan wajib haji yang terlewat dapat diganti Dam.",
      "Rukun haji hanya berlaku bagi warga Mekkah, sedangkan wajib haji bagi seluruh jemaah internasional.",
      "Rukun haji dikerjakan setelah wukuf, sedangkan wajib haji dikerjakan sebelum wukuf."
    ],
    correctAnswer: 1,
    explanation: "Rukun haji adalah amalan pokok yang menentukan keabsahan ibadah haji. Jika salah satu rukun ditinggalkan, hajinya batal/tidak sah dan tidak bisa ditebus dengan dam. Sementara wajib haji jika terlewat tetap sah hajinya namun wajib membayar dam (denda).",
    category: "Pengertian"
  },
  {
    id: 2,
    question: "Pakaian ihram bagi jemaah laki-laki terdiri atas berapa helai kain dan bagaimana ketentuannya?",
    options: [
      "Satu lembar kain panjang yang dijahit di bagian pundak.",
      "Tiga helai kain putih berjahit rapi dengan celana panjang.",
      "Dua helai kain putih yang tidak berjahit (izar sebagai sarung dan rida' sebagai selendang).",
      "Pakaian bebas berwarna putih bersih yang menutup seluruh badan hingga mata kaki."
    ],
    correctAnswer: 2,
    explanation: "Pakaian ihram untuk laki-laki disyariatkan berupa dua lembar kain putih yang tidak memiliki jahitan (tidak membentuk pola tubuh). Satu kain dililitkan di bawah pusar (izar) dan satu kain diselendangkan di pundak (rida').",
    category: "Ihram"
  },
  {
    id: 3,
    question: "Kapankah waktu puncak pelaksanaan wukuf di Padang Arafah?",
    options: [
      "Mulai terbit fajar tanggal 8 Zulhijah hingga malam 9 Zulhijah.",
      "Mulai tergelincirnya matahari (waktu Zuhur) tanggal 9 Zulhijah hingga fajar 10 Zulhijah.",
      "Setelah salat Idul Adha tanggal 10 Zulhijah hingga hari tasyrik.",
      "Tengah malam tanggal 9 Zulhijah hingga terbenam matahari tanggal 10 Zulhijah."
    ],
    correctAnswer: 1,
    explanation: "Waktu wukuf di Arafah dimulai sejak tergelincir matahari (masuknya waktu Zuhur) pada tanggal 9 Zulhijah sampai terbit fajar pada tanggal 10 Zulhijah (Hari Nahar).",
    category: "Wukuf"
  },
  {
    id: 4,
    question: "Berapa kali putaran Thawaf Ifadah dilakukan dan di manakah posisi Ka'bah selama thawaf?",
    options: [
      "3 kali putaran cepat dengan posisi Ka'bah di sebelah kanan jemaah.",
      "5 kali putaran dengan posisi Ka'bah di sebelah kanan jemaah.",
      "7 kali putaran penuh dengan posisi Ka'bah selalu berada di sebelah kiri jemaah.",
      "10 kali putaran bolak-balik searah jarum jam."
    ],
    correctAnswer: 2,
    explanation: "Thawaf dilakukan sebanyak 7 (tujuh) kali putaran sempurna mengelilingi Ka'bah, berlawanan dengan arah jarum jam, sehingga posisi Ka'bah selalu berada di sebelah kiri badan jemaah, dimulai dan diakhiri sejajar Hajar Aswad.",
    category: "Thawaf"
  },
  {
    id: 5,
    question: "Ibadah Sa'i dimulai dari bukit mana dan berakhir di bukit mana?",
    options: [
      "Dimulai dari Bukit Marwah dan berakhir di Bukit Safa.",
      "Dimulai dari Bukit Safa dan berakhir di Bukit Marwah.",
      "Bebas memilih memulai dari Safa atau Marwah asalkan genap 7 kali.",
      "Dimulai dari Jabal Rahmah dan berakhir di Masjidil Haram."
    ],
    correctAnswer: 1,
    explanation: "Ibadah Sa'i wajib dimulai dari Bukit Safa dan berakhir di Bukit Marwah. Perjalanan dari Safa ke Marwah dihitung 1 putaran, dan dari Marwah ke Safa dihitung putaran berikutnya, sehingga putaran ke-7 tepat berakhir di Marwah.",
    category: "Sa'i"
  },
  {
    id: 6,
    question: "Berapa minimal jumlah helai rambut yang harus dipotong saat melaksanakan Tahallul agar rukun terpenuhi?",
    options: [
      "Minimal 1 helai rambut.",
      "Minimal 3 helai rambut kepala.",
      "Minimal 7 helai rambut dari bagian depan.",
      "Wajib memotong seluruh rambut kepala tanpa tersisa."
    ],
    correctAnswer: 1,
    explanation: "Menurut mazhab Syafi'i, batas minimal tahallul adalah memotong atau mencukur sekurang-kurangnya 3 (tiga) helai rambut kepala, baik bagi laki-laki maupun perempuan, meskipun bagi laki-laki mencukur habis (gundul) lebih utama.",
    category: "Tahallul"
  },
  {
    id: 7,
    question: "Apa konsekuensi hukum jika seorang jemaah haji secara sengaja tidak melaksanakan rukun 'Tertib' (misalnya mendahulukan thawaf ifadah sebelum wukuf di Arafah)?",
    options: [
      "Hajinya tetap sah dan cukup membayar dam seekor kambing.",
      "Hajinya tidak sah karena tertib merupakan rukun yang mengikat keabsahan susunan manasik.",
      "Boleh dimaafkan jika berniat mengulang rukun tersebut di tahun depan.",
      "Hanya dikenai teguran oleh pembimbing ibadah tanpa membatalkan haji."
    ],
    correctAnswer: 1,
    explanation: "Tertib adalah rukun yang mewajibkan pelaksanaan rukun-rukun haji secara berurutan: Niat & Ihram -> Wukuf di Arafah -> Thawaf Ifadah -> Sa'i -> Tahallul. Jika urutan pokok ini dilanggar, maka rukun yang belum terpenuhi urutannya menjadi tidak sah.",
    category: "Tertib"
  },
  {
    id: 8,
    question: "Manakah urutan rukun haji yang benar dan lengkap sesuai syariat Islam?",
    options: [
      "Wukuf -> Ihram -> Sa'i -> Thawaf -> Tahallul -> Tertib.",
      "Ihram & Niat -> Wukuf di Arafah -> Thawaf Ifadah -> Sa'i -> Tahallul -> Tertib.",
      "Ihram & Niat -> Thawaf Ifadah -> Wukuf di Arafah -> Tahallul -> Sa'i -> Tertib.",
      "Wukuf di Arafah -> Ihram & Niat -> Melontar Jumrah -> Thawaf -> Sa'i."
    ],
    correctAnswer: 1,
    explanation: "Enam rukun haji yang disepakati adalah: 1. Niat & Ihram, 2. Wukuf di Arafah, 3. Thawaf Ifadah, 4. Sa'i, 5. Tahallul (bercukur), dan 6. Tertib (melaksanakannya secara berurutan).",
    category: "Urutan"
  },
  {
    id: 9,
    question: "Peristiwa Siti Hajar mencari air untuk putranya Nabi Ismail a.s. diabadikan dalam rukun haji apa?",
    options: [
      "Thawaf Ifadah mengelilingi Ka'bah.",
      "Wukuf merenung di Padang Arafah.",
      "Sa'i bolak-balik antara Bukit Safa dan Marwah.",
      "Mabit menginap di Muzdalifah."
    ],
    correctAnswer: 2,
    explanation: "Ibadah Sa'i menapaktilasi perjuangan mulia Siti Hajar yang berlari-lari kecil bolak-balik antara Bukit Safa dan Marwah sebanyak 7 kali demi mencari air untuk Nabi Ismail a.s., yang kemudian memancarkan mukjizat mata air Zamzam.",
    category: "Sa'i"
  },
  {
    id: 10,
    question: "Di manakah jemaah haji bermalam (mabit) untuk mengumpulkan batu kerikil setelah bertolak dari Padang Arafah pada malam 10 Zulhijah?",
    options: [
      "Di Muzdalifah.",
      "Di Bukit Safa.",
      "Di Gua Hira.",
      "Di Madinah Munawwarah."
    ],
    correctAnswer: 0,
    explanation: "Setelah wukuf di Arafah selesai saat terbenam matahari 9 Zulhijah, jemaah bertolak ke Muzdalifah untuk mabit (bermalam minimal hingga melewati tengah malam), salat jamak takhir Maghrib-Isya, dan mengumpulkan kerikil untuk melontar jumrah.",
    category: "Urutan"
  }
];
