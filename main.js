/**
 * Paradise Lodge - Main JavaScript
 * Funcionalidades completas para la página web
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
  
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

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
      setTimeout(() => {
        preloader.remove();
      }, 500);
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
  
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }
  window.addEventListener('load', aosInit);

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
        if (typeof Swiper !== 'undefined') {
          new Swiper(swiperElement, config);
        }
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  function initIsotope() {
    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
      let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

      const container = isotopeItem.querySelector('.isotope-container');
      if (container) {
        // Simple implementation for responsive grid
        function layoutItems() {
          const items = container.querySelectorAll('.isotope-item');
          items.forEach(item => {
            item.style.display = 'block';
          });
        }
        
        // Initialize layout
        layoutItems();
        
        // Handle filters
        isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filterBtn) {
          filterBtn.addEventListener('click', function() {
            // Remove active class from all buttons
            isotopeItem.querySelectorAll('.isotope-filters .filter-active').forEach(btn => {
              btn.classList.remove('filter-active');
            });
            // Add active class to clicked button
            this.classList.add('filter-active');
            
            // Simple filter logic (show all for now)
            const filterValue = this.getAttribute('data-filter');
            const items = container.querySelectorAll('.isotope-item');
            
            items.forEach(item => {
              if (filterValue === '*' || item.classList.contains(filterValue.replace('.', ''))) {
                item.style.display = 'block';
                item.style.opacity = '0';
                setTimeout(() => {
                  item.style.opacity = '1';
                }, 100);
              } else {
                item.style.opacity = '0';
                setTimeout(() => {
                  item.style.display = 'none';
                }, 300);
              }
            });
            
            // Re-trigger AOS animations
            if (typeof AOS !== 'undefined') {
              setTimeout(() => {
                AOS.refresh();
              }, 300);
            }
          });
        });
      }
    });
  }

  window.addEventListener('load', initIsotope);

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
    });
  }
  
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Counter animation
   */
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
      const target = parseInt(counter.textContent);
      const duration = 2000; // 2 seconds
      const step = target / (duration / 16); // 60 FPS
      let current = 0;
      
      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      // Start animation when element is visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateCounter();
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.5
      });
      
      observer.observe(counter);
    });
  }

  window.addEventListener('load', animateCounters);

  /**
   * Smooth scrolling for anchor links
   */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /**
   * Add loading animation to images
   */
  function initImageLoading() {
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('load', function() {
        this.classList.add('loaded');
        this.style.opacity = '1';
      });
      
      img.addEventListener('error', function() {
        this.style.opacity = '0.5';
        console.warn('Error loading image:', this.src);
      });
      
      // Set initial opacity
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease';
      
      // If image is already loaded
      if (img.complete) {
        img.classList.add('loaded');
        img.style.opacity = '1';
      }
    });
  }

  window.addEventListener('load', initImageLoading);

  /**
   * Parallax effect for hero section
   */
  function initParallax() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const speed = 0.5;
        heroSection.style.transform = `translateY(${scrolled * speed}px)`;
      });
    }
  }

  window.addEventListener('load', initParallax);

  /**
   * Typing animation for hero title
   */
  function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero h2');
    if (heroTitle) {
      const text = heroTitle.textContent;
      heroTitle.textContent = '';
      
      let i = 0;
      function typeWriter() {
        if (i < text.length) {
          heroTitle.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      }
      
      // Start typing animation after a delay
      setTimeout(typeWriter, 1000);
    }
  }

  window.addEventListener('load', initTypingAnimation);

  /**
   * Lazy loading for images
   */
  function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  window.addEventListener('load', initLazyLoading);

  /**
   * Contact form validation
   */
  function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
          alert('Por favor, complete todos los campos.');
          return;
        }
        
        if (!isValidEmail(email)) {
          alert('Por favor, ingrese un email válido.');
          return;
        }
        
        // Here you would typically send the form data to your server
        alert('¡Gracias por su mensaje! Nos pondremos en contacto pronto.');
        this.reset();
      });
    }
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  window.addEventListener('load', initContactForm);

  /**
   * Search functionality
   */
  function initSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const searchableElements = document.querySelectorAll('.searchable');
        
        searchableElements.forEach(element => {
          const text = element.textContent.toLowerCase();
          if (text.includes(searchTerm)) {
            element.style.display = 'block';
          } else {
            element.style.display = 'none';
          }
        });
      });
    }
  }

  window.addEventListener('load', initSearch);

  /**
   * Cookie consent (optional)
   */
  function initCookieConsent() {
    const cookieConsent = document.querySelector('.cookie-consent');
    if (cookieConsent) {
      const acceptBtn = cookieConsent.querySelector('.accept-cookies');
      const declineBtn = cookieConsent.querySelector('.decline-cookies');
      
      if (localStorage.getItem('cookieConsent') === 'accepted') {
        cookieConsent.style.display = 'none';
      }
      
      acceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.style.display = 'none';
      });
      
      declineBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'declined');
        cookieConsent.style.display = 'none';
      });
    }
  }

  window.addEventListener('load', initCookieConsent);

  /**
   * Theme switcher (optional)
   */
  function initThemeSwitcher() {
    const themeSwitcher = document.querySelector('.theme-switcher');
    if (themeSwitcher) {
      const currentTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', currentTheme);
      
      themeSwitcher.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      });
    }
  }

  window.addEventListener('load', initThemeSwitcher);

  /**
   * Loading screen
   */
  function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          loadingScreen.style.opacity = '0';
          setTimeout(() => {
            loadingScreen.style.display = 'none';
          }, 300);
        }, 1000);
      });
    }
  }

  window.addEventListener('DOMContentLoaded', initLoadingScreen);

  /**
   * Social media sharing
   */
  function initSocialSharing() {
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const platform = this.dataset.platform;
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent('¡Descubre Paradise Lodge en la Amazonía ecuatoriana!');
        
        let shareUrl = '';
        switch(platform) {
          case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
          case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
            break;
          case 'whatsapp':
            shareUrl = `https://wa.me/?text=${text}%20${url}`;
            break;
          case 'email':
            shareUrl = `mailto:?subject=${text}&body=${url}`;
            break;
        }
        
        if (shareUrl) {
          window.open(shareUrl, '_blank', 'width=600,height=400');
        }
      });
    });
  }

  window.addEventListener('load', initSocialSharing);

  /**
   * Back to top functionality with progress
   */
  function initBackToTopProgress() {
    const backToTop = document.querySelector('.scroll-top');
    if (backToTop) {
      window.addEventListener('scroll', () => {
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (window.pageYOffset / scrollTotal) * 100;
        
        // Update progress circle if it exists
        const progressCircle = backToTop.querySelector('.progress-circle');
        if (progressCircle) {
          progressCircle.style.strokeDashoffset = 283 - (283 * scrollProgress) / 100;
        }
      });
    }
  }

  window.addEventListener('load', initBackToTopProgress);

  /**
   * Reservation system (basic)
   */
  function initReservationSystem() {
    const reservationForm = document.querySelector('.reservation-form');
    if (reservationForm) {
      reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const checkin = formData.get('checkin');
        const checkout = formData.get('checkout');
        const guests = formData.get('guests');
        const room = formData.get('room');
        
        // Basic validation
        if (!checkin || !checkout || !guests || !room) {
          alert('Por favor, complete todos los campos de la reserva.');
          return;
        }
        
        // Check dates
        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);
        const today = new Date();
        
        if (checkinDate < today) {
          alert('La fecha de entrada debe ser posterior a hoy.');
          return;
        }
        
        if (checkoutDate <= checkinDate) {
          alert('La fecha de salida debe ser posterior a la fecha de entrada.');
          return;
        }
        
        // Calculate nights and total
        const nights = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
        const pricePerNight = 100; // Base price
        const total = nights * pricePerNight;
        
        // Show reservation summary
        alert(`Resumen de Reserva:
        Habitación: ${room}
        Entrada: ${checkin}
        Salida: ${checkout}
        Noches: ${nights}
        Huéspedes: ${guests}
        Total: ${total} USD
        
        ¡Gracias por su reserva! Nos pondremos en contacto pronto.`);
        
        this.reset();
      });
    }
  }

  window.addEventListener('load', initReservationSystem);

  /**
   * Image gallery with modal
   */
  function initImageGallery() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    const modal = document.querySelector('.image-modal');
    const modalImg = document.querySelector('.modal-image');
    const closeBtn = document.querySelector('.modal-close');
    
    if (galleryImages.length > 0 && modal) {
      galleryImages.forEach(img => {
        img.addEventListener('click', function() {
          modal.style.display = 'flex';
          modalImg.src = this.src;
          modalImg.alt = this.alt;
          document.body.style.overflow = 'hidden';
        });
      });
      
      if (closeBtn) {
        closeBtn.addEventListener('click', function() {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto';
        });
      }
      
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto';
        }
      });
      
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto';
        }
      });
    }
  }

  window.addEventListener('load', initImageGallery);

  /**
   * Newsletter subscription
   */
  function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        if (!email) {
          alert('Por favor, ingrese su email.');
          return;
        }
        
        if (!isValidEmail(email)) {
          alert('Por favor, ingrese un email válido.');
          return;
        }
        
        // Here you would typically send the email to your server
        alert('¡Gracias por suscribirse a nuestro newsletter!');
        this.reset();
      });
    }
  }

  window.addEventListener('load', initNewsletter);

  /**
   * FAQ accordion
   */
  function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      
      if (question && answer) {
        question.addEventListener('click', function() {
          const isOpen = item.classList.contains('active');
          
          // Close all FAQ items
          faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
            faqItem.querySelector('.faq-answer').style.maxHeight = null;
          });
          
          // Open clicked item if it wasn't open
          if (!isOpen) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
          }
        });
      }
    });
  }

  window.addEventListener('load', initFAQAccordion);

  /**
   * Weather widget (optional)
   */
  function initWeatherWidget() {
    const weatherWidget = document.querySelector('.weather-widget');
    if (weatherWidget) {
      // This is a placeholder - you would need to integrate with a weather API
      const weatherData = {
        location: 'Tena, Ecuador',
        temperature: '28°C',
        condition: 'Soleado',
        humidity: '75%'
      };
      
      weatherWidget.innerHTML = `
        <div class="weather-info">
          <h4>${weatherData.location}</h4>
          <p class="temperature">${weatherData.temperature}</p>
          <p class="condition">${weatherData.condition}</p>
          <p class="humidity">Humedad: ${weatherData.humidity}</p>
        </div>
      `;
    }
  }

  window.addEventListener('load', initWeatherWidget);

  /**
   * Testimonials carousel
   */
  function initTestimonialsCarousel() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.testimonials-prev');
    const nextBtn = document.querySelector('.testimonials-next');
    
    if (testimonials.length > 0) {
      let currentTestimonial = 0;
      
      function showTestimonial(index) {
        testimonials.forEach(testimonial => {
          testimonial.classList.remove('active');
        });
        testimonials[index].classList.add('active');
      }
      
      function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
      }
      
      function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
      }
      
      if (nextBtn) {
        nextBtn.addEventListener('click', nextTestimonial);
      }
      
      if (prevBtn) {
        prevBtn.addEventListener('click', prevTestimonial);
      }
      
      // Auto-advance testimonials
      setInterval(nextTestimonial, 5000);
      
      // Show first testimonial
      showTestimonial(0);
    }
  }

  window.addEventListener('load', initTestimonialsCarousel);

  /**
   * Accessibility improvements
   */
  function initAccessibility() {
    // Skip to main content link
    const skipLink = document.querySelector('.skip-to-main');
    if (skipLink) {
      skipLink.addEventListener('click', function(e) {
        e.preventDefault();
        const mainContent = document.querySelector('main');
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView();
        }
      });
    }
    
    // Focus management for mobile menu
    const mobileMenuToggle = document.querySelector('.mobile-nav-toggle');
    const mobileMenu = document.querySelector('.navmenu');
    
    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener('click', function() {
        setTimeout(() => {
          if (document.querySelector('.mobile-nav-active')) {
            const firstMenuItem = mobileMenu.querySelector('a');
            if (firstMenuItem) {
              firstMenuItem.focus();
            }
          }
        }, 100);
      });
    }
    
    // Keyboard navigation for image gallery
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.classList.contains('gallery-image')) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            focusedElement.click();
          }
        }
      }
    });
  }

  window.addEventListener('load', initAccessibility);

  /**
   * Performance monitoring
   */
  function initPerformanceMonitoring() {
    // Monitor page load time
    window.addEventListener('load', function() {
      const loadTime = performance.now();
      console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
      
      // You can send this data to analytics
      if (loadTime > 3000) {
        console.warn('Page load time is slow');
      }
    });
    
    // Monitor scroll performance
    let scrolling = false;
    window.addEventListener('scroll', function() {
      if (!scrolling) {
        scrolling = true;
        requestAnimationFrame(function() {
          scrolling = false;
        });
      }
    });
  }

  window.addEventListener('load', initPerformanceMonitoring);

  /**
   * Error handling
   */
  function initErrorHandling() {
    window.addEventListener('error', function(e) {
      console.error('JavaScript error:', e.error);
      // You can send errors to a logging service
    });
    
    window.addEventListener('unhandledrejection', function(e) {
      console.error('Unhandled promise rejection:', e.reason);
      // You can send errors to a logging service
    });
  }

  window.addEventListener('load', initErrorHandling);

  /**
   * Local storage management
   */
  function initLocalStorage() {
    // Save user preferences
    const preferences = {
      theme: 'light',
      language: 'es',
      visitCount: 0
    };
    
    // Load existing preferences
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      Object.assign(preferences, JSON.parse(savedPreferences));
    }
    
    // Increment visit count
    preferences.visitCount++;
    
    // Save preferences
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    
    // Show welcome message for first-time visitors
    if (preferences.visitCount === 1) {
      setTimeout(() => {
        alert('¡Bienvenido a Paradise Lodge! Esperamos que disfrute navegando por nuestro sitio web.');
      }, 2000);
    }
  }

  window.addEventListener('load', initLocalStorage);

  /**
   * Print functionality
   */
  function initPrintFunctionality() {
    const printBtn = document.querySelector('.print-btn');
    if (printBtn) {
      printBtn.addEventListener('click', function() {
        window.print();
      });
    }
    
    // Prepare page for printing
    window.addEventListener('beforeprint', function() {
      document.body.classList.add('printing');
    });
    
    window.addEventListener('afterprint', function() {
      document.body.classList.remove('printing');
    });
  }

  window.addEventListener('load', initPrintFunctionality);

  /**
   * Initialize all functions
   */
  function init() {
    console.log('Paradise Lodge website initialized successfully! 🌴');
    
    // You can add any initialization code here
    const currentYear = new Date().getFullYear();
    const copyrightElements = document.querySelectorAll('.current-year');
    copyrightElements.forEach(element => {
      element.textContent = currentYear;
    });
  }

  // Initialize everything when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();