'use strict';

(function () {
  var $body = $("body");

  var $main = $(".l-main");
  var mainHeight = $main.innerHeight();

  var $nav = $(".c-nav");
  var navHeight = $nav.innerHeight();

  // 画面サイズ
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var pcFlg = false;
  if (windowWidth > 750) {
    pcFlg = true;
  }
  function updateDOM() {
    mainHeight = $main.innerHeight();
    navHeight = $nav.innerHeight();
    // 画面サイズ
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    if (windowWidth > 750) {
      pcFlg = true;
    } else {
      pcFlg = false;
    }
  }

  // split text
  var splitItemList = $(".js-split");
  var splitItem = null;
  var splitText = null;
  var splitedText = null;
  for (var i = 0; i < splitItemList.length; i++) {
    splitItem = splitItemList.eq(i);
    splitText = splitItem.text();
    splitText = splitText.split('');
    splitedText = "";
    for (var j = 0; j < splitText.length; j++) {
      splitedText += '<span class="u-split-span">' + splitText[j] + '</span>';
    }
    splitItem.html(splitedText);
  }

  // PAGETOP
  $('.js-pagetop').on('click', function () {
    var toTop = $('body').offset().top;
    var $this = $(this);
    $('html,body').animate({ scrollTop: toTop }, 1000, 'easeInOutQuad');
  });

  // ページ内リンク
  $('[data-scroll]').on('click', function () {
    var _position = $('.' + $(this).attr('data-scroll')).offset().top;
    var _contentHeight = document.body.clientHeight;
    var _winHeight = window.innerHeight;
    if (_position + _winHeight > _contentHeight) {
      _position = _contentHeight - _winHeight;
    }
    $('body,html').animate({ scrollTop: _position }, 1000, 'easeInOutQuad');
  });

  // parallax
  var $parallaxlItem = $(".js-pallarax-l-item");
  var $parallaxrItem = $(".js-pallarax-r-item");
  var $parallaxBglItem = $(".js-bg-l-item");
  var $parallaxBgrItem = $(".js-bg-r-item");
  function parallaxScroll(scrolled) {
    var anim = 0 - scrolled * .2;
    $parallaxlItem.css({ 'transform': 'translateY(' + anim + 'px)' });
    $parallaxrItem.css({ 'transform': 'translateY(' + -anim + 'px)' });
    $parallaxBglItem.css({ backgroundPosition: 'right ' + Math.floor(-scrolled / 2) + 'px' });
    $parallaxBgrItem.css({ backgroundPosition: 'left ' + Math.floor(scrolled / 2 / 2) + 'px' });
  };

  // NAV
  var $hamburgerBtn = $(".c-hamburger");
  var $navCloseItem = $(".js-nav-close-item");
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  function openNav() {
    $body.addClass("is-open-nav");
    $body.addClass("is-nav-chara-" + (getRandomInt(4) + 1));
  }
  function closeNav() {
    $body.removeClass("is-open-nav");
    $body.removeClass("is-nav-chara-1 is-nav-chara-2 is-nav-chara-3 is-nav-chara-4");
  }
  $hamburgerBtn.on("click", function () {
    if ($body.hasClass("is-open-nav")) {
      closeNav();
    } else {
      openNav();
    }
  });
  $navCloseItem.on("click", function () {
    closeNav();
  });

  // 
  if ($("[data-page-name]").length) {
    $("[data-page='" + $("[data-page-name]").eq(0).data("pageName") + "']").addClass("is-current");
  }

  // UA check
  function initIEandEdge() {
    $("body").addClass("is-ie-edge");
  }
  function initIE() {
    $("body").addClass("is-ie");
  }
  function initSafari() {
    $("body").addClass("is-safari");
  }
  function uaCheck() {
    // ie and edge
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.indexOf('msie') != -1 || ua.indexOf('trident') != -1) {
      initIEandEdge();
      initIE();
    } else if (ua.indexOf('edge') != -1) {
      initIEandEdge();
    } else if (ua.indexOf('chrome') != -1) {
      //chrome
    } else if (ua.indexOf('safari') != -1) {
      initSafari();
    }
  }
  uaCheck();

  // event
  $(window).on('scroll', function () {
    var scrolled = $(window).scrollTop();
    parallaxScroll(scrolled);
    if (mainHeight < scrolled + navHeight) {
      $body.addClass("is-contents-end");
    } else {
      $body.removeClass("is-contents-end");
    }
  });

  var modalTemplate = '' + '<section class="m-modal is-close" id="{{ id }}" data-modal-type>' + '  <div class="m-modal__bg"></div>' + '  <div class="m-modal__content">' + '    {{ content }}' + '    <div class="m-modal__close is-no-temp" data-modal-ui-close=""></div>' + '  </div>' + '</section>';

  var modalModule = new MODAL_MODULE({
    duration: 500,
    removeWrapperTag: true,
    customModalHtml: modalTemplate
  });

  $(document).on('click', '.js-modal-close', function () {
    modalModule.Close();
  });

  $(window).on('resize', function () {
    updateDOM();
  });

  $(window).on('load', function () {
    updateDOM();

    var scrolled = $(window).scrollTop();
    if (mainHeight < scrolled + navHeight) {
      $body.addClass("is-contents-end");
    } else {
      $body.removeClass("is-contents-end");
    }
  });
})();