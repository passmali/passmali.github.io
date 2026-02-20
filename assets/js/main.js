(function() {
  "use strict"

  // Helper untuk memilih elemen
  const select = (el, all = false) => {
    el = el.trim()
    if (all) return [...document.querySelectorAll(el)]
    return document.querySelector(el)
  }

  // Preloader
  let loading = document.getElementById('loader');
  if (loading) {
    window.addEventListener('load', () => {
      loading.style.opacity = '0';
      setTimeout(() => { loading.style.display = 'none'; }, 500);
    });
  }

  // Inisialisasi AOS Animation
  window.addEventListener('load', () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      })
    }
  })

  // Efek Scroll untuk Hero Image dan Back to Top
  const heroEl = select('#hero')
  const backToTop = select('.back-to-top')

  const handleScroll = () => {
    const scrollY = window.scrollY
    const isTabletOrDesktop = window.matchMedia('(min-width: 540px)').matches

    // Parallax Hero
    if (heroEl) {
      if (isTabletOrDesktop) {
        heroEl.style.backgroundPositionY = `${scrollY * -0.4}px`
      } else {
        heroEl.style.backgroundPositionY = 'center'
      }
    }

    // Tampilkan tombol kembali ke atas
    if (backToTop) {
      if (scrollY > 300) backToTop.classList.add('active')
      else backToTop.classList.remove('active')
    }
  }

  // Optimasi scroll listener dengan RequestAnimationFrame
  let ticking = false
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll()
        ticking = false
      })
      ticking = true
    }
  }, { passive: true })

  window.addEventListener('load', handleScroll)

  // Inisialisasi GLightbox untuk Galeri
  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.glightbox' })
  }

  // Sistem Dark Mode Otomatis mengikuti OS
  const applySystemTheme = () => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (isDarkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }

  applySystemTheme()
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applySystemTheme)

})()