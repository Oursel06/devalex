const functionalityDiv = $('.functionality');
const checkboxElements = $('.functionality-item input[type="checkbox"]');
const radioElements = $('input[type="radio"]');
const totalPrice = $('#totalPrice');
let currentTotalPrice = 0;

console.log('test');

radioElements.on('change', function () {
    const price = parseFloat($(this).data('price'));
    currentTotalPrice = price;
    checkboxElements.prop('checked', false);
    totalPrice.text(currentTotalPrice + "€");
    functionalityDiv.removeClass('hidden');

    $('.labelinfo').removeClass('active');
    $('.functionality-item').removeClass('active');

    const labelInfo = $(this).closest('.labelinfo');
    labelInfo.addClass('active');
});

checkboxElements.on('change', function () {
    const price = parseFloat($(this).data('price'));

    if ($(this).prop('checked')) {
        currentTotalPrice += price;
    } else {
        currentTotalPrice -= price;
    }

    totalPrice.text(currentTotalPrice + "€");

    var parentDiv = $(this).closest('.functionality-item');
    parentDiv.toggleClass('active');
});