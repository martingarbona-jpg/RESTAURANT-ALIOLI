/**
* Template Name: Restaurantly
* Template URL: https://bootstrapmade.com/restaurantly-restaurant-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);


  /**
   * Reservation form submission via Google Apps Script
   */
  const reservationForm = document.querySelector('#reservation-form');
  if (reservationForm) {
    const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyrwBJURyfF3jAUtHFaxmopEL8lo439L1OUcnjnWyrrI-wzl-d2R3zXSyJqCkQN1Vw/exec";
    const submitButton = reservationForm.querySelector('#reservation-submit');
    const feedback = reservationForm.querySelector('#reservation-feedback');

    const successText = "Reserva registrada correctamente. Te esperamos al mediodía.";
    const connectionErrorText = "No se pudo conectar con el sistema de reservas. Intentá nuevamente.";

    const showFeedback = (message, type = 'error') => {
      feedback.textContent = message;
      feedback.classList.add('is-visible');
      feedback.classList.remove('is-success', 'is-error');
      feedback.classList.add(type === 'success' ? 'is-success' : 'is-error');
      feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const getField = (name) => reservationForm.elements[name];

    reservationForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const nombre = getField('nombre').value.trim();
      const telefono = getField('telefono').value.trim();
      const fecha = getField('fecha').value;
      const personas = Number(getField('personas').value);
      const observaciones = getField('observaciones').value.trim();

      if (!nombre || !telefono || !fecha || !personas) {
        showFeedback('Completá nombre, teléfono, fecha y cantidad de personas para reservar.');
        return;
      }

      if (!Number.isInteger(personas) || personas <= 0) {
        showFeedback('La cantidad de personas debe ser mayor a 0.');
        return;
      }

      if (personas > 20) {
        showFeedback('La reserva por este medio admite hasta 20 personas por solicitud.');
        return;
      }

      submitButton.disabled = true;
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = 'Enviando...';

      try {
        const response = await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nombre,
            telefono,
            fecha,
            personas,
            observaciones
          })
        });

        const data = await response.json();

        if (data.ok) {
          showFeedback(successText, 'success');
          reservationForm.reset();
          return;
        }

        const backendMessage = typeof data.message === 'string' && data.message.trim()
          ? data.message.trim()
          : 'No hay lugar disponible para esa fecha.';

        showFeedback(backendMessage);
      } catch (error) {
        showFeedback(connectionErrorText);
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    });
  }

})();