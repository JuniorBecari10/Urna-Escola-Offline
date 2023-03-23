const numberInp = getId("number-inp");
const form = getId("form");
const votar = getId("votar");
const sfx = getId("sfx");

const votePreview = getId("vote-preview");
const candPreview = getId("cand-preview");

var candidates = {
  "10": {
    name: "UPME",
    votes: 0,
  },
  "14": {
    name: "Liga do Estudante",
    votes: 0,
  }
}

var sorted = [];

if (localStorage.getItem("candidates") !== null) {
  candidates = JSON.parse(localStorage.getItem("candidates"));
}

numberInp.addEventListener("keydown", (e) => {
  if ((numberInp.value.length + 1 > 2 || isNaN(e.key)) && e.key != "Backspace") {
    e.preventDefault();
  }

  if (e.key == "Enter") {
    votar.click();
  }
});

numberInp.addEventListener("keyup", () => {
  if (numberInp.value.length == 2) {
    votePreview.style.opacity = "100%";

    let cand = candidates[numberInp.value];
    
    if (cand === undefined) {
      candPreview.innerHTML = "Voto Nulo";
      return;
    }

    candPreview.innerHTML = cand.name;
  }
  else {
    votePreview.style.opacity = "0";
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
  
  sorted = sortCands(candidates);

  console.log(cand);
  console.log(candidates);
  
  localStorage.setItem("candidates", JSON.stringify(candidates));
}

function print() {
  console.log(candidates);
}

function winner() {
  if (sorted.length == 0) {
    alert("Ainda não houve votos!");
  }

  alert("O candidato vencedor é " + sorted[0].name + ", com " + sorted[0].votes + " votos.");
}

function clear() {
  localStorage.clear();
}

function getId(id) {
  return document.getElementById(id);
}

function sortCands(cands) {
  const arr = Object.entries(candidates);
  
  for (let i = 0; i < arr.length - 1; i++) {
    let a = arr[i];
    let b = arr[i + 1];

    if (a[1].votes < b[1].votes) {
      arr.swapItems(i, i + 1);
    }
  }

  return arr;
}

Array.prototype.swapItems = function(a, b) {
  this[a] = this.splice(b, 1, this[a])[0];
  return this;
}