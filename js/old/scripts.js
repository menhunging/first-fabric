$(document).ready(function () {
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 80) {
      $(".bottom-header").addClass("fixed");
    } else {
      $(".bottom-header").removeClass("fixed");
    }
  });

  $(function () {
    $.mask.definitions["~"] = "[+-]";
    $(".input-phone").mask("+7 ( 999 ) 999-99-99");
  });

  $(".show-adresses").click(function () {
    $(".more-adresses").toggleClass("active");
  });

  $(".lookbook .item, .product .item").click(function () {
    var idx = $(this).index();
    $("#lbModal").on("shown.bs.modal", function (event) {
      $(".lookbook-modal .slick-slider").slick({
        initialSlide: idx,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: $(".lookbook-modal .lb-nav_next"),
        prevArrow: $(".lookbook-modal .lb-nav_prev"),
      });
    });
  });

  $(".lookbook .item, .product .item").click(function () {
    var idx = $(this).index();
    $(".lookbook-modal .slick-slider").slick("slickGoTo", idx);
  });

  // slider
  if ($(".product__slider-main").length) {
    var $slider = $(".product__slider-main")
      .on("init", function (slick) {
        $(".product__slider-main").fadeIn(1000);
      })
      .slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        //appendDots: $('.slider-main-wrapper .slider-dots'),
        //autoplay: true,
        lazyLoad: "ondemand",
        autoplaySpeed: 3000,
        nextArrow: $(".slider-main-wrapper .slider-nav_next"),
        prevArrow: $(".slider-main-wrapper .slider-nav_prev"),
        asNavFor: ".product__slider-thmb",
      });

    var $slider2 = $(".product__slider-thmb")
      .on("init", function (slick) {
        $(".product__slider-thmb").fadeIn(1000);
      })
      .slick({
        slidesToShow: 9,
        slidesToScroll: 1,
        lazyLoad: "ondemand",
        asNavFor: ".product__slider-main",
        dots: false,
        arrows: false,
        //centerMode: true,
        focusOnSelect: true,
      });
    //remove active class from all thumbnail slides
    $(".product__slider-thmb .slick-slide").removeClass("slick-active");
    //set active class to first thumbnail slides
    $(".product__slider-thmb .slick-slide").eq(0).addClass("slick-active");
    // On before slide change match active thumbnail to current slide
    $(".product__slider-main").on(
      "beforeChange",
      function (event, slick, currentSlide, nextSlide) {
        var mySlideNumber = nextSlide;
        $(".product__slider-thmb .slick-slide").removeClass("slick-active");
        $(".product__slider-thmb .slick-slide")
          .eq(mySlideNumber)
          .addClass("slick-active");
      }
    );
  }

  // +\- input

  $(document).on("click", "[data-math]", function () {
    var input = $(this).parent("span").siblings(".input-number");
    var newVal = input.val();

    if ($(this).attr("data-math") === "plus") {
      $(this)
        .parents(".counter-control")
        .find('.btn-cart-number[data-math="minus"]')
        .removeAttr("disabled");
      newVal = parseInt(input.val());
      newVal++;

      if (parseInt(input.attr("max")) >= newVal) {
        input.val(newVal).change();
      } else {
        $(this).attr("disabled", true);
        console.log("max");
      }
    } else if ($(this).attr("data-math") === "minus") {
      $(this)
        .parents(".counter-control")
        .find('.btn-cart-number[data-math="plus"]')
        .removeAttr("disabled");
      newVal = parseInt(input.val());
      newVal--;
      if (newVal >= 1) {
        input.val(newVal).change();
      } else {
        $(this)
          .parents(".counter-control")
          .find('.btn-cart-number[data-math="minus"]')
          .attr("disabled", true);
      }
    }
  });

  MicroModal.init({
    openTrigger: "data-target",
  });

  $("[data-target]").map(function () {
    $(this).click((e) => e.preventDefault());
  });
});

//############ CHANGE START ############//
function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

//Показываем всплывающее окно
function showModal(el) {
  el.stop().css("display", "flex").hide().fadeIn(600);
}

