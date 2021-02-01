const clock = document.querySelector(".time");

function getTime(){
    const date = new Date();
    const time = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    clock.innerHTML =
    `${time < 10 ? `0${time}` : time}
    : ${min <10 ? `0${min}` : min}
    : ${sec < 10 ? `0${sec}` : sec}`;
}


function init(){
    getTime();
    setInterval(getTime,1000);
}

init();