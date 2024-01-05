<?php

use PHPMailer\PHPMailer\PHPMailer;

require './PHPMailer/Exception.php';
require './PHPMailer/PHPMailer.php';
require './PHPMailer/SMTP.php';

function ajax_envoie_mail()
{
    if (trim($_POST['mail']) == "" || trim($_POST['sujet']) == "" || trim($_POST['message']) == "") {
        $returnValue = array("status" => "erreur", "message" => "Veuillez remplir tous les champs.");
    } else {
        $returnValue = array();
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $to = "alexoursel6@gmail.com";
            $mail = new PHPMailer();
            $mail->isSMTP();
            $mail->SMTPDebug = 0;
            $mail->SMTPSecure = 'ssl';
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth   = true;
            $mail->Username = $to;
            $mail->Password = "fldkxezrkqkuhkhz";
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->Port = 465;
            $mail->setFrom($_POST['mail']);
            $mail->addAddress($to);
            $mail->isHTML(true);
            $mail->Subject = $_POST['sujet'];
            $mail->Body = "Mail de " . $_POST['mail'] . " <br> " . $_POST['message'];
            $mail->setLanguage('fr');

            if ($mail->send()) {
                $returnValue = array("status" => "success", "message" => "Le mail a bien été envoyé.");
            } else {
                $returnValue = array("status" => "error", "message" =>
                "Une erreur est survenue lors de l'envoi du mail, veuillez réessayer. Si le problème persiste, contactez
            <a style='text-decoration:underline; color:white;' href='mailto:'" . $to . "'>" . $to . "</a>.");
            }
        }
    }
    echo json_encode($returnValue);
}
ajax_envoie_mail();
