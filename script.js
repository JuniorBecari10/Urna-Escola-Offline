const numberInp = getId("number-inp");
const form = getId("form");
const votar = getId("votar");
const sfx = getId("sfx");

var candidates = {
  "43": {
    name: "Cand 1",
    votes: 0,
  },
  "55": {
    name: "Cand 2",
    votes: 0,
  }
}

numberInp.addEventListener("keydown", (e) => {
  if ((numberInp.value.length + 1 > 2 || isNaN(e.key)) && e.key != "Backspace") {
    e.preventDefault();
  }

  if (e.key == "Enter") {
    votar.click();
  }
});

votar.addEventListener("click", () => { vote(); });

function vote() {
  sfx.play();
  
  if (numberInp.value.length != 2) {
    return;
  }
  
  let number = numberInp.value;
  numberInp.value = "";
  
  let cand = candidates[number];
  
  if (cand === undefined) {
    console.log("Invalid vote. Typed number: " + number);
    return;
  }
  
  cand.votes++;
  
  console.log(cand);
  console.log(candidates);
  
  localStorage.setItem("candidates", JSON.stringify(candidates));
}

function print() {
  console.log(candidates);
}

function clear() {
  localStorage.clear();
}

function getId(id) {
  return document.getElementById(id);
}