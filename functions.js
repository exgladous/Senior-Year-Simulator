var player = {
        slp: 0,
        hap: 0
    },
    day = 0,
    daytype = "",
    testday = false,
    lastday = 180;

var endturn = document.getElementById("endturn");
endturn.addEventListener("click", nextday);

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
    testui.hidden = true;
    testbox.hidden = true;
    updatestats();
    updateheader();
    evalulatestatus();

    classevents();
    rolltest();
    generatehomework();

}

var schedule = document.getElementById("schedule");

function showschedule() {
    schedule.textContent = "Your classes in order: " + player.periodone + ", " + player.periodtwo + ", " + player.periodthree + ", " + player.periodfour + ", " + player.periodfive;
}

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

    player.gradeone = 100;
    player.gradetwo = 100;
    player.gradethree = 100;
    player.gradefour = 100;
    player.gradefive = 100;

    player.preparedone = .7;
    player.preparedtwo = .7;
    player.preparedthree = .7;
    player.preparedfour = .7;
    player.preparedfive = .7;

    classesA = [player.periodfour, player.periodfive];
    classesB = [player.periodone, player.periodtwo, player.periodthree];
}

var header = document.getElementById("header");

function updateheader() {
    if (day != 0 && day % 5 == 0) {
        if (day % 2 == 0) {
            header.textContent = "Today is day " + day + ", a B day. You have " + player.periodone + ", " + player.periodtwo + ", and " + player.periodthree + ". Its also a Friday, you'll be less sleepy if you overstudy.";
            daytype = "B";
        } else {
            header.textContent = "Today is day " + day + ", an A day. You have " + player.periodfour + " and " + player.periodfive + ". Its also a Friday, you'll be less sleepy if you overstudy."
            daytype = "A";
        }
    } else if (day % 2 == 0) {
        header.textContent = "Today is day " + day + ", a B day. You have " + player.periodone + ", " + player.periodtwo + ", and " + player.periodthree + ".";
        daytype = "B";
    } else {
        header.textContent = "Today is day " + day + ", an A day. You have " + player.periodfour + " and " + player.periodfive + "."
        daytype = "A";
    }
}

var stats = document.getElementById("stats"),
    studyone = document.getElementById("one"),
    studytwo = document.getElementById("two"),
    studythree = document.getElementById("three"),
    studyfour = document.getElementById("four"),
    studyfive = document.getElementById("five");
stats.setAttribute("style", "white-space: pre;");

function updatestats() {
    stats.textContent = " Sleepiness: " + player.slp + "\r\n Happiness: " + player.hap + "\r\n Grades: " + player.periodone + ": " + player.gradeone + ", " + player.periodtwo + ": " + player.gradetwo + ", " + player.periodthree + ": " + player.gradethree + ", " + player.periodfour + ": " + player.gradefour + ", " + player.periodfive + ": " + player.gradefive;
}

function evalulatestatus() {
    var sleepamount = studyone.checked + studytwo.checked + studythree.checked + studyfour.checked + studyfive.checked;

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

    player.preparedone == player.preparedone - .01;
    player.preparedtwo == player.preparedtwo - .01;
    player.preparedthree == player.preparedthree - .01;
    player.preparedfour == player.preparedfour - .01;
    player.preparedfive == player.preparedfive - .01;

    if (studyone.checked == true && player.preparedone < .9) {
        player.preparedone == player.preparedone + .1
    }
    if (studytwo.checked == true && player.preparedtwo < .9) {
        player.preparedtwo == player.preparedtwo + .1
    }
    if (studythree.checked == true && player.preparedthree < .9) {
        player.preparedthree == player.preparedthree + .1
    }
    if (studyfour.checked == true && player.preparedfour < .9) {
        player.preparedfour == player.preparedfour + .1
    }
    if (studyfive.checked == true && player.preparedfive < .9) {
        player.preparedfive == player.preparedfive + .1
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
            var selection = Math.floor(Math.random() * 2);
            events.textContent = "You're very tired, you got less out of all your classes today."
            player.preparedfour = player.preparedfour - .1
            player.preparedfive = player.preparedfive - .1
        } else if (daytype == "B") {
            var selection = Math.floor(Math.random() * 3);
            player.preparedone = player.preparedone - .1
            player.preparedtwo = player.preparedtwo - .1
            player.preparedthree = player.preparedthree - .1
            events.textContent = "You're very tired, you got less out of all your classes today."
        }
    }
}

var testui = document.getElementById("test"),
    testbox = document.getElementById("testdecision"),
    attemptbutton = document.getElementById("attempt"),
    cheat = document.getElementById("cheat"),
    testhistory = document.getElementById("testhistory");

