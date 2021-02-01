바닐라 자바스크립트를 이용한 Todo
===

Jquery를 배우기 전 바닐라 자바스크립트를 이용하여 todoList를 만드는 프로젝트 입니다.<br>

프로젝트의 목적은 자바스크립트의 이해와 자바스크립트를 배우기 전 자바스크립트를 선행 학습하고 개념과 실습을 병행하기 위해 진행했던 프로젝트 입니다.<br>

## 프로젝트의 목표
1. HTML의 요소를 조작 하는 방법을 숙지합니다.
2. 브라우저의 LocalStorage를 사용하여 TodoList를 구현합니다.
3. 자바스크립트의 문법을 이해하고 숙지합니다.

<br>

## 프로젝트를 진행하면서

자바스크립트를 통하여 HTML의 요소들을 조작하고 event를 핸들링하는 방법을 익힐 수 있었으며 외부API를 사용함에 있어서 편리함을 경험할 수 있었다. 이후 open api를 사용하는 방법을 익혀야겠다는 생각을 하게 되었으며 자바스크립트가 자바와 많이 닮았지만 다른 부분이 있다는 것에 조금 신선하게 다가왔던것 같다. 현재는 localStorage를 사용하여 CRUD와 비슷한 기능을 구현하여 봤지만 이후에는 java와 DB를 이용하여 web을 통한 CRUD를 학습하고 구현해야겠다.

<br>

---

<br>

## 프로젝트 결과

1. 초기 화면 (시계)

<img src ="https://user-images.githubusercontent.com/74294325/106431477-a5959f00-64b0-11eb-914c-801276f3ff79.PNG" width=500px height=300px>

<br>

2. 이름 입력 후 

<img src = https://user-images.githubusercontent.com/74294325/106431535-c100aa00-64b0-11eb-9f41-82307e5e6d1d.PNG width=500px height=300px>

<br>

3. todolist 입력후 localStorage 

<img src = https://user-images.githubusercontent.com/74294325/106431604-d970c480-64b0-11eb-91f2-69a89c1a8cae.PNG>

<br>

4. todolist에서 checklist로 옮겼을 경우 localStorage

<img src = https://user-images.githubusercontent.com/74294325/106431696-fd340a80-64b0-11eb-919d-79b3feb37bf9.PNG>

<br>

5. todolist 및 checklist를 삭제했을 경우

<img src = https://user-images.githubusercontent.com/74294325/106431760-163cbb80-64b1-11eb-8814-12a71c4bdae5.PNG>

<br>

---

<br>

## 프로젝트 진행

1. 시계 만들기.

querySelector()를 이용하여 html 의 요소를 가져온 후 자바스크립트의 Date 객체를 이용하여 시간을 얻고 setInterval()함수를 이용하여 지정한 시간마다 반복실행을 하여 시간을 얻어온다.

```html
<div class="clock">
    <span class="time"></span>
</div>
```

```javascript
const clock = document.querySelector(".time"); //class가 time인 요소를 객체로 생성

function getTime(){//날짜를 얻어오는 함수
    const date = new Date();
    const time = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    clock.innerHTML = //날짜를 얻어와서 time요소의 값으로 넣어준다.
    `${time < 10 ? `0${time}` : time}
    : ${min <10 ? `0${min}` : min}
    : ${sec < 10 ? `0${sec}` : sec}`;
}


function init(){
    getTime(); //먼저 한번 그려 준 후
    setInterval(getTime,1000); //1초마다 반복실행하여 계속해서 현재 시간을 표현해준다.
}

init();
```

<br>

---

<br>


2. 사용자의 이름을 입력 받아 LocalStorage에 저장 후 이름이 저장 되어 있으면 지정 된 문구 보여주기 

    * 미리 지정해 둔 css속성을 상황에 맞게 요소에 추가하기, 지우기 로직을 이용하여 화면 조작
    * LocalStorage에 이름이 저장 됬다면 페이지의 조작(새로고침,종료 후 다시 시작)이 있더라도 이름을 물어보지 않는다.
    * 이름이 입력되어야지 todolist를 입력할 수 있는 창을 제공

