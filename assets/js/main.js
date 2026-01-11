(function() {
  "use strict";

  /*
     HELPER FUNCTIONS
  */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) return [...document.querySelectorAll(el)];
    return document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) selectEl.forEach(e => e.addEventListener(type, listener));
      else selectEl.addEventListener(type, listener);
    }
  };

  /*
     PRELOADER
  */
  let loading = document.getElementById('loader');
  if (loading) {
    window.addEventListener('load', () => {
      loading.style.opacity = '0';
      setTimeout(() => { loading.style.display = 'none'; }, 500);
    });
  }

  /* 
     AOS (Animate On Scroll)
   */
  window.addEventListener('load', () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
      });
    }
  });

  /*
     SCROLL EFFECTS 
  */
  const heroEl = select('#hero');
  const backToTop = select('.back-to-top');
  const headEl = select('.head');
  let Desktop = window.matchMedia('(min-width: 1199px)').matches;
  let Tablet = window.matchMedia('(min-width: 540px)').matches;

  window.addEventListener('resize', () => {
    Desktop = window.matchMedia('(min-width: 1199px)').matches;
    Tablet = window.matchMedia('(min-width: 540px)').matches;
  });

  const handleScroll = () => {
    let scrollY = window.scrollY;

    // Hero Parallax Effect
    if (heroEl) {
      if (Tablet) {
        heroEl.style.backgroundPositionY = `${scrollY * -0.4}px`;
      } else {
        heroEl.style.backgroundPositionY = 'center';
      }
    }

    // Header Background Logic
    if (headEl) {
      if (Desktop) {
        headEl.classList.add('head-bg');
      } else {
        if (scrollY > 50) headEl.classList.add('head-bg');
        else headEl.classList.remove('head-bg');
      }
    }

    // Back to Top Button
    if (backToTop) {
      if (scrollY > 300) backToTop.classList.add('active');
      else backToTop.classList.remove('active');
    }
  };

  let tick = false;
  const onScroll = () => {
    if (!tick) {
      window.requestAnimationFrame(() => {
        handleScroll();
        tick = false;
      });
      tick = true;
    }
  };
 
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', handleScroll);

  /*
     ACTIVE MENU
  */
  const navLinks = select('#navbar .scrollto', true);
  
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = select(`#navbar .scrollto[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, {
    root: null,
    threshold: 0.3 
  });

  navLinks.forEach(link => {
    if (link.hash && select(link.hash)) {
      observer.observe(select(link.hash));
    }
  });

  /*
     5. SPONSOR / PARTNER SLIDER
  */
  const supportSliderEl = document.querySelector('.support-slider');
  if (supportSliderEl && typeof Swiper !== 'undefined') {
    new Swiper(supportSliderEl, {
      speed: 1000,
      loop: true,
      observer: true, 
      observeParents: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      slidesPerView: 'auto',
      spaceBetween: 20,
      breakpoints: {
        768: { spaceBetween: 40 },
        992: { spaceBetween: 50 }
      }
    });
  }

  /*
     6. ScrollTo, Theme, Mobile Nav
  */
  // Smooth Scroll on Click
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop;
    window.scrollTo({ top: elementPos, behavior: 'smooth' });
  };

  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault();
      let body = select('body');
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active');
        let navbarToggle = select('.mobile-nav');
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }
      scrollto(this.hash);
    }
  }, true);

  // Scroll Restoration
  const isHomePage = document.querySelector('.btn-start');
  if (isHomePage) {
    window.addEventListener('beforeunload', () => sessionStorage.setItem('homeScrollPos', window.scrollY));
    window.addEventListener('load', () => {
      const savedPosition = sessionStorage.getItem('homeScrollPos');
      if (savedPosition > 0) {
        if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
        setTimeout(() => window.scrollTo(0, savedPosition), 300);
      }
    });
  }

  // Dark Mode
  const themeSwitcher = select('.theme-switcher');
  const themeButton = select('.theme-button');
  const themeOptions = select('.theme-option', true);
  const body = select('body');

  const updateUI = (theme) => {
    const appliedTheme = theme === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme;
    body.classList.toggle('dark-mode', appliedTheme === 'dark');
    themeButton.innerHTML = `<i class="bi ${appliedTheme === 'dark' ? 'bi-moon-fill' : 'bi-sun-fill'}"></i>`;
    themeOptions.forEach(opt => opt.classList.toggle('active', opt.getAttribute('data-theme') === theme));
  };

  const setTheme = (theme) => {
    if (theme === 'system') localStorage.removeItem('theme');
    else localStorage.setItem('theme', theme);
    updateUI(theme);
  };

  on('click', '.theme-button', (e) => { e.stopPropagation(); themeSwitcher.classList.toggle('active'); });
  themeOptions.forEach(opt => on('click', `[data-theme="${opt.getAttribute('data-theme')}"]`, () => setTheme(opt.getAttribute('data-theme'))));
  document.addEventListener('click', (e) => { if (!themeSwitcher.contains(e.target)) themeSwitcher.classList.remove('active'); });
  
  // Set Initial Theme
  setTheme(localStorage.getItem('theme') || 'system');

  // Mobile Nav Toggle
  on('click', '.mobile-nav', function(e) {
    select('body').classList.toggle('mobile-nav-active');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  // Status Badges
  document.querySelectorAll('.status').forEach(badge => {
    const text = badge.innerText.toLowerCase().trim();
    badge.classList.add(text === 'dibuka' ? 'hijau' : (text === 'ditutup' ? 'merah' : 'abu'));
  });

  // Init Plugins
  if (select('.purecounter') && typeof PureCounter !== 'undefined') new PureCounter();
  if (typeof GLightbox !== 'undefined') GLightbox({ selector: '.gallery-lightbox' });

})()