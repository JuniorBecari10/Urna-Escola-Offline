const qs = id => document.querySelector(id);
const qs_all = id => document.querySelectorAll(id);

const inputs = qs_all("input.input");
const button = qs("#votar");

const anchors = qs_all("a");
const card = qs("#card");

const view_votes = qs("#view-votes");
const view_winner = qs("#view-winner");

const sfx = qs("#sfx");

anchors.forEach(anchor => {
  anchor.onclick = e => {
    e.preventDefault();
  };
});

inputs.forEach(input => {
  let lastInputStatus = 0;

  input.onkeypress = e => isNumberKey(e);

  input.onkeyup = e => {
    if (e.key === "Enter") {
      submit();
      return;
    }

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
          lastInputStatus = 0;
        }
      }
    }
  }
});

button.onclick = e => {
  e.preventDefault();
  submit();
};

function submit() {
  sfx.play();
  reset();
}

function reset() {
  inputs.forEach(input => input.value = "");
  inputs[0].focus();

  button.setAttribute("disabled", true);
  card.classList.add("hidden");
}

function isNumberKey(evt) {
  let charCode = (evt.which) ? evt.which : evt.keyCode
  return !(charCode > 31 && (charCode < 48 || charCode > 57));
}
