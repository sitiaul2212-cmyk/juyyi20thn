FOLDER INI UNTUK FILE-FILE MEDIA KAMU
========================================

1) MUSIK
   Taruh file musik dengan nama: music.mp3
   (letakkan langsung di dalam folder assets/, sejajar dengan README ini)

   Kalau mau pakai cover album untuk mini player, taruh juga:
   assets/photos/cover.jpg

2) FOTO GALERI ("Some Of Our Best Times")
   Taruh 6 foto di folder assets/photos/ dengan nama:
     photo-1.jpg
     photo-2.jpg
     photo-3.jpg
     photo-4.jpg
     photo-5.jpg
     photo-6.jpg

   Captionnya ("You" "Are" "My" "Today" "And" "All") bisa diubah di script.js,
   cari bagian GALLERY di paling atas file.

3) VIDEO RAHASIA ("A Secret Just For You")
   Taruh file video dengan nama: secret.mp4
   di dalam folder: assets/video/
   Video ini akan muncul dalam modal setelah tombol "Make A Wish" ditekan.
   Bingkai videonya sudah didesain seperti gaya film analog/VHS.

3b) LINK GOOGLE FORM (muncul setelah video selesai ditonton)
   Buka index.html, cari tombol dengan id="gform-link":
     <a id="gform-link" class="gform-btn hidden" href="https://forms.gle/GANTI_DENGAN_LINK_FORM_KAMU" ...>
   Ganti bagian href="..." dengan link Google Form kamu.
   Tombol ini SENGAJA disembunyikan di awal (class "hidden") dan baru
   muncul otomatis setelah video di dalam modal selesai diputar sampai akhir
   (logikanya ada di script.js, event "ended" pada video).
   Teks tombolnya ("One more thing for you ✨") juga bisa diganti langsung di index.html.

4) TANGGAL LAHIR (untuk hitung umur otomatis)
   Buka script.js, cari baris:
     const BIRTH_DATE = new Date(2006, 0, 1, 0, 0, 0);
   Ganti angka-angkanya: (Tahun, Bulan-1, Tanggal, Jam, Menit)
   PENTING: Bulan dihitung dari 0 → Januari = 0, Februari = 1, ..., Desember = 11

5) TEKS LAINNYA
   - "Things I Love About You" → edit array LOVE_REASONS di script.js
     (tiap item punya "title" dan "desc")
   - "A Year Of Great Moments" → edit array SEASONS di script.js
   - Warna confetti → edit array CONFETTI_COLORS di script.js
   - Nama "Salsa", "Zee", signature "James", dan pesan penutup
     → edit langsung di index.html (cari teksnya, lalu ganti)

6) WARNA TEMA
   Tema sekarang biru soft/menenangkan. Untuk mengubah palet warna,
   buka style.css, edit nilai di bagian ":root{ ... }" paling atas file.
