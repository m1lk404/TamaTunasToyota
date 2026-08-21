# Technical Specification & Single Source of Truth (SSOT)
**Project:** Website Sales Toyota Tunas Kiaracondong Bandung  
**Sales:** Tama Tunas Toyota (`6287817305398`)  
**Dealer:** Tunas Toyota Kiaracondong  

## 1. Architecture Overview
Website dibangun dengan pendekatan client-side murni (HTML5, CSS responsif, ES Modules) berbasis Single Source of Truth untuk memudahkan pemeliharaan tanpa perubahan struktur kode UI secara berkala.

## 2. File Directory
- `data/site.config.js`: Mengatur konfigurasi profil sales, alamat Google Maps, carousel unit, asset, dan link sumber resmi.
- `data/pricelist.json`: Database lengkap OTR seluruh tipe mobil Toyota 2026 dengan kolom `col1`/`col2` dan metadata fitur Zenix.
- `data/official-specifications.json`: Spesifikasi teknis resmi Toyota Astra Motor yang diverifikasi dari halaman produk; tidak berisi harga atau promo.
- `index.html`: UI showroom responsif dengan carousel unit, pricelist, navigasi same-tab, link WhatsApp, dan link Google Maps.
- `spec.html`, `spec.js`, `spec.css`: Halaman spesifikasi internal tanpa gambar; data teknis dirender dari dataset terverifikasi lokal.
- `about.html`, `about.css`: Halaman About Us, hak cipta, disclaimer, dan prosedur koreksi informasi yang dibuka dari footer.
- `COPYRIGHT.md`: Catatan hak cipta, lisensi internal yang disarankan, disclaimer komersial, atribusi, dan prosedur koreksi miskomunikasi.
- `assets/`: Asset lokal kendaraan yang dipakai carousel. Hotspot sudah dinonaktifkan dan tidak menjadi dependency UI.

## 3. Data Schema & Coordinates
- **Gril Radar/TSS:** `{ top: "52%", left: "72%" }`
- **Velg Roda Depan:** `{ top: "72%", left: "64%" }`
- **Spion BSM:** `{ top: "40%", left: "40%" }`
- **Panoramic Sunroof:** `{ top: "25%", left: "45%" }`

Koordinat hotspot ditentukan per asset hero dan disimpan langsung pada object unit di `data/site.config.js`, sehingga perpindahan slide tidak memakai titik sentuh dari gambar lain.

## 5. Interactive Asset Gallery
Carousel utama kini memakai hero asset lokal dari 11 folder upload: Calya, Avanza, Veloz Hybrid EV, Innova, Zenix Gasoline, Zenix Hybrid EV, Voxy, Alphard XE, Alphard XE Hybrid EV, Alphard Hybrid EV, dan Vellfire Hybrid EV.

Carousel mendukung tombol panah, dot navigation, keyboard Arrow Left/Right, dan swipe pada perangkat touch. Setiap perpindahan memperbarui gambar, judul model singkat, tag, harga OTR termurah dari `data/pricelist.json`, dan CTA WhatsApp ke tipe tertinggi.

## 6. Official Specifications Source
Spesifikasi teknis yang berhasil diverifikasi disimpan di `data/official-specifications.json` dari halaman resmi:
- `product/kijang-innova-zenix-hybrid-ev#specs`
- `product/veloz-hybrid-ev#specs`
- `product/calya#specs`

Endpoint listing lama `/product/` saat verifikasi mengembalikan halaman 404. Agya juga tidak tersedia sebagai halaman produk aktif pada menu Models saat pengambilan data, sehingga dicatat sebagai unavailable dan tidak diisi dengan data perkiraan.

Crawler katalog juga menemukan 11 halaman unit aktif dan menyimpannya pada field `officialCatalogPages`. Semua URL tersebut menjadi sumber resmi untuk penambahan spesifikasi ketika asset baru ditambahkan; harga tidak disalin ke database spesifikasi.

## 7. Content & Launch Notes
- Halaman utama memakai asset lokal yang disediakan project dan visual original; tidak menyalin kode, layout identik, logo, atau asset proprietary dari situs Toyota Astra Motor.
- Harga hanya bersumber dari `data/pricelist.json`, bukan dari situs resmi Toyota Astra Motor. Jika suatu unit belum memiliki entry di pricelist, UI menampilkan `Hubungi untuk OTR`.
- UI menampilkan catatan diplomatis bahwa data dapat berubah selama maintenance dan pengguna diarahkan untuk konfirmasi melalui WhatsApp.
- Footer menyediakan link ke halaman `about.html` yang menjelaskan identitas sales/dealer, batasan informasi komersial, dan link ke `COPYRIGHT.md`.
- Sebelum launch, host wajib menyediakan HTTPS dan response headers `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, serta `Referrer-Policy`.

## 4. Dealer Location Data
- **Alamat:** Jl. Ibrahim Adjie No.47, Kb. Kangkung, Kec. Kiaracondong, Kota Bandung, Jawa Barat 40272
- **Maps Link:** `https://maps.google.com/?cid=8670978462842920528`

