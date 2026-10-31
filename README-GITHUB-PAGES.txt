PORTOFOLIO PPG - VERSI STATIS UNTUK GITHUB PAGES

CARA DEPLOY:
1. Ekstrak isi ZIP ini.
2. Buat repository GitHub baru (misalnya ppg-portfolio).
3. Upload seluruh ISI folder ini ke root repository. Pastikan index.html berada di root.
4. Buka Settings > Pages.
5. Pada Build and deployment pilih Deploy from a branch.
6. Pilih branch main dan folder /(root), lalu Save.
7. Tunggu proses deployment. Situs akan tersedia di https://USERNAME.github.io/NAMA-REPOSITORY/

CATATAN:
- Situs ini sudah berupa HTML, CSS, JavaScript dan file statis; tidak memerlukan PHP, Laravel, MySQL atau .env.
- Data mata kuliah, refleksi, inovasi, dan artefak yang dipublikasikan diambil dari dump SQL yang diberikan.
- Halaman admin dan fitur login tidak tersedia pada GitHub Pages karena GitHub Pages tidak menjalankan PHP/server database.
- Untuk memperbarui isi situs, edit HTML atau buat ulang dari data terbaru; unggah perubahan ke repository.
- Jangan mengunggah file .env, vendor Laravel, file log, session, atau dump SQL ke repository publik.
