$(document).ready(function() {
  $('.header__burger').click(function(event) {
    $('.header__burger,.header__menu').toggleClass('active');
    $('body').toggleClass('lock');
  });

  $('.slider').slick({
    slidesToShow: 3,
    initialSlide: 0,
    adaptiveHeight: true,
    centerMode: true,
    infinite: true,
    arrows: true,
    edge: 1,
    touchThreshold: 15,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
          dots: true
        }
      },
    ]
  });

  $('.lesson').slick({
    slidesToShow: 1,
    dots: true,
    infinite: false,
    touchThreshold: 15,
  });


});

