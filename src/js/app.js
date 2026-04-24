import * as flsFunctions from "./modules/functions.js";
import "./modules/jquery-3.7.1.min.js";
import { Fancybox } from "./modules/fancybox.esm.js";
import "./modules/select2.min.js";
import "./modules/bootstrap.bundle.min.js";
import './components.js';

flsFunctions.isWebp();

Fancybox.bind("[data-fancybox]", {
  closeButton: false,
});

// Import swiper
import Swiper, { Navigation, Pagination, Autoplay, Mousewheel, EffectFade, Thumbs, Scrollbar } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay, Mousewheel, EffectFade, Thumbs, Scrollbar]);


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

let sortBtn = document.querySelector('.sortBtn');
let sortBlock = document.querySelector('.sortBlock');
sortBtn.addEventListener('click', () => {
  sortBlock.classList.toggle('active');
});

document.addEventListener('click', e => {
	let target = e.target;
	let its_sort_btn = target == sortBtn || sortBtn.contains(target);
	let its_sort_block = target == sortBlock || sortBlock.contains(target);

	if (!its_sort_btn && !its_sort_block) {
		sortBlock.classList.remove('active');
	}
});