<br>

```javascript
const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const hello = document.querySelector(".hello");
const list = document.querySelector(".listform");

const USER_LS ="userName";
const SHOWING ="showing";



function paint(text){
    //이름이 저장되었을 시 이름을 입력받는 form태그를 숨기고
    //todolist를 입력할 수 있는 form과 사용자의 이름을 표시
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
    form.classList.add(SHOWING); //사용자 이름을 묻는 form태그를 보여주고
    form.addEventListener("submit",handleSubmit); //handleSubmit함수를 실행하여 이름저장
}

function loadName(){
    //먼저 localStorage에서 사용자 이름을 받아온다.
    const username = localStorage.getItem(USER_LS);

    //만약 이름이 존재하지 않는다면
    if(username===null){
        askForName(); //이름을 물어보고
    }else{//이름이 존재한다면
        paint(username);//사용자의 이름을 웹상에 표현해준다.
    }
}

function init(){
    loadName();    
}

init();
```

<br>

---

<br>

3. todo list

    * todolist에 사용자가 입력을 하면 노드를 생성하여 동적으로 추가한다.(노드에는 아이디가 추가된다.)
    * 추가된 노드는 객체에 담겨 배열에 추가 되고 배열은 JSON형식으로 LocalStorage에 저장되게 된다.
    * 만약 사용자가 todolist에 있는 작업을 완료하여 버튼을 눌렀을 경우 checklist로 이동되고 todolist를 담고있던 객체배열은 checklist로 이동 된 객체를 filter()를 이용하여 재구성한다. (checklist에서 todolist로 가는것 또한 동일)
    * todolist나 checklist에서 node가 삭제될 경우 이벤트가 발생한 노드를 확인 후 삭제한다.

<br>

