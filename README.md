```markdown
# Portfolio Website - Anafiki Hidayatul Maula

Website resume/portofolio sederhana, modern, responsif dan animasi ringan dibuat dengan HTML, CSS, dan JavaScript.

Fitur utama:
- Desain gelap (hitam) dengan aksen pink
- Hero section dengan foto dan CTA
- About, Skills (skill bar), Portfolio (filter + lightbox), Services, Timeline, Testimonials
- Contact form dengan validasi dan contoh AJAX (ganti endpoint)
- Animasi reveal saat scroll (IntersectionObserver)
- Mobile responsive dan aksesibilitas dasar

Struktur berkas:
- index.html — Halaman utama
- styles.css — Semua style
- app.js — Interaksi (reveal, lightbox, filter, form)
- assets/ — Tempat menaruh foto, thumbnail, video, dan CV
  - assets/profile.jpg (ganti dengan foto profil)
  - assets/Anafiki_CV.pdf (ganti dengan CV)
  - assets/portfolio/* (gambar/video project dan thumbnail)

Cara pakai / deploy:
1. Clone atau unduh file ini.
2. Isi folder `assets/` dengan file media dan CVmu.
3. Edit `index.html` untuk mengganti teks, email, dan link sosial.
4. Jika ingin form bekerja, ganti `endpoint` di `app.js` (variabel endpoint) dengan URL API atau service form (contoh: Formspree, Netlify Functions, Zapier, dsb).
5. Upload ke hosting statis (Netlify, Vercel, GitHub Pages, dll.)

Contoh pengaturan form:
- Formspree: https://formspree.io/ — ganti endpoint ke https://formspree.io/f/your-id
- Netlify Forms: gunakan attribute data-netlify form pada form dan deploy ke Netlify

Tips estetika:
- Ganti foto profil dengan foto resolusi baik (min 800px).
- Gunakan thumbnail jpg kecil untuk grid dan file besar/ori untuk lightbox.
- Sesuaikan warna aksen di `styles.css` bila ingin nuansa pink lain.

Lisensi:
- Bebas digunakan dan dimodifikasi. Beri atribusi jika ingin dipublikasikan di portfolio lain.

Semoga membantu! Jika mau, saya bisa:
- Menambahkan animasi tambahan dengan GSAP,
- Membuat versi React/Vue,
- Menyiapkan template deploy otomatis ke Netlify/Vercel,
- Membuat versi multi-halaman untuk detail proyek.
```