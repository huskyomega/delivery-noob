$(function () {

  /* ============================================
     Navbar: scroll shadow + mobile toggle
  ============================================ */
  var $navbar = $('.navbar');
  var $navToggle = $('#navToggle');
  var $navMenu = $('#navMenu');

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 10) {
      $navbar.addClass('scrolled');
    } else {
      $navbar.removeClass('scrolled');
    }
  });

  $navToggle.on('click', function () {
    $(this).toggleClass('open');
    $navMenu.toggleClass('open');
  });

  // Close mobile menu on link click
  $navMenu.find('a').on('click', function () {
    $navToggle.removeClass('open');
    $navMenu.removeClass('open');
  });

  // Active nav link based on current page
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  $navMenu.find('a').each(function () {
    var href = $(this).attr('href').split('#')[0];
    if (href === currentPage) {
      $(this).addClass('active');
    }
  });


  /* ============================================
     FAQ Accordion
  ============================================ */
  $(document).on('click', '.faq-question', function () {
    var $item = $(this).closest('.faq-item');
    var $answer = $item.find('.faq-answer');
    var isOpen = $(this).hasClass('active');

    // Close all
    $('.faq-question').removeClass('active');
    $('.faq-answer').slideUp(200).removeClass('open');

    if (!isOpen) {
      $(this).addClass('active');
      $answer.slideDown(250).addClass('open');
    }
  });


  /* ============================================
     Anchor Nav: highlight on scroll
  ============================================ */
  if ($('.anchor-nav').length) {
    var $anchors = $('.anchor-nav a[href^="#"]');
    $(window).on('scroll.anchors', function () {
      var scrollTop = $(this).scrollTop() + 120;
      $anchors.each(function () {
        var target = $(this).attr('href');
        var $section = $(target);
        if ($section.length) {
          if (scrollTop >= $section.offset().top && scrollTop < $section.offset().top + $section.outerHeight()) {
            $anchors.removeClass('active-anchor');
            $(this).addClass('active-anchor');
          }
        }
      });
    });
  }


  /* ============================================
     foodpanda Income Calculator
  ============================================ */
  function initFpCalc() {
    if ($('#fp-calc').length === 0) return;

    var $hoursRange = $('#fp-hours');
    var $hoursVal = $('#fp-hours-val');
    var $ordersRange = $('#fp-orders');
    var $ordersVal = $('#fp-orders-val');
    var $avgFee = $('#fp-avg-fee');

    function updateFpDisplay() {
      $hoursVal.text($hoursRange.val() + ' 小時');
      $ordersVal.text($ordersRange.val() + ' 單');
    }

    $hoursRange.on('input', updateFpDisplay);
    $ordersRange.on('input', updateFpDisplay);
    updateFpDisplay();

    $('#fp-calc-btn').on('click', function () {
      var hoursPerWeek = parseFloat($hoursRange.val()) || 0;
      var ordersPerHour = parseFloat($ordersRange.val()) || 0;
      var avgFee = parseFloat($avgFee.val()) || 0;

      if (avgFee === 0) {
        alert('請輸入平均每單外送費！');
        return;
      }

      var weeklyOrders = hoursPerWeek * ordersPerHour;
      var weeklyIncome = weeklyOrders * avgFee;
      var monthlyIncome = weeklyIncome * 4.3;
      // foodpanda platform fee: approx 0 for riders (riders earn delivery fee directly)
      var annualIncome = monthlyIncome * 12;

      $('#fp-weekly-orders').text(Math.round(weeklyOrders) + ' 單');
      $('#fp-weekly-income').text('$' + Math.round(weeklyIncome).toLocaleString());
      $('#fp-monthly-income').text('NT$' + Math.round(monthlyIncome).toLocaleString());
      $('#fp-annual-note').text('年收入約 NT$' + Math.round(annualIncome).toLocaleString());

      $('#fp-result').show().addClass('animated');
    });
  }


  /* ============================================
     Uber Eats Income Calculator
  ============================================ */
  function initUeCalc() {
    if ($('#ue-calc').length === 0) return;

    var $hoursRange = $('#ue-hours');
    var $hoursVal = $('#ue-hours-val');
    var $ordersRange = $('#ue-orders');
    var $ordersVal = $('#ue-orders-val');
    var $avgFee = $('#ue-avg-fee');
    var $boost = $('#ue-boost');

    function updateUeDisplay() {
      $hoursVal.text($hoursRange.val() + ' 小時');
      $ordersVal.text($ordersRange.val() + ' 單');
    }

    $hoursRange.on('input', updateUeDisplay);
    $ordersRange.on('input', updateUeDisplay);
    updateUeDisplay();

    $('#ue-calc-btn').on('click', function () {
      var hoursPerWeek = parseFloat($hoursRange.val()) || 0;
      var ordersPerHour = parseFloat($ordersRange.val()) || 0;
      var avgFee = parseFloat($avgFee.val()) || 0;
      var boostPct = parseFloat($boost.val()) || 0;

      if (avgFee === 0) {
        alert('請輸入平均每單外送費！');
        return;
      }

      var weeklyOrders = hoursPerWeek * ordersPerHour;
      var baseWeekly = weeklyOrders * avgFee;
      var boostBonus = baseWeekly * (boostPct / 100);
      var weeklyIncome = baseWeekly + boostBonus;
      var monthlyIncome = weeklyIncome * 4.3;
      var annualIncome = monthlyIncome * 12;

      $('#ue-weekly-orders').text(Math.round(weeklyOrders) + ' 單');
      $('#ue-weekly-income').text('$' + Math.round(weeklyIncome).toLocaleString());
      $('#ue-monthly-income').text('NT$' + Math.round(monthlyIncome).toLocaleString());
      $('#ue-annual-note').text('年收入約 NT$' + Math.round(annualIncome).toLocaleString());

      $('#ue-result').show().addClass('animated');
    });
  }

  initFpCalc();
  initUeCalc();


  /* ============================================
     Exam: Show/hide answer explanation
  ============================================ */
  $(document).on('click', '.exam-show-btn', function () {
    var $card = $(this).closest('.exam-card');
    var $options = $card.find('.exam-options');
    var $explain = $card.find('.exam-explain');
    $options.slideDown(200);
    $explain.slideDown(200);
    $(this).hide();
  });


  /* ============================================
     Smooth scroll for anchor links
  ============================================ */
  $(document).on('click', 'a[href^="#"]', function (e) {
    var target = $(this).attr('href');
    if (target === '#') return;
    var $target = $(target);
    if ($target.length) {
      e.preventDefault();
      var offset = $target.offset().top - 120;
      $('html, body').animate({ scrollTop: offset }, 500);
    }
  });


  /* ============================================
     Lazy reveal animation
  ============================================ */
  function revealOnScroll() {
    $('.card, .step-item, .equip-card, .stat-box, .faq-item').each(function () {
      var elemTop = $(this).offset().top;
      var viewBottom = $(window).scrollTop() + $(window).height();
      if (elemTop < viewBottom - 60) {
        $(this).addClass('revealed');
      }
    });
  }

  // Add base CSS for reveal
  $('<style>')
    .prop('type', 'text/css')
    .html('.card,.step-item,.equip-card,.stat-box,.faq-item{opacity:0;transform:translateY(20px);transition:opacity .5s ease,transform .5s ease}.card.revealed,.step-item.revealed,.equip-card.revealed,.stat-box.revealed,.faq-item.revealed{opacity:1;transform:none}')
    .appendTo('head');

  $(window).on('scroll.reveal', revealOnScroll);
  revealOnScroll();

});
