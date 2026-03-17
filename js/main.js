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
   * Load testimonials from JSON and refresh its swiper
   */
  async function loadTestimonialsFromJson() {
    const testimonialsSwiper = document.querySelector('#testimonials .init-swiper');
    const testimonialsWrapper = testimonialsSwiper?.querySelector('.swiper-wrapper');

    if (!testimonialsSwiper || !testimonialsWrapper) {
      return;
    }

    try {
      const response = await fetch("./data/reviews.json");
      if (!response.ok) {
        throw new Error(`No se pudo cargar reviews.json (${response.status})`);
      }

      const reviews = await response.json();

      if (!Array.isArray(reviews)) {
        throw new Error("El formato de reviews.json no es válido: se esperaba un array.");
      }

      testimonialsWrapper.innerHTML = reviews.map((review) => {
        const stars = '⭐'.repeat(Math.max(0, Math.min(5, Number(review.estrellas) || 0)));

        return `
          <div class="swiper-slide">
            <div class="testimonial-item">
              <p>
                <i class="bi bi-quote quote-icon-left"></i>
                <span>${review.texto}</span>
                <i class="bi bi-quote quote-icon-right"></i>
              </p>
              <a class="google-badge" href="https://www.google.com/search?sca_esv=2249988ea6ef4f61&sxsrf=ANbL-n5Af_Y0GCnBAIGOopTdEuqPlhSHfQ:1773694052837&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qORgSP6Emr14yTLg6lFT-Kg9_QRSbQxXTWbM1QClyS-u2TsH70uUZSnEAjFfRWb_xjdf0UlpzpwVuJ-oYFWWqpa55D6P2DUbdx8FiUwHf0y-YOeg4P9GbOzMxWAmreTdopLecvE0%3D&q=Alioli+-+Restaurante+Las+Compuertas+Opiniones&sa=X&ved=2ahUKEwjnqdafpaWTAxWEFbkGHaVzF7AQ0bkNegQIJBAF&biw=1536&bih=695&dpr=1.25" target="_blank" rel="noopener noreferrer" aria-label="Ver reseñas en Google">
                <img src="img/google-logo.svg" alt="Google" class="google-badge__icon">
                <span>Reseñas Google</span>
              </a>
              <h3>${review.nombre}</h3>
              <h4>${stars}</h4>
            </div>
          </div>
        `;
      }).join('');

      if (testimonialsSwiper.swiper) {
        testimonialsSwiper.swiper.destroy(true, true);
      }

      const config = JSON.parse(
        testimonialsSwiper.querySelector('.swiper-config').innerHTML.trim()
      );
      new Swiper(testimonialsSwiper, config);
    } catch (error) {
      testimonialsWrapper.innerHTML = '';
      console.error('Error al cargar testimonios dinámicos:', error);
    }
  }

  window.addEventListener('load', loadTestimonialsFromJson);

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
    const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz1-pJT9-YjCmD9_5pQ8AtM86I8bfn_BcnjoqbDGtHg2eV2CWPzmG7SA0PbjD20wgmX/exec";
    const submitButton = reservationForm.querySelector('#reservation-submit');
    const feedback = reservationForm.querySelector('#reservation-feedback');

    const successText = "Reserva registrada correctamente.";
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

      const nombreApellido = getField('nombre_apellido').value.trim();
      const telefono = getField('telefono').value.trim();
      const fecha = getField('fecha').value;
      const personas = Number(getField('personas').value);
      const ninosRaw = getField('ninos').value;
      const ninos = ninosRaw === '' ? 0 : Number(ninosRaw);
      const observaciones = getField('observaciones').value.trim();

      if (!nombreApellido || !telefono || !fecha || !personas) {
        showFeedback('Completá nombre y apellido, teléfono, fecha y cantidad de personas para reservar.');
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

      if (!Number.isInteger(ninos) || ninos < 0) {
        showFeedback('La cantidad de niños debe ser 0 o mayor.');
        return;
      }

      submitButton.disabled = true;
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = 'Enviando...';

      try {
        const params = new URLSearchParams();
        params.append('nombre_apellido', nombreApellido);
        params.append('telefono', telefono);
        params.append('fecha', fecha);
        params.append('personas', personas);
        params.append('ninos', ninos);
        params.append('observaciones', observaciones || '');

        const response = await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          body: params
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
