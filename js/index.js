// check item in list
const Check = document.querySelectorAll(".Circle");

Check.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("Check");
    item.nextElementSibling.classList.toggle("done");
    console.log(item.classList.toggle("n"));
  });
});

// delete item in list

const deleteItem = document.querySelectorAll(".Cross");

deleteItem.forEach((item) => {
  item.addEventListener("click", () => {
    item.parentElement.remove();
  });
});

// add to list

const getItem = document.querySelector("#input-Todo");

getItem.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    addItem();
  }
});

const addItem = () => {
  let item = getItem.value;

  CreateItemList(item);
  getItem.value = "";
};

// create element in list
const CreateItemList = (inputValue) => {
  let li = document.createElement("li");
  li.classList.add("Box", "flex-space");

  // div
  let div = document.createElement("div");
  div.classList.add("flex-start");
  li.appendChild(div);

  // btn & p
  let button = document.createElement("button");
  button.classList.add("Circle");
  let p = document.createElement("p");
  p.textContent = inputValue;

  // for more inf go to checkInput()
  if (checkInput() == true) {
    button.classList.add("Check");
    p.classList.add("done");
  } else {
    CounterPlus("+");
  }

  div.appendChild(button);
  div.appendChild(p);

  // img
  let img = document.createElement("img");
  img.setAttribute("src", "images/icon-cross.svg");
  img.setAttribute("alt", "Cross");
  img.classList.add("Cross");
  li.appendChild(img);

  // add to ul
  let ul = document.querySelector("#list");
  ul.prepend(li);

  li.addEventListener("click", () => {
    let changes = button.classList.toggle("Check");
    button.nextElementSibling.classList.toggle("done");
    // change just 1 up or down in active counter
    if (changes == true) {
      CounterPlus("-");
    } else if (changes == false) {
      CounterPlus("+");
    }
  });

  img.addEventListener("click", () => {
    img.parentElement.remove();
  });
};

// check in check-input button is on or off
const checkInput = () => {
  const CheckToggle = document.querySelector("#check-input");

  let classes = CheckToggle.classList;
  let Check;
  for (i of classes) {
    if (i == "Check") {
      Check = true;
    }
  }
  return Check;
};

// hide all the li's with check for show active / completed or remove all completed
const optionWorks = (Work) => {
  let items = document.querySelectorAll(".Circle:not(#check-input)");

  items.forEach((item) => {
    item.parentElement.parentElement.style.display = "flex";

    let classes = item.classList.value;
    const findCheck = classes.search("Check");

    if (Work == "completed") {
      if (findCheck == -1) {
        item.parentElement.parentElement.style.display = "none";
      }
    } else if (Work == "remove") {
      if (findCheck != -1) {
        item.parentElement.parentElement.remove();
      }
    } else if (Work == "active") {
      if (findCheck != -1) {
        item.parentElement.parentElement.style.display = "none";
      }
    }
  });
};

// show only active or complete
const active = document.querySelector("#active");

active.addEventListener("click", function (event) {
  event.preventDefault();
  optionWorks("active");
  active.classList.add("active");
  removeActive("active");
});

// completed
const completed = document.querySelector("#completed");

completed.addEventListener("click", function (event) {
  event.preventDefault();
  optionWorks("completed");
  completed.classList.add("active");
  removeActive("completed");
});

// show all items

const all = document.querySelector("#all");

all.addEventListener("click", function (event) {
  event.preventDefault();
  showAll();
});

const showAll = () => {
  let items = document.querySelectorAll(".Circle:not(#check-input)");

  items.forEach((item) => {
    item.parentElement.parentElement.style.display = "flex";
  });

  all.classList.add("active");
  removeActive("all");
};

// remove active class on last option
let counter = 0;
let optionDefault = "all";
function removeActive(Now) {
  // now = wich element of option is active
  var def;
  def = "#" + optionDefault;

  document.querySelector(def).classList.remove("active");

  optionDefault = Now;
}

// clear all completed

const remCompleted = document.querySelector("#rem-completed");

remCompleted.addEventListener("click", function (event) {
  event.preventDefault();
  optionWorks("remove");
});

// count active items for remain

let activeCounter = 0;

let itemsList = document.querySelectorAll(".Circle:not(#check-input)");

itemsList.forEach((item) => {
  let classesItem = item.classList.value;
  let findCheck = classesItem.search("Check");

  if (findCheck != -1) {
    CounterPlus("+");
  }
});

function CounterPlus(sign) {
  const remain = document.querySelector("#remain");
  if (sign == "+") {
    activeCounter++;
  } else if (sign == "-") {
    activeCounter--;
  }
  if (activeCounter < 0) {
    activeCounter = 0;
  }
  remain.textContent = parseInt(activeCounter);
}

// set coockie for remain all tasks in list for 24 hr

// drag and drop for changing the according of items

