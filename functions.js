var player = {
        slp: 0,
        hap: 0,
    },
    day = 0;

////////// advance time handling //////////
var endturn = document.getElementById("endturn");
endturn.addEventListener("click", nextday)

function nextday() {
    if (day == 0) {
        generateclasses()
        showschedule();
        document.getElementById("main").hidden = false
        document.getElementById("intro").hidden = true
        endturn.textContent = "Next Day"
    }

    day++;
    events.textContent = ""
    classevents();
    evalulatestatus();
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
    player.periodone = player.classes[0];
    player.periodtwo = player.classes[1];
    player.periodthree = player.classes[2];
    player.periodfour = player.classes[3];
    player.periodfive = player.classes[4];

    player.gradeone = 0;
    player.gradetwo = 0;
    player.gradethree = 0;
    player.gradefour = 0;
    player.gradefive = 0;

    player.preparedone = 1;
    player.preparedtwo = 1;
    player.preparedthree = 1;
    player.preparedfour = 1;
    player.preparedfive = 1;

    classesA = [player.periodfour, player.periodfive],
        classesB = [player.periodone, player.periodtwo, player.periodthree];
}

/////////// daily functions //////////
///// header update /////
var header = document.getElementById("header");

function updateheader() {
    if (day != 0 && day % 5 == 0) {
        header.textContent = "Today is day " + day + ", it's also a Friday, you'll be less sleepy if you overstudy."
    } else if (day % 2 == 0) {
        header.textContent = "Today is day " + day + ", a B day. You have " + player.periodone + ", " + player.periodtwo + ", and " + player.periodthree + ".";
        daytype = "B";
    } else {
        header.textContent = "Today is day " + day + ", an A day. You have " + player.periodfour + " and " + player.periodfive + "."
        daytype = "A";
    }
}
////// status update /////
var stats = document.getElementById("stats");
stats.setAttribute("style", "white-space: pre;");

function updatestats() {
    stats.textContent = " Sleepiness: " + player.slp + "\r\n Happiness: " + player.hap + "\r\n Grades: " + player.periodone + ": " + player.gradeone + ", " + player.periodtwo + ": " + player.gradetwo + ", " + player.periodthree + ": " + player.gradethree + ", " + player.periodfour + ": " + player.gradefour + ", " + player.periodfive + ": " + player.gradefive;
}
///// status evaluation /////
function evalulatestatus() {
    var sleepamount = document.getElementById("one").checked + document.getElementById("two").checked + document.getElementById("three").checked + document.getElementById("four").checked + document.getElementById("five").checked;

    player.slp = player.slp + sleepamount - 1.5
    if (day % 5 == 0) {
        player.hap = player.hap + 1;
        player.slp = player.slp - 1;
    }

    if (player.slp > 5) {
        player.slp = 5;
        player.hap = player.hap - 3
    } else if (player.slp < 0) {
        player.hap = player.hap + 1
        player.slp = 0;
    }

    if (player.hap > 5) {
        player.hap = 5
    }
}

var events = document.getElementById("events");

function classevents() {

    var sleepcheck = Math.abs(player.slp) * Math.random();
    if (day == 1) {
        events.textContent = "Today is the first day. You are unsettled by the beginning of the end."
    }

    if (sleepcheck > 2) {
        if (daytype == "A") {
            var selection = Math.floor(Math.random() * 2),
                targetclass = classesA[selection];
            events.textContent = "You fell asleep during " + targetclass + "."
            player.preparedfour = player.preparedfour - .1
            player.preparedfive = player.preparedfive - .1
        } else if (daytype == "B") {
            var selection = Math.floor(Math.random() * 3),
                targetclass = classesB[selection];
            player.preparedone = player.preparedone - .1
            player.preparedtwo = player.preparedtwo - .1
            player.preparedthree = player.preparedthree - .1
            events.textContent = "You fell asleep during " + targetclass + "."
        }
    }
}
