$(document).ready(function() {
  $('.header__burger').click(function(event) {
    $('.header__burger,.header__menu').toggleClass('active');
    $('body').toggleClass('lock');
  });

  $('.slider').slick({
    slidesToShow: 3,
    initialSlide: 1,
    adaptiveHeight: true,
    centerMode: true,
    infinite: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: false
        }
      },
    ]

    
  });

});

