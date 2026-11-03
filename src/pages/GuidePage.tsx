import React from 'react';
import { 
  BookOpen, Sparkles, Camera, MapPin, Award, 
  ShieldCheck, HelpCircle, ArrowRight, CheckCircle2,
  GraduationCap, Building2, UserCheck, HeartHandshake
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const GuidePage: React.FC = () => {
  const guideSteps = [
    {
      num: 1,
      title: "Cara Membuka & Mempelajari Materi Haji",
      icon: BookOpen,
      color: "from-sky-500 to-hajj-primary",
      steps: [
        "Pilih menu 'Materi Haji' di navbar atas atau bottom navigation ponsel.",
        "Pilih salah satu dari 6 kartu rukun haji (misal: Niat & Ihram, Wukuf, atau Thawaf).",
        "Baca pengertian syariat, dasar hukum dalil, tata cara berurutan, dan poin penting.",
        "Dengarkan lantunan audio doa/talbiyah dan refleksikan maknanya dalam kehidupan sehari-hari.",
        "Gunakan tombol 'Lihat Visualisasi AR' untuk melihat model 3D rukun tersebut di Ruang AR."
      ]
    },
    {
      num: 2,
      title: "Cara Mengakses Pengalaman 3D & WebAR",
      icon: Sparkles,
      color: "from-amber-400 to-hajj-gold",
      steps: [
        "Buka menu 'Ruang AR' dari beranda atau halaman materi.",
        "Gunakan pemilih rukun untuk mempelajari rukun 1 s.d 6 beserta objek 3D pendukungnya.",
        "Gunakan jari atau mouse untuk memutar (orbit), menggeser, dan memperbesar model 3D di viewer Assemblr.",
        "Tekan tombol 'Buka WebAR Assemblr' untuk meluncurkan mode WebAR resmi di ponselmu tanpa perlu mengunduh aplikasi tambahan."
      ]
    },
    {
      num: 3,
      title: "Cara Menggunakan WebAR Assemblr (Scan Marker)",
      icon: Camera,
      color: "from-emerald-500 to-teal-700",
      steps: [
        "Buka tautan proyek Assemblr melalui tombol 'Mulai Pengalaman WebAR Assemblr' di Ruang AR.",
        "Pada halaman Assemblr WebAR, pilih mode 'Scan Marker' (atau 'View in 3D' jika ingin melihat tanpa marker).",
        "Izinkan akses kamera saat peramban smartphone memintanya.",
        "Arahkan kamera ponsel ke gambar QR marker Assemblr pada kertas cetak atau layar perangkat lain.",
        "Tunggu hingga objek 3D muncul melayang di atas marker. Kamu juga dapat menggunakan fitur Pemindai QR Layar Penuh di website untuk memindai tautan proyek."
      ]
    },
    {
      num: 4,
      title: "Cara Menjelajahi Peta Perjalanan Haji 3D",
      icon: MapPin,
      color: "from-blue-600 to-indigo-800",
      steps: [
        "Buka menu 'Peta Perjalanan' untuk melihat visualisasi isometrik padang pasir Mekkah.",
        "Geser layar untuk memutar sudut pandang 3D dan gunakan tombol zoom (+ / -) untuk memperbesar.",
        "Ketuk nomor pin lokasi (1 s.d 6) untuk membuka lembar informasi lokasi dan panduan amalan.",
        "Gunakan tombol 'Mode 2D' jika ingin melihat diagram alur ringkas perjalanan."
      ]
    },
    {
      num: 5,
      title: "Cara Mengerjakan Kuis & Memeriksa Hasil",
      icon: Award,
      color: "from-rose-500 to-pink-700",
      steps: [
        "Pilih menu 'Kuis' lalu tentukan kategori soal atau pilih 'Semua Soal'.",
        "Baca soal dengan teliti dan pilih salah satu dari 4 opsi jawaban (A, B, C, D).",
        "Setelah memilih, sistem akan langsung menampilkan apakah jawabanmu benar atau salah beserta kotak 'Penjelasan Jawaban'.",
        "Lanjutkan hingga soal ke-10 untuk melihat perolehan skor akhir (0-100), predikat kelulusan, dan riwayat skor yang tersimpan."
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 pb-24">
      
      {/* Header */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hajj-light text-hajj-primary text-xs font-bold border border-hajj-border">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Bantuan & Petunjuk Penggunaan</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-hajj-navy tracking-tight">
          Panduan Penggunaan Hajj Explorer
        </h1>
        <p className="text-xs sm:text-base text-slate-600 max-w-2xl">
          Ikuti panduan langkah demi langkah di bawah ini untuk memaksimalkan seluruh fitur edukasi yang ada di platform Hajj Explorer.
        </p>
      </div>

      {/* Privacy Guarantee Alert Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-hajj-border shadow-soft flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-1 text-xs sm:text-sm text-slate-700">
          <p className="font-bold text-hajj-navy text-sm">
            Jaminan Privasi & Izin Kamera
          </p>
          <p className="leading-relaxed text-slate-600">
            Kamera perangkat <strong>hanya aktif</strong> setelah kamu secara eksplisit menekan tombol <em>"Aktifkan Kamera"</em>. Aliran video kamera diproses secara lokal di browsermu dan langsung dihentikan ketika kamu menutup pemindai atau berpindah halaman. Tidak ada gambar atau rekaman yang diunggah ke server manapun.
          </p>
        </div>
      </div>

      {/* 5 Guide Steps Cards */}
      <div className="space-y-6">
        {guideSteps.map((guide) => {
          const Icon = guide.icon;
          return (
            <div
              key={guide.num}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-hajj-border shadow-soft space-y-4 hover:shadow-card transition-shadow"
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${guide.color} text-white flex items-center justify-center font-bold text-base shadow-md shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-hajj-primary">
                    Petunjuk Bagian 0{guide.num}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-hajj-navy leading-snug">
                    {guide.title}
                  </h3>
                </div>
              </div>

              <div className="pl-0 sm:pl-14 space-y-2.5">
                {guide.steps.map((step, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Section: Tentang Website & Profil Pengembang */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-hajj-border shadow-soft space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-hajj-primary to-hajj-navy text-white flex items-center justify-center shadow-md shrink-0">
            <GraduationCap className="w-6 h-6 text-hajj-gold" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200">
              <Sparkles className="w-3 h-3 text-hajj-gold" />
              <span>Tentang & Data Pengembang</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-hajj-navy tracking-tight mt-0.5">
              Tentang Website & Pengembang Media
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Kartu Profil Pengembang */}
          <div className="md:col-span-5 p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-hajj-light/50 border border-hajj-border flex flex-col items-center text-center space-y-3 shadow-inner">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-hajj-primary via-hajj-secondary to-hajj-navy text-white flex items-center justify-center shadow-lg border-2 border-white ring-4 ring-amber-100 shrink-0">
              <span className="font-black text-2xl tracking-wider text-hajj-gold">ZK</span>
            </div>

            <div className="space-y-0.5">
              <h3 className="text-base font-extrabold text-hajj-navy">
                Kun Zakia Khoirotun Nisa
              </h3>
              <p className="text-xs font-bold text-hajj-primary font-mono">
                NIM: 243111076
              </p>
            </div>

            <div className="w-full pt-3 border-t border-slate-200/80 space-y-2 text-xs text-slate-700 text-left">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-hajj-primary shrink-0" />
                <span className="font-medium">Pendidikan Agama Islam</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-hajj-primary shrink-0" />
                <span className="font-medium">Fakultas Ilmu Tarbiyah</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-hajj-gold shrink-0" />
                <span className="font-bold text-hajj-navy">UIN Raden Mas Said Surakarta</span>
              </div>
            </div>
          </div>

          {/* Deskripsi & Konteks Pembuatan Media Pembelajaran */}
          <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-hajj-primary">
                Inovasi Media Pembelajaran PAI
              </span>
              <h3 className="text-sm sm:text-base font-bold text-hajj-navy">
                Hajj Explorer: Pembelajaran Manasik Haji WebAR & 3D
              </h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Website <strong>Hajj Explorer</strong> dirancang dan dikembangkan sebagai media inovasi pembelajaran digital pada mata pelajaran <em>Pendidikan Agama Islam (PAI)</em>, khususnya materi rukun dan manasik ibadah haji.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Dengan mengintegrasikan teknologi <strong>Web Augmented Reality (WebAR)</strong> berbasis marker Assemblr dan visualisasi peta 3D interaktif, media ini bertujuan menghadirkan pengalaman belajar yang imersif, kontekstual, serta memudahkan peserta didik memahami urutan rukun haji secara konkret.
            </p>

            <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/60 text-xs text-amber-950 flex items-start gap-2.5">
              <HeartHandshake className="w-4 h-4 text-hajj-gold shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Dikembangkan di lingkungan akademik <strong>Fakultas Ilmu Tarbiyah, UIN Raden Mas Said Surakarta</strong> untuk mendukung pembelajaran PAI berbasis teknologi modern.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Action Button */}
      <div className="pt-4 flex justify-center">
        <Link
          to="/"
          className="py-3 px-8 rounded-xl bg-hajj-primary hover:bg-hajj-navy text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          <span>Mulai Menjelajahi Beranda</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};
