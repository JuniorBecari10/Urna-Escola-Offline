const numberInp = getId("number-inp");
const form = getId("form");
const votar = getId("votar");

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
  let number = numberInp.value;
  numberInp.value = "";
  
  let cand = candidates[number];
  
  if (cand === undefined) {
    console.log("Invalid. Typed: " + number);
    return;
  }
  
  cand.votes++;
  
  console.log(cand);
  console.log(candidates);
  
  localStorage.setItem("candidates", JSON.serialize(candidates));
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