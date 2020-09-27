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
    let modalBtn = document.querySelectorAll('[data-toggle=modal]'),
    modal = document.querySelector('.modal'),
    modalDialog = document.querySelector('.modal__dialog'),
    modalClose = document.querySelector('[data-toggle=modalClose]'),
    messageModal = document.querySelector('.message'),
    messageDialog = document.querySelector('.message__modal'),
    messaageClose = document.querySelector('.message__close');

    for( openModal of modalBtn) {
      if(openModal) {
        openModal.addEventListener('click', function(event) {
          modal.classList.add('modal--visible');
        })
      }
    };

    // открыть модальное окно
    // modalBtn.onclick = function() {
    //   modal.classList.add('modal--visible');
    // };

    // закрытие по кнопке
    modalClose.onclick = function() {
      modal.classList.remove('modal--visible');
    };

    messaageClose.onclick = function() {
      messageModal.classList.remove('message--visible');
    };

    // закрытие вне окна
    modal.addEventListener('click', function(e) {
      if(!modalDialog.contains(e.target)) {
        modal.classList.remove('modal--visible')
      }
    });

    messageModal.addEventListener('click', function(e) {
      if(!messageDialog.contains(e.target)) {
        messageModal.classList.remove('message--visible');
      }
    });

    // закрытие по esc
    // window.addEventListener('keypress', function(evt) {
    //   if (window.event.keyCode) {
    //     modal.classList.remove('modal--visible')
    //   }
    // });

    // валидация формы модального окна
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
      },
      submitHandler: function(form) {
        $.ajax({
          type: "POST",
          url: "send.php",
          data: $(form).serialize(),
          success: function (response) {
            $(form)[0].reset();
            modal.classList.remove('modal--visible');
            messageModal.classList.add('message--visible')
          }
        });
      }
    });

    // валидация формы form-top
    $('.form-top__element').validate({
      errorClass: 'invalid',
      rules: {
        userName: {
          required: true,
          minlength: 2
        },
        userPhone: {
          required: true,
          minlength: 17,
        },
        userEmail: {
          required: true,
          email: true
        },
      },
      errorElement: 'em',
      messages: {
        userName: {
          required: 'Введите Имя',
          minlength: 'Имя слишком короткое'
        },
        userPhone: {
          required: 'Введите телефон',
          minlength: 'Нерный телефон'
        },
        userEmail: {
          required: 'Ведите Email',
          email: 'Формат: "..@domain.com"'
        },
      },
      submitHandler: function(form) {
        $.ajax({
          type: "POST",
          url: "send.php",
          data: $(form).serialize(),
          success: function (response) {
            $(form)[0].reset();
            messageModal.classList.add('message--visible');
          }
        });
      }
    });

    // валидация формы внизу
    $('.form-bottom ').validate({
      errorClass: 'invalidBottom',
      rules: {
        userName: {
          required: true,
          minlength: 2
        },
        userPhone: {
          required: true,
          minlength: 17,
        },
        userEmail: {
          required: true,
          email: true
        },
      },
      errorElement: 'em',
      messages: {
        userName: {
          required: 'Введите Имя',
          minlength: 'Имя слишком короткое'
        },
        userPhone: {
          required: 'Введите телефон',
          minlength: 'Нерный телефон'
        },
        userEmail: {
          required: 'Ведите Email',
          email: 'Формат: "..@domain.com"'
        },
      },
      submitHandler: function(form) {
        $.ajax({
          type: "POST",
          url: "send.php",
          data: $(form).serialize(),
          success: function (response) {
            $(form)[0].reset();
            messageModal.classList.add('message--visible');
          }
        });
      }
    });

    // валидация формы footer
    $('.footer__form').validate({
      errorClass: 'invalidfooter',
      rules: {
        userEmail: {
          required: true,
          email: true
        }
      },
      errorElement: 'em',
      messages: {
        userEmail: {
          required: 'Ведите Email',
          email: 'Формат: "..@domain.com"'
        }
      },
      submitHandler: function(form) {
        $.ajax({
          type: "POST",
          url: "send.php",
          data: $(form).serialize(),
          success: function (response) {
            $(form)[0].reset();
            messageModal.classList.add('message--visible');
          }
        });
      }
    });


    // маска
    $('#form-top').mask('+7(000) 000-00-00');
    $('#user-phone').mask('+7(000) 000-00-00'); 
    $('#phoneBottom').mask('+7(000) 000-00-00'); 

    // плавная прокрутка
    let anchors = document.querySelectorAll('body a[href*="#scroll"] ' );

    for (anchor of anchors) {
      if(anchor){
        anchor.addEventListener('click', function(event) {
          event.preventDefault();
          anchotId = this.getAttribute('href');
          document.querySelector(anchotId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        })
      }
    }
});

