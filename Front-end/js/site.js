$(document).ready(function () {

    var places = new Map();
    var sum = 0;
    $('.order-places .place-btn').click(function (e) {
        e.preventDefault();

        var row = $(this).data("row");
        var place = $(this).data("place");
        var row_place = row + "-" + place;

        if (!places.has(row_place)) {
            $(this).addClass("active");
            sum += price;
            places.set(row_place, {
                row: row,
                place: place
            });
        } else {
            $(this).removeClass("active");
            sum -= price;
            places.delete(row_place);
        }

        var summary_text = "Итого: " + sum + "р. <br> Ваши места: ";
        var places_text = [];
        for (let value of places.values()) {
            places_text.push("ряд " + value.row + " место " + value.place)
        }

        summary_text += places_text.join(", ");

        if (sum > 0) {
            $('.order-summary-text').html(summary_text);
            $('.order-summary-button button').prop("disabled", false);
        } else {
            $('.order-summary-text').html("");
            $('.order-summary-button button').prop("disabled", true);
        }
        return false;
    });

    $('.submit-order').click(function (e) {
        e.preventDefault();
        if (places.size == 0) return false;

        console.log(places)

        $.ajax({
            url: '/',
            method: 'post',
            data: {places: Array.from(places.values())}
        });
    });


    $('.reg-form #email').on("keyup", function () {
        var value = $(this).val()

        var regex_res = value.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/gi);
        if (value && regex_res === null) {
            $('.email-error').html('Введите правильный E-mail адрес');

            addDanger(this)
        } else {
            $('.email-error').html('');
            addSuccess(this)
        }
    });

    $('.reg-form #password').on("keyup", function () {
        var value = $(this).val()

        if (value.length < 6) {
            $('.password-error').html('Пароль должен быть не менее 6 символов в длину');
            addDanger(this);
        } else {
            $('.password-error').html('');
            addSuccess(this)
        }
        $('.reg-form #repeat-password').keyup();

    });
    $('.reg-form #repeat-password').on("keyup", function () {
        var value = $(this).val();
        var password = $('#password').val();

        if (value !== password) {
            $('.repeat-password-error').html('Пароли не совпадают');
            addDanger(this)
        } else {
            $('.repeat-password-error').html('');
            addSuccess(this)
        }
    });
    $('.reg-form #phone').on('keyup', function () {
        var value = $(this).val();

        if (value && value.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/) === null) {
            addDanger(this);
            $('.phone-error').html('Введите правильный номер телефона');
        } else {
            addSuccess(this);
            $('.phone-error').html('');
        }
    });
});

function addDanger(el) {
    if (!$(el).hasClass('border-danger'))
        $(el).addClass('border-danger');
    $(el).removeClass('border-success');

    $('.reg-form #submit').prop('disabled', true)
}

function addSuccess(el) {
    $(el).removeClass('border-danger');
    if (!$(el).hasClass('border-success'))
        $(el).addClass('border-success');

    if ($('.border-danger').length === 0) {
        $('.reg-form #submit').prop('disabled', false)
    }
}