//При нажатии Esc скрываем форму
$(document).keydown(function (e) {
  if (e.keyCode === 27) {
    var popup = $(".topWindowOuter:visible");
    if (popup) {
      closeGallery(popup);
      return false;
    }
  }
});

//Скрываем форму
function closeGallery() {
  $(".topWindowOuter").fadeOut(400, function () {
    $(".js-formDiv").removeClass("active").fadeOut(0);
    $(".js-oneClickForm").addClass("active").fadeIn(0);
  });
}

//Делаем валидацию формы
function formSubmit(form) {
  //универсальная функция валидации форм

  var THIS_FORM = form;

  var req_input = $(THIS_FORM).find(".input-text");
  var flag = 0;

  $.each(req_input, function (index) {
    var THIS_VALUE = $(this).val(),
      reg_email = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9_\.-]{2,45}\.[a-zA-Z]{2,20}$/;
    (reg_phone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/),
      (cc = /[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4}/), //Credit card number
      (cdate = /^\d{2}[./-]\d{2}$/), //Credit card Date
      (smsCode = /^\d{3} \d{3}$/), //SMS Code Verification
      (cvc = /^[0-9]{3,4}$/); //Credit card CVC

    if ($(this).is(".field_PHONE")) {
      if (reg_phone.test(THIS_VALUE)) {
        $(this).removeClass("error").addClass("succeed");
      } else {
        $(this).addClass("error").removeClass("succeed");
        flag++;
      }
    } else if ($(this).is(".field_EMAIL")) {
      if (reg_email.test(THIS_VALUE)) {
        $(this).removeClass("error").addClass("succeed");
      } else {
        $(this).addClass("error").removeClass("succeed");
        flag++;
      }
    } else if ($(this).is(".field_FIO")) {
      if (THIS_VALUE.length > 2) {
        $(this).removeClass("error").addClass("succeed");
      } else {
        $(this).addClass("error").removeClass("succeed");
        flag++;
      }
    } else if ($(this).is(".field_pass") || $(this).is(".field_pass_confirm")) {
      if ($(".field_pass_confirm").length > 0) {
        if (
          THIS_VALUE.length > 5 &&
          $(".field_pass").val() == $(".field_pass_confirm").val()
        ) {
          $(".field_pass").removeClass("error").addClass("succeed");
          $(".field_pass_confirm").removeClass("error").addClass("succeed");
        } else {
          $(".field_pass").addClass("error").removeClass("succeed");
          $(".field_pass_confirm").addClass("error").removeClass("succeed");
          flag++;
        }
      } else {
        if (THIS_VALUE.length > 5) {
          $(".field_pass").removeClass("error").addClass("succeed");
        } else {
          $(".field_pass").addClass("error").removeClass("succeed");
          flag++;
        }
      }
    } else if ($(this).is(".field_card_number")) {
      $(".field_card_number").mask("0000 0000 0000 0000");
      if (cc.test(THIS_VALUE)) {
        $(this).removeClass("error").addClass("succeed");
      } else {
        $(this).addClass("error").removeClass("succeed");
        flag++;
      }
    } else if ($(this).is(".field_card_date")) {
      $(".field_card_date").mask("00/00");
      if (cdate.test(THIS_VALUE)) {
        $(this).removeClass("error").addClass("succeed");
      } else {
        $(this).addClass("error").removeClass("succeed");
        flag++;
      }
    } else if ($(this).is(".field_card_cvc")) {
      $(".field_card_cvc").mask("000");
      if (THIS_VALUE) {
        $(this).removeClass("error").addClass("succeed");
      } else {
        $(this).addClass("error").removeClass("succeed");
        flag++;
      }
    } else if ($(this).is(".field_sms_verify")) {
      if (smsCode.test(THIS_VALUE)) {
        $(this).removeClass("error").addClass("succeed");
      } else {
        $(this).addClass("error").removeClass("succeed");
        flag++;
      }
    } else if ($(this).is(".field_check")) {
      if ($(this).prop("checked") == true) {
        $(this).next().removeClass("error").addClass("succeed");
      } else {
        $(this).next().addClass("error").removeClass("succeed");
        flag++;
      }
    } else if (
      $(this).is(".field_MAIL") ||
      $(this).is(".field_COMPANY") ||
      $(this).is(".field_MESSAGE")
    ) {
      //Пропускаем фиктивное поля для остановки ботов
      //Рекомендую вам сменить имя и тип проверки на ботов
    } else {
      if (THIS_VALUE) {
        $(this).removeClass("error").addClass("succeed");
      } else {
        $(this).addClass("error").removeClass("succeed");
        flag++;
      }
    }
  });
  if (flag) {
    return false;
  } else {
    return true;
  }
}

