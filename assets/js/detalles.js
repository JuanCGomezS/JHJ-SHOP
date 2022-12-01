(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      if (document.querySelector(el)) {
        return document.querySelector(el);
      }
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
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

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
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
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
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    const loader = document.getElementById("loader");
    loader.setAttribute('class', ``);

    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  //'https://drive.google.com/uc?export=view&id=1PSUNUK1oQ9MxHyArnn20Uj0ivpmgmoiH'

  //Array Produtos Detalles

  const listDetalles = [
    {
      url_path: '1187OX395HEs54A_hhjO3i-cib4SWSobF',
      nombre: 'Parlante Unicornio $30.000',
      color: '#77dd77',
      producto: 'Detalles',
      prod: 'filter-det'
    },
    {
      url_path: '1E-YtfuZ7dQT8gGwaTn-FtxZGY2dSNMbn',
      nombre: 'Monedero con Llavero Panda $13.000',
      color: '#77dd77',
      producto: 'Detalles',
      prod: 'filter-det'
    },
    {
      url_path: '1fI_FUCVxSu0OgwjfsVaFEbT3Agz3LoxZ',
      nombre: 'Monedero con Llavero Huella $13.000',
      color: '#77dd77',
      producto: 'Detalles',
      prod: 'filter-det'
    },
    {
      url_path: '1zbBo4KuUS2seH5QNfkvfguqDKfdxUKJP',
      nombre: 'Monedero Good Luck $13.000',
      color: '#77dd77',
      producto: 'Detalles',
      prod: 'filter-det'
    },
    {
      url_path: '1DhHsEmeRgW_7MxAmIcngNXrd8cA_8XJu',
      nombre: 'Monedero Good Luck Moño  $13.000',
      color: '#77dd77',
      producto: 'Detalles',
      prod: 'filter-det'
    },
    {
      url_path: '1_oJDxxgpSN-G18XGz-Zk-X_FYGYRO7Qq',
      nombre: 'Monedero Ardilla $18.000',
      color: '#77dd77',
      producto: 'Detalles',
      prod: 'filter-det'
    },
    {
      url_path: '17S0bR7WPPxsXKel8Nmv_tuS7Tr536sBx',
      nombre: 'Monedero Oso Besos $18.000',
      color: '#77dd77',
      producto: 'Detalles',
      prod: 'filter-det'
    },
    {
      url_path: '1ep3qNu3KLXk416Y0rZ_ag693pEchDli1',
      nombre: 'Monedero Rosquilla $17.000',
      color: '#77dd77',
      producto: 'Detalles',
      prod: 'filter-det'
    },
    {
      url_path: '1mL52kPb0n71LU49dO7_kQNdTAW_hDCC_',
      nombre: 'Bolso Silicona Dino $40.000',
      color: '#77dd77',
      producto: 'Detalles',
      prod: 'filter-det'
    },
    {
      url_path: '146voXWSAOcx1MHIkhOVuURgY32920dyt',
      nombre: 'Bolso Orejitas $47.000',
      color: '#77dd77',
      producto: 'Detalles',
      prod: 'filter-det'
    },
    {
      url_path: '15xMKd0DdRu9I1duvAs2jUlXSzO6RAlsy',
      nombre: 'Bolso Baloncesto $45.000',
      color: '#77dd77',
      producto: 'Detalles',
      prod: 'filter-det'
    },
    {
      url_path: '17tTM8lp76l6z7UmJIm_gk3dMZiPx2_K5',
      nombre: 'Bolso Cubo $50.000',
      color: '#77dd77',
      producto: 'Detalles',
      prod: 'filter-det'
    },
    {
      url_path: '17XYrdb-Gp3Xd0uzmduyQu34TCyFY3Btr',
      nombre: 'Cartuchera $16.000',
      color: '#77dd77',
      producto: 'Detalles',
      prod: 'filter-det'
    },
    {
      url_path: '1QzQ0tB_wakIySjyw9cHfuHl736B1eGfQ',
      nombre: 'cartuchera Silicona Huella $25.000',
      color: '#77dd77',
      producto: 'Detalles',
      prod: 'filter-det'
    },
    {
      url_path: '1fhDXsBUBSph052lAtmMaZfVzeWZP4c9R',
      nombre: 'Cartuchera Peluche Kawaii $23.000',
      color: '#77dd77',
      producto: 'Detalles',
      prod: 'filter-det'
    },
    {
      url_path: '1BtmuCTnCLJznKKgFQ821_SB6MrACIE0e',
      nombre: 'Bolsa de Calor Conejo $30.000',
      color: '#77dd77',
      producto: 'Detalles',
      prod: 'filter-det'
    },
    {
      url_path: '1kMywWvbZz-U1SYMENs_avN2d2mTlrxJO',
      nombre: 'Power Bank Unicornio $30.000',
      color: '#77dd77',
      producto: 'Detalles',
      prod: 'filter-det'
    },
    {
      url_path: '1dSdLP-MX6pJ2zwQZU9IkkeS0gzYM_p86',
      nombre: 'Audifonos Peluche Cable $38.000',
      color: '#77dd77',
      producto: 'Detalles',
      prod: 'filter-det'
    },
    {
      url_path: '1LDLy7S35TzOBGbs49gQK_m9V_yAzWRjO',
      nombre: 'Audifonos Huella $58.000',
      color: '#77dd77',
      producto: 'Detalles',
      prod: 'filter-det'
    },
    {
      url_path: '1cX-CLMt-2nPAUfMlCZQfSrg18qnrR8Jj',
      nombre: 'Mouse Animalitos $33.000',
      color: '#77dd77',
      producto: 'Detalles',
      prod: 'filter-det'
    },
    {
      url_path: '1lkXkqTl22ORbFPMLEf5wUq5N9QmVHVYw',
      nombre: 'Tapete para Mouse $38.000',
      color: '#77dd77',
      producto: 'Detalles',
      prod: 'filter-det'
    },
    {
      url_path: '1vRVptFHfI9oIwDNZIoyl6Wd3MGup-qSQ',
      nombre: 'Tapete para Mouse Huella $28.000',
      color: '#77dd77',
      producto: 'Detalles',
      prod: 'filter-det'
    },
  ]

  const listPocillos = [
    {
      url_path: '1AdbKEu_c1rqWEipvNoIDMHwgFXTQZUmV',
      nombre: 'Pocillo Unicornio $33.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1u_h014_E9isLgFjkaO2d0ngyOCe6L3eX',
      nombre: 'Pocillo Espacio $40.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1O_Pd3Xyv95Sq8m3nB8LXmQ70qt5qkewG',
      nombre: 'Pocillo Marciano $40.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1Wng8QYZp7mNCXhXlkUHPpf5Z6hIBSHtd',
      nombre: 'Vaso Pata $30.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1w_SlPEuQTWAwXTGoaXZjKcvcxrFKQX4a',
      nombre: 'Set Pocillo Postre $40.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1ii7140WkLoP0V-5_MAjHrXJeIagZSbTD',
      nombre: 'Pocillo Postre $36.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '11SU5aag-HC_IUMud-n56gxLO_a_tUPXr',
      nombre: 'Pocillo Moño $36.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1PC5wvaGy5G28hcUkFRrXb2DGHfe_ozpw',
      nombre: 'Pocillo Cuadrado animales $26.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1Nm9C-6vEfJ3Q4iaxm4wn78UV4p9syoRq',
      nombre: 'Pocillo Tapa Oso $30.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1kOae-1JErxjlE3SQfo71EMUMqvwDpqN4',
      nombre: 'Pocillo Pinguino $32.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1e6M47pKf1Lc_54v4G_HeYwM-cTymJRSU',
      nombre: 'Pocillo Unicornio $40.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '16ZU2SVelzadAhmmFFZIZNKoXhbID088v',
      nombre: 'Pocillo Dunat $30.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1AvcfFsobOvgqwH-IZi1my_C626Wu7nX-',
      nombre: 'Pocillo Gata $30.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1kZlmtGPher-Ryl77jDHCwFlNemHvBuG6',
      nombre: 'Pocillo Perro $26.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1RDheWEXau4trVbzi-nCP964U0V6cneQe',
      nombre: 'Set Pocillo x 3pcs Gato $46.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1FhDqi-xd48_11vI20O-hPnp_lD0QILCH',
      nombre: 'Set de Pocillo Gata $36.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '10d5oYKM40ZVyq5HpiEiITgPsrHYi5K6Q',
      nombre: 'Set Vaso Gata $36.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1eF9IxMzE7aun2gDGpyUGN6q0l-6nR5i2',
      nombre: 'Pocillo Cubo $32.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1uudBdR4M0HgryOnsprhcEZQSCnlTg4wJ',
      nombre: 'Pocillo Spiderman $38.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1A037OeYn4B4bS1ravMEqURad-x_sVnp_',
      nombre: 'Taza cerámica cerdito $46.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '13zDIQdOFkf7YNPtm39LgRPOijfeenT0d',
      nombre: 'Taza Con Base Animales $38.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1hf-nFHR6_ZdnUGmkiy9_Q1E74i-OBKkU',
      nombre: 'Pocillo Panda 2 $28.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1Xxhws7jFWSFO5qK2cS3JhXB1pJ7ABb80',
      nombre: 'Pocillo Gata 1 $26.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1u0Uk5rDARq6onB6YggA-Yy5oJ4Nm550a',
      nombre: 'Pocillo Unicornio Arcoiris $32.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1YSy5Teq6XPZT08LGj9hpdchbcG-rKO_C',
      nombre: 'Pocillo Unicornio Grande $32.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1ImReVuQ4B4LsIFopFmBRA5sA3z2JYPbY',
      nombre: 'Pocillo Unicornio 1 $30.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1Pee2HySJ251gmibm13Vle-LaWpQ-oTkE',
      nombre: 'Pocillo Unicornio $30.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1ozMtIvOcwxifpTVYS_O_FOdjDqQ0jnkO',
      nombre: 'Pocillo Unicornio Cute $28.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1T7jlqebmELWXu-cFfRCTHTzv4z31k03o',
      nombre: 'Pocillo Gata $26.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1uUikC2-GFRFNYeqrsp4eMSYB2fcnreY1',
      nombre: 'Pocillo Perro $24.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1ebSMBDBNNpLYEarRUxIrpPJymIE0I9DV',
      nombre: 'Pocillo Animalitos $38.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1Qfsf1veOnTCWx_WAuHXBt50QywdFx2Eh',
      nombre: 'Pocillo Gato Ventana $36.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1-QL-53ZqDOU0ZKUeqpeHMZuXBpTQtmQ_',
      nombre: 'Pocillo Panda 1 $28.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1_FFq3qqQ_6HftT1Z0CQBFUNUGCyptxmc',
      nombre: 'Pocillo Panda con Tapa $28.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1E-DRB4tzdpV-KZt30ckta8O3DNigqwvw',
      nombre: 'Pocillo Oso Panda $28.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '11OpT_JenYVQzJotvQD0n2Nm-L17NsLKw',
      nombre: 'Pocillo Panda Espacio $30.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1zYulAHkVspdKVKJWPloTOA2FjXwm82eD',
      nombre: 'Pocillo Garra $36.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '16_I4JH4XCopRnP08UfCEAUmvJo49L6qH',
      nombre: 'Pocillo Gata Cute 2 $24.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1qyQ63JoEf1DpXgIDNBS8JqN6c2-xvLRH',
      nombre: 'Pocillo Animal $26.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1XEkMjubtcyw0FkyyripAnUDno4MWmOJp',
      nombre: 'Pocillo Gata Cute $24.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '15YDvLOK0OEvhP9mjP9MoGHrci70kZ7zC',
      nombre: 'Pocillo Pato $40.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1CvO5IKLUX4ALT32e2FEXf-gTVbAUlsiV',
      nombre: 'Pocillo Gata Kawaii $30.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1N_FfUZOZer9ZR0Pe8tjF--I3nQ1x8Yum',
      nombre: 'Pocillo Animales Fruta $28.000 ',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1h5nyLTA7Rh-pMdsHVMGHfCqeGph7DEsu',
      nombre: 'Pocillo Gata Tapa espejo $28.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1ldFCZRVP_buftrs2qVtt6QBw3470qTSK',
      nombre: 'Pocillo Unicornio Mesedor $27.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1T108e1gSQlNpJuq88gQE2dmWYEGO8Inl',
      nombre: 'Pocillo Cat $24.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1OwUPI1kXxpILn4OfDH33BpSi8N6DA7PS',
      nombre: 'Pocillo Coche $26.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1KbfwKSAMVKGLOTqKfBwFy5NPjkmBMHCD',
      nombre: 'Pocillo Cono $31.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1Y6v0SbtTXv6C-0iJe5J9Tx4iSbwqosyE',
      nombre: 'Pocillo Paleta $31.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1Sa6FiIeWsdZU7qs4NDV6JTLtDgW9A-0C',
      nombre: 'Pocillo Cono $26.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1KXI-4dd5Uz7C2URhFMmrHq7LG1AOdKB3',
      nombre: 'Pocillo Panda $28.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1SMtZm5SPcK2_clnoNucJ5OAsF_7EC0lO',
      nombre: 'Pocillo Oso $34.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1DGR5hfqnEqOad1JYhzgpMjWNEQmZDv4r',
      nombre: 'Pocillo Gata Galleta $32.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1P-blg6V6Gxbd0Aqbskav-ICpWJca1pcT',
      nombre: 'Pocillo Corazón $25.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
    {
      url_path: '1dlxTuP5nq3IA5kJT8rcqPEKyAK9XJMLv',
      nombre: 'Taza Ceramica Set $150.000',
      color: '#b0c2f2',
      producto: 'Pocillos',
      prod: 'filter-poc'
    },
  ]

  const listVasostermos = [
    {
      url_path: '1ZDXj_w-0BeKzAE2RXgX5_2X2D7A6CqyB',
      nombre: 'Mini Licuadora de Frutas $50.000',
      color: '#f9a59a',
      producto: 'Vasos y termos',
      prod: 'filter-vyt'
    },
    {
      url_path: '1mp80gghBXDJk3mjMbKUBHw_OQ9VMguTr',
      nombre: 'Termo Relampago $35.000',
      color: '#f9a59a',
      producto: 'Vasos y termos',
      prod: 'filter-vyt'
    },
    {
      url_path: '1VnQrPv2dU1PI7PexrNREVtCqffQCKuCV',
      nombre: 'Termo Esfera $29.000',
      color: '#f9a59a',
      producto: 'Vasos y termos',
      prod: 'filter-vyt'
    },
    {
      url_path: '1SCVdHrh0ga0YzW-mevixVSTm_Tqkb1Kl',
      nombre: 'Vaso Pitillo Frutas $30.000',
      color: '#f9a59a',
      producto: 'Vasos y termos',
      prod: 'filter-vyt'
    },
    {
      url_path: '1bRIg7nvEw3-auC3ILbnRId2swEpc5Rgw',
      nombre: 'Vaso Pitillo Oso Flores $33.000',
      color: '#f9a59a',
      producto: 'Vasos y termos',
      prod: 'filter-vyt'
    },
    {
      url_path: '1v4T3Dq7N4rf4v2CScITCeoqlt6Imoywt',
      nombre: 'Vaso Pitillo Luz Astronauta $33.000',
      color: '#f9a59a',
      producto: 'Vasos y termos',
      prod: 'filter-vyt'
    },
    {
      url_path: '1jasoL8cwzgbMa5ilpASmuGdd9NLchC7j',
      nombre: 'Vaso Pitillo Astronauta Dorado $38.000',
      color: '#f9a59a',
      producto: 'Vasos y termos',
      prod: 'filter-vyt'
    },
    {
      url_path: '1D7oiDtjoNBNvdj-_siOJ0z_pFJK0hBIP',
      nombre: 'Vaso Pitillo Astronauta $38.000',
      color: '#f9a59a',
      producto: 'Vasos y termos',
      prod: 'filter-vyt'
    },
    {
      url_path: '1fQ5Ijkyl3vRcJpT36cF1RrvK1jRnojWO',
      nombre: 'Vaso Pitillo Osos $35.000',
      color: '#f9a59a',
      producto: 'Vasos y termos',
      prod: 'filter-vyt'
    },
    {
      url_path: '1CpqlmD0-t3j5Zpccb3I6I-uv7VAaaoox',
      nombre: 'Vaso Pitillo Cabeza de Unicornio $35.000',
      color: '#f9a59a',
      producto: 'Vasos y termos',
      prod: 'filter-vyt'
    },
    {
      url_path: '19LofdFIhBFlIEO77JtzlFYBDaM8xWr4S',
      nombre: 'Termo Oso $46.000',
      color: '#f9a59a',
      producto: 'Vasos y termos',
      prod: 'filter-vyt'
    },
    {
      url_path: '1LE_DTMDapImCdLjIUqHOMVjowPE0dCjX',
      nombre: 'Termo Panda $30.000',
      color: '#f9a59a',
      producto: 'Vasos y termos',
      prod: 'filter-vyt'
    },
    {
      url_path: '1ecCh7AJeXCSIX_MT4u9Sxi5e9QcQyJGs',
      nombre: 'Termo Pinguino $29.000',
      color: '#f9a59a',
      producto: 'Vasos y termos',
      prod: 'filter-vyt'
    },
    {
      url_path: '1Wzcge98aH3WVwbEIsOCRTgdGtkICx4FC',
      nombre: 'Termo Animal $26.000',
      color: '#f9a59a',
      producto: 'Vasos y termos',
      prod: 'filter-vyt'
    },
    {
      url_path: '1_IbGfTVtxpP2wYldDzCFReQZgcA6daiv',
      nombre: 'Termo Cara Feliz $30.000',
      color: '#f9a59a',
      producto: 'Vasos y termos',
      prod: 'filter-vyt'
    },
    {
      url_path: '1lA5YRgzept625i5bz_rP66-SR-Lk4aE0',
      nombre: 'Termo Galleta $34.000',
      color: '#f9a59a',
      producto: 'Vasos y termos',
      prod: 'filter-vyt'
    },
    {
      url_path: '10lI7VZt-AKbYfkJ-Mi6GnQM1ToDKNLg9',
      nombre: 'Vaso Pitillo Hielo Orejas $26.000',
      color: '#f9a59a',
      producto: 'Vasos y termos',
      prod: 'filter-vyt'
    },
    {
      url_path: '1eGCh4tj3hSsvgZI3RznQLzno2rVnCLtG',
      nombre: 'Vaso Pitillo Conejos $24.000',
      color: '#f9a59a',
      producto: 'Vasos y termos',
      prod: 'filter-vyt'
    },
    {
      url_path: '1FxfIMOkdkpAf12uvqNK61uWl7a4Fkoe9',
      nombre: 'Vaso Pitillo Live Love $35.000',
      color: '#f9a59a',
      producto: 'Vasos y termos',
      prod: 'filter-vyt'
    },
    {
      url_path: '1ImJa96PKfr0LDDSQ8XJOt6ash3J9MdQ3',
      nombre: 'Vaso Pitillo Helados $30.000',
      color: '#f9a59a',
      producto: 'Vasos y termos',
      prod: 'filter-vyt'
    },
    {
      url_path: '19RhQODCDvJhrVhLJT139NQKvqkRakbb0',
      nombre: 'Termo Gata $33.000',
      color: '#f9a59a',
      producto: 'Vasos y termos',
      prod: 'filter-vyt'
    },
    {
      url_path: '17oF7d4Es-AlPwi-xWrSAVSS89l9nK2wD',
      nombre: 'Termo Frutas $29.000',
      color: '#f9a59a',
      producto: 'Vasos y termos',
      prod: 'filter-vyt'
    },
    {
      url_path: '1vOnH_-C422Ge9N7CD4TUlEggGQ5JvgxL',
      nombre: 'Vaso Pitillo Orejas $36.000',
      color: '#f9a59a',
      producto: 'Vasos y termos',
      prod: 'filter-vyt'
    }
  ]

  const listFunko = [
    {
      url_path: '1my0oMvLE7gLwuP_0ifkFtopwuSOqaEs7',
      nombre: 'Buzz lightyear 3 $25.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '1QG6BSsQr1XI9s-R6VzkhjMNmz7dH5z_9',
      nombre: 'Buzz lightyear 2 $25.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '1lJtdQgIgYlx6gpIogfz1dmUdmWbxhAKY',
      nombre: 'Buzz lightyear 1 $25.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '1o49fyw3CJglGzrkniLzcwO91HbF_1BsD',
      nombre: 'Sonic 3 $25.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '1A7qSGQNeLPJdL2miiQ1_rIsEC5f9Q7ZM',
      nombre: 'Demon Slayer 5 $25.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '1bzBTZlxqaCg8iWpZ3WwpjD2ahHxEoaOE',
      nombre: 'Demon Slayer 4 $25.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '1afQcx_Q3_dCI3UIGym1lC9v3bktLn3om',
      nombre: 'Caballeros del zodiaco 2 $25.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '1-x6Am-PTjPKntB2H8lRcqu6Aa-01gumH',
      nombre: 'Buzz lightyear X6 $120.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '1XEpMp9RPLIiWLsASa4qlST3w5qkcUyGW',
      nombre: 'Naruto X8 $160.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '1ZYEJI4EIUn8J4crfm3dY5pYyl7wen7T1',
      nombre: 'Naruto 2 $25.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '1xS5iXK0sasJQAY-rVArroajuVFhWMMz1',
      nombre: 'Naruto 1 $25.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '1ny3cosb7dnUklZtkhq74gRILFxgP-VJ3',
      nombre: 'Sonic X6 $120.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '1mv62OQxmhL4TTucisEcDkdL6KX9bnoDY',
      nombre: 'Sonic 2 $25.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '14vBfrHOad3pwCr6npQ8nMg7OercYVnMF',
      nombre: 'Sonic 1 $25.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '1nry9vDX4xfYNCWZugTDerUEEEghdb9sF',
      nombre: 'Encanto X6  $120.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '1yA0rhIi5fsC6sT6RWLQgr-h2yp6gq7Dg',
      nombre: 'Encanto 6 $25.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '198peydAS__9ZjuwS3Xx6Q5-DDkBgj7bk',
      nombre: 'Encanto 5 $25.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '1YeZMx3KdG_OVwTF8Dw0djRrnUWLOkTQP',
      nombre: 'Encanto 4 $25.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '1fGNgM-UWs6Q7CyNUdtZIZeDRR686BIQB',
      nombre: 'Encanto 3 $25.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '1BvCVwnFLXqbp0_oxhYupWthp-dTaXrh4',
      nombre: 'Encanto 2 $25.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '1bqZYcPZsFhAFyoXdOyLrNf4e92lSjH4J',
      nombre: 'Encanto 1 $25.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '1UCpF_sQ2CtBgKsX6rPywfmK64KHS7qQ_',
      nombre: 'Demon Slayer X6 $120.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '1uAGAF-fGUig7VawquANUqrJP4eGSDsgs',
      nombre: 'Demon Slayer 3 $25.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '1dYUar1Wze8AWdcw8BqqVNvLOEc-78Qii',
      nombre: 'Demon Slayer 2 $25.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '11XZohlDzoBmtCCED4dny0ZUy1QaB3zZa',
      nombre: 'Demon Slayer 1 $25.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '133Q-FnKokKmMEw7_9otzQdDxr_-UhZSW',
      nombre: 'Caballeros del zodiaco X6 $120.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '1IbebeMEcLgLyz4eSJmSnLavBHjBjkTIu',
      nombre: 'Caballeros del zodiaco 3 $25.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '1-c_gJLZKTDioMg-l1HZsp9qSt5aKBLac',
      nombre: 'Caballeros del zodiaco 1 $25.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '1LGxvYvNd24hvst-ogPdxSD8XZ_mxxUMV',
      nombre: 'Caballeros del zodiaco 5 $25.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '1SX1ZKQssDQhhMx7QJcKkkoddgHJYUIel',
      nombre: 'Caballeros del zodiaco 4 $25.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
    {
      url_path: '1CO_jb2gi48ZLKcnUWZGiLVQtQ1SRt2O3',
      nombre: 'Caballeros del zodiaco 6 $25.000',
      color: '#fdfd96',
      producto: 'Funko Pop',
      prod: 'filter-fun'
    },
  ]

  const listNinos = [
    {
      url_path: '1Ke6dhTKs5NY6lz8IZ50OdrYFDAnl8fkX',
      nombre: 'Billetera Infantil $2.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1IAVyhIrSahEeqfkcebzelMAbiLfiddIo',
      nombre: 'Carro Juguete Blaze $12.500',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1tapPufjPtWqzsNN5-KXN1xWDXfAspXv-',
      nombre: 'Juguete Paw Patrol $8.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1DYN4Kl-Rqw9CuTJtj3LiTyseJIFV5mWQ',
      nombre: 'Tula Motivos $3.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1rq1g2gkGf62sOYBw4ExLnJ1rG-iiWvhm',
      nombre: 'Tula Encanto $7.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '16RjsR2PkeMD6ds07oIpX6jm5vonBqnBN',
      nombre: 'Tula Halloween $5.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1adZ-AX4oJjissWG4GoevmzuhFXd67BKJ',
      nombre: 'Pistola Juguete $8.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1w50O2XaZD8h2Y8JyzPlPpMuUGBTStDon',
      nombre: 'Pistola Dardos Paw Patrol $11.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1X0HrcDr2XLjPhrwDTu6sdHHMdkVrqUbJ',
      nombre: 'Pistola Dardos Spiderman $11.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1sMCcYTiTLDusDpHZvk63B94uO6fR6-I-',
      nombre: 'Pistola Dardos Hulk $11.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1yUO0C0DCtYOFR78Y7jhRUp86EojMNseU',
      nombre: 'Pistola Dardos Avengers $11.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1YbLDIfK02D5p4VSpReQ6NZHT9lx4Xg0s',
      nombre: 'Yoyo Motivos $4.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1jQ1HC8yaCCY71Upwxrvs0D5HDxlSa5PJ',
      nombre: 'Raqueta China $10.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1QjpYrofI919JT4dDJ5FLQg4mbiKsOTqY',
      nombre: 'Juguete Resorte $5.800',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1iy0ueTPZqOalk7Ru0FpaugpB3XGZ7v3I',
      nombre: 'Venom 4 $12.500',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1li7-eSuHwN3Bz2TLdublVKTbvDAicRxA',
      nombre: 'Venom 3 $12.500',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1NzApkvv5J7TJayJZQZH7bjsVhFNndMh5',
      nombre: 'Venom 2 $12.500',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1OSbuI5E_s0yrJYOGmZY7ltyWF2QtX7kI',
      nombre: 'Venom 1 $12.500',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1NLeCNAoLTGYxKmwRw0675fdE3idgCaZj',
      nombre: 'Muñeca Barbie 2 $6.500',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1rLIRIkCriAaMY8PJE3dWAveJAW6bLjnV',
      nombre: 'Muñeca Barbie $6.500',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1w5E9jJaDEGh4sJLrsYsXAc8dD0g9jH6x',
      nombre: 'Muñeca Encanto $13.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1m1CWId4q4FNkOGBEzOfJD2TpuSaUHbmk',
      nombre: 'Huevo Unicornio $8.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '11mYpmLjxpIayQgwibVow2BIwwLwOsoM7',
      nombre: 'Huevo Justice League $8.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '12DCTcXzqjHCLcrz9NaxVHYaJSyI6L9ws',
      nombre: 'Huevo Heroes $8.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1XwW8OnvANqRTsms8AXO4dlC9UYOZUK9o',
      nombre: 'Huevo Avengers $8.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '10ApBMXebaSTC_bKq_n5qYBf3Y_jtgkEc',
      nombre: 'Huevo Toy Story $8.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1hhCf0r2tAFINZE4EyoLSA9VWu9uOdXef',
      nombre: 'Huevo Cars $8.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1CUDmzpzt2wncpTPayBiyIsHDmI--Ww0r',
      nombre: 'Huevo Paw Patrol $8.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1scVXJ1Bnf0Spklqp0-D_PsQiTiFVNBUa',
      nombre: 'Huevo Dinosaurio $8.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1ceCh22ySveOpY1B-lF2vRb6Bx72Gul06',
      nombre: 'Huevo Dino $9.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1AosVfjvIREcxvaq2DNfUtxzkvawr5hXd',
      nombre: 'Huevo Pony, Unicornio y Disney 3 $8.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1ceWggqzJT2CYVFAwu9qxBHNOX-4BdKPt',
      nombre: 'Huevo Pony, Unicornio y Disney 2 $8.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1P5cGw_oIv9ZOaA-Q9VJpvT8z0lTx2Vtx',
      nombre: 'Huevo Pony, Unicornio y Disney $8.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1Mk9tno9QkRSgSEw7on4LUP3smhUfXF2k',
      nombre: 'Huevo Princesas y Frozen 3 $8.000.png',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1Vnmwdqy67XlxQK-tX-eWkrL5qRIX61Tv',
      nombre: 'Huevo Princesas y Frozen 2  $8.000.png',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1YST7Sf1aXWBWi59qsvi4IUwGEa2Ut0NI',
      nombre: 'Huevo Princesas y Frozen $8.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1x9c0eNyqTtewMA3bLNJIOfX0LzTYCsiP',
      nombre: 'Microfono Encanto $50.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1xA1xHjhBof2HV1HlCfYpLNex-q1MYY93',
      nombre: 'Carro Colecciòn Mario Cars $25.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
    {
      url_path: '1pw5QulgmpILNEJomdadrc8TXJT8Y83oM',
      nombre: 'Mario Bross Muñeco $45.000',
      color: '#98f6a9',
      producto: 'Niños',
      prod: 'filter-nin'
    },
  ]

  const listPapeleria = [
    {
      url_path: '1N0eicyqL8oKCCPesicdx_u4Imb-VSHh9',
      nombre: 'Borrador Gata $8.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1ImK9ttbkZn3ii3buXKA-lYn9qstHn3Q6',
      nombre: 'Borrador Gato $9.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1ajIfMG4aB3YBoIUJbvwD8vj2qsgr1EeZ',
      nombre: 'Borrador Animales $6.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1NMIRB0TO7WQLgNCAP71BmGN9LYdEy-Bu',
      nombre: 'Borrador Barra Cerdito $3.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1aW0ELzAso7JO7aR5e0DIWYL5tO1PDpGO',
      nombre: 'Borrador Aguacate $4.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '109GpGGV8m94BVt7O9zEOocieXg-0iWmD',
      nombre: 'Borrador Unicornio $4.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1qOpU-xmoRljCmKbcB-uzgLFFMZ6bk3hI',
      nombre: 'Borrador Gata $4.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1WlaYTPuN7RZlVNAVwLI88ihK8nSfIFCU',
      nombre: 'Borrador Fruta $4.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1KzyNx0L17rWqs_yikoer9XuGAOu7xwlV',
      nombre: 'Borrador Lapiz Frozen $3.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1K_th2LiuqQKWxCauhVS75Pp605m8RWh3',
      nombre: 'Borrador Marranita $9.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1lC0COYwiaXzF-GU90z0GMVzFQ0inRluR',
      nombre: 'Tijeras Oso $8.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1EM2iWieajttC61noC_xypY-ipTx8pxyl',
      nombre: 'Pegante Gatito $8.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1H5EJ1sDsXbyKRY3KgOnn97DwJMM1Kjen',
      nombre: 'Pegante Conejo $8.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1q2FM6LFrvIlj4eZGL9ANRwKxI6aGK-nE',
      nombre: 'Pegante Gatos $8.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1-90BtfmiJ47yJY3PWMAtmYOFfQWwAKLk',
      nombre: 'Resaltador Dulce X10 $28.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1vVarGj1zxJmg5CrVu225lzkIQYy3W6uT',
      nombre: 'Resaltador Unicornio $12.500',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1peFYfBUnFFdB-MGEwEcrC3z4BkGnlqtf',
      nombre: 'Resaltador Aguacate $10.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '198lOfOPjZOts03dPa5IoNbkwiJXFfhGX',
      nombre: 'Resaltador Escarcha X6 $12.500',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1iv6EXkK1btiLzkc5KoWs8SduE9B8G-W8',
      nombre: 'Resaltador Oso X6 $12.500',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '11DjTo43JaYD8ZgMCujU03CyB66iwlpjn',
      nombre: 'Resaltador Astronauta X6 $12.500',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1haKDSLVxd1KLRE2j8-OJzglqpwZ5vbIo',
      nombre: 'Resaltador Cabeza X6 $12.500',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1D8g4QBLelqkxTobFuGWAIHCBgbxlt8I0',
      nombre: 'Resaltador Lapiz X6 $9.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1Fw3HKgnXDXSjBY-Wcdjdg9j1qHPFSgBM',
      nombre: 'Resaltador $12.500',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1bbL3KykJkh9od5kYmwJF8blNMNqLNrFX',
      nombre: 'Cinta Aguacate $5.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '18IoNhfauFEaBXhFbNCsol5pwFXv64p5N',
      nombre: 'Cinta de Corrección $17.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '14Dc2E4gVl1YLDNdsFhVTVh55jEvW09qb',
      nombre: 'Corrector Garra Squishy $17.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1bGvOw6J6WFbEjlO4C2nrCadcNf5r8lqo',
      nombre: 'Corrector Cohete Squishy $18.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1v2CuO2URfrL5XnRCzriBK0yX5VGnsFmV',
      nombre: 'Corrector Squishy $16.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1HWqSEuAYP9uax01F2J4SbmRjRSkg0In5',
      nombre: 'Corrector doble función $15.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1etlOSgOE7SwSCN3hoIIUIaslvJkwt0N3',
      nombre: 'Corrector liquido $3.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1MhJMVAKkaLJ8MnmvoQmx4oRTDpfjkRp9',
      nombre: 'Cosedora con Grapa $12.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1GCGLUrFDpDVEmZVOHc317dHQaLDmY694',
      nombre: 'Regla Astronauta $1.500',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1ZJQf996ux0oKEs4LxUrC8N8VXVjv0p9A',
      nombre: 'Esfero Escarchado X6 $10.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1Jwwkmm-siGOpy7rquhUYhp7OPFdh-vxA',
      nombre: 'Esfero Squishy Cerdito $12.500',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1eG63ZTrV1Qp-EL4IcpBNB_G31AHCUdDQ',
      nombre: 'Esfero Squishy $12.500',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1kTDoN7RTv8ftAnPiEO2EKf8skf6NDmPG',
      nombre: 'Poli Antiestres $10.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1f7vERMBKY8RDsUuqkDms6yTAoyHtIfDc',
      nombre: 'Esfero Perro $5.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '127PkCT16QQHS9rblnFu18da9-mg4Ey0c',
      nombre: 'Esfero Gata Pez $3.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1a_dH8wTda9ojzVtje5G5OuHgxVNgR8-H',
      nombre: 'Esfero Cerdito corona $3.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '17FnJRWIrZdP2DKhHq4atdScLT-SCgcSL',
      nombre: 'Esfero Postre $4.500',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1MQI_oR_uyc3xWrPFvrNV1sSzNzLKU-8h',
      nombre: 'Esfero Panda $2.500',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1a9hfghDdj7bBtO96Wx3ZxI99JDVxFug_',
      nombre: 'Esfero Gato $2.500',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1i8CzHL_CENtLVjqEThzg7Rt-IMpKO0G3',
      nombre: 'Esfero Conejo $2.500',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1kgOjpfwkFoHM04tKVp6Ey45uqaJ9xZGG',
      nombre: 'Esfero Gatos $2.500',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1ya-zf-F2NOgFj1dy1SsJj0rMXlNWf1dA',
      nombre: 'Esfero Aguacate $6.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1L-op47HfgRfMTGHFlx3NGYPPd8hF6EY6',
      nombre: 'Esfero Galleta',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1TPs9dlxaXTh9h0ch4jKJhQhf_5rg0_ka',
      nombre: 'Esfero Animalitos $3.500',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1vTqUTwjKiBKJzpeHMX50UPNtfG8kT0m_',
      nombre: 'Esfero Resorte cerdito $3.500',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1OPXi07zuqBa_E4qF56knKDhL3bvDb4x4',
      nombre: 'Esfero Totoro $3.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1Bya7maZmw_hzhQR9HGCV6NO1Fdcor4MK',
      nombre: 'Esfero Escarchado $6.000 ',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1xzA6lXIMMSmdwSQfA0szUv5kQ7IwnmsK',
      nombre: 'Esfero Helado $6.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1syWpUWzgQwnf2ksS6TaQiqT8VMS90rQz',
      nombre: 'Esfero Monstruo $6.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '18wBFRGHOGWMXf30W7g8Z_M1o8klaCEcn',
      nombre: 'Esfero Astronauta $8.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1VicqmgGdWUay60lyNrfjDB2K42Lf3T4d',
      nombre: 'Esfero Garra $8.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '11pyGQvjyt7v4yR3vCUGGeyH5TNTGt5Nx',
      nombre: 'Esfero panda con luz $6.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1Mm2-lqMgdP16gDXQU0lC8OYzOah2xnsz',
      nombre: 'Esfero Raton $9.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1hbdC5uY37W55n4raG-hdc5Hlvf_DU32v',
      nombre: 'Esfero cerdito 8.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1jQYQx5ancsN0g8RZ-CxAYGZFmzFXWyBp',
      nombre: 'Esfero Totoro $6.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '12dc3ESBX7AQkITIoIXmc-B0SyQm1RRPG',
      nombre: 'Esfero panda Multiminas $7.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1v7b2JQQ_nSAraDPRr9aej5vshnq2FPY8',
      nombre: 'Esfero cerdito Multiminas $6.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1oUpQE_uecTbu7P-4w_7MTr5BuY3oUPJx',
      nombre: 'Screenshot from 2022-11-21 16-58-04',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1dcnH5AF4yXEjvq8qOE2JkY46-APmXU22',
      nombre: 'Set Escolar niño $8.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1uYEcD0VmYR46TLTBwfU9YHk9mev0LNyH',
      nombre: 'Set Escolar Princesa $25.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '14ssOEV1T4_ncOoDWg4zjGfAaM7Z_Jr8y',
      nombre: 'Set Estuche x6 $3.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1y1X_m68PHRPajhYDJQcl5YpwbvHRy77-',
      nombre: 'Set Escolar Conejo X5 $3.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1LhfiErjRNjLpadmUgpdzFMpRB2_H7JM1',
      nombre: 'Set Escolar Kawaii X5 $3.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1LdBHMyjJd1wpCyvD1xYluFPi_mfRyX6G',
      nombre: 'Set Escolar X5 $3.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '19zauFfBKP3dh7K5vJ-y6fUpIUn4yVtdI',
      nombre: 'Esfero Gata Squishy $10.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '18JOgg27uCteDmC9qXW33nk8S9oF_VolG',
      nombre: 'Esfero Panda Squishy $10.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1c7PhHHaZqsvye0o7ko_DF1IDoa8OnwBZ',
      nombre: 'Esfero cactus $13.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
    {
      url_path: '1qt3TCPcE91D5peOzmtTlrBxog7THMl5x',
      nombre: 'Esfero Marranita 6.000',
      color: '#fdcae1',
      producto: 'Papeleria',
      prod: 'filter-pap'
    },
  ]

  const listLamparas = [
    {
      url_path: '1GCT88EW0xkMAhVXzVSrCDTGTrUBMDjDy',
      nombre: 'Ventilador Lámpara cerdito $17.000',
      color: '#84b6f4',
      producto: 'Lamparas',
      prod: 'filter-lam'
    },
    {
      url_path: '1meh4HQnlXcLvjqLtPeDc9n2vR1-RMHqj',
      nombre: 'Ventilador SAKURA Cosplay $15.000',
      color: '#84b6f4',
      producto: 'Lamparas',
      prod: 'filter-lam'
    },
    {
      url_path: '1uFZ9AxXyH-j5KTui_8yOSrhwBWyL-5ct',
      nombre: 'Ventilador Espejo Animales $18.000',
      color: '#84b6f4',
      producto: 'Lamparas',
      prod: 'filter-lam'
    },
    {
      url_path: '1YLeDy0XL0iGGFPszwz92n5k3UW-iSycd',
      nombre: 'Humificador Aimales $50.000',
      color: '#84b6f4',
      producto: 'Lamparas',
      prod: 'filter-lam'
    },
    {
      url_path: '1RU_4ARDsW4fgOgvCgC8pLuKAZdVxV4Iw',
      nombre: 'Humificadir Gato $48.000',
      color: '#84b6f4',
      producto: 'Lamparas',
      prod: 'filter-lam'
    },
    {
      url_path: '1wNFRzQ6pSDuWygtUmIN9XSin6so9GB0i',
      nombre: 'Humificadior Gato $45.000',
      color: '#84b6f4',
      producto: 'Lamparas',
      prod: 'filter-lam'
    },
    {
      url_path: '1INFQqwJFfkhFSE9zoFWnltPR9DIemH6A',
      nombre: 'Humificador Oso-Conejo $35.000',
      color: '#84b6f4',
      producto: 'Lamparas',
      prod: 'filter-lam'
    },
    {
      url_path: '1IGs9jO4WF6N1jgx8zyVZ-DM2hD9UFmtu',
      nombre: 'Lampara Avion $40.000',
      color: '#84b6f4',
      producto: 'Lamparas',
      prod: 'filter-lam'
    },
    {
      url_path: '1fGQUXS5QCyjOfxmen50NMvB5D2V277L_',
      nombre: 'Lampara de Noche Raton $40.000',
      color: '#84b6f4',
      producto: 'Lamparas',
      prod: 'filter-lam'
    },
    {
      url_path: '1rcyN3yjcONjhT759WhZXvd3mmZW6cxtm',
      nombre: 'Lampara Silicona Huellas $40.000',
      color: '#84b6f4',
      producto: 'Lamparas',
      prod: 'filter-lam'
    },
    {
      url_path: '1M8zIEdTdS1WqNsDfziGhA7GQSBtYqUwE',
      nombre: 'Lampara Elefante $20.000',
      color: '#84b6f4',
      producto: 'Lamparas',
      prod: 'filter-lam'
    },
    {
      url_path: '1Kk0QIPgm_uV9eZ766BW8jKZYzrvGkNDo',
      nombre: 'Lampara de Mesa-Jirafa $20.000',
      color: '#84b6f4',
      producto: 'Lamparas',
      prod: 'filter-lam'
    },
    {
      url_path: '1r2sgQknjC6btbyhPOa4JAixAQojpVOMu',
      nombre: 'Lampara Garra $22.000',
      color: '#84b6f4',
      producto: 'Lamparas',
      prod: 'filter-lam'
    },
    {
      url_path: '1b_rGqXNWDbHl94ed2FOz-4Dmm7ktareH',
      nombre: 'Lampra Gato $20.000',
      color: '#84b6f4',
      producto: 'Lamparas',
      prod: 'filter-lam'
    },
    {
      url_path: '1imFtVVwnv9xyHiNj6iRg-D5oGDNc9-xs',
      nombre: 'Lampara Trofeo con Control $35.0000',
      color: '#84b6f4',
      producto: 'Lamparas',
      prod: 'filter-lam'
    },
    {
      url_path: '1qxbPnBdtObOwf5xo_qw04XI3vRcWzsLt',
      nombre: 'Lampara con Control $45.000',
      color: '#84b6f4',
      producto: 'Lamparas',
      prod: 'filter-lam'
    },
    {
      url_path: '1BAawTARuebCDRQIaCLpoLXrKpUi7NQ8e',
      nombre: 'Mini Aro de Luz para Celular-Osito $12.000',
      color: '#84b6f4',
      producto: 'Lamparas',
      prod: 'filter-lam'
    },
    {
      url_path: '1Qv5JccLSfzvmxec1QKMetjyQ3RCx8wa8',
      nombre: 'Aro de Luz Espejo $25.000',
      color: '#84b6f4',
      producto: 'Lamparas',
      prod: 'filter-lam'
    },
    {
      url_path: '1xvFNHFt3WXJQNDzTsxKI24gbT-AZ-WWd',
      nombre: 'Ventilador Espejo Cute $20.000',
      color: '#84b6f4',
      producto: 'Lamparas',
      prod: 'filter-lam'
    },
  ]

  const listAgendas = [
    {
      url_path: '1hdwrcjXQ7rqA7LY7A3xn11334CRYZYB8',
      nombre: 'Agenda cerdito $ 28.000',
      color: '#ff6961',
      producto: 'Agendas',
      prod: 'filter-age'
    },
    {
      url_path: '1UgmcpJcRGblnNI0aNiTuoFOxCNko2R2m',
      nombre: 'Agenda blanco y negro $18.000',
      color: '#ff6961',
      producto: 'Agendas',
      prod: 'filter-age'
    },
    {
      url_path: '1Pt2zQXVjWE7VhAMKnQ_wK_qWoDp4RBlm',
      nombre: 'Agenda Mickey Mouse $43.000',
      color: '#ff6961',
      producto: 'Agendas',
      prod: 'filter-age'
    },
    {
      url_path: '1YYRLMhROPniEArM7goLr6IKprNOYoECu',
      nombre: 'Agenda Cute $18.000',
      color: '#ff6961',
      producto: 'Agendas',
      prod: 'filter-age'
    },
    {
      url_path: '19qfk5Hptc8m5qCAdKpjC6O0X9SUjqCrB',
      nombre: 'Agenda Principito $30.000',
      color: '#ff6961',
      producto: 'Agendas',
      prod: 'filter-age'
    },
    {
      url_path: '1mnMV8XlwqlyoZk_DvIe7VfJGwDAv_IlY',
      nombre: 'Agenda Marranita $17.000',
      color: '#ff6961',
      producto: 'Agendas',
      prod: 'filter-age'
    },
    {
      url_path: '15n7SjCjl_nsmtTGUUaWbP615GBaK6GVf',
      nombre: 'Agenda Postres $18.000',
      color: '#ff6961',
      producto: 'Agendas',
      prod: 'filter-age'
    },
    {
      url_path: '1qA04se9Zy1-PiiG6zAVMgEbfQRXPvWQC',
      nombre: 'Agenda Squishi $33.000',
      color: '#ff6961',
      producto: 'Agendas',
      prod: 'filter-age'
    },
    {
      url_path: '1EzuhKMlpri4mMbfle7Hg8tp_yYhGemh9',
      nombre: 'Agenda gato $20.000',
      color: '#ff6961',
      producto: 'Agendas',
      prod: 'filter-age'
    },
  ];


  const getProduct = async (list, prod) => {
    return new Promise((resolve, reject) => {
      list.forEach(element => {
        const producto = document.getElementById(prod);
        const $article = document.createElement("div");
        $article.setAttribute('class', `img-container col-lg-4 col-md-6 portfolio-item`);

        const $div = document.createElement("div");
        $div.setAttribute('class', 'portfolio-wrap');

        const $img = document.createElement("img")
        $img.setAttribute('class', 'img-fluid');
        $img.setAttribute('src', `https://drive.google.com/uc?export=view&id=${element.url_path}`);
        $img.setAttribute('alt', '');

        const $div_portafolio = document.createElement("div");
        $div_portafolio.setAttribute('class', 'portfolio-links');

        const $a = document.createElement("a");
        $a.setAttribute('class', 'portfolio-lightbox');
        $a.setAttribute('style', `background: ${element.color}`);
        $a.setAttribute('href', `https://drive.google.com/uc?export=view&id=${element.url_path}`);
        $a.setAttribute('data-gallery', 'portfolioGallery');

        const $i = document.createElement("i");
        $i.setAttribute('class', 'bx');
        $i.setAttribute('style', `color: #000; font-family: sans-serif; font-size: 20px`);
        $i.textContent = element.nombre;

        $a.appendChild($i);
        $div_portafolio.appendChild($a);
        $div.appendChild($img);
        $div.appendChild($div_portafolio);
        $article.appendChild($div);
        producto.appendChild($article);

      });

      resolve(list);
    })
  }

  const setClass = () => {
    const loader = document.getElementById("loader");
    loader.setAttribute('class', `loader`);
  }

  if (document.getElementById("detalles")) {
    setClass();
    getProduct(listDetalles, "detalles");
  }

  if (document.getElementById("vasostermo")) {
    setClass();
    getProduct(listVasostermos, "vasostermo");
  }

  if (document.getElementById("pocillo")) {
    setClass();
    getProduct(listPocillos, "pocillo");
  }

  if (document.getElementById("nino")) {
    setClass();
    getProduct(listNinos, "nino");
  }

  if (document.getElementById("lampara")) {
    setClass();
    getProduct(listLamparas, "lampara");
  }

  if (document.getElementById("papeleria")) {
    setClass();
    getProduct(listPapeleria, "papeleria");
  }

  if (document.getElementById("agenda")) {
    setClass();
    getProduct(listAgendas, "agenda");
  }

  if (document.getElementById("funko")) {
    setClass();
    getProduct(listFunko, "funko");
  }

})()