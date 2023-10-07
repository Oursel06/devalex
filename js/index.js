function Rebour() {
    var date1 = new Date();
    var date2 = new Date("oct 19, 2023 00:00:00");
    var sec = (date2 - date1) / 1000;
    if (sec > 0) {
        var jours = Math.floor(sec / (24 * 3600));
        sec %= 24 * 3600;
        var heures = Math.floor(sec / 3600);
        sec %= 3600;
        var minutes = Math.floor(sec / 60);
        var secondes = Math.floor(sec % 60);

        document.getElementById("jours").innerText = jours < 10 ? "0" + jours : jours;
        document.getElementById("heures").innerText = heures < 10 ? "0" + heures : heures;
        document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("secondes").innerText = secondes < 10 ? "0" + secondes : secondes;
    }
    setTimeout(Rebour, 1000);
}
Rebour();