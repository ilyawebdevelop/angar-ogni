import * as flsFunctions from "./modules/functions.js";
import "./modules/jquery-3.7.1.min.js";
import "./modules/fslightbox.js";
import "./modules/bootstrap.bundle.min.js";
import './components.js';

flsFunctions.isWebp();

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