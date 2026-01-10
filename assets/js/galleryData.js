/* =======================================================
 * DATA GALERI PASSION
 * ======================================================= */

const galleryData = {
  "2025": [
    // Format: { file: "NamaFileGambar", title: "Judul Yang Muncul" }
    { file: "G25-1", title: "KUIS MENARIK" },
    { file: "G25-2", title: "PERLOMBAAN 1" },
    { file: "G25-3", title: "PENGUMUMAN" },
    { file: "G25-4", title: "PERLOMBAAN 2" },
    { file: "G25-5", title: "REGISTRASI PESERTA" },
    { file: "G25-6", title: "FOTO BERSAMA" },
  ],
  "2024": [
    { file: "G24-1", title: "PENJURIAN" },
    { file: "G24-2", title: "PERLOMBAAN" },
    { file: "G24-3", title: "PENONTON" },
    { file: "G24-4", title: "PENGUMUMAN" },
    { file: "G24-5", title: "PESERTA" },
    { file: "G24-6", title: "STAND" },
  ],
  "2023": [
    { file: "G23-1", title: "TECHNICAL MEETING 1" },
    { file: "G23-2", title: "TECHNICAL MEETING 2" },
    { file: "G23-3", title: "UPACARA 1" },
    { file: "G23-4", title: "UPACARA 2" },
    { file: "G23-5", title: "PENGUMUMAN" },
    { file: "G23-6", title: "JUARA UMUM" },
  ]
};

/* =======================================================
 * GALLERY GENERATOR ENGINE
 * ======================================================= */
function render(year, containerId) {
  const container = document.getElementById(containerId);
    
    if(!container) return;
    let HTMLContent = "";
    
  galleryData[year].forEach(item => {
    HTMLContent += `
      <div class="col-lg-4 col-md-6 gallery-item" data-aos="fade-up">
        <div class="gallery-wrap">
          <img src="assets/img/gallery/thumb/${item.file}.webp" class="img-fluid" loading="lazy" width="540" height="360" alt="${item.title}">
          <div class="gallery-links">
            <a href="assets/img/gallery/${item.file}.jpg" class="gallery-lightbox">${item.title}</a>
          </div>
        </div>
      </div>
    `;
  });
    
  container.innerHTML = HTMLContent;
}

// Jalankan Fungsi Render Otomatis
render("2025", "galleryContainer-25");
render("2024", "galleryContainer-24");
render("2023", "galleryContainer-23");
