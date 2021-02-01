const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const hello = document.querySelector(".hello");
const list = document.querySelector(".listform");

const USER_LS ="userName";
const SHOWING ="showing";



function paint(text){
    form.classList.remove(SHOWING);
    hello.classList.add(SHOWING);
    list.classList.add(SHOWING);
    hello.innerText=`Hello ${text} :)`;
}

function saveName(text){
    localStorage.setItem(USER_LS,text);
}

function handleSubmit(event){
    event.preventDefault();
    const inputUserName = input.value;
    paint(inputUserName);
    saveName(inputUserName);
}

function askForName(){
    form.classList.add(SHOWING);
    form.addEventListener("submit",handleSubmit);
}


function loadName(){
    const username = localStorage.getItem(USER_LS);

    if(username===null){
        askForName();
    }else{
        paint(username);
    }
}

function init(){
    loadName();    
}

init();