//Для сокращения кода и повышения читабельности выносим данный фрагмент в отдельную функцию
function formError(form) {
  $(".js-formDiv.active").fadeOut(400, function () {
    $(".js-formDiv").removeClass("active");
    $("#" + form).fadeIn(400, function () {
      $(this).addClass("active");
    });
  });
}

//Для сокращения кода и повышения читабельности выносим данный фрагмент в отдельную функцию
function formSuccess(form) {
  $(".js-formDiv.active").fadeOut(400, function () {
    $(".js-formDiv").removeClass("active");
    $("#" + form).fadeIn(400, function () {
      $(this).addClass("active");
    });
  });
}

/*********************************/
/* Обработка форм */
/*********************************/
(function ($) {
  $(document).ready(function () {
    /*********************************/
    /* Общие функции для работы с формой */
    /*********************************/
    //При изменении состоянии input всплывающей формы делаем валидацию
    $("body").on(
      "keyup input change",
      ".topWindowOuter input,.topWindowOuter textarea",
      function () {
        //Вызываем изменения состояние полей ввода при их редактировании
        formSubmit($(this).parents("form"));
      }
    );

    //Закрываем окно при клике вовне
    $("body").on("click", ".topWindowOuter", function (e) {
      if ($(".topWindowOuter").has(e.target).length === 0) {
        //Отслеживаем клик именно по элементу
        closeGallery();
      }
    });

    //показываем форму
    $("body").on("click", ".js-formLoad", function (e) {
      e.preventDefault();

      //Скрываем все формы всплывающего окна
      $(".js-formDiv").removeClass("active");

      //Показываем вызванную форму
      $("#" + $(this).attr("data-attr"))
        .addClass("active")
        .fadeIn(0);

      //Показываем форму
      showModal($(".topWindowOuter"));
    });

    //показываем форму
    $("body").on("click", ".js-forgotPass", function (e) {
      e.preventDefault();

      $('.js-formLoad[data-attr="recoveryPass"]').click();
    });

    //Клик на кнопку закрыть форму
    $("body").on("click", ".js-close-form", function (e) {
      e.preventDefault();
      closeGallery();
    });

    //отмечаем checkbox как отмеченный. Скрипт нужен поскольку checkbox скрыт и используется его эмуляция
    $("body").on("click", 'label[for="politika"]', function (e) {
      e.preventDefault();

      var el = $(this),
        parents = el.parents(".orderPolitika"),
        input = parents.find('input[type="checkbox"]');

      parents.toggleClass("active");

      if (parents.hasClass("active")) {
        input.prop("checked", true).val("Y");
      } else {
        input.prop("checked", false).val("N");
      }

      input.trigger("change");
    });

    //Кнопка отправить
    $("body").on("click", ".js-list", function (e) {
      e.preventDefault();
      var el = $(this),
        input = el.prev();

      if (el.hasClass("active")) {
        el.removeClass("active");
        input.prop("checked", false).attr("checked", false);
      } else {
        el.addClass("active");
        input.prop("checked", true).attr("checked", true);
      }
    });
    $("body").on("click", ".js-order-submit", function (e) {
      e.preventDefault();

      var el = $(this),
        parents = el.parents("form");

      if (formSubmit(parents)) {
        var data = parents.serialize();

        $.ajax({
          type: "post",
          url: "/local/ajax/addNewUser.php",
          data: data,
          //dataType: 'json',
          success: function (data) {
            //console.log(data);
            if (IsJsonString(data)) {
              data = JSON.parse(data);
              console.log(data.success + "66");
              if (data.success === "ok") {
                //Ошибок не было, заказ оформлен
                formSuccess("registerSuccess");
                console.log(data.success + " 1");
              } else if (data.success === "Пользователь уже существует") {
                //Ошибок не было, заказ оформлен
                formError("registerError");
                console.log(data.success);
              } else {
                //Был возвращен флаг с ошибкой
                formError("registerError");
                console.log(data.success + " 2");
              }
            } else {
              //Не json, значит произошла ошибка
              formError("registerError");
              console.log(data.success + " 3");
            }
            setTimeout(() => closeGallery(), 5000);
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
          },
        });
      }
    });

    $("body").on("click", ".js-recovery-submit", function (e) {
      e.preventDefault();

      var el = $(this),
        parents = el.parents("form");

      if (formSubmit(parents)) {
        var data = parents.serialize();

        $.ajax({
          type: "post",
          url: "/local/ajax/recovery.php",
          data: data,
          //dataType: 'json',
          success: function (data) {
            console.log(data);
            if (IsJsonString(data)) {
              data = JSON.parse(data);
              if (data.success === "ok") {
                //Ошибок не было, заказ оформлен
                formSuccess("recoverySuccess");
              } else if (data.success === "Y") {
                //Ошибок не было, заказ оформлен
                formError("recoveryError");
              } else {
                //Был возвращен флаг с ошибкой
                formError("recoveryError");
              }
            } else {
              //Не json, значит произошла ошибка
              formError("recoveryError");
            }
            setTimeout(() => closeGallery(), 5000);
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
          },
        });
      }
    });

    $("body").on("click", ".js-login-submit", function (e) {
      e.preventDefault();

      var el = $(this),
        parents = el.parents("form");

      if (formSubmit(parents)) {
        var data = parents.serialize();
        console.log(data);
        $.ajax({
          type: "post",
          url: "/local/ajax/login.php",
          data: data,
          //dataType: 'json',
          success: function (data) {
            console.log(data);
            if (IsJsonString(data)) {
              data = JSON.parse(data);
              if (data.success === "ok") {
                //Ошибок не было, заказ оформлен
                formSuccess("loginSuccess");
                setTimeout(() => location.reload(), 5000);
              } else {
                //Был возвращен флаг с ошибкой
                formSuccess("loginError");
              }
            } else {
              //Не json, значит произошла ошибка
              formError("loginError");
            }
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
          },
        });
      }
    });

    $("body").on("click", ".js-qusetion-submit", function (e) {
      e.preventDefault();

      var el = $(this),
        parents = el.parents("form");

      if (formSubmit(parents)) {
        var data = parents.serialize();

        $.ajax({
          type: "post",
          url: "/local/ajax/addQuestion.php",
          data: data,
          //dataType: 'json',
          success: function (data) {
            console.log(data);
            if (IsJsonString(data)) {
              data = JSON.parse(data);
              if (data.success === "ok") {
                //Ошибок не было, заказ оформлен
                formSuccess("questionSuccess");
                setTimeout(() => closeGallery(), 5000);
              } else {
                //Был возвращен флаг с ошибкой
                formSuccess("questionError");
              }
            } else {
              //Не json, значит произошла ошибка
              formError("questionError");
            }
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
          },
        });
      }
    });
    /*
          $.ajax({
              type: 'post',
              url: '/local/ajax/isAuthorized.php', //Запоминаем размещение файла buyOneClick.php
              data: {},
              //dataType: 'json',
              success: function (data) {
                  console.log(data);
                  $('.right-authorization-block').html(data)
              },
              error:function(XMLHttpRequest, textStatus, errorThrown) {
                  console.log("Status: " + textStatus);
              }
          });
          */
  });
})(jQuery);
