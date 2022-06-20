const form = document.querySelector(".todo_form");
const input_one = document.querySelector(".todo_input");
const input_two = document.querySelector(".mean_input");
const todo_container = document.querySelector(".todo_container");


const startConf = () => {
   // baslangic ayarlari
   const todos = JSON.parse(localStorage.getItem("todos"));
   console.log(todos)
   if (!todos) {
      localStorage.setItem("todos", JSON.stringify([]));
   } else {
      todos.forEach(todo => {
         addHTML(todo);
      });
   } 
}

//============================================================================================================================




const addTodo = (e) => {
   e.preventDefault();
   
   const inputVal = input_one.value;
   const inputVal2 = input_two.value;

   if (inputVal == '' || inputVal2 == '')  { // boş değer girilmeye çalışıyor ise hata veriyoruz
      input_one.style.border = '1px solid tomato';
      input_two.style.border = '1px solid tomato';
      setTimeout(() => {
         input_one.style.borderColor = 'transparent';
         input_two.style.borderColor = 'transparent';
      }, 2500);
      return false;
   }

   const todo = {
      text: inputVal,
      mean: inputVal2,
      isCompleted: false,
      what: false
   };
   const todos = JSON.parse(localStorage.getItem("todos"));
   todos.push(todo);
   localStorage.setItem("todos", JSON.stringify(todos));
   // document.write()
   addHTML(todo);
   form.reset();
}


const deleteTodo = (e) => {
   const todo = e.target.parentElement.parentElement;
   const text = todo.firstChild.children[1].textContent;

   let todos = JSON.parse(localStorage.getItem("todos"));
   todos = todos.filter(td => td.text != text);
   localStorage.setItem("todos", JSON.stringify(todos));

   todo.remove();
}


const completeTodo = (e) => {
   const todo = e.target.parentElement.parentElement;
   const text = todo.firstChild.children[1].textContent;

   let todos = JSON.parse(localStorage.getItem("todos"));
   
   todos.forEach(td => {
      if (td.text === text) td.isCompleted = !td.isCompleted 
   });

   localStorage.setItem("todos", JSON.stringify(todos));
}


//=============SAVE TODO-MEAN=============//

const saveTodo = (e) => {
   const todo = e.target.parentElement.parentElement;
   const prevText = todo.firstChild.children[1].textContent; // değiştirilmeden önceki değer
   const newText = todo.firstChild.children[3].value; // editlerken girdiğimiz yeni değer

   console.log(prevText);

   let todos = JSON.parse(localStorage.getItem("todos"));
   
   todos.forEach(td => {
      if (td.text === prevText) td.text = newText;
   });

   localStorage.setItem("todos", JSON.stringify(todos));

   todo.firstChild.children[1].textContent = newText;  // HTML üzerindeki değerini de değiştiriyoruz

   todo.classList.remove("-edited"); // verdiğimiz classı kaldırıyoruz
}

const saveMean = (e) => {
   const todo = e.target.parentElement.parentElement;
   const prevTextMean = todo.firstChild.children[2].textContent; // değiştirilmeden önceki değer
   const newTextMean = todo.firstChild.children[4].value; // editlerken girdiğimiz yeni değer

   let todos = JSON.parse(localStorage.getItem("todos"));
   
   todos.forEach(td => {
      if (td.mean === prevTextMean) td.mean = newTextMean;
   });

   localStorage.setItem("todos", JSON.stringify(todos));

   todo.firstChild.children[2].textContent = newTextMean;  // HTML üzerindeki değerini de değiştiriyoruz

   todo.classList.remove("-edited2"); // verdiğimiz classı kaldırıyoruz
}

//=============EDIT=============//

const editTodo = (e) => {
   const todo = e.target.parentElement.parentElement;
   todo.classList.add("-edited");
}

const editMean = (e) => {
   const todo = e.target.parentElement.parentElement;
   todo.classList.add("-edited2");
   console.log("Booom")
}

