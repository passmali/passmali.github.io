 
(function() {
  "use strict";

    /**
   * Loader Web
   */
  var loading = document.getElementById('loader');
  document.addEventListener('DOMContentLoaded', function() {
    loading.style.opacity = '0';});
  
  loading.addEventListener('transitionend', function() {
        loading.style.display = 'none';
    });

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }
  
  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }
  
  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out-cubic',
      once: true,
      mirror: false
    })
  });
  
    /**
   * Scroll Event
   */
  const heroImage = select('#hero');
  const backToTop = select('.back-to-top');
  const headEl = select('.head');
  const navLinks = select('#navbar .scrollto', true);
  let Dekstop = window.matchMedia('(min-width: 1199px)').matches;
  let Tablet = window.matchMedia('(min-width: 540px)').matches; 

  window.addEventListener('resize', () => {
    Dekstop = window.matchMedia('(min-width: 1199px)').matches;
    Tablet = window.matchMedia('(min-width: 540px)').matches;
  });
  
  const AlwaysScroll= () => {
    let scrollY = window.scrollY;

    // 1. Hero Parallax
    if (heroImage) {
     if (Tablet) {
        heroImage.style.backgroundPositionY = -scrollY * 0.5 + 'px';
  } else {
      heroImage.style.backgroundPositionY = 'center';
    }
  }
    // 2. Top Header Background
    if (headEl) {
      if (Dekstop) {
        headEl.classList.add('head-bg');
      } else {
        if (scrollY > 50) {
          headEl.classList.add('head-bg');
        } else {
          headEl.classList.remove('head-bg');
        }
      }
    };
    // 3. Back to Top
    if (backToTop) {
      if (scrollY > 300) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    };
    // 4. Navlink Active
    let position = scrollY + 200;
    navLinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };

  let ticker = false;
  const onScroll = () => {
    if (!ticker) {
      window.requestAnimationFrame(() => {
        AlwaysScroll();
        ticker = false;
      });
      ticker = true;
    }
  };
  
  window.addEventListener('load', AlwaysScroll);
  window.addEventListener('scroll', onScroll, { passive: true });
  
  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }
  
   /**
   * Scroll with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });
  
    /**
   * Scroll Restoration
   */
 const isHomePage = document.querySelector('.btn-start'); 

  if (isHomePage) {
    window.addEventListener('beforeunload', function() {
      sessionStorage.setItem('homeScrollPos', window.scrollY);
    });

    window.addEventListener('load', function() {
      const savedPosition = sessionStorage.getItem('homeScrollPos');
      
      if (savedPosition && savedPosition > 0) {
        
        if ('scrollRestoration' in history) {
          history.scrollRestoration = 'manual';
        }

        setTimeout(function() {
          window.scrollTo(0, savedPosition);
        }, 300); 
      }
    });
  }

  /**
   * Light/Dark Mode
   */
  const themeSwitcher = select('.theme-switcher');
  const themeButton = select('.theme-button');
  const themeOptions = select('.theme-option', true);
  const body = select('body');
  const getSavedTheme = () => localStorage.getItem('theme');
  const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const updateUI = (chosenTheme) => {
    let appliedTheme = chosenTheme;
    if (chosenTheme === 'system') {
      appliedTheme = getSystemTheme();
    }
    
    body.classList.toggle('dark-mode', appliedTheme === 'dark');
    const mainIconClass = appliedTheme === 'dark' ? 'bi-moon-fill' : 'bi-sun-fill';
    themeButton.innerHTML = `<i class="bi ${mainIconClass}"></i>`;
    themeOptions.forEach(opt => {
      opt.classList.toggle('active', opt.getAttribute('data-theme') === chosenTheme);
    });
  };
  
  const setTheme = (theme) => {
    if (theme === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', theme);
    }
    updateUI(theme);
  };
  on('click', '.theme-button', () => {
    themeSwitcher.classList.toggle('active');
  });
  
  themeOptions.forEach(option => {
    on('click', `[data-theme="${option.getAttribute('data-theme')}"]`, () => {
      setTheme(option.getAttribute('data-theme'));
      themeSwitcher.classList.remove('active');
    });
  });
  
  const initialTheme = getSavedTheme() || 'system';
  setTheme(initialTheme);
  
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (getSavedTheme() === null) { // Hanya update jika pilihannya 'system'
      updateUI('system');
    }
  });
  
  document.addEventListener('click', (e) => {
    if (!themeSwitcher.contains(e.target)) {
      themeSwitcher.classList.remove('active');
    }
  });
  
  /**
   * Mobile nav
   */
  on('click', '.mobile-nav', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  });

    /** 
   * Auto-color Status Contact
   */
  const statusBadges = document.querySelectorAll('.status');
  
  statusBadges.forEach(badge => {
    const text = badge.innerText.toLowerCase().trim();
    if (text === 'dibuka') {
      badge.classList.add('hijau'); 
    } 
    else if (text === 'ditutup') {
      badge.classList.add('merah'); 
    } 
    else {
      badge.classList.add('abu'); 
    }
  });

  
  /**
   * Initiate Supports Slider
   */
  const supportSliderEl = document.querySelector('.support-slider');
  
  if (supportSliderEl) {
    const SupportsSwiper = new Swiper(supportSliderEl, {
      speed: 1000,
      loop: true,
      autoplay: {
        delay: 1500,
        disableOnInteraction: false,
        enabled: false
      },
      slidesPerView: 'auto',
      spaceBetween: 40,
      breakpoints: {
        768: { spaceBetween: 60 },
        992: { spaceBetween: 80 }
      }
    });
    
    const observer = new IntersectionObserver((entries) => {
      entries[0].isIntersecting
        ? SupportsSwiper.autoplay.start() 
        : SupportsSwiper.autoplay.stop(); 
    }, {
      threshold: 0.1 
    });
    
    observer.observe(supportSliderEl);
  }

  /**
   * Initiate Pure Counter 
   */
    if(select('.purecounter')) {
      new PureCounter();
    }

  /**
   * Initiate GLightbox 
   */
  const lightbox = GLightbox({
    selector: '.gallery-lightbox' 
  });
 
  })()