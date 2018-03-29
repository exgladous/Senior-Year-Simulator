var player = {
        slp: 0,
    },
    day = 0;

////////// advance time handling //////////
var endturn = document.getElementById("endturn");
endturn.addEventListener("click", nextday)

function nextday() {
    if (day == 0) {
        generateclasses()
        showschedule();
    }

    day++;
    evaluatesleep();
    updatestats();
    updateheader();
}
/////////// opener functions //////////
///// display schedule /////
var schedule = document.getElementById("schedule");

function showschedule() {
    schedule.textContent = "Your classes in order: " + player.periodone + ", " + player.periodtwo + ", " + player.periodthree + ", " + player.periodfour + ", " + player.periodfive;
}
////// generate and randomize classes /////
function generateclasses() {
    player.classes = ["English", "Math", "Science", "History", "Elective"]

    for (i = player.classes.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = player.classes[i];
        player.classes[i] = player.classes[j];
        player.classes[j] = temp;
    }

    if (player.classes.length == 5) {
        player.periodone = player.classes[0];
        player.periodtwo = player.classes[1];
        player.periodthree = player.classes[2];
        player.periodfour = player.classes[3];
        player.periodfive = player.classes[4];
    } else if (player.classes.length == 6) {
        player.periodone = player.classes[0];
        player.periodtwo = player.classes[1];
        player.periodthree = player.classes[2];
        player.periodfour = player.classes[3];
        player.periodfive = player.classes[4];
        player.periodsix = player.classes[5];
    } else if (player.classes.length == 7) {
        player.periodone = player.classes[0];
        player.periodtwo = player.classes[1];
        player.periodthree = player.classes[2];
        player.periodfour = player.classes[3];
        player.periodfive = player.classes[4];
        player.periodsix = player.classes[5];
        player.periodseven = player.classes[6];
    }
}

/////////// daily functions //////////
///// header update /////
var header = document.getElementById("header");

function updateheader() {
    if (day != 0 && day % 5 == 0) {
        header.textContent = "Today is day " + day + ", it's also a Friday, you'll have more time for activities over the weekend."
    } else {
        header.textContent = "Today is day " + day;
    }
}
////// status update /////
var stats = document.getElementById("stats");
stats.setAttribute("style", "white-space: pre;");

function updatestats() {
    stats.textContent = "Sleepiness: " + player.slp;
}
///// sleep evaluation /////
function evaluatesleep() {
    var sleepamount = document.getElementById("one").checked + document.getElementById("two").checked + document.getElementById("three").checked + document.getElementById("four").checked + document.getElementById("five").checked;
    console.log(sleepamount)

}
