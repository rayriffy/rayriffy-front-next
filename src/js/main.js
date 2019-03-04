function m(e, a) {
  const n = document.querySelector(e);
  n.classList.add("animated", a);
  function h() {
    n.classList.remove("animated", a);
    n.removeEventListener("animationend", h);
  }
  n.addEventListener("animationend", h);
}
var a = 0;
var c = 0;
var d = 0;
var i = [];
var l = [];
const s = [
  [39, 40, 38, 39, 39, 40, 39, 39, 38, 38, 40, 40, 37, 39, 37, 39, 39, 40, 38, 39, 39, 40, 39, 39, 38, 38, 40, 40, 37, 39, 37, 39, 39, 40, 38, 39, 39, 40, 39, 39, 38, 38, 40, 40],
  [39, 40, 38, 39, 39, 40, 39, 39, 38, 38, 40, 40, 37, 39, 37, 39, 39, 40, 38, 39, 39, 40, 39, 39, 38, 38, 40, 40, 37],
  [39, 40, 38, 39, 39, 40, 39, 39, 38, 38, 40, 40, 37, 39, 37, 39, 39, 40, 38, 39, 39, 40, 39, 39, 38, 38, 40, 40],
  [39, 40, 66, 65, 88, 89, 76, 82, 38, 38, 40, 65, 89, 76, 82, 65, 39, 40, 38, 39, 65, 88, 89, 82, 38, 38, 40, 40, 37],
  [39, 40, 66, 65, 88, 89, 76, 82, 38, 38, 40, 65, 89, 76, 82, 65, 39, 40, 38, 39, 65, 88, 89, 82, 38, 38, 40, 40]
];
const t = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
document.body.onkeydown = function(e) {
  if (e.keyCode >= 37 && e.keyCode <= 40) {
    document.querySelector(".title-area-container").classList.add("transition");
    document
      .querySelector(".title-area")
      .classList.add("keydown", "_" + e.keyCode);
  } else if (
    e.keyCode == 65 ||
    e.keyCode == 66 ||
    e.keyCode == 76 ||
    e.keyCode == 82 ||
    e.keyCode == 88 ||
    e.keyCode == 89
  ) {
    document.querySelector(".title-area").classList.add("keydown");
  }
};
document.body.onkeyup = function(e) {
  if (e.keyCode == 32) a++;
  else {
    i.push(e.keyCode);
    l.push(e.keyCode);
  }
  if (a % 10 === 0 && a !== 0) {
    if (document.getElementById("easter").style.display === "none")
      document.getElementById("easter").style.display = "inline-block";
    else document.getElementById("easter").style.display = "none";
    a = 0;
  }
  if (c === s.length) {
    c = 0;
    i = [e.keyCode];
  }
  if (s[c].every((v, k) => v === i[k])) {
    switch (c) {
      case 0:
        document.getElementById("tagline").textContent =
          "ちょっと、↑にためて下さい。";
        document.getElementById("email").textContent = "難易度：EASY";
        break;
      case 1:
        document.getElementById("tagline").textContent = "回転　一回転";
        document.getElementById("email").textContent = "難易度：NORMAL";
        break;
      case 2:
        document.getElementById("tagline").textContent = "回転　反転　一回転";
        document.getElementById("email").textContent = "難易度：NORMAL";
        break;
      case 3:
        document.getElementById("tagline").textContent = "回転　一回転";
        document.getElementById("email").innerHTML = "難易度：HARD";
        break;
      case 4:
        document.getElementById("tagline").textContent =
          "ちょっと？　間違えないで下さい。";
        document.getElementById("email").textContent = "難易度：HARD";
        break;
    }
    i = [];
    c++;
  }
  for (var j = 0; j < i.length; j++) {
    if (i[j] !== s[c][j]) {
      i = [];
      if (c !== 0) {
        c = 0;
        m(".site-title-image", "shake");
        document.getElementById("tagline").textContent = "Code + Music ≈ Life";
        document.getElementById("email").textContent = "contact@rayriffy.com";
      }
      break;
    }
  }
  if (t.every((v, k) => v === l[k])) {
    document.querySelector(".rick").play();
    document.querySelector(".wrapper").style.backgroundImage = "url(\"resources/WV7pVas9gCXpkP88SU.jpg\")";
    document.querySelector(".rick").addEventListener("ended", function(){
      document.querySelector(".rick").currentTime = 0;
      document.querySelector(".wrapper").style.backgroundImage = "url(\"resources/NfJeVlcPAu0b7L3es4.jpg\")";
    });
  }
  for (var j = 0; j < l.length; j++) {
    if (l[j] !== t[j]) {
      l = [];
      break;
    }
  }
  if (e.keyCode >= 37 && e.keyCode <= 40) {
    document
      .querySelector(".title-area")
      .classList.remove("keydown", "_" + e.keyCode);
  } else if (
    e.keyCode == 65 ||
    e.keyCode == 66 ||
    e.keyCode == 76 ||
    e.keyCode == 82 ||
    e.keyCode == 88 ||
    e.keyCode == 89
  ) {
    document.querySelector(".title-area").classList.remove("keydown");
  }
};
document.body.onfocus = function(e) {
  document.querySelector(".title-area").classList.remove("keydown");
};
