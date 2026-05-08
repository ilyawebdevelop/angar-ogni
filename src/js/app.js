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

let inputs = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask({
  mask: '+7 (999) 999-99-99',
  onBeforeWrite: function (event, buffer, caretPos, opts) {
    // console.log(caretPos);
    // Проверяем:
    // 1. Позиция каретки (caretPos) равна 5 (вторая цифра в "99")
    // 2. Нажата клавиша "8"
    if (caretPos === 5 && event.key === '8') {
      event.preventDefault(); // Запрещаем ввод     
      // console.log("Ввод 8 в этой позиции запрещен!");
      return {
        refreshFromBuffer: true,
        buffer: [],
        caret: 4
      };
    }
  },
  onBeforePaste: function (pastedValue, opts) {
    // Удаляем всё, кроме цифр
    var processedValue = pastedValue.replace(/\D/g, "");

    // Если первая цифра 7 или 8 и в строке 11 цифр, убираем первую
    if (processedValue.length === 11 && (processedValue[0] === '7' || processedValue[0] === '8')) {
      return processedValue.substring(1);
    }

    return pastedValue;
  }

});

im.mask(inputs);

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
  let enter = el.closest('.searchW').querySelector('.headerSearchEnter');
  let clearValue = el.closest('.searchW').querySelector('.search-clear');
  el?.addEventListener('input', (event) => {
    clearValue?.classList.add('active');
    if (enter) {
      enter.style.display = 'none';
    }

  });

  clearValue?.addEventListener('click', () => {
    el.value = '';
    el.focus();
    clearValue?.classList.remove('active');
    if (enter) {
      enter.style.display = 'block';
    }

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
      // console.log(el);
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

  const footer = document.querySelector('.footer');
  const footerActionBlock = document.querySelector('.footerAction');

  if (!footer) {
    console.error('Элемент с классом .footer не найден.');
  }
  if (!footerActionBlock) {
    console.warn('Элемент с классом .footerAction не найден. Условие скрытия футера не будет работать.');
  }

  let lastScrollTop = 0;
  let footerIsHidden = false;

  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.body.scrollHeight; // Общая высота документа
    const windowHeight = window.innerHeight; // Высота видимой области окна

    // Определяем, достигли ли мы самого низа экрана (с небольшим запасом, например 50px)
    const isAtBottomOfScreen = scrollTop + windowHeight >= scrollHeight - 50;

    const isFooterActionShown = footerActionBlock && footerActionBlock.classList.contains('show');

    if (scrollTop > lastScrollTop && scrollTop > 100) { // Скролл вниз
      // Скрываем футер, ТОЛЬКО ЕСЛИ:
      // 1. Он еще не скрыт (!footerIsHidden)
      // 2. Блок footerAction НЕ отображается (!isFooterActionShown)
      // 3. Мы НЕ находимся в самом низу экрана (!!!isAtBottomOfScreen)
      if (!footerIsHidden && !isFooterActionShown && !isAtBottomOfScreen) {
        footer.classList.add('is-hidden');
        footerIsHidden = true;
      }
      // Если мы внизу экрана, но футер все еще был скрыт, показываем его
      else if (isAtBottomOfScreen && footerIsHidden) {
        footer.classList.remove('is-hidden');
        footerIsHidden = false;
      }
    } else if (scrollTop < lastScrollTop || scrollTop <= 100) { // Скролл вверх или начало страницы
      // Показываем футер, ЕСЛИ он был скрыт
      // (Нет необходимости проверять footerAction, так как при скролле вверх он должен быть виден)
      if (footerIsHidden) {
        footer.classList.remove('is-hidden');
        footerIsHidden = false;
      }
    }

    lastScrollTop = scrollTop;
  }

  window.addEventListener('scroll', handleScroll);

  // Изначальная проверка состояния
  handleScroll();

}
if (mediaQueryMax991.matches) {
  jQuery('.mobileNavHead').click(function (event) {
    event.preventDefault(); // Запретить переход
    jQuery(this).toggleClass('active');
    jQuery(this).siblings('.mobileNavBody').slideToggle();
  });
}


function fixHeader() {
  if ($(document).scrollTop() > $('.header').offset().top + $('.header').outerHeight()) {
    $('.header__fxd').addClass('_fixed');
    setTimeout(function () {
      $('.header__fxd').addClass('_show');
    }, 50);
  } else {
    $('.header__fxd').removeClass('_fixed _show');
  }
}

$(window).on('load scroll', function () {
  if ($('.header__fxd').length > 0) fixHeader();
});

let headerSearchBtnAll = document.querySelectorAll('.headerSearchBtn');
let headerSearchField = document.querySelector('.search-action-field');
headerSearchBtnAll.forEach(el => {
  el.addEventListener('click', () => {
    el.classList.toggle('active');
    headerSearchField.classList.toggle('active');
  });
});

// Находим все обертки блоков
const fileWraps = document.querySelectorAll('.fileWrap');

fileWraps.forEach(wrap => {
  // Ищем элементы только внутри текущего блока
  const input = wrap.querySelector('.fileInput');
  const output = wrap.querySelector('.fileOutput');
  const defaultText = "Прикрепить фото или файл";

  input.addEventListener('change', function () {
    if (this.files && this.files.length > 0) {
      // Берем имя первого выбранного файла
      output.textContent = this.files[0].name;
    } else {
      // Возвращаем текст по умолчанию, если файл не выбран
      output.textContent = defaultText;
    }
  });
});

if (document.querySelector('.posts')) {
  let ias = new InfiniteAjaxScroll('.posts', {
    item: '.post',
    next: '.next',
    pagination: '.pagination',
    spinner: '.spinner',

    // alternatively we can pass an Element
    spinner: document.getElementById('spinner1'),
  })
}
