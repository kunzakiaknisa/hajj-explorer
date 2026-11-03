import { locationAssets } from '../config/assets';

export interface LocationData {
  id: string;
  order: number;
  name: string;
  arabicName: string;
  coordinates: { x: number; y: number; z: number };
  shortDesc: string;
  fullDesc: string;
  activities: string[];
  ritualCategory: "Rukun Haji" | "Wajib Haji" | "Stasiun Perjalanan";
  relatedStageId?: string;
  image: string;
  badgeColor: string;
}

export const LOCATIONS_DATA: LocationData[] = [
  {
    id: "kabah",
    order: 1,
    name: "Masjidil Haram (Ka'bah)",
    arabicName: "المسجد الحرام والكعبة المشرفة",
    coordinates: { x: -8, y: 0.8, z: 6 },
    shortDesc: "Pusat kiblat umat Islam sedunia, tempat pelaksanaan Thawaf Qudum, Thawaf Ifadah, dan Thawaf Wada'.",
    fullDesc: "Masjidil Haram adalah masjid tersuci dalam Islam yang di dalamnya terletak Ka'bah musyarafah dan Maqam Ibrahim. Di sinilah jemaah menunaikan Thawaf Ifadah (salah satu dari 6 rukun haji) dan salat di tempat yang pahalanya dilipatgandakan 100.000 kali lipat.",
    activities: [
      "Thawaf Qudum (thawaf selamat datang saat pertama tiba di Makkah)",
      "Thawaf Ifadah (rukun haji wajib penentu keabsahan haji)",
      "Salat sunnah dua rakaat di belakang Maqam Ibrahim",
      "Meminum air suci Zamzam dan berdoa di Multazam",
      "Thawaf Wada' (thawaf perpisahan sebelum meninggalkan kota Makkah)"
    ],
    ritualCategory: "Rukun Haji",
    relatedStageId: "tawaf",
    image: locationAssets.kabah,
    badgeColor: "#176B9B"
  },
  {
    id: "safa",
    order: 2,
    name: "Safa & Marwah",
    arabicName: "الصفا والمروة",
    coordinates: { x: -5, y: 0.8, z: 3 },
    shortDesc: "Dua bukit bersejarah di dalam area Masjidil Haram tempat pelaksanaan rukun Sa'i.",
    fullDesc: "Bukit Safa dan Bukit Marwah adalah dua bukit batu yang dihubungkan oleh jalur koridor mas'a sepanjang sekitar 400 meter. Berjalan dan berlari kecil bolak-balik sebanyak 7 kali di antara kedua bukit ini merupakan rukun Sa'i untuk mengenang keteguhan Siti Hajar.",
    activities: [
      "Mengawali Sa'i dari Bukit Safa menghadap ke Ka'bah",
      "Berlari-lari kecil bagi laki-laki di antara dua pilar lampu hijau",
      "Berdoa dan berzikir di setiap puncak Bukit Safa dan Marwah",
      "Menuntaskan putaran ke-7 di Bukit Marwah dilanjutkan Tahallul"
    ],
    ritualCategory: "Rukun Haji",
    relatedStageId: "sai",
    image: locationAssets.safa,
    badgeColor: "#258FBA"
  },
  {
    id: "arafah",
    order: 3,
    name: "Padang Arafah",
    arabicName: "صعيد عرفات",
    coordinates: { x: 7, y: 0.8, z: -5 },
    shortDesc: "Lembah luas tempat pelaksanaan rukun puncak Wukuf pada tanggal 9 Zulhijah.",
    fullDesc: "Padang Arafah terletak sekitar 21 km di tenggara kota Makkah. Di sinilah terdapat Jabal Rahmah, bukit batu tempat bertemunya Nabi Adam a.s. dan Siti Hawa di bumi. Hadir dan berwukuf di Arafah adalah rukun paling agung dalam ibadah haji ('Al-Hajju Arafah').",
    activities: [
      "Wukuf bersama sejak tergelincir matahari (Zuhur) 9 Zulhijah hingga Maghrib",
      "Mendengarkan khutbah wukuf",
      "Salat jamak taqdim qashar Zuhur dan Asar",
      "Berdzikir, berdoa, istighfar, dan membaca Al-Qur'an secara khusyuk"
    ],
    ritualCategory: "Rukun Haji",
    relatedStageId: "arafah",
    image: locationAssets.arafah,
    badgeColor: "#F4B942"
  },
  {
    id: "muzdalifah",
    order: 4,
    name: "Muzdalifah",
    arabicName: "مزدلفة (المشعر الحرام)",
    coordinates: { x: 4, y: 0.8, z: -1 },
    shortDesc: "Area hamparan terbuka antara Arafah dan Mina untuk Mabit dan mencari kerikil jumrah.",
    fullDesc: "Muzdalifah (disebut juga Al-Masy'aril Haram) adalah lokasi persinggahan setelah bertolak dari Arafah pada malam 10 Zulhijah. Mabit (bermalam sejenak) di Muzdalifah merupakan WAJIB HAJI. Di sini jemaah salat jamak takhir Maghrib-Isya dan mengumpulkan butiran kerikil untuk melontar jumrah.",
    activities: [
      "Salat jamak takhir Maghrib dan Isya dengan satu azan dan dua iqamah",
      "Mabit (berhenti/bermalam) minimal hingga melewati tengah malam 10 Zulhijah",
      "Mengambil 7 butir kerikil untuk Jumrah Aqabah atau 49-70 kerikil untuk seluruh hari tasyrik",
      "Berdoa di dekat Al-Masy'aril Haram setelah salat Subuh sebelum menuju Mina"
    ],
    ritualCategory: "Wajib Haji",
    image: locationAssets.muzdalifah,
    badgeColor: "#123B56"
  },
  {
    id: "mina",
    order: 5,
    name: "Lembah Mina",
    arabicName: "منى (مدينة الخيام)",
    coordinates: { x: 0, y: 0.8, z: 1 },
    shortDesc: "Kota perkemahan tenda putih tempat jemaah mabit pada malam-malam Hari Tasyrik.",
    fullDesc: "Mina adalah lembah padang pasir yang berjarak sekitar 5 km dari Makkah, kini dikenal sebagai 'Kota Sejuta Tenda'. Jemaah haji wajib menginap (mabit) di Mina pada malam 11, 12 (Nafar Awal), dan 13 Zulhijah (Nafar Tsani) untuk menunaikan lontar jumrah setiap harinya.",
    activities: [
      "Mabit di kemah Mina pada malam 11, 12, dan 13 Zulhijah (Wajib Haji)",
      "Melaksanakan salat lima waktu dengan cara qashar tanpa jamak di kemah masing-masing",
      "Mempersiapkan diri menuju kompleks Jamarat untuk melontar tiga jumrah",
      "Memperbanyak takbir hari tasyrik dan berinteraksi ukhuwah bersama jemaah sedunia"
    ],
    ritualCategory: "Wajib Haji",
    image: locationAssets.mina,
    badgeColor: "#0D9488"
  },
  {
    id: "jamarat",
    order: 6,
    name: "Kompleks Jamarat",
    arabicName: "الجمرات (العقبة والوسطى والصغرى)",
    coordinates: { x: -3, y: 0.8, z: 2 },
    shortDesc: "Tempat melempar batu kerikil ke tiga pilar jumrah (Ula, Wustha, dan Aqabah).",
    fullDesc: "Kompleks Jamarat adalah fasilitas jembatan bertingkat modern di Mina tempat jemaah melontar kerikil ke tiga tugu batu: Jumrah Ula (Sughra), Jumrah Wustha, dan Jumrah Aqabah (Kubra). Ritual ini adalah WAJIB HAJI sebagai simbol penolakan godaan iblis yang pernah menggoda Nabi Ibrahim a.s.",
    activities: [
      "Melontar Jumrah Aqabah sebanyak 7 kerikil pada tanggal 10 Zulhijah (Hari Raya)",
      "Melontar tiga jumrah (Ula 7x, Wustha 7x, Aqabah 7x) pada setiap Hari Tasyrik (11, 12, dan 13 Zulhijah)",
      "Melafalkan 'Bismillahi Allahu Akbar' pada setiap lontaran kerikil",
      "Menghindari saling dorong dan mematuhi jadwal lontar dari maktab/kloter"
    ],
    ritualCategory: "Wajib Haji",
    image: locationAssets.jamarat,
    badgeColor: "#DC2626"
  }
];
