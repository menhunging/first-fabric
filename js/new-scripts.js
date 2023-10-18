$(document).ready(function () {
  if ($(".count-block").length > 0) {
    $(".count-block").map(function () {
      let plus = $(this).find(".count-plus");
      let minus = $(this).find(".count-minus");
      let input = $(this).find(".input-count");
      let count = $(this).find(".input-count").val();

      plus.on("click", function (e) {
        e.preventDefault();
        count++;
        input.val(count);
      });

      minus.on("click", function (e) {
        e.preventDefault();
        count--;

        if (count < 0) {
          count = 0;
        }

        input.val(count);
      });
    });
  }

  if ($(".order-promo").length > 0) {
    let promoInput = $(".order-promo input");

    promoInput.on("input", (e) => {
      e.target.value
        ? promoInput.addClass("focus")
        : promoInput.removeClass("focus");
    });
  }
});