//=============NEW WORD=============//
const refreshButton = document.querySelector(".refresh");
const random_word = document.querySelector(".random_word");
const random_mean = document.querySelector(".random_mean");
const wordStorage = JSON.parse(localStorage.getItem("todos"));

//Random Function

//Refresh
function refresh() {
   const keyCount  = Object.keys(wordStorage).length;
   const value1 = Math.random()*keyCount;
   const value2 = (Math.round(value1));
   random_word.textContent = wordStorage[value2].text;
   random_mean.textContent = wordStorage[value2].mean;         
}
refreshButton.addEventListener("click",refresh);

//=============ADD HTML=============//

const addHTML = (todo) => {
   const todoDiv = document.createElement("div");
   todoDiv.classList.add("todo");

   const todoLeft = document.createElement("div");
   todoLeft.classList.add("todo_left");
   
   const editInput = document.createElement("input");
   editInput.classList.add("todo_editInput")
   editInput.setAttribute("placeholder","word");
   editInput.setAttribute("maxlength", "100");
   editInput.defaultValue = todo.text;

   //EditInputt Mean================
   const editInputMean = document.createElement("input");
   editInputMean.classList.add("todo_editInputMean")
   editInputMean.defaultValue = todo.mean;

   const todoCb = document.createElement("input");
   todoCb.type = "checkbox";
   todoCb.checked = todo.isCompleted; 
   todoCb.classList.add("todo_cb");
   todoCb.addEventListener("click", completeTodo); // direkt olustururken veriyoruz event listenerlari

   //Displaying Texts
   const todoText = document.createElement("p");
   todoText.classList.add("todo_text");
   todoText.textContent = todo.text;

   const todoMean = document.createElement("div");
   todoMean.classList.add("todo_mean");
   todoMean.textContent = todo.mean;

   //=======================================

   todoLeft.appendChild(todoCb);
   todoLeft.appendChild(todoText);
   todoLeft.appendChild(todoMean);
   todoLeft.appendChild(editInput);
   todoLeft.appendChild(editInputMean);

   //=======================================

   const todoRight = document.createElement("div");
   todoRight.classList.add("todo_right");

   const deleteBtn = document.createElement("button");
   deleteBtn.classList.add("todo_delete");
   deleteBtn.textContent = "🗑️";
   deleteBtn.addEventListener("click", deleteTodo); // direkt olustururken veriyoruz event listenerlari

   //Edit Btn 
   const editBtn = document.createElement("button");
   editBtn.classList.add("todo_edit");
   editBtn.textContent = "✒️";
   editBtn.addEventListener("click", editTodo); // direkt olustururken veriyoruz event listenerlari
   
   //Save Btn
   const saveBtn = document.createElement("button");
   saveBtn.classList.add("todo_save");
   saveBtn.textContent = "📄";
   saveBtn.addEventListener("click", saveTodo);

   //Edit Btn Mean=======================================
   const editBtnMean = document.createElement("button");
   editBtnMean.classList.add("mean_edit");
   editBtnMean.textContent = "➕";
   editBtnMean.addEventListener("click", editMean); // direkt olustururken veriyoruz event listenerlari

   //SaveBtnMean===============================
   const saveBtnMean = document.createElement("button");
   saveBtnMean.classList.add("mean_save");
   saveBtnMean.textContent = "📄";
   saveBtnMean.addEventListener("click", saveMean);

   todoRight.appendChild(saveBtnMean);
   todoRight.appendChild(editBtnMean);

   todoRight.appendChild(deleteBtn);
   todoRight.appendChild(editBtn);
   todoRight.appendChild(saveBtn);
   
   todoDiv.appendChild(todoLeft);
   todoDiv.appendChild(todoRight);

   todo_container.prepend(todoDiv);
}


startConf();

form.addEventListener("submit", addTodo);