// Notification accueil
$(".accueil_notif").show(500);
window.setTimeout(masquernotification, 12000);
// var now = new Date();
// if (now.getHours() < 19) { document.getElementById("accueil_heure").innerHTML = "Bonjour" }
// else {
//     document.getElementById("accueil_heure").innerHTML = "Bonsoir"
// }

function masquernotification() {
    $(".accueil_notif").hide(400);
}

// Sidebar et nav
const nav = document.querySelector(".nav"),
    navlist = nav.querySelectorAll("li"),
    totalNavList = navlist.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;
for (let i = 0; i < totalNavList; i++) {
    const a = navlist[i].querySelector("a");
    a.addEventListener("click", function () {
        removeBackSection();
        for (let j = 0; j < totalNavList; j++) {
            if (navlist[j].querySelector("a").classList.contains("active")) {
                allSection[j].classList.add("back-section");
            }
            navlist[j].querySelector("a").classList.remove("active")
        }
        this.classList.add("active");
        showSection(this);
    })
}

document.querySelector(".contact-moi").addEventListener("click", function () {
    const sectionIndex = this.getAttribute("data-section-index");
    showSection(this);
    updateNav(this);
    removeBackSection();
    allSection[sectionIndex].classList.add("back-section");
});

const navTogglerBtn = document.querySelector(".nav-toggle"),
    notif = document.querySelector(".accueil_notif"),
    aside = document.querySelector(".aside");
navTogglerBtn.addEventListener("click", function () {
    asideSectionTogglerBtn();
})

const removeBackSection = () => {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("back-section");
    }
}

const updateNav = (elem) => {
    for (let i = 0; i < totalNavList; i++) {
        navlist[i].querySelector("a").classList.remove("active");
        const target = elem.getAttribute("href").split("#")[1];
        if (target === navlist[i].querySelector("a").getAttribute("href").split("#")[1]) {
            navlist[i].querySelector("a").classList.add("active");
        }
    }
}

const showSection = (elem) => {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active");
    }
    const target = elem.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active");

    if (window.innerWidth <= 1200) {
        asideSectionTogglerBtn();
    }
}

const asideSectionTogglerBtn = () => {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    notif.classList.toggle("open");
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle("open");
    }
}

// Contact
var cleanForm = () => {
    $("#email").val("");
    $("#sujet").val("");
    $("#message").val("");
}

var slideService = (icon, div) => {
    icon.toggleClass("fa-chevron-down fa-chevron-up");
    if (div.hasClass("hidden")) {
        div.removeClass("hidden");
        div.slideUp(0).slideDown(300);
    } else {
        div.slideUp(300, function () {
            div.addClass("hidden");
        });
    }
}

$("#envoyer").on("click", function () {
    $("#envoyer").addClass("disable");
    $(".message-form").addClass("hidden");

    var mail = $("#email").val();
    var sujet = $("#sujet").val();
    var message = $("#message").val();

    if (mail.trim() == "" || sujet.trim() == "" || message.trim() == "") {
        $(".message-form").removeClass("hidden");
        $('.message-form').css("background", "red");
        $('#results').html("Veuillez remplir tous les champs.");
        $("#envoyer").removeClass("disable");
    } else {
        var regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        var isEmailValid = regexEmail.test(mail);

        if (!isEmailValid) {
            $(".message-form").removeClass("hidden");
            $('.message-form').css("background", "red");
            $('#results').html("L'adresse mail n'est pas valide.");
            $("#envoyer").removeClass("disable");
        } else {
            $(".loader-form").removeClass("hidden");
            $.ajax({
                url: 'mailsend.php',
                type: 'POST',
                data: {
                    mail: mail,
                    sujet: sujet,
                    message: message
                },
                dataType: 'json',
                success: function (result) {
                    $(".loader-form").addClass("hidden");
                    $(".message-form").removeClass("hidden");
                    if (result.status === 'success') {
                        $("#results").html(result.message);
                        $(".message-form").css("background", "limegreen");
                        $("#envoyer").removeClass("disable");
                        cleanForm();
                    } else {
                        $("#results").html(result.message);
                        $(".message-form").css("background", "red");
                        $("#envoyer").removeClass("disable");
                    }
                },
                error: function (result) {
                    $('#results').html(result.message);
                    $('.message-form').css("background", "red");
                    $("#envoyer").removeClass("disable");
                }
            });
        }
    }
})

$('#close-message-form').on('click', function () {
    $('.message-form').addClass('hidden');
});

$('#effacer').on('click', function () {
    cleanForm();
});

// Service
$('#service-creation-more').on('click', function () {
    slideService($('#icon-creation-more'), $("#service-creation-text"));
});

$('#service-refonte-more').on('click', function () {
    slideService($('#icon-refonte-more'), $("#service-refonte-text"));
});

$('#service-referencement-more').on('click', function () {
    slideService($('#icon-referencement-more'), $("#service-referencement-text"));
});

$('#service-maquette-more').on('click', function () {
    slideService($('#icon-maquette-more'), $("#service-maquette-text"));
});

// Tarification
const functionalityDiv = $('.functionality');
const checkboxElements = $('input[type="checkbox"]');
const radioElements = $('input[type="radio"]');
const totalPrice = $('#totalPrice');
let currentTotalPrice = 0;

radioElements.on('change', function () {
    const price = parseFloat($(this).data('price'));
    currentTotalPrice = price;
    checkboxElements.prop('checked', false);
    totalPrice.text("Prix : " + currentTotalPrice + "€");
    functionalityDiv.removeClass('hidden');

    $('.labelinfo').removeClass('active');

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

    totalPrice.text("Prix : " + currentTotalPrice + "€");
    $('.labelinfo').removeClass('active');

    const labelInfo = $(this).closest('.labelinfo');
    labelInfo.addClass('active');
});