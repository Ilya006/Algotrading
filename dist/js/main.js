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


    $('.slider-reviews').slick({
      slidesToShow: 1,
      dots: false,
      arrows: false,
      variableWidth: true,
      centerMode: true,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            infinite: true,
            dots: true
          }
        },
      ]
    });

    // модаотное окно
    let modalBtn = document.querySelector('[data-toggle=modal]'),
        modal = document.querySelector('.modal'),
        modalDialog = document.querySelector('.modal__dialog'),
        modalClose = document.querySelector('[data-toggle=modalClose]');

    // открыть модальное окно
    modalBtn.onclick = function() {
      modal.classList.add('modal--visible');
    };

    // закрытие по кнопке
    modalClose.onclick = function() {
      modal.classList.remove('modal--visible');
    };

    // закрытие вне окна
    modal.addEventListener('click', function(e) {
      if(!modalDialog.contains(e.target)) {
        modal.classList.remove('modal--visible')
      }
    });

    // закрытие по esc
    window.addEventListener('keypress', function(evt) {
      if (window.event.keyCode) {
        console.log(window.event.keyCode);
        // modal.classList.remove('modal--visible')
      }
    });


    // валидация формы
    $('.modal__form').validate({
      rules: {
        userName: {
          required: true,
          minlength: 2
        },
        userPhone: 'required',
        userEmail: {
          required: true,
          email: true
        },
        userPolicy: 'required'
      },
      messages: {
        userName: {
          required: 'Введите Имя',
          minlength: 'Имя слишком короткое'
        },
        userPhone: 'Введите телефон',
        userEmail: {
          required: 'Ведите Email',
          email: 'Формат: "..@domain.com"'
        },
        userPolicy: 'Подтвердите согласие на обработку данных'
      }
    });


    // маска
    $('#user-phone').mask('+7(000) 000-00-00')

});

