// 1. Konfigurasi Firebase Baru (yayasan-24)
const firebaseConfig = {
  apiKey: "AIzaSyDeI1-EfKAUNqkH65U8SrUhlFh9Ua-mtbE",
  authDomain: "yayasan-24.firebaseapp.com",
  projectId: "yayasan-24",
  storageBucket: "yayasan-24.firebasestorage.app",
  messagingSenderId: "303378687484",
  appId: "1:303378687484:web:d9d30811f54541a5427e79",
  measurementId: "G-464FTF1RH2"
};

// 2. Import SDK Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 3. Inisialisasi
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Ganti dengan nomor WhatsApp yayasan Anda
const noWAYayasan = "6281234567890"; 

// --- FITUR SIMPAN & KIRIM DONASI ---
const formDonasi = document.getElementById('formDonasi');
if (formDonasi) {
    formDonasi.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        const data = {
            nama: document.getElementById('nama').value,
            nominal: Number(document.getElementById('nominal').value),
            pesan: document.getElementById('pesan').value,
            waktu: serverTimestamp()
        };

        try {
            btn.innerText = "Memproses...";
            btn.disabled = true;

            // Simpan ke Firestore (Koleksi: donasi)
            await addDoc(collection(db, "donasi"), data);
            
            // Format Pesan WhatsApp
            const pesanWA = `Halo Admin Yayasan,%0A%0ASaya *${data.nama}* konfirmasi donasi Rp${data.nominal.toLocaleString('id-ID')}.%0A*Pesan:* ${data.pesan || '-'}%0A%0AMohon info selanjutnya.`;
            window.open(`https://wa.me/${noWAYayasan}?text=${pesanWA}`, '_blank');
            
            e.target.reset();
        } catch (error) {
            console.error("Error:", error);
            alert("Gagal simpan! Pastikan Firestore sudah aktif di Console.");
        } finally {
            btn.innerText = "Kirim Konfirmasi Donasi";
            btn.disabled = false;
        }
    });
}

// --- FITUR SIMPAN & KIRIM KONSULTASI ---
const formKonsul = document.getElementById('formKonsultasi');
if (formKonsul) {
    formKonsul.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        const data = {
            nama: document.getElementById('namaKonsul').value,
            topik: document.getElementById('kategoriKonsul').value,
            cerita: document.getElementById('ceritaKonsul').value,
            waktu: serverTimestamp()
        };

        try {
            btn.innerText = "Menjadwalkan...";
            btn.disabled = true;

            // Simpan ke Firestore (Koleksi: konsultasi)
            await addDoc(collection(db, "konsultasi"), data);
            
            const pesanWA = `Halo Tim Yayasan,%0A%0ASaya *${data.nama}* ingin konsultasi: *${data.topik}*.%0A*Catatan:* ${data.cerita}`;
            window.open(`https://wa.me/${noWAYayasan}?text=${pesanWA}`, '_blank');
            
            e.target.reset();
        } catch (error) {
            alert("Error: " + error.message);
        } finally {
            btn.innerText = "Jadwalkan Konsultasi";
            btn.disabled = false;
        }
    });
}

// Fitur Tombol Produk
window.pesanProduk = function(produk) {
    const pesanWA = `Halo Admin,%0A%0ASaya tertarik memesan: *${produk}*.`;
    window.open(`https://wa.me/${noWAYayasan}?text=${pesanWA}`, '_blank');
};