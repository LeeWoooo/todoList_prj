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