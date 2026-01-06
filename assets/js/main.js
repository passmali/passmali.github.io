 
(function() {
  "use strict";

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
   * Loader web
   */
  var loading = document.getElementById('loader');
  window.addEventListener('load', function() {
    loading.style.opacity = '0';});
  
  loading.addEventListener('transitionend', function() {
        loading.style.display = 'none';
    });
  
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
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });
  
  
  })()