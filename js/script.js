

// Contact

// Vide les champs du formulaire de contact
var cleanForm = () => {
    $("#email").val("");
    $("#sujet").val("");
    $("#message").val("");
}

// Ajax vers la fonction envoi de mail
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
