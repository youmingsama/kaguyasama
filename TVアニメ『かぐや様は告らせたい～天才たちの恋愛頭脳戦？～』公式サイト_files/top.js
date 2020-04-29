'use strict';

(function () {

  // 画面,コンテンツサイズ
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var pcFlg = false;
  if (windowWidth > 750) {
    pcFlg = true;
  }

  // スクロールエフェクト
  var ScrollEffectModule = new SCROLL_EFFECT_MODULE({
    elem: '.js-scroll-item',
    displayRatio: 0.6,
    addClassNameActive: 'is-scroll'
  });

  var updateDOM = function updateDOM() {
    // 画面サイズ
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    if (windowWidth > 750) {
      pcFlg = true;
    } else {
      pcFlg = false;
    }
  };

  var createBanner = function createBanner() {
    var _slideCount = $(".p-top__banner-swiper .swiper-slide").length;
    if (_slideCount > 1) {
      var bannerSwiperOption = {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 1000,
        autoplay: {
          delay: 8000
        }
      };
      $(".js-slider-all").html("0<span></span>" + _slideCount);
      $(".js-slider-current").html("0<span></span>" + 1);
      var bannerSwiper = new Swiper('.p-top__banner-swiper', bannerSwiperOption);
      bannerSwiper.on('slideChange', function () {
        $(".js-slider-current").html("0<span></span>" + (bannerSwiper.realIndex + 1));
      });
    } else {
      $(".p-top__banner").addClass("no-swiper");
    }
  };

  var createMovieSwiper = function createMovieSwiper() {
    var _slideCount = $(".p-movie__swiper .swiper-slide").length;
    if (_slideCount > 1) {
      var movieSwiperOption = {
        slidesPerView: 1,
        loopAdditionalSlides: 3,
        spaceBetween: 55,
        loop: true,
        speed: 1000,
        // autoplay: {
        //   delay: 5000,
        // },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      };
      if (!pcFlg) {
        movieSwiperOption.spaceBetween = 20;
      }
      var movieSwiper = new Swiper('.p-movie__swiper', movieSwiperOption);
    } else {
      $(".p-movie__swiper").addClass("no-swiper");
    }
  };

  var createTwitterWidget = function createTwitterWidget() {
    // twitter読み込み
    var _widgets = $(".js-twitter");
    var _height = "";
    var _twitter = "";
    for (var i = 0; i < _widgets.length; i++) {
      _height = 445;
      if (!pcFlg) {
        _height = 278;
      }
      _twitter = '\n      <a class="twitter-timeline" href="https://twitter.com/anime_kaguya?ref_src=twsrc%5Etfw" data-height="' + _height + '" data-theme="dark" data-chrome="noheader nofooter noscrollbar transparent" data-link-color="#ff0031">Tweets by anime_kaguya</a>\n      <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>';
      _widgets.eq(i).html(_twitter);
    }
  };

  $(window).on('resize', function () {
    updateDOM();
  });

  createBanner();
  createMovieSwiper();
  createTwitterWidget();
  // event
  $(window).on("load", function () {
    updateDOM();

    // 中ページからの遷移の場合、OPアニメ―ション省略
    if (window.location.href.match(/innerlink/)) {

      history.replaceState("", "", location.href.split("?")[0]);
      $(".js-op-item").addClass("is-op");
    } else {
      $(".js-op-item").addClass("is-top-op");
      setInterval(function () {
        $(".js-op-item").addClass("is-op");
      }, 5000);
    }
  });
})();