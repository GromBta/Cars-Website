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
});
