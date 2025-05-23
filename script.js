//Variables
let cu = false;
let mobile_media_query = window.matchMedia("(max-width: 400px)");
let tablet_media_query = window.matchMedia(
  "(min-width: 400px) and (max-width: 600px)"
);
const notes = document.querySelectorAll(".js-note");

setTimeout(() => {
  showtxt();
  setTimeout(() => {
    const envelop = document.querySelector(".envelop");
    envelop.style.pointerEvents = "auto";
  }, 500);
}, 8000);

function nextbtn() {
  const img = document.querySelector(".image")
  const txt = document.querySelector(".open__envelop");
  const envelop = document.querySelector(".envelop");
  const btn = document.querySelector(".btn__wrapper");
  txt.style.animation = "oculttxt 0.5s ease-in-out forwards";
  envelop.style.animation = "moveenv2 1s ease-in-out forwards";
  btn.style.animation = "sas 1.5s ease-in-out forwards";
  img.style.animation = "riseFromBelow2 2s ease-in-out forwards";
  setTimeout(() => {
    txt.remove();
    envelop.remove();
    btn.remove();
  }, 2000);
}

function openenvelop() {
  if (!cu) {
    set_up_paper()
    cu = true;
  }
  
}

function showbtn() {
  const note = document.querySelector(".last-note");
  const secnote = document.querySelector(".sec-note");
  const firstnote = document.querySelector(".first-note");
  const btn = document.querySelector(".btn__wrapper");
  if (note.classList.contains('active') && !secnote.classList.contains('active') && !firstnote.classList.contains('active')) {
    btn.style.animation = "showtxt 1s ease-in-out forwards";
  } else {
    console.log("not active");
  }
}

function removeop() {
  const txt = document.querySelector(".open__envelop");
  txt.remove();
}

function showtxt() {
  const txt = document.querySelector(".open__envelop");
  txt.style.animation = "showtxt 2s ease-in-out forwards";
}

function moveenv() {
  const envelop = document.querySelector(".envelop");
  envelop.style.animationPlayState = 'paused';
}

//-> Function that resets the size of the notes.
function recize_notes() {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].classList.contains("active")) {
      notes[i].classList.remove("active");
      gsap.set(notes[i], {
        height: "30%",
        clearProps: "all"
      });
    }
  }
}

//-> Main function that enables all the notes.
function notes_ready() {
  gsap.to(".js-envelop-content", {
    height: "110%",
    duration: 0.5
  });

  for (let i = 0; i < notes.length; i++) {
    notes[i].addEventListener("click", function () {
      if (mobile_media_query.matches) {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all"
          });
        } else {
          for (let i = 0; i < notes.length; i++) {
            if (notes[i].classList.contains("active")) {
              notes[i].classList.remove("active");
              gsap.set(notes[i], {
                height: "30%",
                clearProps: "all"
              });
            }
          }
          this.classList.add("active");
          gsap.set(this, {
            height: 125 + 40 * i + "%"
          });
        }
      } else if (tablet_media_query.matches) {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all"
          });
        } else {
          for (let i = 0; i < notes.length; i++) {
            if (notes[i].classList.contains("active")) {
              notes[i].classList.remove("active");
              gsap.set(notes[i], {
                height: "30%",
                clearProps: "all"
              });
            }
          }
          this.classList.add("active");
          gsap.set(this, {
            height: 80 + 21 * i + "%"
          });
        }
      } else {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all"
          });
        } else {
          for (let i = 0; i < notes.length; i++) {
            if (notes[i].classList.contains("active")) {
              notes[i].classList.remove("active");
              gsap.set(notes[i], {
                height: "30%",
                clearProps: "all"
              });
            }
          }
          this.classList.add("active");
          gsap.set(this, {
            height: 70 + 20 * i + "%"
          });
        }
      }
      showbtn()
    });
  }
}

//-> Function that set up the up paper of the envelope.
function set_up_paper() {
  moveenv();
  var arr = [0, 0, 100, 0, 50, 61];
  gsap.set(".js-up-paper", {
    bottom: "97%",
    rotation: 180,
    zIndex: 200,
    clipPath:
      "polygon(" +
      arr[0] +
      "%" +
      arr[1] +
      "%," +
      arr[2] +
      "%" +
      arr[3] +
      "%," +
      arr[4] +
      "%" +
      arr[5] +
      "%)",
    onComplete: notes_ready
  });
}

//-> Function that starts the up paper transition.
function envelop_transition() {
  gsap.to(".js-up-paper", {
    bottom: "1%",
    duration: 0.25,
    onComplete: set_up_paper
  });
  document
    .querySelector(".js-up-paper")
    .removeEventListener("click", envelop_transition);
  document.querySelector(".js-up-paper").classList.remove("cursor");
}

//-> Function that allows cut the sticker.
function sticker() {
  gsap.set(".js-sticker", { width: "20%", left: "-80%" });
  document.body.classList.remove("scissors");
  document.querySelector(".js-sticker").removeEventListener("click", sticker);
  document
    .querySelector(".js-up-paper")
    .addEventListener("click", envelop_transition);
  document.querySelector(".js-up-paper").classList.add("cursor");
}

window.onresize = function (event) {
  recize_notes();
};