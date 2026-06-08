/**
* Template Name: PhotoFolio
* Template URL: https://bootstrapmade.com/photofolio-bootstrap-photography-website-template/
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
      document.querySelectorAll('#navmenu a').forEach(link => link.classList.remove('active'));
      navmenu.classList.add('active');
      navmenu.blur();
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
    const removePreloader = () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 300);
      setTimeout(() => {
        preloader.remove();
      }, 800);
    };
    window.addEventListener('load', removePreloader, { once: true });
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', removePreloader, { once: true });
    } else {
      removePreloader();
    }
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
   * Contact form submit
   */
  const contactToast = document.createElement('div');
  contactToast.className = 'contact-toast';
  contactToast.textContent = 'Send successfully';
  document.body.appendChild(contactToast);
  let contactToastTimeout;

  function showContactToast() {
    contactToast.classList.add('is-visible');
    window.clearTimeout(contactToastTimeout);
    contactToastTimeout = window.setTimeout(() => {
      contactToast.classList.remove('is-visible');
    }, 3600);
  }

  document.querySelectorAll('.php-email-form').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const action = this.getAttribute('action');
      const loading = this.querySelector('.loading');
      const errorMessage = this.querySelector('.error-message');
      const sentMessage = this.querySelector('.sent-message');
      const submitButton = this.querySelector('button[type="submit"]');

      loading.classList.add('d-block');
      errorMessage.classList.remove('d-block');
      sentMessage.classList.remove('d-block');
      submitButton.disabled = true;

      fetch(action, {
        method: 'POST',
        body: new FormData(this),
        headers: { 'Accept': 'application/json' }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Message could not be sent. Please try again.');
          }
          return response.json().catch(() => ({}));
        })
        .then(() => {
          loading.classList.remove('d-block');
          sentMessage.classList.add('d-block');
          showContactToast();
          this.reset();
        })
        .catch(error => {
          loading.classList.remove('d-block');
          errorMessage.textContent = error.message || 'Message could not be sent. Please try again.';
          errorMessage.classList.add('d-block');
        })
        .finally(() => {
          submitButton.disabled = false;
        });
    });
  });

  /**
   * Active nav link on scroll
   */
  const navmenuLinks = document.querySelectorAll('#navmenu a[href^="#"]');

  function navmenuScrollspy() {
    let activeLink = navmenuLinks[0];
    const headerOffset = (document.querySelector('#header')?.offsetHeight || 0) + 90;

    navmenuLinks.forEach(link => {
      const section = document.querySelector(link.hash);
      if (!section) return;

      const rect = section.getBoundingClientRect();
      if (rect.top <= headerOffset && rect.bottom > headerOffset) {
        activeLink = link;
      }
    });

    navmenuLinks.forEach(link => link.classList.remove('active'));
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);
  window.addEventListener('resize', navmenuScrollspy);

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

})();
