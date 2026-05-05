import * as flsFunctions from "./modules/functions.js";
import "./modules/jquery-3.7.1.min.js";
import AirDatepicker from 'air-datepicker';
import { Fancybox } from "./modules/fancybox.esm.js";
import "./modules/select2.min.js";
import "./modules/bootstrap.bundle.min.js";
import "./modules/inputmask.min.js";
import './components.js';

flsFunctions.isWebp();

Fancybox.bind("[data-fancybox]", {
  closeButton: false,
});

// Import swiper
import Swiper, { Navigation, Pagination, Autoplay, Mousewheel, EffectFade, Thumbs, Scrollbar } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay, Mousewheel, EffectFade, Thumbs, Scrollbar]);

let calendarArray = document.querySelectorAll('.calendar');
calendarArray.forEach(el => {
  // air datepicker
  new AirDatepicker(el, {
    minDate: new Date(),
    autoClose: true,
    position: 'bottom right',
  });

  Inputmask("datetime", {
    inputFormat: "dd.mm.yyyy",
    placeholder: "ДД.ММ.ГГГГ",
    leapday: "29-02-",
    separator: ".",
    alias: "dd/mm/yyyy"
  }).mask(el);
});

new Swiper($('.headerMarquee')[0], {
  slidesPerView: 'auto',
  spaceBetween: 45,
  speed: 15000,
  watchOverflow: true,
  loop: true,
  autoplay: {
    delay: 0,
  },
  allowTouchMove: false,
  watchSlidesProgress: true,
  a11y: false,
  breakpoints: {
    0: {
      spaceBetween: 12,
    },
    991: {
      spaceBetween: 45,
    },
  },
});

const actionButton = document.querySelector('.footerActionBtn');
actionButton?.addEventListener('click', () => {
  setTimeout(function () {
    // Прокручиваем к самому низу документа
    window.scrollTo({
      top: document.body.scrollHeight, // Прокрутить до конца документа
      behavior: 'smooth' // Плавная анимация прокрутки
    });
  }, 300); // 1000 миллисекунд = 1 секунда
});

window.addEventListener('resize', () => {
  $('.select-field').select2({
    maximumInputLength: 20 // only allow terms up to 20 characters long
  });
});

$(document).ready(function () {
  $('.select-field').select2({
    maximumInputLength: 20 // only allow terms up to 20 characters long
  });
});

// Burger
const btnMenu = document.querySelector('#toggle');
// const searchMenuBtnAll = document.querySelectorAll('.searchMobileAction');
const menu = document.querySelector('.headerNav');
// const searchMenu = document.querySelector('.headerSearchMobile');
const bodyEl = document.querySelector('body');
const btnClose = document.getElementById('headerNavMobileClose');
// const searchClose = document.querySelector('.headerSearchMobileClose');

const toggleMenu = function () {
  menu.classList.toggle('active');
}
const toggleBurger = function () {
  btnMenu.classList.toggle('active');
}
const bodyOverflow = function () {
  bodyEl.classList.toggle('hidden');
}
const menuClose = function () {
  toggleBurger();
  bodyOverflow();
  toggleMenu();
}

btnMenu?.addEventListener('click', function (e) {
  e.stopPropagation();
  toggleMenu();
  toggleBurger();
  bodyOverflow();
});

btnClose?.addEventListener('click', function (e) {
  menuClose();
});


let sortBtn = document.querySelector('.sortBtn');
let sortBlock = document.querySelector('.sortBlock');
sortBtn?.addEventListener('click', () => {
  sortBlock.classList.toggle('active');
});

let sortBlockClose = document.querySelector('.sortBlockClose');
sortBlockClose?.addEventListener('click', () => {
  sortBlock.classList.remove('active');
});

let filterBtn = document.querySelector('.filterBtn');
let filterBlock = document.querySelector('.filter-action');
filterBtn?.addEventListener('click', () => {
  filterBlock.classList.toggle('active');
});
let filterBlockClose = document.querySelector('.filterBlockClose');
filterBlockClose?.addEventListener('click', () => {
  filterBlock.classList.remove('active');
});

document.addEventListener('click', e => {
  let target = e.target;
  let its_sort_btn = target == sortBtn || sortBtn?.contains(target);
  let its_sort_block = target == sortBlock || sortBlock?.contains(target);
  let its_filter_btn = target == filterBtn || filterBtn?.contains(target);
  let its_filter_block = target == filterBlock || filterBlock?.contains(target);

  if (!its_sort_btn && !its_sort_block) {
    sortBlock?.classList.remove('active');
  }
  if (!its_filter_btn && !its_filter_block) {
    filterBlock?.classList.remove('active');
  }
});

// Инициализация слайдера galSlider
document.querySelectorAll('.articleSlider').forEach(n => {
  const mySwiperArticleGal = new Swiper(n, {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 600,
    loop: true,
    // autoplay: true,
    navigation: {
      prevEl: n.querySelector('.navArrowPrev'),
      nextEl: n.querySelector('.navArrowNext'),
    },
    thumbs: { // указываем на превью слайдер
      swiper: {
        el: n.closest('.sliderW').querySelector('.articleThumbSlider'),
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 600,
        loop: true,
        watchSlidesProgress: true,
      }
    },
  });
});

// search clear
let searchInputArray = document.querySelectorAll('.formInput--search');
searchInputArray.forEach(el => {
  let clearValue = el.closest('.searchW').querySelector('.search-clear');
  el?.addEventListener('input', (event) => {
    clearValue?.classList.add('active');
  });

  clearValue?.addEventListener('click', () => {
    el.value = '';
    el.focus();
    clearValue?.classList.remove('active');
  });

});


const mediaQueryMin992 = window.matchMedia('(min-width: 992px)');
const mediaQueryMax991 = window.matchMedia('(max-width: 991px)');
if (mediaQueryMin992.matches) {
  function allMenuArray() {
    let menuLinkArray = document.querySelectorAll('.menu-has-children>a');
    menuLinkArray.forEach(el => {
      el.classList.remove('active');
    });
  }

  let menuLinkArray = document.querySelectorAll('.menu-has-children>a');
  menuLinkArray.forEach(el => {
    el.addEventListener('click', (e) => {
      allMenuArray();
      e.preventDefault();
      let menu = el.closest('.menu-has-children').querySelector('.sub-menu');
      el.classList.toggle('active');
      menu.classList.toggle('active');
      console.log(el);
    });
  });

  document.addEventListener('click', e => {
    let target = e.target;

    menuLinkArray.forEach(el => {
      let menu = el.closest('.menu-has-children').querySelector('.sub-menu');
      let its_link = target == el || el?.contains(target);
      let its_menu = target == menu || menu?.contains(target);

      if (!its_link && !its_menu) {
        el.classList.remove('active');
        menu.classList.remove('active');
      }
    });

  });
}
if (mediaQueryMax991.matches) {
  jQuery('.mobileNavHead').click(function () {
    jQuery(this).toggleClass('active');
    jQuery(this).siblings('.mobileNavBody').slideToggle();
  });
}




