document.addEventListener("DOMContentLoaded", function() {

  // Lazyload
  document.querySelectorAll('img').forEach( (e) => {
    e.classList.add('lazy');
  })
  let lazyLoadInstance = new LazyLoad();

  // Scroll to section
  document.querySelectorAll('a[href^="#"').forEach (link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href').substring(1);
      const scrollTarget = document.getElementById(href);
      let topOffset = 0;
      const elementPosition = scrollTarget.getBoundingClientRect().top;
      const offsetPosition = elementPosition - topOffset;
      smoothScroll(e);
      function smoothScroll(e) {
        const startPosition = window.pageYOffset;
        const distance = offsetPosition;
        const duration = 800;
        let start = null;
        window.requestAnimationFrame(step);
        function step(timestamp) {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
          if (progress < duration) window.requestAnimationFrame(step);
        }
      }
      // Easing Functions
      function linear(t, b, c, d) {
        return c*t/d + b;
      };
      function easeInOutQuad(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
      };
      function easeInOutCubic(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t + 2) + b;
      };
    });
  });

  //  Search form
  const searchOpen = document.querySelector('.header__search-open');
  const searchClose = document.querySelector('.search-form__btn-close');
  const searchForm = document.querySelector('.search-form');
  searchOpen.addEventListener('click', function (e) {
    this.setAttribute('disabled', 'true');
    searchForm.classList.add('active');
  });
  searchClose.addEventListener('click', function (e) {
    e.preventDefault();
    searchOpen.removeAttribute('disabled');
    searchForm.classList.remove('active');
  });

  // Mobile menu
  const menuBtnOpen = document.querySelector('.header-menu__btn');
  const menuBtnClose = document.querySelector('.header-menu__btn-close');
  const mobMenu = document.querySelector('.header-menu__list');

  menuBtnOpen.addEventListener('click', () => {
    mobMenu.classList.add('active');
  });
  menuBtnClose.addEventListener('click', () => {
    mobMenu.classList.remove('active');
  });

  // Map
  const addressInfo = document.querySelector('.contacts-content');
  const addressInfoClose = document.querySelector('.contacts-content__btn-close');
  addressInfoClose.addEventListener('click', () => {
    addressInfo.classList.remove('active');
  });
  ymaps.ready(init);
  function init(){
    // Создание карты.
    let myMap = new ymaps.Map("map", {
      center: [55.76389254998015,37.62902179178234],
      zoom: 13.2,
      controls: []
    });
    var myPlacemark = new ymaps.Placemark([55.76953456898229,37.63998549999998], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/location.svg',
      iconImageSize: [12, 12]
    });
    myMap.geoObjects.add(myPlacemark);
    myPlacemark.events.add('click', () => {
      if (!addressInfo.classList.contains('active')) {
        addressInfo.classList.add('active');
      }
    });
  };

  // Form validation
  new JustValidate(".form-subscribe", {
    colorWrong: '#f06666',
    rules: {
      email: {
        required: true,
        strength: {
          custom: '/^[^ ]+@[^ ]+\.[a-z]{2,3}$/'
        }
      }
    },
    messages: {
      email: {
        required: 'Поле является обязательным',
        strength:'Недопустимый формат'
      }
    }
  });
  /////////  contacts-form  /////////
  new JustValidate(".contacts-form", {
    colorWrong: '#ff3030',
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 30,
        strength: {
          custom: '[A-Za-zА-Яа-яёЁ]'
        }
      },
      email: {
        required: true,
        strength: {
          custom: '/^[^ ]+@[^ ]+\.[a-z]{2,3}$/'
        }
      }
    },
    messages: {
      name: {
        required: 'Поле является обязательным',
        minLength:'Имя слишком короткое',
        maxLength: 'Имя слишком длинное',
        strength:'Недопустимый формат'
      },
      email: {
        required: 'Поле является обязательным',
        strength:'Недопустимый формат'
      }
    }
  });
})