## 8. Copyright & Content Rights
- Status hak cipta asset: **belum dianggap cleared secara legal**. Nama folder dan metadata asset mengindikasikan asset terkait halaman produk Toyota; sebelum publikasi komersial, pastikan ada izin penggunaan, lisensi, atau mandat tertulis dari pemilik asset.
- Asset lokal hanya boleh dipakai untuk konteks unit yang sesuai. Jangan menambah logo, foto, copywriting, layout, atau kode proprietary dari Toyota/Tunas tanpa hak penggunaan yang sah.
- Data teknis di `data/official-specifications.json` menyimpan sumber URL resmi dan tanggal capture. Cantumkan atribusi/sumber sesuai izin; jangan mengklaim website ini sebagai situs resmi Toyota Astra Motor.
- Harga dan promo adalah data sales/dealer di `data/pricelist.json`, bukan salinan harga dari situs Toyota. Verifikasi ulang sebelum publikasi.

## 9. Security Readiness Audit
**Status audit repo: PASS WITH DEPLOYMENT CONDITIONS** (2026-08-21).

- Tidak ditemukan `eval`, `new Function`, `document.write`, `localStorage`, atau inline event handler pada permukaan aplikasi.
- Nilai dinamis yang masuk ke template HTML dirancang melewati `escapeHTML`; jangan menghapus escaping saat menambah field baru.
- CSP meta tersedia pada `index.html` dan `spec.html`: script/style/font dibatasi, koneksi fetch dibatasi ke origin sendiri, dan `frame-ancestors` ditolak.
- Link tab baru memakai `rel="noopener noreferrer"`; hanya WhatsApp dan Google Maps yang boleh membuka tab baru. Navigasi internal memakai tab yang sama.
- Host production wajib mengirim header HTTP `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, dan HTTPS. Meta CSP adalah fallback, bukan pengganti header server.
- Audit ini bukan penetration test. Uji dependency, server, DNS, TLS, rate limit, dan analytics pihak ketiga tetap menjadi tanggung jawab environment production.

## 10. Efficiency & Integrity Audit
**Status: PASS untuk static deploy; OPTIMIZATION RECOMMENDED**.

- Gate terakhir: `node --check app.js`, `node --check spec.js`, parse JSON, import `site.config.js`, dan pemeriksaan path asset berhasil.
- Semua 11 asset carousel yang direferensikan konfigurasi tersedia.
- Dataset pricelist dan spesifikasi memiliki isi yang dapat dirender; halaman fallback tersedia saat fetch gagal.
- Footprint asset saat audit sekitar 33 MB dan 582 file. Untuk produksi dengan trafik besar, lakukan kompresi/resizing gambar, lazy-loading asset nonaktif, dan cache immutable berdasarkan hash.
- Tidak ada build step, dependency runtime, atau backend. Deployment dapat memakai static hosting, tetapi server harus mendukung ES Modules dan MIME type JavaScript yang benar.
- Belum ada automated browser test di repository. Sebelum release, uji desktop/mobile: ticker, carousel, scroll pricelist, link WhatsApp, link Google Maps, halaman `spec.html`, dan fallback fetch.

## 11. Spec-Driven Maintenance Workflow
1. Tulis perubahan yang diinginkan di file ini sebelum mengubah UI/data.
2. Tentukan SSOT yang berwenang: profil/link/carousel di `data/site.config.js`, harga di `data/pricelist.json`, spesifikasi di `data/official-specifications.json`.
3. Ubah implementasi sekecil mungkin dan pertahankan kontrak URL, ID DOM, CSP, serta escaping.
4. Jalankan release gate:
	- `node --check app.js && node --check spec.js`
	- parse `data/pricelist.json` dan `data/official-specifications.json`
	- verifikasi semua path asset yang direferensikan
	- `get_errors` untuk HTML, CSS, dan JavaScript
	- uji keyboard, touch, desktop, dan mobile di browser
5. Perbarui bagian ini jika struktur, sumber data, asset, hak penggunaan, atau kebijakan keamanan berubah.
6. Jangan menyatakan release aman jika status hak cipta asset belum diverifikasi oleh pemilik/penanggung jawab proyek.

## 12. Commercial Copyright Deliverables
- Dokumen operasional hak cipta berada di `COPYRIGHT.md` dan menggunakan status **All Rights Reserved / Proprietary** sebagai default untuk kode, desain, dan copywriting original.
- Dokumen membedakan karya original website dari asset, merek, logo, foto, dan data pihak ketiga. Asset pihak ketiga tidak boleh dipublikasikan komersial tanpa izin, lisensi, atau mandat tertulis.
- Link About Us di footer wajib mengarah ke `about.html`, yang mempertahankan disclaimer harga, promo, spesifikasi, ketersediaan, dan syarat pembelian agar tidak terjadi miskomunikasi informasi.
- Setiap laporan hak, koreksi, atau permintaan penghapusan harus dicatat bersama URL/file, waktu, bukti, keputusan, dan hasil verifikasi.
- `COPYRIGHT.md` adalah dokumen operasional, bukan nasihat hukum. Tinjauan penasihat hukum tetap diperlukan untuk kampanye komersial, penggunaan merek, lisensi foto, privasi, dan perlindungan konsumen.
