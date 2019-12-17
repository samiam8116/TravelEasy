i = 60;
var time = "";

function onTimer() {
    document.getElementById('timer').innerHTML = i;
    i--;

    if (i < 0) {
        document.getElementById("audio").play();
        alert('Get back to work!');
        return i = 60;
    }

    else if (i < 10) {
        i = '0' + i;
        time = setTimeout(onTimer, 1000);
    }

    else {
        time = setTimeout(onTimer, 1000);
    }
}

function playSound() {
    var sound = document.getElementById("audio");
    sound.play();
}

function pauseTimer() {
    clearTimeout(time);
}

function stopTimer() {
    clearTimeout(time);
    i = 60;
    document.getElementById('timer').innerHTML = "60";
}
