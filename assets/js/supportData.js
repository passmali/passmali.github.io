/* =======================================================
 * DATA SPONSORSHIP / SUPPORT
 * ======================================================= */

const supportData = [
  // Format: { file: "NamaFile.png", name: "Nama Brand/Instansi" }
  { file: "1.png", name: "Bank Kalsel" },
  { file: "2.png", name: "Teh Botol Sosro" },
  { file: "3.png", name: "Emina Cosmetics" },
  { file: "4.png", name: "Honda Trio Motor" },
  { file: "5.png", name: "Maxim" },
  { file: "1.png", name: "Bank Kalsel" },
  { file: "2.png", name: "Teh Botol Sosro" },
  { file: "3.png", name: "Emina Cosmetics" },
  { file: "4.png", name: "Honda Trio Motor" },
  { file: "5.png", name: "Maxim" },
];

/* =======================================================
 * SPONSOR GENERATOR ENGINE
 * ======================================================= */
(function() {
  const supportWrapper = document.querySelector('.support-slider .swiper-wrapper');

  if (supportWrapper) {
    let HTMLContent = "";

    supportData.forEach(item => {
     
      HTMLContent += `
        <div class="swiper-slide">
          <img src="assets/img/support/${item.file}" 
               decoding="async" class="img-fluid" width="200" height="200"
               alt="Didukung oleh ${item.name}" 
               loading="lazy" oncontextmenu="return false;" ondragstart="return false;">
        </div>
      `;
    });
    supportWrapper.innerHTML = HTMLContent;
  }
})();