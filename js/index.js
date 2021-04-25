// check item in list
const Check = document.querySelectorAll(".Circle");

Check.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("Check");
    item.nextElementSibling.classList.toggle("done");
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

// hover for border gradient in input

const btnInput = document.querySelector(".btn-input");
btnInput.addEventListener("mouseover", () => {
  let classesItem = btnInput.classList.value;
  let findCheck = classesItem.search("Check");
  if (findCheck == -1) {
    btnInput.classList.add("Circle-hover");
  }
});
// remove hover class when mouse out in input
btnInput.addEventListener("mouseleave", () => {
  let classesItem = btnInput.classList.value;
  let findHover = classesItem.search("Circle-hover");

  if (findHover != -1) {
    btnInput.classList.remove("Circle-hover");
  }
});

const addItem = () => {
  let item = getItem.value;

  checkInput(item);
  getItem.value = "";
};

// create element in list
const CreateItemList = (Value, check) => {
  // set to localstorage
  // saveItems(Value);
  let checkitem;
  if (check == true) {
    checkitem = true;
  } else {
    checkitem = false;
  }
  saveItems({
    item: Value,
    check: checkitem,
  });

  // li
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
  p.textContent = Value;

  // hover for border gradient in circle

  button.addEventListener("mouseover", () => {
    let classesItem = button.classList.value;
    let findCheck = classesItem.search("Check");
    if (findCheck == -1) {
      button.classList.add("Circle-hover");
    }
  });

  // remove hover class when mouse out
  button.addEventListener("mouseleave", () => {
    let classesItem = button.classList.value;
    let findHover = classesItem.search("Circle-hover");

    if (findHover != -1) {
      button.classList.remove("Circle-hover");
    }
  });

  // for more inf go to checkInput()
  if (check == true) {
    button.classList.add("Check");
    p.classList.add("done");
  } else {
    CounterPlus("+");
  }

  div.appendChild(button);
  div.appendChild(p);

  // img (X)
  let img = document.createElement("img");
  img.setAttribute("src", "images/icon-cross.svg");
  img.setAttribute("alt", "Cross");
  img.classList.add("Cross");
  li.appendChild(img);

  // remove with X
  img.addEventListener("click", () => {
    img.parentElement.remove();
    let itemName = img.previousSibling.childNodes[1].textContent;
    removeFromLS(itemName);
  });

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

  //drag and drop eventlistener
  li.setAttribute("draggable", true);
  li.addEventListener("dragstart", dragStart);
  li.addEventListener("dragover", dragOver);
  li.addEventListener("drop", drop);
};

// check in check-input button is on or off and send to create item
const checkInput = (item) => {
  const CheckToggle = document.querySelector("#check-input");

  let classes = CheckToggle.classList;
  let Check;
  for (i of classes) {
    if (i == "Check") {
      Check = true;
    }
  }
  CreateItemList(item, Check);
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
  clearCompleteInLS();
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

// change filter btns in screen
const windowWidth = window.innerWidth;

let filterLg = document.querySelector(".filter-lg");
let filterMd = document.querySelector(".filter-md");
let remainItem = document.querySelector(".remain-item");

if (windowWidth <= 960) {
  filterMd.appendChild(filterLg);
} else if (windowWidth > 960) {
  remainItem.after(filterLg);
}

// event for resize
const Xl = window.matchMedia("(max-width: 960px)");
const XXl = window.matchMedia("(min-width: 960.1px)");

window.addEventListener("resize", () => {
  let filterLg = document.querySelector(".filter-lg");
  let filterMd = document.querySelector(".filter-md");
  let remainItem = document.querySelector(".remain-item");

  if (Xl.matches) {
    filterMd.appendChild(filterLg);
  } else if (XXl.matches) {
    remainItem.after(filterLg);
  }
});

// set local storage for remain all tasks in list for 24 hr

const saveItems = (data) => {
  // check for duplicate
  if (localStorage.getItem(data.item) == null) {
    localStorage.setItem(data.item, JSON.stringify(data));
    let Time = new Date();
    let Today =
      Time.getFullYear() + "-" + (Time.getMonth() + 1) + "-" + Time.getDate();
    // set data for today
    appendToLocalstorage(Today, data);
  }
};

// append items to today
const appendToLocalstorage = (name, data) => {
  // get old items to set with new item
  let old = localStorage.getItem(name);
  const mydata = [];

  //this for white space or ","
  if (old != null || old != undefined) {
    old = JSON.parse(old);
    for (var i of old) {
      mydata.push(i);
    }
  } // this for null error
  else if (old == null || old == undefined) {
    old = {};
  }
  // add all data to one variable
  mydata.push(JSON.stringify(data));

  // add all to name
  localStorage.setItem(name, JSON.stringify(mydata));
};

// load items on reload the page with check
let Time = new Date();
let Today =
  Time.getFullYear() + "-" + (Time.getMonth() + 1) + "-" + Time.getDate();

let itemsSaved = localStorage.getItem(Today);
let itemsObj = JSON.parse(itemsSaved);
// convert str to obj
for (i in itemsObj) {
  let a = JSON.parse(itemsObj[i]);
  let check = a.check;
  let item = a.item;
  CreateItemList(item, check);
}

// clear items been deleted by X

function removeFromLS(item) {
  // check the specific item in hole list and save another itmes without the specific item
  let Time = new Date();
  let Today =
    Time.getFullYear() + "-" + (Time.getMonth() + 1) + "-" + Time.getDate();

  let old = localStorage.getItem(Today);

  let mydata = [];

  //this for white space or ","
  if (old != null || old != undefined) {
    old = JSON.parse(old);
    for (var i of old) {
      let target = i.match('item":"(.*?)"');
      if (target[1] == item) {
        continue;
      } else {
        mydata.push(i);
      }
    }
  } // this for null error
  else if (old == null || old == undefined) {
    old = {};
  }

  // add all to name
  localStorage.setItem(Today, JSON.stringify(mydata));
}

// clear all completed from localstroage when clicked on clear completed

// find items with check true and add false checks to localstorage
function clearCompleteInLS() {
  let Time = new Date();
  let Today =
    Time.getFullYear() + "-" + (Time.getMonth() + 1) + "-" + Time.getDate();

  let todayItems = localStorage.getItem(Today);
  let mydata = [];

  if (todayItems != null || todayItems != undefined) {
    let All = JSON.parse(todayItems);
    for (i of All) {
      let findComplete = i.match('"check":(.*)}');
      if (findComplete[1] == "true") {
        continue;
      } else {
        mydata.push(i);
      }
    }
  } else if (todayItems == null || todayItems == undefined) {
    alert("u have none");
  }

  localStorage.setItem(Today, JSON.stringify(mydata));
}

// btn for clear all saved

function clearAllToday() {
  let Time = new Date();
  let Today =
    Time.getFullYear() + "-" + (Time.getMonth() + 1) + "-" + Time.getDate();

  localStorage.removeItem(Today);
}