```javascript
const todoForm = document.querySelector(".listform");
const todoinput = todoForm.querySelector("input");

const todoList = document.querySelector(".todolist");
const checkList = document.querySelector(".checklist");

const TODO_LS = "todo";
const CHECK_LS = "check";

let todoArray = [];
let checkArray = [];

function clear(li,array){
    //지워진 li와 배열을 매개변수로 받아서 li와 id값이 같은 요소는 삭제 후 배열을 재구성
    const clearArr = array.filter(function(e){
        return e.id !== parseInt(li.id);
    })
    if (array === checkArray) {
        checkArray = clearArr;
        save(CHECK_LS, checkArray);
    } else if (array === todoArray) {
        todoArray = clearArr;
        save(TODO_LS, todoArray);
    }
}

function save(key, value){
    localStorage.setItem(key,JSON.stringify(value)); //key와 배열을 받아서 문자열 형식으로 로컬스토리지에 저장
}


function change(event){
    const btn = event.target; //이벤트가 발생한 버튼을 구하고
    const btnText = btn.innerText; //버튼의 text를 얻은다음
    const li = btn.parentNode; //버튼의 부모 노드를 얻는다.
    const text = li.firstChild.innerText; //부모노드안에 있는 span의 text를 얻는다.

    if("O" === btnText){ //버튼에 따른 이벤트 처리
        paintcheck(text);
        todoList.removeChild(li);
        clear(li,todoArray);

    }else if("<-"=== btnText){
        paintTodo(text);
        checkList.removeChild(li);
        clear(li,checkArray);
    }
}

function delList(event){
    const btn = event.target; //어느 버튼에서 이벤트가 발생했는지 가져온다.
    const li = btn.parentNode; //가져온 버튼이 속한 li를 가져온다.
    if(todoList == li.parentNode){ //만약 li가 todolist에 속한거라면 todolist에서 지움
        todoList.removeChild(li);
        clear(li,todoArray);
    }else if(checkList == li.parentNode){//만약 li가 checklist에 속한거라면 checklist에서 지움
        checkList.removeChild(li);
        clear(li,checkArray);
    }
}

//todolist 생성
function paintTodo(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const checkbtn = document.createElement("button");
    const delBtn = document.createElement("button");
    const id = todoArray.length+1;
    
    delBtn.addEventListener("click",delList);
    checkbtn.addEventListener("click",change);

    span.innerText = text;
    checkbtn.innerText="O";
    delBtn.innerText="X";

    li.appendChild(span);
    li.appendChild(checkbtn);
    li.appendChild(delBtn);
    li.id = id;
    todoList.appendChild(li);

    const todoObj={
        id:id,
        todo:text
    };
    todoArray.push(todoObj);
    save(TODO_LS,todoArray);
}

//checklist 생성
function paintcheck(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const returnbtn = document.createElement("button");
    const delBtn = document.createElement("button");
    const id = checkArray.length+1;

    delBtn.addEventListener("click",delList);
    returnbtn.addEventListener("click",change);

    span.innerText = text;
    returnbtn.innerText="<-";
    delBtn.innerText="X";

    li.appendChild(span);
    li.appendChild(returnbtn);
    li.appendChild(delBtn);
    li.id = id;
    checkList.appendChild(li);

    const checkObj={
        id:id,
        check:text
    };

    checkArray.push(checkObj);
    save(CHECK_LS,checkArray);
}


function loadlist(){
    //현재 로컬스토리지에 있는 값들을 가져와서
    const loadedTodo = localStorage.getItem(TODO_LS);
    const loadedCheck = localStorage.getItem(CHECK_LS);

    //가져온 값이 null이 아니라면 list에 그려줘라
    if(loadedTodo !== null){
        const parsingTodo = JSON.parse(loadedTodo);
        parsingTodo.forEach(function(e){
            paintTodo(e.todo);
        });
    }

    if(loadedCheck !==null){
        const parsingCheck = JSON.parse(loadedCheck);
        parsingCheck.forEach(function(e){
            paintcheck(e.check);
        });
    }
}


function handleSubmit(event){
    event.preventDefault(); //이벤트를 멈추고
    const inputText = todoinput.value; //입력한 값을 가져온다
    if(inputText===""){ //만약 아무것도 입력하지 않고 서브밋을 한다면 리턴
        return;
    }
    paintTodo(inputText); //todolist에 그려준다.
    todoinput.value = "";//input영역 초기화
}

function init(){
    loadlist(); //이미 저장된 list들이 있다면 불러와라
    todoForm.addEventListener("submit",handleSubmit); //사용자가 todo를 입력하면 callback함수를 실행
}

init();
```

<br>

---

<br>

4. 사용자에게 위치 동의를 구한 후 날씨 얻기

    * [openweathermap](https://openweathermap.org/)에 가입하여 API key를 할당 받은 후 데이터를 받아와서 사용자에게 보여준다.

```javascript
const API_KEY ='f4d9ac3f821e794b316a9ff963b5127f'; //API를 사용하기위해 openWeatherMap에서 제공하는 데이터를 받아오기 위해 key를 얻음
const COORDS = 'coords';
const weather = document.querySelector(".weather");

function getWeather(lat,lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`//https:// 추가해야 한다.
        ).then(function(response){
            return response.json();
        })
        .then(function(json){
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerHTML = `${temperature}º <br> ${place}`;
        })
        
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, // 객체에서 키값과 value값이 같을경우 하나만 적어주어도 된다.
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log('Error');
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
    //사용자에게 위치정보를 구한다. 성공 시 왼쪽 method, 실패 시 오른쪽 method
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        setInterval(getWeather(parseCoords.latitude, parseCoords.longitude),1000*60*30);
    }
}


function init(){
    loadCoords();
}

init();
```

<br>

---

<br>

### 참조

[노마드 코더 바닐라 자바스크립트](https://nomadcoders.co/javascript-for-beginners)