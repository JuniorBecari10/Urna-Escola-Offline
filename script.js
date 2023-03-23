const numberInp = getId("number-inp");
const form = getId("form");
const votar = getId("votar");
const sfx = getId("sfx");

const votePreview = getId("vote-preview");
const candPreview = getId("cand-preview");

var candidatesDefault = {
  "10": {
    name: "UPME",
    votes: 0,
  },
  "14": {
    name: "Liga do Estudante",
    votes: 0,
  }
}

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

if (localStorage.getItem("candidates") !== null) {
  candidates = JSON.parse(localStorage.getItem("candidates"));
}

document.addEventListener("keydown", (e) => {
  if (e.key === "F2") {
    print();
  }

  if (e.key === "F3") {
    if (confirm("Deseja mesmo apagar os votos?")) {
      clear();
    }
  }

  if (e.key === "F4") {
    winner();
  }
});

numberInp.addEventListener("keydown", (e) => {
  if ((numberInp.value.length + 1 > 2 || isNaN(e.key)) && e.key != "Backspace") {
    e.preventDefault();
  }

  if (e.key === "Enter") {
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
  if (numberInp.value.length != 2) {
    return;
  }

  sfx.play();
  
  let number = numberInp.value;
  numberInp.value = "";
  
  let cand = candidates[number];
  
  if (cand === undefined) {
    console.log("Voto inválido. Número digitado: " + number);
    return;
  }
  
  cand.votes++;

  console.log(cand);
  
  localStorage.setItem("candidates", JSON.stringify(candidates));
}

function print() {
  console.log(candidates);
}

function winner() {
  let sorted = sortCands(candidates);

  if (sorted.length == 0) {
    alert("Ainda não houve votos!");
  }

  if (sorted[0][1].votes > sorted[1][1].votes) {
    alert("O candidato vencedor é " + sorted[0][1].name + ", com " + sorted[0][1].votes + " voto(s).");
  }
  else {
    alert("Houve um empate entre os candidatos, ambos com " + sorted[0][1].votes + " voto(s).");
  }
}

function clear() {
  candidates = candidatesDefault;
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