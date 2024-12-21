// Variables ==================================================================
let $window = $(window),
  $header = $('header'),
  $body = $('body'),
  rwd = 992,
  isMobile = $('.hd-toggle').is(':visible');

// judge IE
function browserIE() {
  let browser = navigator.userAgent;
  let browserVerify = browser.toLowerCase().match(/rv:([\d.]+)\) like gecko/);
  let bie = browserVerify;
  // console.log('ans: ' + bie);

  if (bie != null){
    $('body').addClass('is-ie11');
  }

  return bie;
}

function reloadPage() {
  //因架構變化，resize trigger reload
  let wW = $(window).width();
  let trigger_size = [575, 768, 992, 1024, 1200, 1366, 1440, 1680];
  $(window).resize(function () {
    trigger_size.forEach(function (ele) {
      if (wW > ele) {
        $(window).width() <= ele ? location.reload() : "";
      } else {
        $(window).width() > ele ? location.reload() : "";
      }
    });
  });
}

// Click
let clickFunction = {
  gotop: function (bk, btn) {

    $(window).scroll(function () {

      let threshold = $(document).height() - $(window).height() - $('footer').height();

      if ($(window).scrollTop() > 0) {
        $(bk).addClass('is-show');

        if ($(window).scrollTop() >= threshold) {
          $(bk).removeClass('is-move');
        } else {
          $(bk).addClass('is-move');
        }
      } else {
        $(bk).removeClass('is-show');
      }

    });

    $(bk).find(btn).click(function () {
      $("html, body").animate({
        scrollTop: 0
      }, 500, 'swing');
    });
  },
  back: function (ele) {
    $(ele).click(function () {
      history.back();
    });
  },
}

// LockScroll
function lockScroll() {
  $body.addClass('u-scroll:no fancybox-active compensate-for-scrollbar');
};
function unlockScroll() {
  $body.removeClass('u-scroll:no fancybox-active compensate-for-scrollbar');
}
function bodyLock() {
    $('body').toggleClass('u-scroll:no');
  }

// Edit
function mdEdit(ele) {
  let el = $(ele);
  
  el.find('table').wrap('<div class="u-scroll-x"></div>');
  el.find('iframe[src*="youtube"]').wrap('<div class="u-yt"></div>')
}

