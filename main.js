const COLORS = ["blue", "green", "orange", "lime"];
function create_timer_element()
{
    let paddinger = document.createElement("div");
    paddinger.className = "paddinger";
    let main_div = document.createElement("div");
    main_div.className = "timer border";
    main_div.classList.add("bg-"+COLORS[Math.floor(Math.random()*COLORS.length)]);
    main_div.classList.add("text-white");
    let timer_div = document.createElement("div");
    timer_div.className ="timer-time";
    timer_div.innerHTML = '<span class="hours">00</span>:<span class="minutes">00</span>:<span class="seconds">00</span>';
    let timer_action = document.createElement("button");
    timer_action.className = "timer-action btn btn-small bg-red circle text-white";
    timer_action.innerHTML = '<i class="material-icons">play_arrow</i>';
    let separator = document.createElement("hr");
    separator.className = "separator";
    let timer_desc = document.createElement("div");
    timer_desc.className = "timer-desc";
    main_div.appendChild(timer_div);
    main_div.appendChild(timer_action);
    main_div.appendChild(separator);
    main_div.appendChild(timer_desc);
    paddinger.appendChild(main_div);
    return paddinger;
}

function timer(run, text) {
    var element = create_timer_element();
    document.querySelector("#masonry").appendChild(element);
    element.querySelector(".timer-action").onclick = function () {
        if(interval === undefined)
            start();
        else
            stop();
    };
    element.querySelector(".timer-desc").innerText = text;
    var interval = undefined;
    var time = {
        h: 0,
        m: 0,
        s: 0,
    };
    function stop() {
        if(interval === undefined)
        {
            return false;
        }
        clearInterval(interval);
        element.querySelector(".timer-action i").innerText = "play_arrow";
        interval = undefined;
    }

    function start() {
        if (interval !== undefined)
            return false;
        element.querySelector(".timer-action i").innerText = "pause";
        interval = setInterval(
            function() {
                time.s++;
                if (time.s === 60) {
                    time.m++;
                    time.s = 0;
                    if (time.m === 60) {
                        time.h++;
                        time.m = 0;
                    }
                }
                element.querySelector(".seconds").innerText = make_it_two_digit_long(time.s);
                element.querySelector(".hours").innerText = make_it_two_digit_long(time.h);
                element.querySelector(".minutes").innerText = make_it_two_digit_long(time.m);
            }, 1000);
    }

    if (run == true) {
        start();
    }

    return {
        run : () => {start()},
        stop: () => {stop()}
    }
}

function make_it_two_digit_long(number) {
    return String(number).length == 1 ? "0" + number : number;
}

document.querySelector("#new").onclick = function () {
    document.querySelector("textarea").value = "";
    document.querySelector("#modal").style.visibility = "visible";
};

document.querySelector("#modal .add").onclick=function () {
    new timer(document.querySelector("input").checked, document.querySelector("textarea").value);
    document.querySelector("#modal").style.visibility = "hidden";
};

document.querySelector("#modal .cancel").onclick=function () {
    document.querySelector("#modal").style.visibility = "hidden";
};