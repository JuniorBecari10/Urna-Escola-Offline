const qs = id => document.querySelector(id);
const qs_all = id => document.querySelectorAll(id);

const inputs = qs_all("input.input");
const button = qs("#votar");

const anchors = qs_all("a");
const card = qs("#card");

const view_votes = qs("#view-votes");
const view_winner = qs("#view-winner");

const candidateName = qs("#candidate-name");
const infoCard = qs("#info-card");
const infoClose = qs("#info-close");

const sfx = qs("#sfx");

const digits = ["", ""];
let canSubmit = false;

const candidatesDefault = {
  "13": {
    name: "Lutando Pela Melhoria Escolar",
    votes: 0,
  },
  "14": {
    name: "Solução Jovem",
    votes: 0,
  },
  "15": {
    name: "no_name!",
    votes: 0,
  }
};

// guarantee to have a copy
const candidates = { ...candidatesDefault };
let nullVotes = 0;

anchors.forEach(anchor => {
  anchor.onclick = e => {
    e.preventDefault();
  };
});

let i = 0;
inputs.forEach(input => {
  let lastInputStatus = 0;
  input.i = i;

  input.onkeypress = e => isNumberKey(e);

  input.onkeyup = e => {
    if (e.key === "Enter") {
      submit();
      return;
    }

    digits[input.i] = input.value;

    const current = e.target;
    const next = input.nextElementSibling;
    const prev = input.previousElementSibling;

    if (prev && e.keyCode === 8) {
      if (lastInputStatus === 1) {
        prev.value = "";
        prev.focus();
      }

      button.setAttribute("disabled", true);
      card.classList.add("hidden");
      canSubmit = false;

      lastInputStatus = 1;
    }
    else {
      const regex = /^[0-9]+$/;
      if (!regex.test(current.value)) {
        current.value = current.value.replace(/\D/g, "");
      }
      else if (current.value) {
        if (next) {
          next.focus();
        }
        else {
          button.removeAttribute("disabled");
          card.classList.remove("hidden");
          canSubmit = true;
          changeCandidateName(getTypedData());

          lastInputStatus = 0;
        }
      }
    }
  }

  i++;
});

button.onclick = e => {
  e.preventDefault();
  submit();
};

infoClose.onclick = e => {
  e.preventDefault();
  infoCard.classList.add("hidden");
}

function getTypedData() {
  let res = "";
  
  digits.forEach(digit => {
    res += digit;
  });

  return res;
}

function changeCandidateName(number) {
  if (candidates.hasOwnProperty(number)) {
    const candidate = candidates[number];
    candidateName.innerText = candidate.name;
  }
  else {
    candidateName.innerText = "Nulo";
  }
}

function submit() {
  if (!canSubmit) return;

  sfx.play();
  reset();

  const number = getTypedData();
  
  if (candidates.hasOwnProperty(number)) {
    const candidate = candidates[number];
    candidate.votes++;
  }
  else {
    nullVotes++;
  }
}

function submitPassword(password) {
  const correctPass = "abelha123";

  if (password !== correctPass) {
    new Noty({
      text: "Senha incorreta!",
      progressBar: true,
      timeout: 5000,
      type: "error",
    }).show();

    return;
  }

  infoCard.classList.remove("hidden");
}

function reset() {
  inputs.forEach(input => input.value = "");
  inputs[0].focus();

  button.setAttribute("disabled", true);
  card.classList.add("hidden");
  canSubmit = false;
  // should i set the candidateName to "Nulo"?
}

function isNumberKey(evt) {
  let charCode = (evt.which) ? evt.which : evt.keyCode
  return !(charCode > 31 && (charCode < 48 || charCode > 57));
}