function rolltest() {
    if (daytype == "A" && day % 5 == 0 && day != 5) {
        testui.hidden = false;
        testbox.hidden = false;
        testclassnumber = Math.floor(Math.random() * 2);
        testclass = classesA[testclassnumber];
        testday = true;
        if (testclassnumber == 0) {
            if (player.preparedone > .6) {
                testui.textContent = "You have a test in " + testclass + ". You feel pretty prepared for it."
            } else if (player.preparedone > .3) {
                testui.textContent = "You have a test in " + testclass + ". You're unsure about this test."
            } else {
                testui.textContent = "You have a test in " + testclass + ". You feel bad about this test."
            }
        } else if (testclassnumber == 1) {
            if (player.preparedtwo > .6) {
                testui.textContent = "You have a test in " + testclass + ". You feel pretty prepared for it."
            } else if (player.preparedtwo > .3) {
                testui.textContent = "You have a test in " + testclass + ". You're unsure about this test."
            } else {
                testui.textContent = "You have a test in " + testclass + ". You feel bad about this test."
            }
        }
    } else if (daytype == "B" && day % 5 == 0) {
        testui.hidden = false;
        testbox.hidden = false;
        testclassnumber = Math.floor(Math.random() * 3);
        testclass = classesB[(testclassnumber)];
        if (testclassnumber == 0) {
            if (player.preparedthree > .6) {
                testui.textContent = "You have a test in " + testclass + ". You feel pretty prepared for it."
            } else if (player.preparedthree > .3) {
                testui.textContent = "You have a test in " + testclass + ". You're unsure about this test."
            } else {
                testui.textContent = "You have a test in " + testclass + ". You feel bad about this test."
            }
        } else if (testclassnumber == 1) {
            if (player.preparedfour > .6) {
                testui.textContent = "You have a test in " + testclass + ". You feel pretty prepared for it."
            } else if (player.preparedfour > .3) {
                testui.textContent = "You have a test in " + testclass + ". You're unsure about this test."
            } else {
                testui.textContent = "You have a test in " + testclass + ". You feel bad about this test."
            }
        } else if (testclassnumber == 2) {
            if (player.preparedfive > .6) {
                testui.textContent = "You have a test in " + testclass + ". You feel pretty prepared for it."
            } else if (player.preparedfive > .3) {
                testui.textContent = "You have a test in " + testclass + ". You're unsure about this test."
            } else {
                testui.textContent = "You have a test in " + testclass + ". You feel bad about this test."
            }
        }
    }
    evaluatetest();
}

function evaluatetest() {
    if (cheat.checked == true) {
        if (Math.random() > .5) {
            alert("You lost! You were caught cheating, ending your academic career. Refresh to restart.")
            endturn.hidden = "true"
        }
    } else if (attemptbutton.checked == true) {
        if (testclassnumber == 0) {
            testgrade = player.preparedone * 100 + Math.random() * 10;
            player.gradeone = Math.floor((player.gradeone + testgrade) / 2);
            testhistory.textContent = "Your score on your last test was " + Math.floor(testgrade) + " in " + player.periodone + "."
        } else if (testclassnumber == 1) {
            testgrade = player.preparedtwo * 100 + Math.random() * 10;
            player.gradetwo = Math.floor((player.gradetwo + testgrade) / 2);
            testhistory.textContent = "Your score on your last test was " + Math.floor(testgrade) + " in " + player.periodtwo + "."
        } else if (testclassnumber == 2) {
            testgrade = player.preparedthree * 100 + Math.random() * 10;
            player.gradethree = Math.floor((player.gradethree + testgrade) / 2);
            testhistory.textContent = "Your score on your last test was " + Math.floor(testgrade) + " in " + player.periodthree + "."
        } else if (testclassnumber == 3) {
            testgrade = player.preparedfour * 100 + Math.random() * 10;
            player.gradefour = Math.floor((player.gradefour + testgrade) / 2);
            testhistory.textContent = "Your score on your last test was " + Math.floor(testgrade) + " in " + player.periodfour + "."
        } else if (testclassnumber == 4) {
            testgrade = player.preparedfive * 100 + Math.random() * 10;
            player.gradefive = Math.floor((player.gradefive + testgrade) / 2);
            testhistory.textContent = "Your score on your last test was " + Math.floor(testgrade) + " in " + player.periodfive + "."
        }
    }
    cheat.checked = false;
    attemptbutton.checked = false;
    testday = false;
}

function generatehomework() {
    rollforhomework = Math.random();
    if (day > 1 && daytype == "A") {
        console.log("hello")
    } else if (day > 2 && daytype == "B") {
        console.log("hello")
    }
}