// Menu
function menu() {
  let hd = $('.hd'),
    menuBtn = $('.hd-toggle'),
    menuCtr = $('.hd-nav'),
    menuBuildMask = $('<div class="is-mask"></div>'),
    dropdownItem = $('.menu__item'),
    dropdownList = $('.dropdown'),
    dropdownBuildBtn = $('<div class="dropdown-toggle"></div>');

  let menu = {
    click: function () {
      let btn = menuBtn,
        ctr = menuCtr,
        mask = menuBuildMask;

      mask.appendTo(hd);

      function hamburgerToggle() {
        ctr.toggleClass('is-show');
        btn.toggleClass('is-active');
        $('.hd').toggleClass('is-menuOpen');
        bodyLock();

        // other
        $('.mobile-lang-list').removeClass('is-open');
        $('.menu-search').removeClass('is-open');
      }

      btn.click(function () {
        hamburgerToggle();
      });
      hd.find('.is-mask').click(function () {
        hamburgerToggle();
      });
      $('.js-menu-close').click(function () {
        hamburgerToggle();
      });
      $('.menu_link').click(function () {
        ctr.removeClass('is-show');
        btn.removeClass('is-active');
        $('.hd').removeClass('is-menuOpen');
        $('body').removeClass('u-scroll:no');
      });

    },
    move: function () {
      let init = $(window).scrollTop();

      if (init != 0) {
        $('.hd, .hd-bg').removeClass('is-top').addClass('is-move');
        $('.job-side').removeClass('is-top').addClass('is-move');
        // console.log('menu is-move');

      } else {
        $('.hd, .hd-bg').addClass('is-top');
        $('.job-side').addClass('is-top');
        // console.log('menu is-top');
      }

      let lastScrollTop = 0;
      $(window).scroll(function () {

        if ($(window).scrollTop() > 0) {
          $('.hd, .hd-bg').removeClass('is-top');
          $('.hd, .hd-bg').removeClass('is-top').addClass('is-move');
          $('.job-side').removeClass('is-top');
          $('.job-side').removeClass('is-top').addClass('is-move');
        } else {
          $('.hd, .hd-bg').addClass('is-top')
          $('.hd, .hd-bg').addClass('is-top').removeClass('is-move');
          $('.job-side').addClass('is-top')
          $('.job-side').addClass('is-top').removeClass('is-move');
        }

        let sticky = $('.hd'),
          scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();

          // console.log(scrollBottom);

          scroll = $(window).scrollTop();

          if (scroll >= 10 && scroll < lastScrollTop) {
          if (scroll >= 0) {
              sticky.addClass('is-fadein');
          }
          } else {
            sticky.removeClass('is-fadein');
          }

          lastScrollTop = scroll;

      });
    },
    dropdown: function () {
      let item = dropdownItem,
        list = dropdownList,
        btn = dropdownBuildBtn;

      // 判斷是否有dropdown
      list.parent(item).addClass('is-dropdown');

      // 建立Toggle
      list.before(btn);

      $('.dropdown-toggle').click(function () {
        $(this).next('.dropdown').stop().slideToggle(800);
        $(this).toggleClass('is-active');
      });
    },
    active: function () {
      let _page = $('.l-wp:html').data('id');
      $('.menu__item[data-active="' + _page + '"]').find('.menu_link').addClass('active');
    },
    other: function () {
      let langChange = function () {
        if(isMobile) {
          var lagnList = $('.language-list').clone();
          lagnList.appendTo('.hd-nav__main');
          $('.hd-nav__main .language-list').addClass('mobile-lang-list');

          $('.js-mobile-lange').click(function () {
            $('.mobile-lang-list').toggleClass('is-open')
          });
        }
      }();

      let menuSearchMove = function () {
        if(isMobile) {
          $('.menu-search').appendTo('.hd');

          $('.js-search-open').click(function () {
            $('.menu-search').toggleClass('is-open');
          });

          $('.menu-search').click(function () {
            $(this).removeClass('is-open')
          });
        }
      }();
    },
    setting: function () {
      // this.active();
      this.click();
      this.move();
      // this.dropdown();
      this.other();
    }
  }
  menu.setting();

  // Search
  function search() {
      let btn = $('.hd-search_toggle'),
          bk = $('.hd-search'),
          inpt = bk.find('.hd-search_input'),
          _send = $('.hd-search_btn');

      btn.click(function () {
          bk.toggleClass('is-show');
          $('.hd').toggleClass('is-search-open');
      });
      if ($('.hd-toggle').is(':visible')) {
          inpt.attr('placeholder', '');
      }
      // inpt.click(function () {
      //     inpt.trigger('change');
      // });
      inpt.change(function () {
          let ctr = $(this).val();
          console.log(ctr);
          if (ctr !== '') {
              _send.addClass('is-show')
          }
      });
  }
  // search();

  // language
  (function language() {
    $('.language-toggle').click(function () {
      $(this).next('.language-list').stop().slideToggle(500).end().toggleClass('is-active');
    });
  }());
}

// swiper
let swiper = {
  index: function () {
    let bannerSwiper = new Swiper('.c-bn__swiper', {
        spaceBetween: 0,
        slidesPerView: 1,
        loop: true,
        autoplay: {
          delay: 3000,
        },
        speed: 2000,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        pagination: {
          el: '.c-bn__dot',
          clickable: true,
        },
        // navigation: {
        //     nextEl: '.js-btn-next',
        //     prevEl: '.js-btn-prev'
        // },
    });

    let recommendSwiper = new Swiper('.idx-recommend-swiper', {
      slidesPerView: 3,
      spaceBetween: 97,
      // mousewheel: true,
      navigation: {
        nextEl: '.idx-recommend .js-btn-next',
        prevEl: '.idx-recommend .js-btn-prev'
      },
      breakpoints: {
        1920: {
          slidesPerView: 3,
        },
        1680: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        // 1440: {
        //   slidesPerView: 2,
        //   spaceBetween: 30,
        // },
        992: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        820: {
          slidesPerView: 2,
          spaceBetween: 0,
        }
      },
    });
  },
  productsDetail: function () {
    let productsDetailSwiper = new Swiper('.product-detail-swiper', {
        spaceBetween: 0,
        slidesPerView: 1,
        loop: true,
        speed: 2000,
        pagination: {
          el: '.product-detail-info__pic .product-detail-dot',
          clickable: true,
        },
    });
  }
}

// sidebar
function sidebar() {
  let _toggle = $('.sidebar-toggle')
  let _tag = $('.sidebar')
  let _closeTag = $('.js-sidebar-close')

  _toggle.click(function () { 
    _tag.toggleClass('is-open');
    bodyLock();
  });
  _closeTag.click(function () {
    _tag.removeClass('is-open');
    bodyLock();
  });
}

// init page
function initPage() {
  browserIE();
  reloadPage();
  menu();
  clickFunction.back(".js-prev-page");
  sidebar();
}
$(document).ready(function () {
  initPage();
});